<template>
    <div class="bg-gray_moi min-h-screen">
        <div class="px-14 py-10">
            <h1>
                MY FILM & MUSIC PORTOFOLIO
            </h1>
            <p class="py-4">
                What the fuck did you just fucking say about me you little bitch?
                I'll have you know I graduated top of my class in the Navy Seals and I have over 300 confirmed kills
            </p>

            <div class="grid-thumbnails">
                <div v-for='(mini, index) in thumbnails.miniatures' :key='index'>
                    <div>
                        <img v-bind:src="thumbnails.source_thumbnails + mini.filename + '.png'" class="thumbnail">
                        <h2>{{mini.title}} <em class="opacity-80">({{mini.year}})</em></h2>
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
        @apply text-white text-opacity-100 mx-auto w-full px-0 py-2;
        font-family: Arial;
        font-size: 1vw;
        /* display: inline-block; */
        text-align: center;
        /* font-weight: bold; */
    }
    p{
        @apply text-white text-opacity-80;
        font-family: Arial;
        font-size: 1.25vw;
    }
    .grid-thumbnails {
        @apply w-full h-full;
        @apply grid grid-cols-4 grid-rows-2 py-10 gap-y-6 gap-x-4;
        padding-right: 10vw;
    }
    .thumbnail {
        @apply bg-gray_moi-light m-auto;
        box-shadow: 0 0 0.25vw white;
        height: 90%;
        transition: all 0.5s;
    }
    .thumbnail:hover {
        height: 100%;
        box-shadow: 0 0 1vw cyan;
    }
</style>
