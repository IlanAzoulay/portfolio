<template>
    <div class="min-h-screen pb-8">
        <h1 class="pb-2">
            MY PROJECT HISTORY
        </h1>
        <p>
            Below is a list of the most important personal, academic, and professional engineering projects I have worked on
        </p>
        <p>
            <em>(hover for details)</em>
        </p>
        <div class="grid-logos" id="project_grid">
            <div v-for='(logo, index) in projets.list_logos' :key='index'>

                <div class="logo_superbox" >

                    <div :class="selected === index ? 'logo_box_selected' : 'logo_box'" @click="select_project(index)">

                        <img v-bind:src="projets.source_logos + logo.filename + '.png'"
                            :alt="'../static/logos/Logo_' + logo.filename + '.png'"
                            :class="selected === index ? 'logo_selected' : 'logo'">
                        <div :class="selected === index ? 'project_details_selected' : 'project_details'">
                            <h2><b>{{logo.title}}</b></h2>
                            <h2><em>({{logo.year}})</em></h2>
                            <h3>- {{logo.post}} -</h3>
                            <h3>{{logo.description}}</h3>
                            <h3><em>({{logo.environment}})</em></h3>
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
            index: undefined,
            projets: data.projets,
            selected: undefined,
            cols_pc: 4,
            box_grow: 0.1,
            box_size: undefined
        };
    },

    mounted() {
        let root = document.documentElement;
        root.style.setProperty('--box-size', this.get_superbox_size());
        root.style.setProperty('--box-grow', this.box_grow);
        root.style.setProperty('--transition-time', 0.5);
    },

    methods:{
        get_superbox_size(){
            var composant = document.getElementById("project_grid").getBoundingClientRect();
            if (!this.mobile){
                return this.convert_px_to_vw(composant.width) / this.cols_pc;
            } else {
                return this.convert_px_to_vw(composant.width);
            }
        },
        convert_px_to_vw(px) {
            return px * (100 / document.documentElement.clientWidth);
        },
        select_project: function(index){
            // TOGGLE SELECTION
            if (this.mobile){
                if (this.selected === index){
                    this.selected = undefined;
                } else {
                    this.selected = index;
                }
            }
        }
    }
}
</script>

<style scoped>
    p {
        @apply text-white text-opacity-80 text-base text-center sm:text-left;
        font-family: Arial;
    }
    .grid-logos {
        @apply flex flex-col w-full py-3 gap-y-0 sm:gap-0;
        @apply sm:grid sm:grid-cols-4 sm:grid-rows-2
    }

    .logo_superbox {
        @apply mx-auto sm:ml-0 sm:mr-auto my-auto;
        width: calc(var(--box-size) * 1vw);
        height: calc(var(--box-size) * 1vw);
    }
    .logo_box {
        @apply bg-gray_moi-light m-auto;
        @apply text-opacity-0 text-white;
        box-shadow: 0 0 0.25rem white;
        width: calc((1 - var(--box-grow)) * 100%);
        height: calc((1 - var(--box-grow)) * 100%);
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
        width: calc(var(--box-size) * (1 - var(--box-grow)) * 1vw);
        transition: all calc(var(--transition-time) * 1s);
    }
    .logo_box:hover .project_details {
        @apply opacity-100;
    }
    h3 {
        @apply pt-1;
    }


    .logo_box_selected {
        @apply bg-gray_moi-light m-auto;
        position: relative;
        top: 0;
        width: 100%;
        height: 100%;
        box-shadow: 0 0 0.75rem cyan;
        transition: all calc(var(--transition-time) * 1s);
    }
    .project_details_selected {
        @apply text-white text-center text-base;
        @apply opacity-100;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: Arial;
        width: calc(var(--box-size) * (1 - var(--box-grow)) * 1vw);
        transition: all calc(var(--transition-time) * 1s);
    }
    .logo_selected {
        @apply m-auto opacity-5 p-2;
        transition: all calc(var(--transition-time) * 1s);
    }
    
</style>
