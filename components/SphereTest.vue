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
                :input_theta="move_theta"
                :input_phi="move_phi"
                :index="index"
                :number_items="list.length"
                :radius="radius"
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
            radius: 8,
            move_theta: 0,
            move_phi: 0,
            list: ['10', '20', '30', '40', '50', '60', '70', '80', '90']
        };
    },

    methods:{
        move_left(){
            this.move_theta -= 10;
            if (this.move_theta < -360){
                this.move_theta += 360;
            }
        },
        move_right(){
            this.move_theta += 10;
            if (this.move_theta > 360){
                this.move_theta -= 360;
            }
        },
        move_front(){
            this.move_phi += 10;
            if (this.move_phi  > 360){
                this.move_phi -= 360;
            }
        },
        move_back(){
            this.move_phi -= 10;
            if (this.move_phi  < -360){
                this.move_phi += 360;
            }
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
