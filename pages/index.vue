<template>
    <div class="min-w-full min-h-full">

        <PageLoading
            :mobile="mobile"/>

        <div class="grid-all">

            <div class="navbar"
                :style="`${getNavStyle()}`">
                <navbar :mobile="mobile"/>
            </div>

            <div class="relative z-0 sm:col-start-2 sm:row-start-1" :style="`${getMainStyle()}`">
                <MainMenu id="home" 
                    :mobile="mobile" 
                    :size_bigger_grid="gridSize"
                />
                <div class="w-full" :style="`padding: 0 ${paddingUniversal}rem;`" >
                    <page-presentation id="about" 
                        :mobile="mobile" />
                    <page-engineering id="engineering"
                        :mobile="mobile"/>
                    <project-history id="history"
                        :mobile="mobile" />
                    <page-film id="film"
                        :mobile="mobile"/>
                    <page-contact id="contact"
                        :mobile="mobile"/>
                    <!-- <Retrowave
                        :startHeight="70"
                        :blurredPerspective="true"/> -->
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
            gridSize: 6,
            paddingUniversal: 3.5
        }
    },

    beforeMount() {
        document.documentElement.style.setProperty('--col-number', this.gridSize);

        this.mobile = this.isMobile;
        if (this.mobile){
            this.paddingUniversal = 2;
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
        getColumnStart(){
            if (this.mobile){
                return 1;
            } else {
                return 2;
            }
        },
        getNavStyle(){
            if (!this.mobile){
                var pourcentage = 100/this.gridSize;
                return ("grid-column-end: 2; width: " + pourcentage + "%;");
            } else {
                return "width: 100%";
            }
        },
        getMainStyle(){
            if (!this.mobile){
                // var pourcentage = 100 * ((this.gridSize - 1)/this.gridSize);
                return ("grid-column-start: 2; grid-column-end: " + (this.gridSize+1) + "; grid-row-start: 1; width: 100%;");
            } else {
                return "width: 100%";
            }
        }
    }
}
</script>

<style scoped>
    .grid-all {
        @apply flex flex-col sm:grid sm:grid-cols-6 sm:grid-rows-1;
    }
    .navbar {
        @apply fixed z-10 sm:z-20 top-0 left-0 sm:col-start-1 sm:col-end-2 sm:row-start-1;
    }
</style>
