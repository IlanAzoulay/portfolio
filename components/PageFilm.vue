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
                <div v-for='(mini, index) in thumbnails' :key='index'>
                    <img v-bind:src="source_thumbnails + mini.filename + '.png'" class="thumbnail">
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    data() {
        return {
            source_thumbnails: "../static/thumbnails/Thumbnail_",
            thumbnails: [
                {filename: 'Censor'},
                {filename: 'Emu'},
                {filename: 'Fman'},
                {filename: 'India'},
                {filename: 'Ancap'},
                {filename: 'HK'},
                {filename: 'Ben'},
                {filename: 'Letov'}
            ]
        };
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
        @apply text-cyan text-opacity-60;
        font-family: Arial;
        font-size: 1.25vw;
    }
    p{
        @apply text-white text-opacity-80;
        font-family: Arial;
        font-size: 1.25vw;
    }
    .grid-thumbnails {
        @apply grid grid-cols-4 grid-rows-2 p-10 gap-y-6 gap-x-2;
        padding-right: 16vw;
    }
    .thumbnail {
        @apply bg-gray_moi-light p-2 m-auto;
        box-shadow: 0 0 0.25vw white;
        height: 90%;
        transition: all 0.5s;
    }
    .thumbnail:hover {
        height: 100%;
        box-shadow: 0 0 1vw cyan;
    }
</style>
