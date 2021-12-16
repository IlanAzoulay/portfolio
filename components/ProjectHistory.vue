<template>
    <div class="bg-gray_moi min-h-screen pl-8">
        <h1 class="pb-2 pt-6">
            MY PROJECT HISTORY
        </h1>
        <p>
            Below is a list of the most important personal, academic, and professional engineering projects I have worked on
            <br><em>(hover for details)</em>
        </p>
        <div class="grid-logos">
            <div v-for='(logo, index) in projets.list_logos' :key='index'>
                <!-- <img v-bind:src="projets.source_logos + logo.filename + '.png'" class="logo" :id="`${logo.filename}`" -->
                    <!-- :class="{highlight:logo.filename == selected}" @click="selected = logo.filename"> -->
                <div class="logo_superbox">
                    <div class="logo_box" ontouchstart="">
                        <img v-bind:src="projets.source_logos + logo.filename + '.png'" class="logo">
                        <h2 class="project_details">
                            <b>{{logo.title}}</b>
                            <br><em>({{logo.year}})</em>
                            <h3>- {{logo.post}} -</h3>
                            <h3>{{logo.description}}</h3>
                            <h3><em>({{logo.environment}})</em></h3>
                        </h2>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import data from '~/static/data/data.json'

export default {
    data() {
        return {
            projets: data.projets,
            selected: undefined
        };
    },

    beforeMount() {
        let root = document.documentElement;
        root.style.setProperty('--box-size', 17);
        root.style.setProperty('--box-grow', 0.1);
        root.style.setProperty('--transition-time', 0.5);
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
        @apply grid grid-cols-4 grid-rows-2 py-3;
        padding-right: 8vw;
        padding-left: 2vw;
        row-gap: 0vh;
        column-gap: 0vw;
    }
    .logo_superbox {
        width: calc(var(--box-size) * 1vw);
        height: calc(var(--box-size) * 1vw);
    }
    .logo_box {
        @apply bg-gray_moi-light m-auto;
        @apply text-opacity-0 text-white;
        box-shadow: 0 0 0.25vw white;
        width: calc(var(--box-size) * (1 - var(--box-grow)) * 1vw);
        height: calc(var(--box-size) * (1 - var(--box-grow)) * 1vw);
        position: relative;
        top: calc(var(--box-size) * (var(--box-grow)/2) * 1vw);
        transition: all calc(var(--transition-time) * 1s);
    }
    .logo_box:hover {
        @apply text-opacity-100;
        top: 0vw;
        width: calc(var(--box-size) * 1vw);
        height: calc(var(--box-size) * 1vw);
        box-shadow: 0 0 1vw cyan;
    }
    /* .logo.highlight {
         @apply bg-red-500;
    } */
    .logo {
        @apply m-auto opacity-100 p-2;
        transition: all calc(var(--transition-time) * 1s);
    }
    .logo_box:hover .logo {
        @apply opacity-5;
    }
    .project_details {
        @apply text-white text-center;
        @apply opacity-0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: Arial;
        font-size: 1vw;
        width: calc(var(--box-size) * (1 - var(--box-grow)) * 1vw);
        transition: all calc(var(--transition-time) * 1s);
    }
    .logo_box:hover .project_details {
        @apply opacity-100;
        /* @apply opacity-100; */
    }
    h3 {
        padding-top: 1vh;
    }
    
</style>
