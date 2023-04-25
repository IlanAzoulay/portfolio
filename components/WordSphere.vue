<template>
    <div class="static">
        <div class="relative" id="sphere" @mouseenter="startRoll" @mousemove="updateRoll" @mouseleave="endRoll"
            :style="`width: ${getAreaWidth()}rem; height: ${getAreaHeight()}rem;`">
            <SphereItem
                class="absolute top-0 left-0"
                v-for='(item, index) in itemsList' :key='index'
                :text="item"
                :index="index"
                :number-items="itemsList.length"
                :radius="radius"
                :rotation-matrix="rotationMatrix"
                :text-color="textColor"
                :font-size-min="fontSizeMin"
                :font-size-max="fontSizeMax"
                :blur-max="blurMax"
                :padding-x="paddingX"
                :padding-y="paddingY"
            />
        </div>
    </div>
</template>


<script>
import SphereItem from "@/components/SphereItem.vue";

export default {
    props: {
        itemsList: {
            type: Array,
            required: true
        },
        radius: {
            type: Number,
            default: 12
        },
        textColor: {
            type: String,
            default: '#00FFEA'
        },
        fontSizeMax: {
            type: Number,
            default: 2
        },
        blurMax: {
            type: Number,
            default: 0.1
        },
        updateInterval: {
            type: Number,
            default: 15 // milliseconds
        },
        extraPadding: {
            type: Number,
            default: 2
        }
    },
    components: {
        SphereItem
    },
    data() {
        return {
            active: false,
            timer: undefined,
            timerSlow: undefined,
            rotationMatrix: undefined,

            // Input coords
            mouseX: 0,
            mouseY: 0,

            paddingX: undefined,
            paddingY: undefined,
            fontSizeMin: undefined,

            // Center coord of the area
            centerX: undefined,
            centerY: undefined,

            speedMax: 1,  // degrees (avoid touching this, it's better to change the interval for speed)
            speed: 0,
            slowingFactor: 50,  // change this one at will

            autonomousMove: undefined,
            boundingBox: undefined
        };
    },

    beforeMount(){
        this.rotationMatrix = this.getEulerMatrix(0, 0, 0);  // Initialize Euler matrix
        this.estimatePadding();
        this.fontSizeMin = this.fontSizeMax / 2;
    },
    mounted(){
    },

    methods:{
        toRadians(degrees){
            return degrees * (Math.PI/180.0);
        },
        toDegrees(radians){
            return radians * (180.0/Math.PI);
        },

        getEulerMatrix(rot_x, rot_y, rot_z){
            // Roll: X - Pitch: Y - Yaw: Z
            // Each rotation means around said axis
            rot_x = this.toRadians(rot_x);
            rot_y = this.toRadians(rot_y);
            rot_z = this.toRadians(rot_z);

            var cosa = Math.cos(rot_z);
            var sina = Math.sin(rot_z);

            var cosb = Math.cos(rot_y);
            var sinb = Math.sin(rot_y);

            var cosc = Math.cos(rot_x);
            var sinc = Math.sin(rot_x);

            var Axx = cosa*cosb;
            var Axy = cosa*sinb*sinc - sina*cosc;
            var Axz = cosa*sinb*cosc + sina*sinc;

            var Ayx = sina*cosb;
            var Ayy = sina*sinb*sinc + cosa*cosc;
            var Ayz = sina*sinb*cosc - cosa*sinc;

            var Azx = -sinb;
            var Azy = cosb*sinc;
            var Azz = cosb*cosc;

            return [
                [Axx, Axy, Axz],
                [Ayx, Ayy, Azy],
                [Azx, Azy, Azz]
            ]

        },

        startRoll(event){
            this.autonomousMove = false;
            this.active = true;
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;

            // Get coord of element (in pixels)
            this.boundingBox = document.getElementById("sphere").getBoundingClientRect();
            this.centerX = this.boundingBox.left + this.boundingBox.width / 2;
            this.centerY = this.boundingBox.top + this.boundingBox.height / 2;

            this.speed = this.speedMax;
            var ref = this;  // IMPORTANT to avoid mismatch with "this"
            clearInterval(this.timer);
            clearInterval(this.timerSlow);
            this.timer = setInterval( function() { 
                ref.sphereRoll();
            }, this.updateInterval);
        },

        endRoll(){
            this.active = false;
            clearInterval(this.timer);

            // Slow the movement until zero
            var slowing = this.speed / this.slowingFactor;
            var ref = this;
            this.timerSlow = setInterval( function() { 
                ref.speed -= slowing;
                if ( ref.speed <= 0){clearInterval(ref.timerSlow); ref.speed = 0;}
                ref.sphereRoll();
            }, this.updateInterval);
        },

        updateRoll(event) {
            if (this.active) {
                this.mouseX = event.clientX;
                this.mouseY = event.clientY;
            }
        },
        sphereRoll(){
            // AXIS DIRECTIONS: Z: up - Y: right - X towards user
            // Rotations: around Z: left-right - around Y: up-down

            var move = this.getSphereMovement();
            this.rotationMatrix = this.getEulerMatrix(0, move[1], move[0]);
        },
        getSphereMovement(){
            return [
                this.getSpeed(this.boundingBox.left, this.boundingBox.width, this.mouseX),
                (-1)*this.getSpeed(this.boundingBox.top, this.boundingBox.height, this.mouseY)
            ];
        },
        getSpeed(coord_start, size, mouse){
            // More or less fast depending on how far from the center
            return 2*(this.speed / size) * (mouse - coord_start - (size/2));
        },

        getAreaWidth(){
            // return this.radius * 2 + 3.5 * this.fontSizeMax + 2 * this.padding;
            return 2 * (this.radius + this.paddingX);
        },
        getAreaHeight(){
            return 2 * (this.radius + this.paddingY);
        },

        // A very optional method, to move the sphere autonomously before the user does it manually
        startAutonomousMove(){
            if (typeof this.autonomousMove == 'undefined'){
                this.autonomousMove = true;

                this.boundingBox = document.getElementById("sphere").getBoundingClientRect();
                this.centerX = this.boundingBox.left + this.boundingBox.width / 2;
                this.centerY = this.boundingBox.top + this.boundingBox.height / 2;

                this.mouseX = this.boundingBox.left;
                this.mouseY = this.boundingBox.top + this.boundingBox.height*(3/4);

                this.speed = this.speedMax/4;
                var ref = this;  // IMPORTANT to avoid mismatch with "this"
                this.timer = setInterval( function() { 
                    ref.sphereRoll();
                }, this.updateInterval);

            }
        },

        estimatePadding(axe_x){
            // According to my calculations: 
            // Text width (approx) = Len * fontsize * 0.4 (rem)
            // Text height = 2 * fontsize (rem)

            this.paddingY =(this.extraPadding + 2 * this.fontSizeMax);

            var max = this.itemsList[0];
            for (let i = 1; i < this.itemsList.length; i++){
                if (max.length < this.itemsList[i].length){
                    max = this.itemsList[i];
                }
            }

            this.paddingX = this.extraPadding + (max.length * this.fontSizeMax * 0.4)/2;
        }
    },
}
</script>

<style scoped>

</style>
