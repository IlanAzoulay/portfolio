<template>
    <div class="bg-gray_moi min-h-screen">

        <!-- <div class="pr-5">
            <img src="..\static\icons\Icon_UK_flag.png" v-if="english === true" @click="change_language" class="flag">
            <img src="..\static\icons\Icon_France_flag.png" v-else @click="change_language" class="flag">
        </div> -->
        <div class="flex flex-row space-x-4 justify-center py-8">
            <!-- <element v-bind:class = "(condition)?'class_if_is_true':'else_class'"></element> -->
            <img src="https://raw.githubusercontent.com/IlanAzoulay/portfolio/master/static/icons/Icon_UK_flag.png" class="flag" v-bind:class="english?'flag-selected':'flag-unselected'"
                @click="english = true">
            <img src="https://raw.githubusercontent.com/IlanAzoulay/portfolio/master/static/icons/Icon_France_flag.png" class="flag" v-bind:class="!english?'flag-selected':'flag-unselected'"
                @click="english = false">
        </div>

    </div>
</template>

<script>

export default {
    data() {
        return {
            english: true,
            src_UK: "..\static\icons\Icon_UK_flag.png",
            src_FR: "..\static\icons\Icon_France_flag.png",
            // Bizarrement, ca marche pas pour les fichiers locaux, mais marche avec des URL...
        };
    },
    methods:{  /* Definir les fonctions */

        change_language(){
            this.english = !this.english;
        }
    }
}
</script>


<style scoped>
    .flag {
        @apply cursor-pointer w-12;
        /* position: absolute; */
        top: 2vh;
        right: 2vw;
        transition: all 0.5s;
    }
    .flag-selected {
        @apply opacity-100;
        box-shadow: 0 0 0.25vw white; /* Glow */
    }
    .flag-unselected {
        @apply opacity-25;
        box-shadow: none; /* Glow */
    }
</style>


