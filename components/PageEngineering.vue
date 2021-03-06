<template>
    <div class="min-h-screen py-8 sm:py-2 pb-8">

        <h1>
            MY ENGINEERING PORTFOLIO
        </h1>

        <div class="flex flex-col sm:grid sm:grid-cols-3 sm:grid-rows-3 sm:gap-y-1" id="engineering_grid">
            <!-- textes -->
            <div class="textbox">
                <div class="pt-4 pb-2 text-justify">
                    <h2>Most of my professional experience can be summed up by this one sentence:</h2>
                    <h2><em>"This is what we're trying to do. Ilan, find how to do it"</em>.</h2>
                    <h2>
                    With a clear goal in mind, I work relentlessly, autonomously adapt to new technologies, and always reach the desired destination.
                    </h2>
                    <br>
                    <h2>
                    I have created mathematic algorithms to solve financial statements at SAP. Designed a database software for the Ministry of the Armed Forces,
                    Built a program to randomly generate photorealistic CGI to train an AI. 
                    Oversaw the entire development of a semi-autonomous robot arm for wheelchairs.
                    Created a 3D simulation to stabilize a satellite. And many more.
                    </h2>

                    <br>

                    <h2 class="text-center pb-1 sm:text-justify text-lg">
                        <b class="text-cyan">
                            Main skills:
                        </b>
                    </h2>

                    <div class="flex flex-row space-x-6">
                        <!-- Colonne 1 -->
                        <ul class="skills_list">
                            <li v-for='(skill, index) in skills' :key='index'>
                                <div class="font-bold">
                                    {{skill.title}}
                                </div>
                                <div v-show="mobile" class="font-normal">
                                    {{skill.content}}
                                </div>
                            </li>
                        </ul>
                        <!-- Colonne 2 -->
                        <ul v-show="!mobile" class="skills_list font-normal">
                            <li v-for='(skill, index) in skills' :key='index'>
                                {{skill.content}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- photos a droite -->
            <div v-show="!mobile" class="pics-right">
                <div class="grid_right">
                    <div v-for='(pic, index) in pics_data.right' :key='index' class="picture_superbox">
                        <div class="picture_box">
                            <img v-bind:src="pics_data.source_pics + pic.filename + '.png'" class="picture">
                            <div>
                                <h3>{{pic.description}}</h3>
                                <h3><em>{{pic.env}}</em></h3>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>

            <!-- photos en bas -->
            <div v-show="!mobile" class="pics-bottom">
                <div class="grid_bottom">
                    <div v-for='(pic, index) in pics_data.bottom' :key='index' class="picture_superbox">
                        <div class="picture_box">
                            <img v-bind:src="pics_data.source_pics + pic.filename + '.png'" class="picture">
                            <div>
                                <h3>{{pic.description}}</h3>
                                <h3><em>{{pic.env}}</em></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- photos pour mobile -->
            <div v-show="mobile" class="grid grid-cols-2 gap-y-2 pt-4">
                <div v-for='(pic, index) in pics_all' :key='index'>
                    <img v-bind:src="pics_data.source_pics + pic.filename + '.png'" class="picture">
                    <div>
                        <h3>{{pic.description}}</h3>
                        <h3><em>{{pic.env}}</em></h3>
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
            pics_data: data.presentation_pics,
            pics_all: [],
            skills: data.skills,
            cols_pc: 3,
            offset_pc: 5
        };
    },

    mounted() {
        let root = document.documentElement;
        root.style.setProperty('--pic-size', this.get_superbox_size());
        root.style.setProperty('--pic-grow', 0.2);
        root.style.setProperty('--transition-time', 0.5);

        if (this.mobile){
            this.fill_pics_array();
        }
    },

    methods: {
        get_superbox_size(){
            var composant = document.getElementById("engineering_grid").getBoundingClientRect();
            if (!this.mobile){
                return (this.convert_px_to_vw(composant.width) / this.cols_pc) - this.offset_pc;
            } else {
                return this.convert_px_to_vw(composant.width);
            }
        },
        convert_px_to_vw(px) {
            return px * (100 / document.documentElement.clientWidth);
        },
        fill_pics_array(){
            for (let index = 0; index < this.pics_data.right.length; ++index){
                this.pics_all.push(this.pics_data.right[index]);
            }
            for (let index = 0; index < this.pics_data.bottom.length; ++index){
                this.pics_all.push(this.pics_data.bottom[index]);
            }
        }
    }
}
</script>

<style scoped>
    h2 {
        @apply text-white text-opacity-80 text-base;
        font-family: Arial;
        /* text-align: justify; */
    }
    .textbox {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 3;
    }
    .pics-right {
        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 3;
    }
    .grid_right {
        @apply content-center gap-y-2;
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        grid-template-rows: repeat(2, minmax(0, 1fr));
        height: 100%;
        width: 100%;
    }
    .grid_bottom {
        @apply content-center gap-x-2;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: repeat(1, minmax(0, 1fr));
        height: 100%;
        width: 100%;
    }
    .pics-bottom {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 3;
        grid-row-end: 4;
    }
    .picture_superbox{
        @apply top-0 mx-auto;
        width: calc(var(--pic-size) * 1vw);
        height: calc(var(--pic-size) * 1vh);
    }
    .picture_box{
        @apply mx-auto relative top-0;
        width: calc((1 - var(--pic-grow)) * 100%);
        height: calc((1 - var(--pic-grow)) * 100%);
        transition: all calc(var(--transition-time) * 1s);
    }
    .picture_box:hover {
        @apply mx-auto top-0;
        width: 100%;
        height: 100%;
    }
    .picture {
        @apply mx-auto my-auto;
        transition: all 0.5s;
    }
    h3 {
        @apply text-white text-opacity-75 text-center text-sm px-0;
        font-family: Arial;
        transition: all calc(var(--transition-time) * 1s);
    }
    .picture_box:hover h3 {
        padding-left: calc(var(--pic-size) * (var(--pic-grow)/2) * 1vw);
        padding-right: calc(var(--pic-size) * (var(--pic-grow)/2) * 1vw);
    }
    .skills_list {
        @apply text-white text-opacity-80 text-base;
        @apply space-y-1 text-center sm:text-left;
        font-family: Arial;
    }
</style>
