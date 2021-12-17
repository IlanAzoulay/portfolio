<template>
    <div class="absolute top-0 left-0 w-full h-full">
        <h1 :style="`top: ${get_top()}vw; left: ${get_left()}vw; filter: ${get_blur()}; font-size: ${get_size()}vw;
        opacity: ${get_opacity()}`" >
            {{text}}
        </h1>
    </div>
    
</template>


<script>
export default {
    props: {
        text: String,
        input_theta: Number,
        input_phi: Number,
        index: Number,
        number_items: Number,
        radius: Number
    },
    data() {
        return {
            pos_x: 0,
            pos_y: 0,
            pos_z: 0,
            offset_theta: 0,
            offset_phi: 0,
            angle_theta: 0,
            angle_phi: 0,
            blur_max: 0.1,
            size_min: 1,
            size_max: 2.5,
            opacity_min: 0.5
        };
    },

    mounted() {
        this.set_starting_angle();
        this.update_pos();
    },

    // Activates when prop changes
    watch: {
        "input_theta": function(val, oldVal) {
            this.update_theta();
            this.update_pos();
            console.log("Index: ", this.index, "\t Phi:", this.to_degrees(this.angle_phi),"\t theta: ", this.to_degrees(this.angle_theta));
        },
        "input_phi": function(val, oldVal) {
            this.update_phi();
            this.update_pos();
        }
    },

    methods: {
        to_radians(degrees){
            return degrees * (Math.PI/180.0);
        },
        to_degrees(radians){
            return radians * (180.0/Math.PI);
        },

        update_theta(){
            // Theta entre 0 et 180
            this.angle_theta = this.to_radians(this.offset_theta + this.input_theta);            
        },
        update_phi(){
            // Phi entre 0 et 360
            this.angle_phi = this.to_radians(this.offset_phi + this.input_phi);
        },
        update_pos(){
            this.pos_x = this.get_pos_x();
            this.pos_y = this.get_pos_y();
            this.pos_z = this.get_pos_z();
        },

        set_starting_angle(){

            // EXTREME LEARNING
            var goldenRatio = (1 + Math.sqrt(5))/2;
            this.angle_phi = this.to_degrees( 2 * Math.PI * this.index / goldenRatio );
            this.angle_theta = this.to_degrees( Math.acos(1 - 2*(this.index+0.5)/ this.number_items));
            // x, y, z = cos(phi) * sin(theta), sin(theta) * sin(phi), cos(theta);

            this.offset_theta = this.angle_theta;
            this.offset_phi = this.angle_phi;

            this.angle_theta = this.to_radians(this.angle_theta);
            this.angle_phi = this.to_radians(this.angle_phi);
        },

        get_top(){
            return this.radius + this.pos_z;
        },
        get_left(){
            return this.radius + this.pos_y;
        },

        get_pos_x(){
            return this.radius * Math.cos(this.angle_phi) * Math.sin(this.angle_theta);  // Wiki
        },
        get_pos_y(){
            return this.radius * Math.sin(this.angle_phi) * Math.sin(this.angle_theta); // Wiki
        },
        get_pos_z(){
            return this.radius * Math.cos(this.angle_theta);  // Wiki
        },

        get_linear_value(coord, min, max) {
            var b = min + ((max - min)/2);
            return (coord * ((max - b) / this.radius) + b);
        },
        get_blur(){
            // Blur_min etant 0, on ne le prend pas en compte
            var blur = (this.blur_max / 2) * (1 - (this.pos_x / this.radius));
            return ("blur(" + blur + "vw)");
        },
        get_size(){
            return this.get_linear_value(this.pos_x, this.size_min, this.size_max);
        },
        get_opacity(){
            return this.get_linear_value(this.pos_x, this.opacity_min, 1);
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
        transition: all 0.0s;
    }
</style>
