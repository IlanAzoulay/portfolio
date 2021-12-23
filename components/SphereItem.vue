<template>
    <div class="absolute top-0 left-0 w-full h-full">
        <h1 :style="`top: ${get_top()}rem; left: ${get_left()}rem; filter: ${get_blur()}; font-size: ${get_size()}rem;
        opacity: ${get_opacity()}; color: ${text_color}`" >
            {{text}}
        </h1>
    </div>
    
</template>


<script>
export default {
    props: {
        text: {type: String, required: true},
        index: {type: Number, required: true},
        number_items: {type: Number, required: true},
        radius: {type: Number, required: true},
        rotation_matrix: Array,
        text_color: {type: String, required: true},
        font_size_min: Number,
        font_size_max: {type: Number, required: true},
        blur_max: {type: Number, required: true},
        padding: Number,
    },
    data() {
        return {
            // positions x, y, and z between -1 et 1. Will be multiplied by radius afterwards
            // IMPORTANT NOTE: spheric (x, y, z) is (y, z, x) in screen coordinates
            pos_x: 0,
            pos_y: 0,
            pos_z: 0,
            // Spheric coordinates for initial placement
            angle_theta: 0,
            angle_phi: 0,

            opacity_min: 0.5
        };
    },

    mounted() {
        this.set_starting_points();
    },

    // Activates when prop changes
    watch: {
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

            // Safety, make sure no coordinate ever goes beyond 1
            if (this.pos_x > 1){this.pos_x = 1;}
            if (this.pos_y > 1){this.pos_y = 1;}
            if (this.pos_z > 1){this.pos_z = 1;}
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

            this.pos_x = Math.cos(this.angle_phi) * Math.sin(this.angle_theta);
            this.pos_y = Math.sin(this.angle_phi) * Math.sin(this.angle_theta);
            this.pos_z = Math.cos(this.angle_theta);
        },

        get_top(){
            return this.padding + this.radius + this.radius * this.pos_z;
        },
        get_left(){
            return this.padding + this.radius + this.radius * this.pos_y;
        },

        get_linear_value(coord, min, max) {
            var b = min + ((max - min)/2);
            return (coord * (max - b) + b);
        },
        get_blur(){
            var blur = (this.blur_max / 2) * (1 - this.pos_x);
            return ("blur(" + blur + "rem)");
        },
        get_size(){
            return this.get_linear_value(this.pos_x, this.font_size_min, this.font_size_max);
        },
        get_opacity(){
            return this.get_linear_value(this.pos_x, this.opacity_min, 1);
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
    }
</style>
