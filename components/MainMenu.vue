<template>
  <!-- on peut avoir qu'une seule balise dans template -->
  <div :class="`main-menu-parent grid grid-cols-${sizeBiggerGrid-1} grid-rows-1`">

    <div class="page-background">
      
      <img src="https://raw.githubusercontent.com/IlanAzoulay/portfolio/master/static/Sceau_Cercle_Blur.png" name='moi' class="w-52 rounded-full mx-auto pt-12 pb-2">

      <div class="flex flex-col space-y-0">
        <!-- <h1 class="text-center">
          Software. 3D. Front-end.
        </h1> -->

        <LetterAnimation
          :text="'Front-end. Back-end. 3D.'"
          :fontsize="titleFontSize"
          :color="'cyan'"
          :color2="'white'"
          :mobile="mobile"/>

        <h2 class="text-center">
          I make algorithms. Any sector. I solve problems.
        </h2>
      </div>

      <div class="py-10" @click="scrollto('contact')">
        <div class="button_futurist">
            Contact me!
        </div>
      </div>

      <div class="mx-auto scroll-arrow" @click="scrollto('about')" :style="`opacity: ${scrollArrow.opacity};`" >
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
      :style="`grid-row-start: 1; grid-column-start: ${sizeBiggerGrid-1}; grid-column-end: ${sizeBiggerGrid};`">
      <RightBar/>
    </div>

    <Retrowave 
      :style="{'height': retroHeight}"
      :background-color="'#231c27'"
      :offset-vertical-lines-x="mobile? 0 : -9.6"
      :start-height="75"
      :blurred-perspective="true"/>
  </div>
</template>

<script>
/* a l'interieur d'ici se trouve du javascript */
import RightBar from "@/components/RightBar.vue";
import LetterAnimation from "@/components/LetterAnimation.vue";

export default {
  components: {
    RightBar,
    LetterAnimation
  },

  props: {
    mobile: Boolean,
    sizeBiggerGrid: Number  // La RightBar doit faire la meme taille que Navbar pour center MainMenu
  },
  
  data(){
    /* on definit toutes les variables ici, marche un peu comme un JSON */
    return {
      scrollVar: 0,
      columnEnd: undefined,
      scrollArrow: {
        maxOpacity: 0.5,
        opacity: 0.5,
        maxScroll: 500
      },
      titleFontSize: 2.75,
      retroHeight: '100vh',
    };
  },
  /* ATTENTION: Bien penser a la VIRGULE entre les trucs */

  beforeMount() {
    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("resize", this.resizeBrowserHandler);
    document.documentElement.style.setProperty('--col-end', this.getColumnEnd());

    if (this.mobile){
      this.titleFontSize = 1.75;
    }
  },
  mounted() {
    document.documentElement.style.setProperty('--col-end', this.getColumnEnd());
    this.retroHeight = document.getElementById('home').getBoundingClientRect().height + 'px';
    // console.log('height: ', parent)
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.resizeBrowserHandler);
  },

  methods:{  /* Definir les fonctions */

    resizeBrowserHandler (e) {
      this.retroHeight = document.getElementById('home').getBoundingClientRect().height + 'px';
    },

    onScroll(e) {
      this.scrollVar = window.scrollY; /* or: e.target.documentElement.scrollTop */
      this.updateOpacity();
    },

    updateOpacity(){

      if (this.scrollVar > this.scrollArrow.maxScroll){this.scrollArrow.opacity = 0;}
      else {
        var newOpacity = (this.scrollVar) / this.scrollArrow.maxScroll;  // Pourcentage du scroll
        newOpacity = (1 - newOpacity);  // Inverser le pourcentage

        // Appliquer a l'echelle
        newOpacity = this.scrollArrow.maxOpacity * newOpacity

        this.scrollArrow.opacity = newOpacity;
      }
    },

    arrondir(nombre, decimal){
      return parseFloat(nombre.toFixed(decimal));
    },

    scrollto(destination){
      document.getElementById(destination).scrollIntoView({behavior: 'smooth'});
    },

    getColumnEnd(){
      if (this.mobile){
        return this.sizeBiggerGrid;  // Va faire toute la largeur si on est en mobile
      } else {
        return (this.sizeBiggerGrid - 1);  // Sur PC, laisse la place a RightBar
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
  .main-menu-parent {
    @apply w-full;
    box-shadow: 1px 3px 1vw blueviolet;
    margin-bottom: 10px;
  }
  .page-background {
    @apply relative w-full flex flex-col px-3 py-20 items-center text-center min-h-screen space-y-0;
    grid-column-start: 1;
    grid-row-start: 1;
    grid-column-end: var(--col-end);
  }

  .scroll-arrow{
    @apply cursor-pointer absolute bottom-2;
  }
</style>
