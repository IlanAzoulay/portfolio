<template>
    <div>
        <div class="grid grid-cols-10">

            <MainMenu class="col-span-8" id="home"/>

            <RightBar class="col-span-2"/>
        </div>

        <!-- <SphereTest/> -->
        <PagePresentation id="about"/>
        <PageEngineering id="engineering"/>
        <ProjectHistory id="history"/>
        <PageFilm id="film"/>
        <PageContact id="contact"/>

    </div>

</template>

<script>
export default {
    // WATCH: Definir que quand une variable change, on execute la fonction
    // watch:{
    //     "this.$store.state.scrollRef"(newValue){
    //         var element = this.$refs[newValue];
    //         var top = element.offsetTop;
    //         window.scrollTo(0, top);
    //     }
    // }
    
}
</script>

<style scoped>

</style>
