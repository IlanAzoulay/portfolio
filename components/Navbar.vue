<template>
    <div class="flex flex-col items-center space-y-6 py-6 bg-gray_moi-dark min-h-screen">

        <img src="..\static\icons\Icon_A.png" name='A' class="mx-auto w-36 cursor-pointer" @click="scrollto('home')">

        <div class="space-y-0 w-full">
            <div v-for='(button, index) in buttonsTab' :key='index'>
                <!-- <a :href="`#${button.href}`"> -->
                <div @click="scrollto(button.href)">
                <!-- <div :@click="scrollto(button.href)"> -->
                    <div class="button_normal" :class="index === 0 ? 'border-t':''">
                        {{button.title}}
                    </div>
                </div>
                <!-- </a> -->
            </div>
        </div>

        <div class="flex flex-row space-x-2 mx-auto">
            <a href="https://www.youtube.com/c/TheMechanicSharkChannel" target="_blank" rel="noopener noreferrer">
                <img src="..\static\icons\Icon_Youtube.png" name='Youtube' class="logo">
            </a>
            <a href="https://www.linkedin.com/in/ilan-azoulay-197429170" target="_blank" rel="noopener noreferrer">
                <img src="..\static\icons\Icon_LinkedIn.png" name='LinkedIn' class="logo">
            </a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            buttonsTab: [
                {title: 'About', href: 'about'},
                {title: 'Engineering', href: 'engineering'},
                {title: 'Project History', href: 'history'},
                {title: 'Filmography', href: 'film'},
                {title: 'Contact', href: 'contact'}
            ]
        };
    },

    methods:{
        scrollto(destination){
            document.getElementById(destination).scrollIntoView({behavior: 'smooth'});
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
        font-family: Arial;
        font-size: 1.5vw;
        text-shadow: none;
        transition: all .5s ease-out;
    }
    .button_normal:hover{
        text-shadow: 0 0 0.25vw white;
    }

    .logo {
        @apply cursor-pointer mx-auto w-14 opacity-75 hover:opacity-100;
        transition: all .5s ease-out;
    }

</style>
