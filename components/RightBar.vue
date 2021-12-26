<template>
    <div class="relative min-h-screen">

        <div class="flex flex-row space-x-4 justify-center pt-8 pb-2">
            <img src="https://raw.githubusercontent.com/IlanAzoulay/portfolio/master/static/icons/Icon_UK_flag.png" class="flag" 
                v-bind:class="english?'flag-selected':'flag-unselected'"
                @click="english = true">
            <img src="https://raw.githubusercontent.com/IlanAzoulay/portfolio/master/static/icons/Icon_France_flag.png" class="flag" 
                v-bind:class="!english?'flag-selected':'flag-unselected'"
                @click="english = false">
        </div>

        <h2 v-show="!english" class="absolute mx-auto text-center w-full">
            VF pas encore disponible
        </h2>

    </div>
</template>

<script>

export default {
    data() {
        return {
            english: true
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
    h2 {
        @apply text-white opacity-50 text-center text-sm;
    }
    .flag {
        @apply cursor-pointer w-12 top-2 right-2;
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


