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
        index: Number,
        number_items: Number,
        radius: Number,
        rotation_matrix: Array
    },
    data() {
        return {
            pos_x: 0,
            pos_y: 0,
            pos_z: 0,
            angle_theta: 0,
            angle_phi: 0,
            blur_max: 0.1,
            size_min: 1,
            size_max: 2.5,
            opacity_min: 0.5
        };
    },

    mounted() {
        this.set_starting_points();
    },

    // Activates when prop changes
    watch: {
        // "input_phi": function(val, oldVal) {
        //     this.update_phi();
        //     this.update_pos();
        // }
        "rotation_matrix": function() {
            this.rotate_pos();
        }
    },

    methods: {
        to_radians(degrees){
            return degrees * (Math.PI/180.0);
        },
        to_degrees(radians){
            return radians * (180.0/Math.PI);
        },

        /* multiply current coordinates with Euler matrix */
        rotate_pos(){
            var x = this.pos_x;
            var y = this.pos_y;
            var z = this.pos_z;

            this.pos_x = this.rotation_matrix[0][0] * x + this.rotation_matrix[0][1] * y + this.rotation_matrix[0][2] * z;
            this.pos_y = this.rotation_matrix[1][0] * x + this.rotation_matrix[1][1] * y + this.rotation_matrix[1][2] * z;
            this.pos_z = this.rotation_matrix[2][0] * x + this.rotation_matrix[2][1] * y + this.rotation_matrix[2][2] * z;
        },

        /* set initial angles and coordinates at the very beginning */
        set_starting_points(){

            // source: EXTREME LEARNING
            var goldenRatio = (1 + Math.sqrt(5))/2;
            this.angle_phi = this.to_degrees( 2 * Math.PI * this.index / goldenRatio );
            this.angle_theta = this.to_degrees( Math.acos(1 - 2*(this.index+0.5)/ this.number_items));
            // x, y, z = cos(phi) * sin(theta), sin(theta) * sin(phi), cos(theta);

            this.angle_theta = this.to_radians(this.angle_theta);
            this.angle_phi = this.to_radians(this.angle_phi);

            this.pos_x = this.radius * Math.cos(this.angle_phi) * Math.sin(this.angle_theta);
            this.pos_y = this.radius * Math.sin(this.angle_phi) * Math.sin(this.angle_theta);
            this.pos_z = this.radius * Math.cos(this.angle_theta);
        },

        get_top(){
            return this.radius + this.pos_z;
        },
        get_left(){
            return this.radius + this.pos_y;
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
