<template>
    <!-- <div :class="`grid grid-cols-${nombre_col} grid-rows-1`"> -->
    <div class="grid_all">

        <!-- Barre a gauche -->
        <!-- <div class="col-span-1">
            <!-- <Navbar @scrollTo="goto" :class="`fixed w-1/${nombre_col}`" /> -->
            <!-- <Navbar :class="`fixedBar w-1/${nombre_col}`"/> -->
        <!-- </div> --> -->
        <div class="gauche">
            <Navbar class="fixedBar"/>
        </div>

        <!-- Le reste a droite -->
        <!-- <Nuxt :class="`col-span-${(nombre_col-1)}`" /> -->
        <Nuxt class="droite"/>
        
    </div>
</template>


<script>
export default {
    beforeMount() {
        let root = document.documentElement;
        root.style.setProperty('--col-number', 6);
    }
}
</script>

<style scoped>
    .grid_all {
        @apply bg-gray_moi;
        display: grid;
        grid-template-columns: repeat(var(--col-number), minmax(0, 1fr));
        grid-template-rows: repeat(1, minmax(0, 1fr));
    }
    .fixedBar {
        position: fixed;
        left: 0;
        top: 0;
        width: calc((100/var(--col-number)) * 1%);
    }
    .gauche {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1;
    }
    .droite {
        grid-column-start: 2;
        grid-column-end: calc(1 + var(--col-number));
        grid-row-start: 1;
    }

</style>
