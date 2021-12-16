<template>
    <div class="bg-gray_moi min-h-screen">
        <!-- <div class="px-8 py-10"> -->
        <div style="padding-left:3vw; padding-top:4vh;">
            <h1>
                MY FILM & MUSIC PORTOFOLIO
            </h1>
            <p style="padding-top:2vh;">
                I have spent most of my free time over the past few years expressing my creativity through animated short films and music videos.
                <br>Below is a list of my most important works.
            </p>
            <p style="padding-top:2vh;">
                <em>(Hover for details, click to go to video)</em>
            </p>

            <div class="grid-thumbnails">
                <div v-for='(mini, index) in thumbnails.miniatures' :key='index'>
                    <div class="superbox">
                        <div class="box">
                            <a :href="`${mini.link}`" target="_blank" rel="noopener noreferrer">
                                <img v-bind:src="thumbnails.source_thumbnails + mini.filename + '.png'" class="thumbnail">
                                <h2>{{mini.title}} <em class="opacity-80"><br>({{mini.year}})</em></h2>
                                <div class="video_details">
                                    {{mini.description}}
                                </div>
                            </a>
                        </div>
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
            thumbnails: data.filmography
        };
    },

    beforeMount() {
        let root = document.documentElement;
        root.style.setProperty('--box-size', 18);
        root.style.setProperty('--box-grow', 0.1);
        root.style.setProperty('--transition-time', 0.5);
    },

    methods: {
    }
}
</script>

<style scoped>
    h1 {
        @apply text-cyan;
        font-family: Arial;
        font-size: 2.25vw;
        font-weight: bold;
    }
    h2 {
        @apply text-white text-opacity-100 mx-auto w-full;
        font-family: Arial;
        font-size: 1vw;
        text-align: center;
        padding-top: 1.25vh;
    }
    p{
        @apply text-white text-opacity-80;
        font-family: Arial;
        font-size: 1.15vw;
    }
    .grid-thumbnails {
        @apply w-full h-full;
        @apply grid grid-cols-4 grid-rows-2;
        padding-top: 2vh;
        padding-right: 6vw;
        row-gap: 10vh;
    }
    .superbox {
        width: calc(var(--box-size) * 1vw);
        height: calc((720/1280) * (var(--box-size)) * 1vw);
    }
    .box {
        @apply bg-gray_moi-light m-auto;
        @apply text-opacity-0 text-white;
        box-shadow: 0 0 0.25vw white;
        width: calc(var(--box-size) * (1 - var(--box-grow)) * 1vw);
        height: calc((720/1280) * (var(--box-size)) * (1 - var(--box-grow)) * 1vw);
        position: relative;
        top: calc(var(--box-size) * (var(--box-grow)/2) * 1vw);
        transition: all calc(var(--transition-time) * 1s);
    }
    .box:hover {
        @apply text-opacity-100;
        top: 0vw;
        width: calc(var(--box-size) * 1vw);
        height: calc((720/1280) * (var(--box-size)) * 1vw);
        box-shadow: 0 0 1vw cyan;
    }
    .thumbnail {
        @apply bg-gray_moi-light m-auto;
        @apply opacity-100;
        transition: all 0.5s;
    }
    .box:hover .thumbnail {
        @apply opacity-5;
    }
    .video_details {
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
    .box:hover .video_details {
        @apply opacity-100;
    }
</style>
