<template>
    <div class="absolute top-0 left-0 w-full h-full">
        <h1 :style="`top: ${getTop()}rem; left: ${getLeft()}rem; filter: ${getBlur()}; font-size: ${getSize()}rem;
        opacity: ${getOpacity()}; color: ${textColor}`">
            {{text}}
        </h1>
    </div>
    
</template>


<script>
export default {
    props: {
        text: {type: String, required: true},
        index: {type: Number, required: true},
        numberItems: {type: Number, required: true},
        radius: {type: Number, required: true},
        rotationMatrix: Array,
        textColor: {type: String, required: true},
        fontSizeMin: Number,
        fontSizeMax: {type: Number, required: true},
        blurMax: {type: Number, required: true},
        paddingX: Number,
        paddingY: Number
    },
    data() {
        return {
            // positions x, y, and z between -1 et 1. Will be multiplied by radius afterwards
            // IMPORTANT NOTE: spheric (x, y, z) is (y, z, x) in screen coordinates
            posX: 0,
            posY: 0,
            posZ: 0,
            // Spheric coordinates for initial placement
            angleTheta: 0,
            anglePhi: 0,

            opacityMin: 0.5
        };
    },

    mounted() {
        this.setStartingPoints();
    },

    // Activates when prop changes
    watch: {
        "rotationMatrix": function() {
            this.rotatePos();
        }
    },

    methods: {
        toRadians(degrees){
            return degrees * (Math.PI/180.0);
        },
        toDegrees(radians){
            return radians * (180.0/Math.PI);
        },

        /* multiply current coordinates with Euler matrix */
        rotatePos(){
            var x = this.posX;
            var y = this.posY;
            var z = this.posZ;

            this.posX = this.rotationMatrix[0][0] * x + this.rotationMatrix[0][1] * y + this.rotationMatrix[0][2] * z;
            this.posY = this.rotationMatrix[1][0] * x + this.rotationMatrix[1][1] * y + this.rotationMatrix[1][2] * z;
            this.posZ = this.rotationMatrix[2][0] * x + this.rotationMatrix[2][1] * y + this.rotationMatrix[2][2] * z;

            // Safety, make sure no coordinate ever goes beyond 1
            if (this.posX > 1){this.posX = 1;}
            if (this.posY > 1){this.posY = 1;}
            if (this.posZ > 1){this.posZ = 1;}
        },

        /* set initial angles and coordinates at the very beginning */
        setStartingPoints(){

            // source: EXTREME LEARNING
            var goldenRatio = (1 + Math.sqrt(5))/2;
            this.anglePhi = this.toDegrees( 2 * Math.PI * this.index / goldenRatio );
            this.angleTheta = this.toDegrees( Math.acos(1 - 2*(this.index+0.5)/ this.numberItems));
            // x, y, z = cos(phi) * sin(theta), sin(theta) * sin(phi), cos(theta);

            this.angleTheta = this.toRadians(this.angleTheta);
            this.anglePhi = this.toRadians(this.anglePhi);

            this.posX = Math.cos(this.anglePhi) * Math.sin(this.angleTheta);
            this.posY = Math.sin(this.anglePhi) * Math.sin(this.angleTheta);
            this.posZ = Math.cos(this.angleTheta);
        },

        getTop(){
            return this.paddingY/2 + this.radius + this.radius * this.posZ;
        },
        getLeft(){
            return this.paddingX + this.radius + this.radius * this.posY;
        },

        getLinearValue(coord, min, max) {
            var b = min + ((max - min)/2);
            return (coord * (max - b) + b);
        },
        getBlur(){
            var blur = (this.blurMax / 2) * (1 - this.posX);
            return ("blur(" + blur + "rem)");
        },
        getSize(){
            return this.getLinearValue(this.posX, this.fontSizeMin, this.fontSizeMax);
        },
        getOpacity(){
            return this.getLinearValue(this.posX, this.opacityMin, 1);
        }
    }
}
</script>


<style scoped>
    h1 {
        @apply text-center;
        font-family: Arial;
        position: absolute;
        transition: all 0.0s;
        white-space: nowrap;
        transform: translateX(-50%);
    }
</style>
