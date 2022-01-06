<template>
    <div class="static">
        <div class="relative" id="sphere" @mouseenter="start_roll" @mousemove="update_roll" @mouseleave="end_roll"
            :style="`width: ${get_area_width()}rem; height: ${get_area_height()}rem;`">
            <SphereItem
                class="absolute top-0 left-0"
                v-for='(item, index) in items_list' :key='index'
                :text="item"
                :index="index"
                :number_items="items_list.length"
                :radius="radius"
                :rotation_matrix="rotation_matrix"
                :text_color="text_color"
                :font_size_min="font_size_min"
                :font_size_max="font_size_max"
                :blur_max="blur_max"
                :padding_x="padding_x"
                :padding_y="padding_y"
            />
        </div>
    </div>
</template>


<script>
import SphereItem from "@/components/SphereItem.vue";

export default {
    props: {
        items_list: {
            type: Array,
            required: true
        },
        radius: {
            type: Number,
            default: 12
        },
        text_color: {
            type: String,
            default: '#00FFEA'
        },
        font_size_max: {
            type: Number,
            default: 2
        },
        blur_max: {
            type: Number,
            default: 0.1
        },
        update_interval: {
            type: Number,
            default: 15 // milliseconds
        },
        extra_padding: {
            type: Number,
            default: 2
        }
    },
    components: {
        SphereItem
    },
    data() {
        return {
            active: false,
            timer: undefined,
            timer_slow: undefined,
            rotation_matrix: undefined,

            // Input coords
            mouse_x: 0,
            mouse_y: 0,

            padding_x: undefined,
            padding_y: undefined,
            font_size_min: undefined,

            // Center coord of the area
            center_x: undefined,
            center_y: undefined,

            speed_max: 1,  // degrees (avoid touching this, it's better to change the interval for speed)
            speed: 0,
            slowing_factor: 50,  // change this one at will

            autonomous_move: undefined,
            bounding_box: undefined
        };
    },

    beforeMount(){
        this.rotation_matrix = this.get_euler_matrix(0, 0, 0);  // Initialize Euler matrix
        this.estimate_padding();
        this.font_size_min = this.font_size_max / 2;
    },
    mounted(){
    },

    methods:{
        to_radians(degrees){
            return degrees * (Math.PI/180.0);
        },
        to_degrees(radians){
            return radians * (180.0/Math.PI);
        },

        get_euler_matrix(rot_x, rot_y, rot_z){
            // Roll: X - Pitch: Y - Yaw: Z
            // Each rotation means around said axis
            rot_x = this.to_radians(rot_x);
            rot_y = this.to_radians(rot_y);
            rot_z = this.to_radians(rot_z);

            var cosa = Math.cos(rot_z);
            var sina = Math.sin(rot_z);

            var cosb = Math.cos(rot_y);
            var sinb = Math.sin(rot_y);

            var cosc = Math.cos(rot_x);
            var sinc = Math.sin(rot_x);

            var Axx = cosa*cosb;
            var Axy = cosa*sinb*sinc - sina*cosc;
            var Axz = cosa*sinb*cosc + sina*sinc;

            var Ayx = sina*cosb;
            var Ayy = sina*sinb*sinc + cosa*cosc;
            var Ayz = sina*sinb*cosc - cosa*sinc;

            var Azx = -sinb;
            var Azy = cosb*sinc;
            var Azz = cosb*cosc;

            return [
                [Axx, Axy, Axz],
                [Ayx, Ayy, Azy],
                [Azx, Azy, Azz]
            ]

        },

        start_roll(event){
            this.autonomous_move = false;
            this.active = true;
            this.mouse_x = event.clientX;
            this.mouse_y = event.clientY;

            // Get coord of element (in pixels)
            this.bounding_box = document.getElementById("sphere").getBoundingClientRect();
            this.center_x = this.bounding_box.left + this.bounding_box.width / 2;
            this.center_y = this.bounding_box.top + this.bounding_box.height / 2;

            this.speed = this.speed_max;
            var ref = this;  // IMPORTANT to avoid mismatch with "this"
            clearInterval(this.timer);
            clearInterval(this.timer_slow);
            this.timer = setInterval( function() { 
                ref.sphere_roll();
            }, this.update_interval);
        },

        end_roll(){
            this.active = false;
            clearInterval(this.timer);

            // Slow the movement until zero
            var slowing = this.speed / this.slowing_factor;
            var ref = this;
            this.timer_slow = setInterval( function() { 
                ref.speed -= slowing;
                if ( ref.speed <= 0){clearInterval(ref.timer_slow); ref.speed = 0;}
                ref.sphere_roll();
            }, this.update_interval);
        },

        update_roll(event) {
            if (this.active) {
                this.mouse_x = event.clientX;
                this.mouse_y = event.clientY;
            }
        },
        sphere_roll(){
            // AXIS DIRECTIONS: Z: up - Y: right - X towards user
            // Rotations: around Z: left-right - around Y: up-down

            var move = this.get_sphere_movement();
            this.rotation_matrix = this.get_euler_matrix(0, move[1], move[0]);
        },
        get_sphere_movement(){
            return [
                this.get_speed(this.bounding_box.left, this.bounding_box.width, this.mouse_x),
                (-1)*this.get_speed(this.bounding_box.top, this.bounding_box.height, this.mouse_y)
            ];
        },
        get_speed(coord_start, size, mouse){
            // More or less fast depending on how far from the center
            return 2*(this.speed / size) * (mouse - coord_start - (size/2));
        },

        get_area_width(){
            // return this.radius * 2 + 3.5 * this.font_size_max + 2 * this.padding;
            return 2 * (this.radius + this.padding_x);
        },
        get_area_height(){
            return 2 * (this.radius + this.padding_y);
        },

        // A very optional method, to move the sphere autonomously before the user does it manually
        start_autonomous_move(){
            if (typeof this.autonomous_move == 'undefined'){
                this.autonomous_move = true;

                this.bounding_box = document.getElementById("sphere").getBoundingClientRect();
                this.center_x = this.bounding_box.left + this.bounding_box.width / 2;
                this.center_y = this.bounding_box.top + this.bounding_box.height / 2;

                this.mouse_x = this.bounding_box.left;
                this.mouse_y = this.bounding_box.top + this.bounding_box.height*(3/4);

                this.speed = this.speed_max/4;
                var ref = this;  // IMPORTANT to avoid mismatch with "this"
                this.timer = setInterval( function() { 
                    ref.sphere_roll();
                }, this.update_interval);

            }
        },

        estimate_padding(axe_x){
            // According to my calculations: 
            // Text width (approx) = Len * fontsize * 0.4 (rem)
            // Text height = 2 * fontsize (rem)

            this.padding_y =(this.extra_padding + 2 * this.font_size_max);

            var max = this.items_list[0];
            for (let i = 1; i < this.items_list.length; i++){
                if (max.length < this.items_list[i].length){
                    max = this.items_list[i];
                }
            }

            this.padding_x = this.extra_padding + (max.length * this.font_size_max * 0.4)/2;
        }
    },
}
</script>

<style scoped>

</style>
