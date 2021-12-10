<template>
    <div class="bg-gray_moi min-h-screen pl-8">
        <h1 class="pb-2 pt-6">
            MY PROJECT HISTORY
        </h1>
        <p>
            Below is a list of the most important personal, academic, and professional engineering projects I have worked on
        </p>
        <div class="grid-logos">
            <div v-for='(projet, index) in list_logos' :key='index'>
                <img v-bind:src="source_logos + projet.source + '.png'" class="logo">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            source_logos: "https://raw.githubusercontent.com/IlanAzoulay/portfolio/master/static/logos/",
            list_logos: [
                {source: "Logo_AssistArm"},
                {source: "Logo_ECE3SAT"},
                {source: "Logo_SAP"},
                {source: "Logo_DGA"},
                {source: "Logo_Naval"},
                {source: "Logo_DasAv"},
                {source: "Logo_Walletvote"}
            ]
        };
    },

    methods:{

    }
}
</script>

<style scoped>
    h1 {
        @apply text-cyan;
        font-family: Arial;
        font-size: 2.5vw;
        font-weight: bold;
    }
    p {
        @apply text-white text-opacity-80;
        font-family: Arial;
        font-size: 1.25vw;
    }
    .grid-logos {
        @apply grid grid-cols-4 grid-rows-2 p-10 gap-y-6 gap-x-2;
        padding-right: 16vw;
    }
    .logo {
        @apply bg-gray_moi-light p-2 m-auto;
        box-shadow: 0 0 0.25vw white;
        height: 90%;
        transition: all 0.5s;
    }
    .logo:hover {
        height: 100%;
        box-shadow: 0 0 1vw cyan;
    }
</style>
