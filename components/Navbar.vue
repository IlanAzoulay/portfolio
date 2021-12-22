<template>

    <div class="absolute w-full h-full">
        <!-- BURGER -->
        <div class="burger" @click="opened = !opened">
            <div class="inner-burger">
                <span aria-hidden="true" class="block absolute h-1 w-8 bg-current transform transition duration-500 ease-in-out" :class="{'rotate-45': opened, '-translate-y-2': !opened }"></span>
                <span aria-hidden="true" class="bar" :class="{'opacity-0': opened } "></span>
                <span aria-hidden="true" class="block absolute h-1 w-8 bg-current transform transition duration-500 ease-in-out" :class="{'-rotate-45': opened, 'translate-y-2': !opened}"></span>
            </div>
        </div >

        <!-- CONTENT -->
        <div class="relative h-screen bg-gray_moi-dark flex flex-col items-center space-y-6 py-6 sm:min-h-screen"
            style="transition: left .5s ease-out;" :style="(opened || !mobile) ? 'left: 0;' : 'left: 100vw;'">

            <img src="https://raw.githubusercontent.com/IlanAzoulay/portfolio/master/static/icons/Icon_A.png" name='A'
                    class="mx-auto w-36 cursor-pointer pt-10 sm:pt-4" @click="scrollto('home'); opened = !opened">

            <div class="space-y-0 w-full">
                <div v-for='(button, index) in buttonsTab' :key='index'>
                    <div @click="scrollto(button.href); opened = !opened">
                        <div class="button_normal" :class="index === 0 ? 'border-t':''">
                            {{button.title}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-row space-x-1 mx-auto">
                <a href="https://www.youtube.com/c/TheMechanicSharkChannel" target="_blank" rel="noopener noreferrer">
                    <img src="https://raw.githubusercontent.com/IlanAzoulay/portfolio/master/static/icons/Icon_Youtube.png" name='Youtube' class="logo">
                </a>
                <a href="https://github.com/IlanAzoulay" target="_blank" rel="noopener noreferrer">
                    <img src="https://raw.githubusercontent.com/IlanAzoulay/portfolio/master/static/icons/Icon_Github.png" name='LinkedIn' class="logo">
                </a>
                <a href="https://www.linkedin.com/in/ilan-azoulay-197429170" target="_blank" rel="noopener noreferrer">
                    <img src="https://raw.githubusercontent.com/IlanAzoulay/portfolio/master/static/icons/Icon_LinkedIn.png" name='LinkedIn' class="logo">
                </a>
            </div>
        </div>
        <!-- </div> -->
        <!-- </transition> -->
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
            opened: false,
            buttonsTab: data.navbar_buttons
        };
    },

    mounted(){
        this.mobile = this.isMobile;
    },
    computed: {
        isMobile () {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
    },

    methods:{
        scrollto(destination){
            document.getElementById(destination).scrollIntoView({behavior: 'smooth'});
        },
        get_pos(){
            if (!this.mobile || this.opened){
                return '0';
            } else {
                return '100vw';
            }
        }
    }
}
</script>


<style scoped>
    /* scoped: les classes CSS definies ici ne s'appliquent pas dans les autres fichiers */
    .button_normal{
        /* @apply pour faire le tailwind */
        @apply cursor-pointer text-white border-white border-b py-3 text-opacity-75 hover:text-opacity-100;
        @apply w-full text-center min-w-full border-opacity-75;
        @apply text-lg;
        font-family: Arial;
        /* font-size: 1.5; vw; */
        text-shadow: none;
        transition: all .5s ease-out;
    }
    .button_normal:hover{
        @apply text-cyan;
        text-shadow: 0 0 0.2vw cyan;
    }

    .logo {
        @apply cursor-pointer mx-auto w-14 opacity-75 hover:opacity-100;
        transition: all .5s ease-out;
    }

    /* Burger styling */
    .burger {
        @apply absolute z-10 top-0 right-0 cursor-pointer text-gray-400 w-12 h-12 mr-2 block sm:hidden;
    }
    .inner-burger {
        @apply block relative w-8 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2;
    }
    .burger-background {
        background: linear-gradient(to right, transparent 50%, red 50%);
        /* background-position: right center; */
        background-size: 200% 200%;
        transition: all .5s ease-out;
    }
    .bar {
        @apply block absolute h-1 w-8 bg-current transform transition duration-500 ease-in-out;
    }
    .content {
        @apply flex flex-col sm:flex-row items-center w-full sm:w-auto shadow-lg sm:shadow-none pb-4 sm:pb-0 sm:px-10 space-y-4 sm:space-y-0;
    }
    /* Slide transition */
    .slide-enter-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: ease-in;
        -webkit-transition-timing-function: ease-in;
        -o-transition-timing-function: ease-in;
        transition-timing-function: ease-in;
    }
    .slide-leave-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }
    .slide-enter-to, .slide-leave {
        max-height: 300px;
        overflow: hidden;
    }
    .slide-enter, .slide-leave-to {
        overflow: hidden;
        max-height: 0;
    }
</style>
