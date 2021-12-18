<template>
    <div class="pl-6 bg-gray_moi min-h-screen">
        <h1 class="">TEST</h1>
        <!-- Le positionnement RELATIVE permet aux objets enfant de se positionner de maniere relative -->
        <!-- <div class="relative w-screen h-screen bg-gray_moi-light" id="sphere"> -->
        <div class="relative bg-gray_moi-light" id="sphere" @mouseenter="start_roll" @mousemove="update_roll" @mouseleave="end_roll"
            :style="`width: ${radius*2}vw; height: ${radius*2}vw;`">
            <SphereItem
                class="absolute top-0 left-0"
                v-for='(item, index) in list' :key='index'
                :text="item"
                :index="index"
                :number_items="list.length"
                :radius="radius"
                :rotation_matrix="rotation_matrix"
                 />
        </div>
    </div>
</template>


<script>
import SphereItem from "@/components/SphereItem.vue";
import data from '~/static/data/data.json'

export default {
    components: {
        SphereItem
    },
    data() {
        return {
            active: false,
            timer: undefined,
            interval: 10,  // milliseconds
            radius: 12,
            rotation_matrix: undefined,
            // list: ['10', '20', '30', '40', '50', '60', '70', '80', '90'],
            list: data.sphere_items,
            mouse_x: 0,
            mouse_y: 0,
            center_x: undefined,
            center_y: undefined,
            vitesse_max: 1 // degrees
        };
    },

    beforeMount(){
        this.rotation_matrix = this.get_euler_matrix(0, 0, 0);  // Initialize Euler matrix
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

            var ref = this;  // IMPORTANT pour eviter un mismatch de "this"
            this.timer = setInterval( function() { 
                ref.sphere_roll(composant.left, composant.top, composant.width, composant.height);
            }, this.interval);
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
            // Directions des AXES: Z vers le haut - Y vers la droite - X vers nous
            // Rotations: Autour de Z pour gauche-droite - Autour de Y pour haut-bas

            var move = this.get_sphere_movement(left, top, width, height)

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
            return 2*(this.vitesse_max / size) * (mouse - coord_start - (size/2));
        }
    },

}
</script>


<style scoped>
    h1 {
        @apply text-cyan;
        font-family: Arial;
        font-size: 2vw;
    }
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
