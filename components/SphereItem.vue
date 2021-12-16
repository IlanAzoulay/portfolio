<template>
    <h1 :style="`left: ${input_x}px`" >
        {{input_x}}
    </h1>
</template>


<script>
export default {
    props: {
        text: String,
        input_x: Number
    },
    data() {
        return {
            // text: "TEST",
            radius: 10,
            /* x: avancee de x (a l'infini) */
            // input_x: 0,
            /* pos_x: coordonnee x entre [-radius, radius] */
            pos_x: this.x,
            pos_y: this.radius,
            opacity: 100,
            blur: 0
            // "--coord-x": this.input_x
        };
    },

    beforeMount() {
        let root = document.documentElement;
        root.style.setProperty('--coord-x', this.input_x);
        root.style.setProperty('--text-blur', this.input_x);
    },

    computed: {
        cssProps() {
            return {
                '--coord-x': this.input_x,
                '--text-blur': this.input_x
            }
        }
        // input_x() {
        //     console.log("bonjour")
        // }
    },

    methods: {
        set_starting_coord(index, number_items){

        },
        get_pos_x(){
            var modulo = (this.input_x - this.radius) % (4 * this.radius);
            if (modulo <= 2 * this.radius){
                return modulo;
            }
            return ((4 * this.radius) - modulo);
        },
        get_pos_y(){
            return (this.radius + (Math.sqrt(Math.pow(radius, 2) - Math.pow(pos_x, 2))));
        },
        set_coord(){
            let root = document.documentElement;
            // root.style.setProperty('--coord-x', this.pos_x);
            root.style.setProperty('--coord-x', this.input_x);
            root.style.setProperty('--coord-y', this.pos_y);
        }
    }
}
</script>


<style scoped>
    h1 {
        @apply text-cyan;
        font-family: Arial;
        font-size: var(--coord-x);
        position: relative;
        /* left: calc(var(--coord-x) *1px); */
        /* left: 40px; */
        /* left: var(--coord-x); */
        top: calc(var(--coord-y) *1px);
        /* filter: blur(calc(var(--coord-x) *1px)); */
        filter: blur(--text-blur);
    }
</style>
