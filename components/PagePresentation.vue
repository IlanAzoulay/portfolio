<template>
    <div class="min-h-screen">

        <div class="page-presentation">
            
            <div class="pb-0 sm:pb-4">
                <h1 class="pb-4">
                    Salut ! I'm Ilan Azoulay
                </h1>
                <p>
                    I am a developer from Paris, France.
                </p>
                <p>
                    I specialize in programming and algorithms, applied to multiple areas:

                </p>
                <ul>
                    <li>Backend</li>
                    <li>Frontend</li>
                    <li>3D</li>
                    <li>Software</li>
                    <li>Blockchain</li>
                </ul>

                <br>
                <p>
                    I have a great passion in autonomously solving problems, 
                    freely finding how to reach a goal.
                </p>

                <br>
                <p>
                    I am also an artist. I write, direct and produce animated short films and music videos.
                    An endeavor that I consider a strong support for my engineering projects.               
                    My films and music have garnered millions of views internationally, and been nominated to film festivals.
                </p>

                <br>
                <p>
                    Interested in any freelance project involving creativity and innovation,
                    and with a friendly, Human-scale team and environment
                </p>

                <br>
                <div class="pcyan"> 
                    Let's create something together!
                </div>
                <br>
                <p class="italic">
                    PS: Do you like that sphere on the right? This is one of my open-source creations! <br>
                    <a href="https://www.npmjs.com/package/wordsphere">Wordsphere</a> - 
                    <a href="https://www.npmjs.com/package/vue-single-select-v2">Dropdown</a> - 
                    <a href="https://github.com/IlanAzoulay/FastOcean_New">FastOcean</a>
                </p>
            </div>

            <word-sphere id="idsphereobject" ref="refsphereobject"
                :items-list="sphereItems"
                :radius="sphereRadius"
                :text-color="'cyan'"
                :font-size-max="sphereFontSize"/>
        </div>
    </div>    
</template>

<script>
import WordSphere from "@/components/WordSphere.vue";
import data from '~/static/data/data.json';

export default {
    props: {
        mobile: Boolean
    },
    components: {
        WordSphere
    },
    data() {
        return {
            sphereItems: data.sphereItems,
            sphereRadius: 12,
            sphereFontSize: 2
        }
    },

    beforeMount(){
        if (this.mobile){
            this.sphereRadius = 7;
            this.sphereFontSize = 1;
        }
    },
    mounted(){
        window.addEventListener("scroll", this.onScroll);
    },

    methods: {
        onScroll(e) {
            // Quand la sphere devient visible
            if (document.getElementById("idsphereobject").getBoundingClientRect().top <= window.innerHeight){
                this.$refs.refsphereobject.startAutonomousMove();
                window.removeEventListener("scroll", this.onScroll);
            }
        },
    }
}
</script>

<style scoped>
    p, ul, .pcyan{
        @apply text-white text-opacity-80 text-base;
        font-family: Arial;
        text-align: justify;
    }
    ul {
        @apply pl-4;
    }
    .pcyan {
        @apply text-cyan font-bold;
    }
    a {
        @apply text-cyan;
    }
    .page-presentation {
        @apply flex py-4 flex-col sm:flex-row items-center sm:items-start;
    }
</style>
