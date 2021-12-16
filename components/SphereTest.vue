<template>
    <div class="bg-gray_moi min-h-screen">
        <h1 class="pl-6">TEST</h1>
        <div class="bouton left-2">
            LEFT
        </div>
        <div class="bouton right-2" id="bouton_r" @click="test_clic">
            RIGHT
        </div>
        <!-- Le positionnement RELATIVE permet aux objets enfant de se positionner de maniere relative -->
        <!-- <div class="relative p-16" id="sphere"> -->
        <div class="w-screen h-screen" id="sphere">
            <SphereItem
                v-for='(item, index) in list' :key='index'
                :text="item"
                :input_x="move_x"
                 />
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
            move_x: 0,
            move_y: 0,
            size: {
                'x': 14,
                'y': 14
            },
            list: ['10', '20']
        };
    },

    beforeMount() {
        // document.getElementById("bouton_r").addEventListener("click", this.test_clic);
    },

    computed:{

    },

    methods:{
        test_clic(){
            this.move_x += 10;
            // document.getElementById("sphere").$forceUpdate();
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
        @apply cursor-pointer text-white;
        font-family: Arial;
    }
</style>
