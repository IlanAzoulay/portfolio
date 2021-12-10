<template>
    <div class="bg-gray_moi min-h-screen pb-20">

        <div class="grid grid-cols-6 grid-rows-6 ">

            <!-- textes -->
            <div class="textbox px-8 pl-14">
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
                            <li>C, C++, Python, Java, VBA, SQL</li>
                            <li>Linux, Arduino, Microcontrollers (PIC), Raspberry Pi, STM32</li>
                            <li>Blender, Cinema 4D, Solidworks, OpenGL</li>
                            <li>Qt, java Windowbuilder</li>
                            <li>Wi-fi, Bluetooth/BLE, UART</li>
                            <li>Git, JSON, bpy</li>
                        </ul>
                    </div>

                </h2>
            </div>

            <!-- photos a droite -->
            <div  class="pics-right">
                <div class="grid grid-rows-2">
                    <div class="row-span-1 picture">
                        <img src="..\static\res\Preview_Naval.png">
                        Image generated autonomously and randomly 
                        <em>(Python, Blender)</em>
                    </div>
                    <div class="row-span-1 picture">
                        <img src="..\static\res\Preview_OpenGL.png">
                        Simulation to test the stabilisation algorithm of a cubesat nanosatellite<br>
                        <em>(Java, OpenGL, windowBuilder)</em>
                    </div>
                    
                </div>
                
            </div>

            <!-- photos en bas -->
            <div  class="pics-bottom">
                <div class="grid grid-cols-3">
                    <div class="row-span-1 picture">
                        <img src="..\static\res\Preview_DefiH.png">
                        Presentation of the Assist'Arm project to Défi H 2018 competition
                    </div>
                    <div class="row-span-1 picture">
                        <img src="..\static\res\Preview_Arm.png">
                        Assist'Arm semi-autonomously guided robotic arm
                    </div>
                    <div class="row-span-1 picture">
                        <img src="..\static\res\Preview_Cubesat.png">
                        Construction to simulate magnetic fields around the nanosatellite
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>


<script>
export default {
    
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
        @apply text-white;
        font-family: Arial;
        font-size: 1vw;
    }
    .textbox {
        grid-column-start: 1;
        grid-column-end: 5;
        grid-row-start: 1;
        grid-row-end: 5;
    }
    .pics-right {
        grid-column-start: 5;
        grid-column-end: 7;
        grid-row-start: 1;
        grid-row-end: 5;
    }
    .pics-bottom {
        grid-column-start: 1;
        grid-column-end: 7;
        grid-row-start: 5;
        grid-row-end: 7;
    }
    .picture {
        @apply mx-auto my-auto w-72 text-white text-opacity-75 text-center py-3;
        font-family: Arial;
        font-size: 0.85vw;
    }
</style>
