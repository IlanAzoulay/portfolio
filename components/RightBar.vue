<template>
    <div class="min-h-screen">

        <div class="flex flex-row space-x-4 justify-center py-8">
            <img src="https://raw.githubusercontent.com/IlanAzoulay/portfolio/master/static/icons/Icon_UK_flag.png" class="flag" 
                v-bind:class="english?'flag-selected':'flag-unselected'"
                @click="english = true">
            <img src="https://raw.githubusercontent.com/IlanAzoulay/portfolio/master/static/icons/Icon_France_flag.png" class="flag" 
                v-bind:class="!english?'flag-selected':'flag-unselected'"
                @click="english = false">
        </div>

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
    .flag {
        @apply cursor-pointer w-12 top-2 right-2;
        /* top: 2vh;
        right: 2vw; */
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


