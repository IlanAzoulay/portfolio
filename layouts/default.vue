<template>
    <div :class="`grid grid-cols-${nombre_col}`">

        <!-- Barre a gauche -->
        <div class="col-span-1">
            <!-- <Navbar @scrollTo="goto" :class="`fixed w-1/${nombre_col}`" /> -->
            <Navbar :class="`fixedBar w-1/${nombre_col}`"/>
        </div>

        <!-- Le reste a droite -->
        <Nuxt :class="`col-span-${(nombre_col-1)}`" />

        
    </div>
</template>

<style scoped>
    .fixedBar {
        position: fixed;
        left: 0;
        top: 0;
    }
</style>

<script>
export default {
    data() {
        return {
            nombre_col: 6
        };
    },
    methods: {
        // goto(refName) {
        //     this.$store.commit('scrollTo', refName)
        // }
    }
}
</script>
