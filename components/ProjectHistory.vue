<template>
    <div class="min-h-screen py-8">
        <h1 class="pb-2 pt-6">
            MY PROJECT HISTORY
        </h1>
        <p>
            Below is a list of the most important personal, academic, and professional engineering projects I have worked on
            <br><em>(hover for details)</em>
        </p>
        <div class="grid-logos">
            <div v-for='(logo, index) in projets.list_logos' :key='index'>

                <div class="logo_superbox">

                    <div class="logo_box">

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
    props: {
        mobile: Boolean,
        pad: Number,
        size_bigger_grid: Number
    },
    data() {
        return {
            projets: data.projets,
            selected: undefined,
            cols_pc: 4,
            box_grow: 0.1,
            superbox_size: undefined,
            box_size: undefined
        };
    },

    beforeMount() {
        let root = document.documentElement;

        // root.style.setProperty('--box-size', this.get_superbox_size());
        root.style.setProperty('--box-size', 100);
        root.style.setProperty('--box-grow', this.box_grow);
        root.style.setProperty('--transition-time', 0.5);
    },

    methods:{
        get_superbox_size(){
            if (!this.mobile){
                return (100 * ((this.size_bigger_grid-1)/this.size_bigger_grid) - (2*this.pad)) / this.cols_pc;
            } else {
                return 100-(2*this.pad);
            }
        }
    }
}
</script>

<style scoped>
    p {
        @apply text-white text-opacity-80 text-base text-center sm:text-left;
        font-family: Arial;
        /* font-size: 1.25vw; */
    }
    .grid-logos {
        @apply flex flex-col sm:grid grid-cols-4 grid-rows-2 py-3 w-full gap-0 sm:gap-4;
    }

    .logo_superbox {
        @apply mx-auto;
        width: calc(var(--box-size) * 1rem);
        height: calc(var(--box-size) * 1rem);
    }
    .logo_box {
        @apply bg-gray_moi-light m-auto;
        @apply text-opacity-0 text-white;
        box-shadow: 0 0 0.25rem white;
        width: 90%;
        height: 90%;
        position: relative;
        top: calc(var(--box-grow) * 50%);
        transition: all calc(var(--transition-time) * 1s);
    }
    .logo_box:hover {
        @apply text-opacity-100;
        top: 0;
        width: 100%;
        height: 100%;
        box-shadow: 0 0 0.75rem cyan;
    }

    .logo {
        @apply m-auto opacity-100 p-2;
        transition: all calc(var(--transition-time) * 1s);
    }
    .logo_box:hover .logo {
        @apply opacity-5;
    }
    .project_details {
        @apply text-white text-center text-base;
        @apply opacity-0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: Arial;
        width: calc(var(--box-size) * (1 - var(--box-grow)) * 1rem);
        /* width: 90%; */
        transition: all calc(var(--transition-time) * 1s);
    }
    .logo_box:hover .project_details {
        @apply opacity-100;
    }
    h3 {
        @apply pt-1;
    }
    
</style>
