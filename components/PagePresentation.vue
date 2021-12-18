<template>
    <div class="bg-gray_moi min-h-screen">
        <div class="px-14 py-10">
            <h1>
                Salut ! I'm Ilan Azoulay
            </h1>
            <div class="flex flex-row">
                
                <p class="py-4">
                    Creativity. Freedom. Innovation.
                    <br>
                    These are my 3 most important values. These are what lead me to become who I am today.
                    <br><br>
                    I am an engineer because I love the process of crafting algorithms. Infinite ways to approach any problem freely.
                    Watching it work better and better with each iteration, until the result is reached,
                    and that piece of code become a stone in the construction of a bigger structure. 
                    This is what drives my passion for programming. A journey being as fulfilling as reaching the destination.
                    <br><br>
                    I apply my skills to multiple fields: software development, robotics, 3D programming, and interface development.
                    I have been building robots since I was a kid, for various tournaments or school projects, all the way to graduating as an embedded systems engineer.
                    I have also developped many simulations, 3D applications, and software interfaces.
                    No matter the sector, I always find my way through that same core that is algorithmic problem-solving.
                    <br><br>
                    I am also an artist. I write, direct and produce animated short films and music videos.
                    An endeavor that I consider a strong support for my engineering projects, and a testament to my work ethic.               
                    My films and music have garnered millions of views internationally, and been nominated to film festivals.
                    This is something I do in my free time, that I love making and never get tired from.
                    <br><br>
                    Finally, I am an activist. As the founder of the <em>Walletvote</em> project,
                    I am striving to raise awarness about alternatives to products made from Human rights abuses, 
                    by leading the development of a blockchain-based platform to bring ethics and responsibility to the free market.
                </p>

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
    h1 {
        @apply text-cyan;
        font-family: Arial;
        font-size: 2.25vw;
        font-weight: bold;
    }
    p{
        @apply text-white text-opacity-80;
        font-family: Arial;
        font-size: 1vw;
        text-align: justify;
    }
</style>
