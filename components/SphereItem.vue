<template>
    <div class="absolute top-0 left-0 w-full h-full">
        <h1 :style="`left: ${get_pos_x()}vw; top: ${get_pos_y()}vw; filter: ${get_blur()}; font-size: ${get_size()}vw;
        opacity: ${get_opacity()}`" >
            {{text}}
        </h1>
    </div>
    
</template>


<script>
export default {
    props: {
        text: String,
        input_x: Number,
        input_z: Number,
        index: Number,
        number_items: Number,
        radius: Number
    },
    data() {
        return {
            pos_x: 0,
            pos_y: 0,
            pos_z: 0,
            opacity: 100,
            angle: 0,
            angle_z: 0,
            blur: 0,
            blur_max: 0.1,
            size_min: 1,
            size_max: 2,
            size: 2,
            opacity_min: 0.5
        };
    },

    mounted() {
        this.set_starting_angle();
    },

    methods: {
        to_radians(degrees){
            return degrees * (Math.PI/180);
        },
        set_starting_angle(){
            this.angle = this.index * (360/this.number_items)
        },
        get_pos_x(){
            // Alterner entre -R et R
            this.pos_x = this.radius * Math.cos(this.to_radians(this.angle + this.input_x));

            // Alterner entre 0 et 2R
            return (this.radius + this.pos_x);
        },
        get_pos_y(){
            this.pos_y = this.radius * Math.sin(this.to_radians(this.angle + this.input_x));

            // Alterner entre 0 et 2R
            return (this.radius + this.pos_y);

            // console.log("pos_y: " + (this.radius + (Math.sqrt(Math.pow(this.radius, 2) - Math.pow(this.pos_x, 2)))));
            // return (this.radius + (Math.sqrt(Math.pow(this.radius, 2) - Math.pow(this.pos_x, 2))));
        },
        get_pos_z(){
            this.pos_z = this.radius * Math.cos(this.to_radians(this.angle + this.input_z));
            return this.pos_z;
        },
        get_linear_value(min, max) {
            this.get_pos_z();
            var b = min + ((max - min)/2);
            return (this.pos_z * ((max - b) / this.radius) + b);
        },
        get_blur(){
            // blur=0 quand on est pile en face (Z = R)
            // blur = blur_max quand on est tout au fond (Z = -R)
            // Fonction y = ax + b
            // blur = (blur_max / 2) * (1 - Z/R)

            this.get_pos_z();
            this.blur = (this.blur_max / 2) * (1 - (this.pos_z / this.radius));
            return ("blur(" + this.blur + "vw)");
        },
        get_size(){
            // size = min quand on est au fond (Z = -R)
            // size = max quand on est devant (Z = R)
            // fonction y = ax + b
            // avec a = (max-b)/R et b = min + (max-min)/2

            // var b = this.size_min + (this.size_max - this.size_min)/2;
            // this.size = this.pos_z * ((this.size_max - b) / this.radius) + b;
            // return this.size;
            return this.get_linear_value(this.size_min, this.size_max);
        },
        get_opacity(){
            return this.get_linear_value(this.opacity_min, 1);
        }
    }
}
</script>


<style scoped>
    h1 {
        @apply text-cyan text-center;
        font-family: Arial;
        /* font-size: 2vw; */
        position: absolute;
        /* filter: blur(0vw); */
    }
</style>
