<template>
    <div class="bg-gray_moi min-h-screen">

        <div class="grid_big" style="padding-top:4vh; padding-left: 5vw;">

            <!-- textes -->
            <div class="textbox">
                <h1>
                    MY ENGINEERING PORTFOLIO
                </h1>
                <h2 class="pt-4">
                    Most of my professional experience can be summed up by this one sentence: 
                    <br><em>"This is what we're trying to do. Ilan, find out how to do it"</em>.<br>
                    With a clear goal in mind, I work relentlessly, autonomously adapt to new technologies, and always reach the desired destination.
                    <br><br>
                    I have created mathematic algorithms to solve financial statements at SAP. Designed a database software for the Ministry of the Armed Forces,
                    Built from the ground up a program to randomly generate photorealistic CGI to train an AI. 
                    Oversaw the entire development of a semi-autonomous robot arm for wheelchairs.
                    Created a 3D simulation to stabilize a satellite. And many more.

                    <br><br>
                    <b class="text-cyan">Main skills:</b><br>
                    <div class="flex flex-row space-x-6">
                        <!-- Colonne 1 -->
                        <ul class="font-bold space-y-1">
                            <li>Programming languages</li>
                            <li>Embedded systems</li>
                            <li>3D</li>
                            <li>Interface development</li>
                            <li>Communication protocols</li>
                            <li>Others</li>
                        </ul>
                        <!-- Colonne 2 -->
                        <ul class="space-y-0.5">
                            <li>C, C++, Python, Java, VBA, SQL, HTML/CSS/Javascript</li>
                            <li>Linux, Arduino, Microcontrollers (PIC), Raspberry Pi, STM32</li>
                            <li>Blender, Cinema 4D, Solidworks, OpenGL</li>
                            <li>Nuxt JS, Qt, java Windowbuilder</li>
                            <li>Wi-fi, Bluetooth/BLE, UART</li>
                            <li>Git, JSON, bpy</li>
                        </ul>
                    </div>

                </h2>
            </div>

            <!-- photos a droite -->
            <div  class="pics-right">
                <div class="grid_right">
                    <div v-for='(pic, index) in pics.right' :key='index' class="picture_superbox">
                        <div class="picture_box">
                            <img v-bind:src="pics.source_pics + pic.filename + '.png'" class="picture">
                            <h3>
                                {{pic.description}}
                                <br><em>{{pic.env}}</em>
                            </h3>
                        </div>
                        
                    </div>                    
                </div>
            </div>

            <!-- photos en bas -->
            <div  class="pics-bottom">
                <div class="grid_bottom">
                    <div v-for='(pic, index) in pics.bottom' :key='index' class="picture_superbox">
                        <div class="picture_box">
                            <img v-bind:src="pics.source_pics + pic.filename + '.png'" class="picture">
                            <h3>
                                {{pic.description}}
                                <br><em>{{pic.env}}</em>
                            </h3>
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
            pics: data.presentation_pics
        };
    },

    beforeMount() {
        let root = document.documentElement;
        root.style.setProperty('--box-size', 20);
        root.style.setProperty('--box-grow', 0.1);
        root.style.setProperty('--transition-time', 0.5);
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
    h2 {
        @apply text-white text-opacity-80;
        font-family: Arial;
        font-size: 1vw;
        text-align: justify;
    }
    .grid_big {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: repeat(3, minmax(0, 1fr));
        column-gap: 0px;
        row-gap: 2vh;
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
        @apply content-center;
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        grid-template-rows: repeat(2, minmax(0, 1fr));
        row-gap: 2vh;
        height: 100%;
        width: 100%;
    }
    .grid_bottom {
        @apply content-center;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: repeat(1, minmax(0, 1fr));
        column-gap: 2vw;
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
        width: calc(var(--box-size) * 1vw);
        height: calc(var(--box-size) * 1vh);
        margin: 0 0;
    }
    .picture_box{
        width: calc(var(--box-size) * (1 - var(--box-grow)) * 1vw);
        height: calc(var(--box-size) * (1 - var(--box-grow)) * 1vh);
        position: relative;
        top: calc(var(--box-size) * (var(--box-grow)/2) * 1vh);
        left: calc(var(--box-size) * (var(--box-grow)/2) * 1vw);
        transition: all calc(var(--transition-time) * 1s);
    }
    .picture_box:hover {
        top: 0;
        left: 0;
        width: calc(var(--box-size) * 1vw);
        height: calc(var(--box-size) * 1vh);
    }
    .picture {
        @apply mx-auto my-auto;
        /* width: 90%; */
        transition: all 0.5s;
    }
    h3 {
        @apply text-white text-opacity-75 text-center px-0;
        font-family: Arial;
        font-size: 0.85vw;
        transition: all calc(var(--transition-time) * 1s);
    }
    .picture_box:hover h3 {
        padding-left: calc(var(--box-size) * (var(--box-grow)/2) * 1vw);
        padding-right: calc(var(--box-size) * (var(--box-grow)/2) * 1vw);
    }
</style>
