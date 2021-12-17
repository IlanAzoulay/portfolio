<template>
    <div class="grid_all">

        <div class="gauche">
            <Navbar class="fixedBar"/>
        </div>

        <!-- Le reste a droite -->
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
