<template>
    <div class="page-engineering-parent">

        <h1>
            MY ENGINEERING PORTFOLIO
        </h1>

        <div class="page-engineering" id="engineering_grid">
            <!-- textes -->
            <div class="textbox">
                <div class="pt-4 pb-2 text-justify">
                    <h2>
                        I have started my engineering journey with a master's degree in software programming.
                        As a 3D artist, I have also applied these skills to 3D applications
                    </h2>
                    <br>
                    <h2>
                        Since graduating, I have worked on projects including mathematical algorithms, database, 3D development,
                        front-end UIs, back-end development, and blockchain.
                    </h2>
                    <br>
                    <h2>
                        This diversity of projects illustrates my signature ability to quickly learn new technologies and
                        adapt to new environments.
                    </h2>
                    <br>
                    <h2>
                        If you are hesitating whether I could fit within your project, hesitate no more!
                    </h2>

                    <br>

                    <h2 class="text-center pb-1 sm:text-justify text-lg">
                        <b class="text-cyan">
                            Main skills:
                        </b>
                    </h2>

                    <div class="flex flex-row space-x-6">
                        <!-- Colonne 1 -->
                        <ul class="skills-list">
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
                        <ul v-show="!mobile" class="skills-list font-normal">
                            <li v-for='(skill, index) in skills' :key='index'>
                                {{skill.content}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- photos a droite -->
            <div v-show="!mobile" class="pics-right">
                <div class="grid-right">
                    <div v-for='(pic, index) in picsData.right' :key='index' class="picture-superbox">
                        <div class="picture-box">
                            <img v-bind:src="picsData.sourcePics + pic.filename + '.png'" class="picture">
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
                <div class="grid-bottom">
                    <div v-for='(pic, index) in picsData.bottom' :key='index' class="picture-superbox">
                        <div class="picture-box">
                            <img v-bind:src="picsData.sourcePics + pic.filename + '.png'" class="picture">
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
                <div v-for='(pic, index) in picsAll' :key='index'>
                    <img v-bind:src="picsData.sourcePics + pic.filename + '.png'" class="picture">
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
            picsData: data.presentationPics,
            picsAll: [],
            skills: data.skills,
            colsPC: 3,
            offsetPC: 5
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
                return (this.convert_px_to_vw(composant.width) / this.colsPC) - this.offsetPC;
            } else {
                return this.convert_px_to_vw(composant.width);
            }
        },
        convert_px_to_vw(px) {
            return px * (100 / document.documentElement.clientWidth);
        },
        fill_pics_array(){
            for (let index = 0; index < this.picsData.right.length; ++index){
                this.picsAll.push(this.picsData.right[index]);
            }
            for (let index = 0; index < this.picsData.bottom.length; ++index){
                this.picsAll.push(this.picsData.bottom[index]);
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
    .page-engineering-parent {
        @apply min-h-screen py-8 sm:py-2 pb-8;
    }
    .page-engineering {
        @apply flex flex-col sm:grid sm:grid-cols-3 sm:grid-rows-3 sm:gap-y-1;
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
    .grid-right {
        @apply content-center gap-y-2;
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        grid-template-rows: repeat(2, minmax(0, 1fr));
        height: 100%;
        width: 100%;
    }
    .grid-bottom {
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
    .picture-superbox{
        @apply top-0 mx-auto;
        width: calc(var(--pic-size) * 1vw);
        height: calc(var(--pic-size) * 1vh);
    }
    .picture-box{
        @apply mx-auto relative top-0;
        width: calc((1 - var(--pic-grow)) * 100%);
        height: calc((1 - var(--pic-grow)) * 100%);
        transition: all calc(var(--transition-time) * 1s);
    }
    .picture-box:hover {
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
    .picture-box:hover h3 {
        padding-left: calc(var(--pic-size) * (var(--pic-grow)/2) * 1vw);
        padding-right: calc(var(--pic-size) * (var(--pic-grow)/2) * 1vw);
    }
    .skills-list {
        @apply text-white text-opacity-80 text-base;
        @apply space-y-1 text-center sm:text-left;
        font-family: Arial;
    }
</style>
