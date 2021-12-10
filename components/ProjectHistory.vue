<template>
    <div class="bg-gray_moi min-h-screen pl-8">
        <h1 class="pb-2 pt-6">
            MY PROJECT HISTORY
        </h1>
        <p>
            Below is a list of personal, academic, and professional projects I have worked on
        </p>
        <div class="grid-logos">
            <img src="../static/logos/Logo_AssistArm.png" class="logo">
            <img src="../static/logos/Logo_ECE3SAT.png" class="logo">
            <img src="..\static\logos\Logo_SAP.png" class="logo">
            <img src="..\static\logos\Logo_DGA.png" class="logo">
            <img src="..\static\logos\Logo_Naval.png" class="logo">
            <img src="..\static\logos\Logo_DasAv.png" class="logo">
            <img src="..\static\logos\Logo_Walletvote.png" class="logo">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        };
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
    p {
        @apply text-white;
        font-family: Arial;
        font-size: 1.25vw;
    }
    .grid-logos {
        @apply grid grid-cols-4 grid-rows-2 p-10 gap-y-6 gap-x-2;
        padding-right: 20vw;
    }
    .logo {
        @apply bg-gray_moi-light p-2 m-auto;
        box-shadow: 0 0 0.25vw white;
        height: 90%;
        transition: all 0.5s;
    }
    .logo:hover {
        height: 100%;
        box-shadow: 0 0 1vw cyan;
    }
</style>
