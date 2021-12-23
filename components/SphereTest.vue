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
                :padding="padding"
            />
        </div>
    </div>
</template>


<script>
import SphereItem from "@/components/SphereItem.vue";
// import data from '~/static/data/data.json'

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
        }
    },
    components: {
        SphereItem
    },
    data() {
        return {
            active: false,
            timer: undefined,
            rotation_matrix: undefined,

            // Input coords
            mouse_x: 0,
            mouse_y: 0,

            padding: undefined,
            font_size_min: undefined,

            // Center coord of the area
            center_x: undefined,
            center_y: undefined,

            speed_max: 1, // degrees (avoid touching this, it's better to change the interval for speed)
        };
    },

    beforeMount(){
        this.rotation_matrix = this.get_euler_matrix(0, 0, 0);  // Initialize Euler matrix
        this.padding = this.radius / 5;
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
            this.active = true;
            this.mouse_x = event.clientX;
            this.mouse_y = event.clientY;

            // Get coord of element (in pixels)
            var composant = document.getElementById("sphere").getBoundingClientRect();
            this.center_x = composant.left + composant.width / 2;
            this.center_y = composant.top + composant.height / 2;

            var ref = this;  // IMPORTANT to avoid mismatch with "this"
            this.timer = setInterval( function() { 
                ref.sphere_roll(composant.left, composant.top, composant.width, composant.height);
            }, this.update_interval);
        },
        end_roll(){
            this.active = false;
            clearInterval(this.timer);
        },
        update_roll(event) {
            if (this.active) {
                this.mouse_x = event.clientX;
                this.mouse_y = event.clientY;
            }
        },
        sphere_roll(left, top, width, height){
            // AXIS DIRECTIONS: Z: up - Y: right - X towards user
            // Rotations: around Z: left-right - around Y: up-down

            var move = this.get_sphere_movement(left, top, width, height);
            this.rotation_matrix = this.get_euler_matrix(0, move[1], move[0]);
        },
        get_sphere_movement(left, top, width, height){
            return [
                this.get_speed(left, width, this.mouse_x),
                (-1)*this.get_speed(top, height, this.mouse_y)
            ];
        },
        get_speed(coord_start, size, mouse){
            // More or less fast depending on how far from the center
            return 2*(this.speed_max / size) * (mouse - coord_start - (size/2));
        },

        get_area_width(){
            return this.radius * 2 + 3.5 * this.font_size_max + 2 * this.padding;
        },
        get_area_height(){
            return this.radius * 2 + this.font_size_max + 2 * this.padding;
        }
        // setTimeOut ? -> to look up
    },

}
</script>


<style scoped>
    .sphere_item {
        @apply text-cyan;
        font-family: Arial;
        font-size: var(--sphere-item-size);
    }
    .bouton {
        @apply cursor-pointer text-white py-2;
        font-family: Arial;
    }
</style>
