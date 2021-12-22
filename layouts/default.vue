<template>
    <div class="bg-gray_moi">
        <Nuxt/>
    </div>
    
</template>


<script>
export default {

}
</script>

<style>
    /* Definir ici les classes universelles */
    h1 {
        @apply text-cyan text-2xl sm:text-4xl text-center sm:text-left pt-6;
        font-family: Arial;
        font-weight: bold;
    }

    .button_futurist{
        /* @apply pour faire le tailwind */
        @apply px-14 py-1.5 text-cyan hover:text-gray_moi;
        @apply cursor-pointer border-cyan border-2;
        @apply text-xl;
        font-family: Arial;
        font-weight: normal;
        white-space: nowrap;
        /* font-size: 1.5vw; */
        display: block;
        background: linear-gradient(to right, cyan 50%, transparent 50%);
        background-position: right center;
        background-size: 200% 200%;
        transition: all .5s ease-out;
    }
    .button_futurist:hover {
        background-position: left center;
        box-shadow: 0 0 0.5vw cyan; /* Glow */
        transition: all .5s ease-out;
    }

</style>
