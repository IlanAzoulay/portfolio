<template>
    <div class="min-w-full min-h-full">

        <!-- <div class="grid_all">
            <div class="fixed sm:gauche sm:fixedBar">
                <Navbar :mobile="mobile"/>
            </div>

            <div class="droite" :style="`grid-column-start: ${get_col_start()}`">

                <MainMenu id="home" 
                    :mobile="mobile" 
                    :size_bigger_grid="size_grid"
                />

                <PagePresentation id="about"/>
                <PageEngineering id="engineering"/>
                <ProjectHistory id="history"/>
                <PageFilm id="film"/>
                <PageContact id="contact"/>
            </div>
        </div> -->

        <div class="grid_all">

            <div :class="`fixed z-10 w-full top-0 left-0 sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:w-1/${size_grid}`">
                <Navbar :mobile="mobile"/>
            </div>

            <!-- <Navbar class="w-full sm:fixedBar sm:gauche sm:col-span-1 sm:row-start-1"
                :mobile="mobile"/> -->

            <div :class="`relative z-0 sm:col-start-2 sm:col-end-${size_grid+1} sm:row-start-1`">
                <MainMenu id="home" 
                    :mobile="mobile" 
                    :size_bigger_grid="size_grid"
                />
                <div :class="`px-${padding_universal} w-full`">
                    <PagePresentation id="about"/>
                    <PageEngineering id="engineering"/>
                    <ProjectHistory id="history"
                        :mobile="mobile"
                        :pad="padding_universal"
                        :size_bigger_grid="size_grid" />
                    <PageFilm id="film"/>
                    <PageContact id="contact"/>
                </div>
                
            </div>

        </div>

    </div>

</template>

<script>
export default {
    data() {
        return {
            mobile: false,
            size_grid: 6,
            padding_universal: 14
        }
    },

    beforeMount() {
        let root = document.documentElement;
        root.style.setProperty('--col-number', this.size_grid);
    },
    mounted() {
        this.mobile = this.isMobile;
        if (this.mobile){
            this.padding_universal = 8;
        }
    },

    computed: {
        isMobile () {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
    },

    methods: {
        get_col_start(){
            if (this.mobile){
                return 1;
            } else {
                return 2;
            }
        }
    }
}
</script>

<style scoped>
    .grid_all {
        @apply flex flex-col sm:grid sm:grid-cols-6 sm:grid-rows-1;
        /* display: grid; */
        /* grid-template-columns: repeat(var(--col-number), minmax(0, 1fr)); */
        /* grid-template-rows: repeat(1, minmax(0, 1fr)); */
    }
    .fixedBar {
        position: fixed;
        left: 0;
        top: 0;
        width: calc((100/var(--col-number)) * 1%);
    }
    .gauche {
        @apply col-start-1 col-end-2 row-start-1;
        /* grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1; */
    }
    .droite {
        @apply col-start-2 col-end-7 row-start-1;
        /* grid-column-start: 2;
        grid-column-end: calc(1 + var(--col-number));
        grid-row-start: 1; */
    }
</style>
