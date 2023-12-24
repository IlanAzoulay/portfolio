<template>
    <div class="min-h-screen pb-8">
        <h1 class="pb-2">
            MY PROJECT HISTORY
        </h1>
        <p>
            Below is a list of the most important personal, academic, and professional engineering projects I have worked on
        </p>
        <p>
            <em>(click for details)</em>
        </p>

        <!-- Grid, list of projects -->
        <div class="grid-logos" id="project_grid">
            <div v-for='(logo, index) in projectList' :key='index' class="superlogobox" @click="selectProject(index)">

                <div class="logobox">
                    <img v-bind:src="projets.sourceLogos + logo.filename + '.png'" 
                    :alt="'~/static/logos/Logo_' + logo.filename + '.png'"
                    class="logo">
                </div>

            </div>
        </div>

        <!-- Details of specific project -->
        <div v-if="selected !== undefined">
            <div class="black-background" @click="unselect()"></div>
            <div class="project-details" @click="mobileToggle()" :class="getAnimationClass()">

                <img v-bind:src="projets.sourceLogos + projectList[selected].filename + '.png'" class="logo-detail">

                <div class="line"></div>

                <h2><b>{{projectList[selected].title}}</b></h2>
                <h3>From {{projectList[selected].start}} to {{projectList[selected].end}}</h3>
                <br>

                <h4><b>{{projectList[selected].post}}</b></h4>
                <h5>{{projectList[selected].description}}</h5>
                <h5><em>({{projectList[selected].environment}})</em></h5>
                    
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
            projets: data.projets,
            selected: undefined,
            opening: false,
            closing: false,
            projectList: data.projets.listLogos
        };
    },

    methods:{
        selectProject(index) {
            this.selected = index;
            this.openingAnimation();
        },
        unselect() {
            this.closingAnimation();
        },
        mobileToggle(){
            if (this.mobile){
                this.unselect();
            }
        },
        // Animation when showing the card
        openingAnimation() {
            this.opening = true;
            setTimeout(() => {
                this.opening = false
            }, 400)
        },
        // Animation when hiding the card
        closingAnimation() {
            this.closing = true;
            setTimeout(() => {
                
                this.closing = false;
                this.selected = undefined;
            }, 400)
        },
        getAnimationClass() {
            if (this.closing){return 'fadeout';}
            if (this.opening){return 'boing';}
            return '';
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
        @apply w-full py-3;
        @apply grid grid-cols-2 sm:grid-cols-5;
        @apply gap-x-1 gap-y-1;
    }


    h2 {
        @apply text-3xl sm:text-5xl text-cyan;
    }
    h3 {
        @apply text-lg italic opacity-90;
    }
    h4 {
        @apply text-xl;
    }
    h5 {
        @apply text-lg pt-2;
    }

    .superlogobox {
        @apply mx-auto sm:ml-0 sm:mr-auto my-auto relative;
        @apply bg-gray_moi-light m-auto;
        @apply text-opacity-0 text-white;
        @apply cursor-pointer;
        width: 100%;
        padding-top: 100%;  /* Aspect-ratio 1:1 */
        transition: all 0.4s;
    }
    .superlogobox:hover {
        box-shadow: 0 0 0.25rem cyan;
    }

    .logobox {
        @apply absolute w-full h-full;
        top: 0;
        left: 0;
        filter: saturate(0.7);
        transition: all 0.4s;
    }
    .logobox:hover {
        transform: scale(1.1);
        filter: saturate(1);
    }

    .logo {
        @apply absolute;
        width: 80%;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }

    .black-background {
        @apply fixed z-10 opacity-70 cursor-pointer;
        width: 100vw;
        height: 100vh;
        background-color: black;
        top: 0;
        left: 0;
        transition: all 0.4s;
    }

    .project-details {
        @apply fixed z-20 px-8 pb-10 pt-4 bg-gray_moi-light rounded-lg;
        @apply text-white text-center w-11/12 sm:w-auto;
        max-width: 90%;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        overflow: hidden;
        box-shadow: 0 0 0.25rem cyan;
    }

    .logo-detail {
        @apply mx-auto;
        width: 30%;
    }

    .line {
        @apply bg-cyan mx-auto my-2;
        width: 90%;
        height: 2px;
    }

    .boing {
        animation: boing 0.4s ease-in-out;
        transform-origin: center center;
    }
    .fadeout {
        animation: fadeout 0.4s ease-in-out;
        transform-origin: center center;
    }

    @keyframes boing {
        0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-50%) scale(0.1) rotateY(-180deg);
        }
        85% {
            transform: translateX(-50%) translateY(-50%) scale(1.2);
        }
        100% {
            opacity: 1;
            transform: translateX(-50%) translateY(-50%) scale(1) rotateY(0);
        }
    }
    @keyframes fadeout {
        0% {
            opacity: 1;
            transform: translateX(-50%) translateY(-50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-50%) scale(0.5);
        }
    }
    
    
</style>
