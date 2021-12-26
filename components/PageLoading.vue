<template>
    <div class="page-loader" v-if="!loading_finished">

        <AtomSpinner
          :size="loading_size"
          :color="'cyan'"/>

    </div>
</template>

<script>
import AtomSpinner from '@/components/AtomSpinner.vue'

export default {
    props: {
      mobile: Boolean
    },
    components: {
        AtomSpinner
    },
    data(){
      return {
        loading_finished: false,
        loading_size: 20
      }
    },

    beforeMount(){
      if (this.mobile){
        this.loading_size = 50;
      }
    },

    mounted(){
      // once everything else is fully loaded
      document.onreadystatechange = () => {
        this.loading_finished = true;
      }
    }
}
</script>

<style scoped>
    .page-loader {
        @apply bg-gray_moi;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 999;
    }
</style>