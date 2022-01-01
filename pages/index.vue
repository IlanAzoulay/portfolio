<template>
    <div class="min-w-full min-h-full">

        <PageLoading
            :mobile="mobile"/>

        <div class="grid_all">

            <div class="fixed z-10 sm:z-0 top-0 left-0 sm:col-start-1 sm:col-end-2 sm:row-start-1"
                :style="`${get_nav_style()}`">
                <Navbar :mobile="mobile"/>
            </div>

            <div class="relative z-0 sm:col-start-2 sm:row-start-1" :style="`${get_main_style()}`">
                <MainMenu id="home" 
                    :mobile="mobile" 
                    :size_bigger_grid="size_grid"
                />
                <div class="w-full" :style="`padding: 0 ${padding_universal}rem;`" >
                    <PagePresentation id="about" 
                        :mobile="mobile" />
                    <PageEngineering id="engineering"
                        :mobile="mobile"/>
                    <ProjectHistory id="history"
                        :mobile="mobile" />
                    <PageFilm id="film"
                        :mobile="mobile"/>
                    <PageContact id="contact"
                        :mobile="mobile"/>
                </div>
                
            </div>

        </div>

    </div>

</template>

<script>
import PageLoading from '@/components/PageLoading.vue'
export default {
    components: {
        PageLoading
    },
    data() {
        return {
            mobile: false,
            size_grid: 6,
            padding_universal: 3.5
        }
    },

    beforeMount() {
        document.documentElement.style.setProperty('--col-number', this.size_grid);

        this.mobile = this.isMobile;
        if (this.mobile){
            this.padding_universal = 2;
        }
    },
    // mounted() {
    // },

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
        },
        get_nav_style(){
            if (!this.mobile){
                var pourcentage = 100/this.size_grid;
                return ("grid-column-end: 2; width: " + pourcentage + "%;");
            } else {
                return "width: 100%";
            }
        },
        get_main_style(){
            if (!this.mobile){
                // var pourcentage = 100 * ((this.size_grid - 1)/this.size_grid);
                return ("grid-column-start: 2; grid-column-end: " + (this.size_grid+1) + "; grid-row-start: 1; width: 100%;");
            } else {
                return "width: 100%";
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
