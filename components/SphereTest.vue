<template>
    <div class="pl-6 bg-gray_moi min-h-screen">
        <h1 class="">TEST</h1>
        <div class="bouton" @click="move_left">
            LEFT
        </div>
        <div class="bouton" id="bouton_r" @click="move_right">
            RIGHT
        </div>
        <div class="bouton" id="bouton_r" @click="move_front">
            FRONT
        </div>
        <div class="bouton" id="bouton_r" @click="move_back">
            BACK
        </div>
        <!-- Le positionnement RELATIVE permet aux objets enfant de se positionner de maniere relative -->
        <!-- <div class="relative p-16" id="sphere"> -->
        <div class="relative w-screen h-screen bg-gray_moi-light" id="sphere">
            <SphereItem
                class="absolute top-0 left-0"
                v-for='(item, index) in list' :key='index'
                :text="item"
                :index="index"
                :number_items="list.length"
                :radius="radius"
                :rotation_matrix="rotation_matrix"
                 />
            <!-- <span class="absolute dot"></span> -->
        </div>
    </div>
</template>


<script>
import SphereItem from "@/components/SphereItem.vue";

export default {
    components: {
        SphereItem
    },
    data() {
        return {
            radius: 10,
            rotation_matrix: undefined,
            list: ['10', '20', '30', '40', '50', '60', '70', '80', '90']
        };
    },

    beforeMount(){
        this.rotation_matrix = this.get_euler_matrix(0, 0, 0);
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
        move_left(){
            this.rotation_matrix = this.get_euler_matrix(0, 0, -10);
        },
        move_right(){
            this.rotation_matrix = this.get_euler_matrix(0, 0, 10);
        },
        move_front(){
            this.rotation_matrix = this.get_euler_matrix(0, 10, 0);
        },
        move_back(){
            this.rotation_matrix = this.get_euler_matrix(0, -10, 0);
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
    .dot {
        @apply bg-gray_moi-alt opacity-25;
        height: 20vw;
        width: 20vw;
        border-radius: 50%;
        display: inline-block;
    }
</style>
