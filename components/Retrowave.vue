<template>
  <div class="retro-parent" :style="{'background-color': backgroundColor}">

    <!-- Horizontal lines -->
    <div v-for="indexX in amountHorizontals" :key="indexX" class="line horizontal" :style="getHorizontalStyle(indexX)">
    </div>

    <!-- Vertical lines -->
    <div>
      <div v-for="indexY in amountVerticals" :key="indexY" class="line vertical" :style="getVerticalStyle(indexY)">
      </div>
    </div>

    <!-- Blur effect -->
    <div class="blur" :style="getBlurStyle()" v-if="blurredPerspective"></div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      // Animation variables
      animating: true,
      offsetHorizontalLines: 0,
      maxOffsetHorizontalLines: undefined,  // (%) will be defined in beforeMount, offset after which animation is looped
      timer: undefined,

      // Geometry variables
      endHeight: 140,
      verticalsAngles: [],
      verticalsCoord: []
    }
  },
  props: {
    // Animation props
    updateInterval: {type: Number, default: 20},  // (milliseconds) Refresh rate of the animation
    framesPerLoop: {type: Number, default: 8},  // Loop animation every x refreshes of the animation

    // Geometry props - Horizontal lines
    startHeight: {type: Number, default: 50},  // (%) coordinate from which animation start
    amountHorizontals: {type: Number, default: 15},  // Amount of horizontal lines
    horizontalFactor: {type: Number, default: 1.6},  // (CANNOT BE BELOW 1) Increase factor in gaps between horizontal lines

    // Geometry props - Vertical lines
    amountVerticals: {type: Number, default: 6},  // Amount of vertical lines
    verticalAngleFactor: {type: Number, default: 1.6},  // (CANNOT BE BELOW 1) Increase factor in Angle gaps between vertical lines
    offsetVerticalLinesY: {type: Number, default: 0.4},  // (%) Making vertical lines slightly lower than startHeight to fit better
    offsetVerticalLinesX: {type: Number, default: 0},  // (%) Moving lines to the left or right (best left at 0 in most cases)
  
    // Misc
    blurredPerspective: {type: Boolean, default: false},  // Add a depth of field blur effect
    gridColor: {type: String, default: 'blueviolet'},  // Color of the lines
    backgroundColor: {type: String, default: '#24162F'},  // Screen color
  },

  beforeMount() {
    if (this.horizontalFactor < 1) {this.horizontalFactor = 1;}
    this.maxOffsetHorizontalLines = (this.endHeight - this.getHorizontalCoord(1)) * this.horizontalFactor;

    this.fillVerticalsAngles();
  },

  mounted() {
    if (this.animating){
      this.startMove();
    }
  },

  methods: {
    fillVerticalsAngles(){
      // Fill one side first, then fill the other symetrically
      // If amount of vertical lines is odd number, add line in the very center
      let half = Math.floor(this.amountVerticals / 2);
      let toPush;
      for (let i=0; i < half; i++){
        toPush = this.getVerticalAngle(i+1);
        this.verticalsAngles.push(toPush);
        this.verticalsAngles.push(-1 * toPush);
      }
      if (this.amountVerticals % 2 !== 0) {
        this.verticalsAngles.push(0);
      }
      this.verticalsAngles.sort(function(a, b) {return b - a;});
    },
    getVerticalAngle(index){
      return ((-90 / (this.verticalAngleFactor**index)) + 90);
    },
    getVerticalStyle(index){
      let toReturn = this.getLineStyle();
      toReturn += 'left: ' + (this.offsetVerticalLinesX + ((index * 100) / (this.amountVerticals + 1))) + '%;'
      toReturn += 'transform: rotate(' + this.verticalsAngles[index-1] + 'deg);'
      toReturn += 'top: ' + (this.startHeight + this.offsetVerticalLinesY) + '%;'
      return toReturn;
    },
    getHorizontalCoord(index) {
      return (this.startHeight + (((this.endHeight + this.offsetHorizontalLines) - this.startHeight) / (this.horizontalFactor**index)));
    },
    getHorizontalStyle(index) {
      if (index < 1){return;}
      let toReturn = this.getLineStyle();
      toReturn += 'top: ' + this.getHorizontalCoord(index) + '%;';
      toReturn += 'z-index: ' + (this.amountHorizontals - index) + ';';
      return toReturn;
    },
    getLineStyle() {
      let colorStyle = 'background-color: ' + this.gridColor + ';';
      colorStyle += 'box-shadow: 0 0 0.5vw ' + this.gridColor + ';';
      return colorStyle;
    },

    animation() {
      if (this.animating){
        this.offsetHorizontalLines += (this.maxOffsetHorizontalLines / this.framesPerLoop);
        if (this.offsetHorizontalLines >= this.maxOffsetHorizontalLines) {
          this.offsetHorizontalLines %= this.maxOffsetHorizontalLines;
        }
      }
    },

    // Call the following methods from parent to toggle animation
    toggleAnimation() {
      if (this.animating){this.endMove();}
      else (this.startMove());
    },
    endMove() {
      this.animating = false;
      clearInterval(this.timer);
    },
    startMove() {
      this.animating = true;

      clearInterval(this.timer);
      var ref = this;  // IMPORTANT to avoid "this" mismatch in child method
      this.timer = setInterval( function() { 
        ref.animation();
      }, 100);
    },
    
    getBlurStyle() {
      return ('background: linear-gradient(0deg, rgba(255,255,255,0)' + (100 - this.startHeight - 10) + '%,' + this.backgroundColor + ' ' + (100 - this.startHeight) + '%);');
    }
  }
}
</script>

<style scoped>
.retro-parent {
  @apply absolute w-full h-full;
  z-index: -50;
  overflow: hidden;
}

.line {
  @apply absolute block;
}
.horizontal {
  @apply w-full z-20;
  height: 3px;
}

.vertical {
  @apply z-50;
  width: 3px;
  height: 100%;
  transform-origin: 0% 0%;;
}

.blur {
  @apply absolute top-0 h-full block z-50;
  width: 140%;
  left: -20%;
}
</style>