<template>
  <!-- on peut avoir qu'une seule balise dans template -->
  <div>
    <div class="pageBackground relative w-full flex flex-col px-3 py-20 items-center text-center min-h-screen space-y-0">
      
      <img src="https://raw.githubusercontent.com/IlanAzoulay/portfolio/master/static/BM_Evan_Cercle_Blur.png" name='moi' class="w-52 rounded-full mx-auto pt-12">

      <div class="flex flex-col space-y-0">
        <h1 class="text-center">
          <!-- Engineer. Director. -->
          Software. 3D. Robotics.
        </h1>

        <h2 class="text-center">
          <!-- Software development - Embedded systems - 3D - Animation -->
          I make algorithms. Any sector. I solve problems.
        </h2>
      </div>

      <div class="py-10" @click="scrollto('contact')">
        <div class="button_futurist">
            Contact me!
        </div>
      </div>

      <!-- <div class="opacity-50 mx-auto scroll"> -->
      <div class="mx-auto scroll_arrow" @click="scrollto('about')">
          <div>
            scroll down
          </div>
          <!-- on va repeter la fleche 2 fois, pour le fun -->
          <div class="flex flex-row space-x-5 justify-center">
            <div v-for="i in 2" :key="i">
              <img src="https://raw.githubusercontent.com/IlanAzoulay/portfolio/master/static/icons/Icon_arrow_down.png" class="w-6 animate-bounce">
            </div>
          </div>
      </div>
      

    </div>
  </div>
</template>

<script>
/* a l'interieur d'ici se trouve du javascript */

export default {
  
  data(){
    /* on definit toutes les variables ici, marche un peu comme un JSON */
    return {
      numbers: [1, 2, 3],
      name: 'Ilan',  /* utiliser des single quotes */
      blue_futurist: '#00FFEA',
      scroll_var: 0,
      scroll_arrow: {
        max_opacity: 0.5,
        max_scroll: 350
      }
      // root: document.documentElement
      // root: document.querySelector(':root')
    };
  },
  /* ATTENTION: Bien penser a la VIRGULE entre les trucs */

  // mounted() {
  beforeMount() {
    window.addEventListener("scroll", this.onScroll);
    let root = document.documentElement;
    root.style.setProperty('--scroll-arrow-opacity', this.opacity_updated());
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll)
  },

  methods:{  /* Definir les fonctions */

    onScroll(e) {
      this.scroll_var = window.scrollY; /* or: e.target.documentElement.scrollTop */
      // this.scrolldown.opacity = this.opacity_updated();
      let root = document.documentElement;
      root.style.setProperty('--scroll-arrow-opacity', this.opacity_updated());
    },

    opacity_updated(){

      if (this.scroll_var > this.scroll_arrow.max_scroll){return 0;}

      var new_opacity = (this.scroll_var) / this.scroll_arrow.max_scroll;  // Pourcentage du scroll
      new_opacity = (1 - new_opacity);  // Inverser le pourcentage

      // Appliquer a l'echelle
      new_opacity = this.scroll_arrow.max_opacity * new_opacity

      // Etalonner par 5
      // new_opacity = new_opacity - (new_opacity % 5);

      return new_opacity;
    },

    arrondir(nombre, decimal){
      return parseFloat(nombre.toFixed(decimal));
    },

    scrollto(destination){
      document.getElementById(destination).scrollIntoView({behavior: 'smooth'});
    }
  }
}
</script>


<style scoped>
  h1 {
    @apply text-cyan;
    font-family: Arial;
    font-weight: bold;
    font-size: 3vw;
  }
  h2 {
    @apply  text-cyan;
    font-family: Arial;
    font-weight: normal;
    opacity: 0.75;
    font-size: 1.5vw;
  }
  .pageBackground {
    @apply bg-gray_moi;
  }

  .button_futurist{
    /* @apply pour faire le tailwind */
    @apply px-14 py-1 text-cyan hover:text-gray_moi;
    @apply cursor-pointer border-cyan border-2 space-y-10;
    font-family: Arial;
    font-weight: normal;
    font-size: 1.5vw;
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

  .scroll_arrow{
    @apply cursor-pointer text-white;
    font-family: Arial;
    font-size: 1vw;
    position: absolute;
    bottom: 2vh;
    opacity: var(--scroll-arrow-opacity);
  }
</style>
