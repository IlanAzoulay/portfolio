<template>
  <!-- on peut avoir qu'une seule balise dans template -->
  <div :class="`w-full grid grid-cols-${size_bigger_grid-1} grid-rows-1`">

    <div class="pageBackground">
      
      <img src="https://raw.githubusercontent.com/IlanAzoulay/portfolio/master/static/BM_Evan_Cercle_Blur.png" name='moi' class="w-52 rounded-full mx-auto pt-12 pb-2">

      <div class="flex flex-col space-y-0">
        <h1 class="text-center">
          Software. 3D. Front-end.
        </h1>

        <h2 class="text-center">
          I make algorithms. Any sector. I solve problems.
        </h2>
      </div>

      <div class="py-10" @click="scrollto('contact')">
        <div class="button_futurist">
            Contact me!
        </div>
      </div>

      <div class="mx-auto scroll_arrow" @click="scrollto('about')" :style="`opacity: ${scroll_arrow.opacity};`" >
          <h3>
            scroll down
          </h3>
          <!-- on va repeter la fleche 2 fois, pour le fun -->
          <div class="flex flex-row justify-center animate-bounce">
            <div class="px-2" v-for="i in 2" :key="i">
              <img src="https://raw.githubusercontent.com/IlanAzoulay/portfolio/master/static/icons/Icon_arrow_down.png"
                class="w-6">
            </div>
          </div>
      </div>
      
    </div>

    <div v-show="!mobile" class="relative w-full"
      :style="`grid-row-start: 1; grid-column-start: ${size_bigger_grid-1}; grid-column-end: ${size_bigger_grid};`">
      <RightBar/>
    </div>

  </div>
</template>

<script>
/* a l'interieur d'ici se trouve du javascript */
import RightBar from "@/components/RightBar.vue";

export default {
  components: {
    RightBar
  },

  props: {
    mobile: Boolean,
    size_bigger_grid: Number  // La RightBar doit faire la meme taille que Navbar pour center MainMenu
  },
  
  data(){
    /* on definit toutes les variables ici, marche un peu comme un JSON */
    return {
      scroll_var: 0,
      col_end: undefined,
      scroll_arrow: {
        max_opacity: 0.5,
        opacity: 0.5,
        max_scroll: 500
      },
    };
  },
  /* ATTENTION: Bien penser a la VIRGULE entre les trucs */

  beforeMount() {
    window.addEventListener("scroll", this.onScroll);
    document.documentElement.style.setProperty('--col-end', this.get_col_end());
  },
  mounted() {
    document.documentElement.style.setProperty('--col-end', this.get_col_end());
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },

  methods:{  /* Definir les fonctions */

    onScroll(e) {
      this.scroll_var = window.scrollY; /* or: e.target.documentElement.scrollTop */
      this.update_opacity();
    },

    update_opacity(){

      if (this.scroll_var > this.scroll_arrow.max_scroll){this.scroll_arrow.opacity = 0;}
      else {
        var new_opacity = (this.scroll_var) / this.scroll_arrow.max_scroll;  // Pourcentage du scroll
        new_opacity = (1 - new_opacity);  // Inverser le pourcentage

        // Appliquer a l'echelle
        new_opacity = this.scroll_arrow.max_opacity * new_opacity

        this.scroll_arrow.opacity = new_opacity;
      }
    },

    arrondir(nombre, decimal){
      return parseFloat(nombre.toFixed(decimal));
    },

    scrollto(destination){
      document.getElementById(destination).scrollIntoView({behavior: 'smooth'});
    },

    get_col_end(){
      if (this.mobile){
        return this.size_bigger_grid;  // Va faire toute la largeur si on est en mobile
      } else {
        return (this.size_bigger_grid - 1);  // Sur PC, laisse la place a RightBar
      }
    }
  }
}
</script>


<style scoped>
  h1 {
    @apply text-cyan text-4xl py-1;
    font-family: Arial;
    font-weight: bold;
  }
  h2 {
    @apply  text-cyan text-xl;
    font-family: Arial;
    font-weight: normal;
    opacity: 0.75;
  }
  h3 {
    @apply text-white text-sm;
    font-family: Arial;
  }
  .pageBackground {
    @apply relative w-full flex flex-col px-3 py-20 items-center text-center min-h-screen space-y-0;
    grid-column-start: 1;
    grid-row-start: 1;
    grid-column-end: var(--col-end);
  }

  .scroll_arrow{
    @apply cursor-pointer absolute bottom-2;
  }
</style>
