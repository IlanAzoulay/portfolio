<template>
    <div class="min-h-screen">
        <div class="pt-4">
            <h1>
                Salut ! I'm Ilan Azoulay
            </h1>
            <div class="flex flex-col sm:flex-row items-center sm:items-start">
                
                <div class="py-4">
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

                <SphereTest/>
            </div>
        </div>
    </div>    
</template>

<script>
import SphereTest from "@/components/SphereTest.vue";

export default {
    components: {
        SphereTest
    }
}
</script>

<style scoped>
    p{
        @apply text-white text-opacity-80 text-base;
        font-family: Arial;
        /* font-size: 1vw; */
        text-align: justify;
    }
</style>
