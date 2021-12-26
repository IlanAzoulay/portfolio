<template>
    <div class="min-h-screen pb-8">
        <div>
            <h1>
                MY FILM &amp; MUSIC PORTOFOLIO
            </h1>
            <p class="pt-1">
                I have spent most of my free time over the past few years expressing my creativity through animated short films and music videos.
            </p>
            <p>
                Below is a list of my most important works.
            </p>
            <p class="pt-1">
                <em>{{instruction_sentence}}</em>
            </p>

            <div class="grid-thumbnails">
                <div v-for='(mini, index) in thumbnails.miniatures' :key='index'>

                    <div v-if="!mobile" class="superbox">
                        <div class="box">
                            <a :href="`${mini.link}`" target="_blank" rel="noopener noreferrer">
                                <img v-bind:src="thumbnails.source_thumbnails + mini.filename + '.png'" class="thumbnail">
                                <h2>{{mini.title}}</h2>
                                <h2><em class="opacity-80">({{mini.year}})</em></h2>
                                <div class="video_details">
                                    {{mini.description}}
                                </div>
                            </a>
                        </div>
                    </div>

                    <div v-else class="w-full grid grid-cols-3 pt-2 gap-x-2 items-start">
                        <a :href="`${mini.link}`" target="_blank" rel="noopener noreferrer" class="col-span-1">
                            <img v-bind:src="thumbnails.source_thumbnails + mini.filename + '.png'" class="thumbnail ml-0 my-auto"
                                style="box-shadow: 0 0 1vw white;">
                        </a>
                        <div class="col-span-2">
                            <h3><b>{{mini.title}}</b></h3>
                            <h3><em class="opacity-80">({{mini.year}})</em></h3>
                            <h3 class="opacity-80">{{mini.description}}</h3>
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
    props: {
        mobile: Boolean
    },
    data() {
        return {
            thumbnails: data.filmography,
            cols_pc: 4,
            pic_size_mobile: undefined,
            instruction_sentence: '(Hover for details, click to go to video)'
        };
    },

    mounted() {
        let root = document.documentElement;
        root.style.setProperty('--thumbnail-size', this.get_superbox_size());
        root.style.setProperty('--thumbnail-grow', 0.1);
        root.style.setProperty('--transition-time', 0.5);

        if (this.mobile){
            this.instruction_sentence = '(click on thumbnails to go to video)'
        }
    },

    methods: {
        get_superbox_size(){
            var composant = document.getElementById("project_grid").getBoundingClientRect();
            if (!this.mobile){
                return this.convert_px_to_vw(composant.width) / this.cols_pc;
            } else {
                this.pic_size_mobile = this.convert_px_to_vw(composant.width) / 3
                return this.pic_size_mobile;
            }
        },
        convert_px_to_vw(px) {
            return px * (100 / document.documentElement.clientWidth);
        }
    }
}
</script>

<style scoped>
    h2 {
        @apply text-white text-opacity-100 text-base mx-auto w-full;
        font-family: Arial;
        text-align: center;
    }
    p{
        @apply text-white text-opacity-80 text-base;
        font-family: Arial;
    }
    h3 {
        @apply text-white text-left text-sm;
        font-family: Arial; 
    }
    .grid-thumbnails {
        @apply w-full h-full pt-2;
        @apply flex flex-col gap-y-4;
        @apply sm:grid sm:grid-cols-4 sm:grid-rows-2 sm:pr-4 sm:gap-y-16;
    }
    .superbox {
        @apply mx-auto my-auto;
        width: calc(var(--thumbnail-size) * 1vw);
        height: calc((720/1280) * (var(--thumbnail-size)) * 1vw);
    }
    .box {
        @apply mx-auto;
        @apply bg-gray_moi-light m-auto;
        @apply text-opacity-0 text-white;
        box-shadow: 0 0 0.25vw white;
        width: calc((1 - var(--thumbnail-grow)) * 100%);
        height: calc((1 - var(--thumbnail-grow)) * 100%);
        position: relative;
        top: calc(var(--thumbnail-grow) * 50%);
        transition: all calc(var(--transition-time) * 1s);
    }
    .box:hover {
        @apply text-opacity-100 top-0;
        width: 100%;
        height: 100%;
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
        @apply text-white text-center text-base;
        @apply opacity-0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: Arial;
        /* font-size: 1vw; */
        width: calc(var(--thumbnail-size) * (1 - var(--thumbnail-grow)) * 1vw);
        transition: all calc(var(--transition-time) * 1s);
    }
    .box:hover .video_details {
        @apply opacity-100;
    }
</style>
