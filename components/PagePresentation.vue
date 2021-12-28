<template>
    <div class="min-h-screen">

        <div class="flex py-4 flex-col sm:flex-row items-center sm:items-start">
            
            <div class="pb-0 sm:pb-4">
                <h1 class="pb-4">
                    Salut ! I'm Ilan Azoulay
                </h1>
                <p>
                    Creativity. Freedom. Innovation.
                </p>
                <p>
                    These are my 3 most important values. These are what lead me to become who I am today.
                </p>
                <br>
                <p>
                    I am an engineer because I love the process of crafting algorithms.
                    Infinite ways to approach any approach any problem freely, pure logic and problem-solving.
                </p>
                <br>
                <p>
                    I apply my skills to software development, embedded systems, 3D programming, and interface development.
                    No matter the sector, I always find my way through that same core that is algorithmic problem-solving.
                </p>
                <br>
                <p>
                    I am also an artist. I write, direct and produce animated short films and music videos.
                    An endeavor that I consider a strong support for my engineering projects.               
                    My films and music have garnered millions of views internationally, and been nominated to film festivals.
                </p>
                <br>
                <p>
                    Finally, I am an activist. As the founder of the <em>Walletvote</em> project, 
                    I am leading the development of a blockchain-based platform to bring ethics and responsibility to the free market.
                </p>
            </div>

            <SphereTest id="id_sphere_object" ref="ref_sphere_object"
                :items_list="sphere_items"
                :radius="sphere_radius"
                :text_color="'cyan'"
                :font_size_max="sphere_font_size"/>
        </div>
    </div>    
</template>

<script>
import SphereTest from "@/components/SphereTest.vue";
import data from '~/static/data/data.json';

export default {
    props: {
        mobile: Boolean
    },
    components: {
        SphereTest
    },
    data() {
        return {
            sphere_items: data.sphere_items,
            sphere_radius: 12,
            sphere_font_size: 2
        }
    },

    beforeMount(){
        if (this.mobile){
            this.sphere_radius = 7;
            this.sphere_font_size = 1;
        }
    },
    mounted(){
        window.addEventListener("scroll", this.onScroll);
    },

    methods: {
        onScroll(e) {
            // Quand la sphere devient visible
            if (document.getElementById("id_sphere_object").getBoundingClientRect().top <= window.innerHeight){
                this.$refs.ref_sphere_object.start_autonomous_move();
                window.removeEventListener("scroll", this.onScroll);
            }
        },
    }
}
</script>

<style scoped>
    p{
        @apply text-white text-opacity-80 text-base;
        font-family: Arial;
        text-align: justify;
    }
</style>
