<template>
    <div>
        <div class="word">
            <span v-for='(letter, index) in text' :key='index'
                :style="`font-size: ${fontsize}rem;`">
                {{letter}}
                <div v-if="letter == ' '">&nbsp;</div>
            </span>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        text: {type: String, required: true},
        fontsize: {type: Number, default: 2.5},  // rem
        color: {type: String, default: 'cyan'},
        color2: {type: String, default: 'white'},
        mobile: {type: Boolean, default: false}
    },

    beforeMount(){
        document.documentElement.style.setProperty('--color', this.color);
        document.documentElement.style.setProperty('--color2', this.color2);
    },
    mounted(){
        this.initialize_before();
        this.initialize_intro();
        this.initialize_span();
    },

    methods: {
        initialize_span(){
            const spans = document.querySelectorAll('.word span');

            spans.forEach((span) => {
                if (!this.mobile){
                    span.addEventListener('mouseover', (e) => {
                        e.target.classList.add('active');
                    });
                }
                else if (this.mobile){
                    span.addEventListener('click', (e) => {
                        e.target.classList.add('active');
                    });
                }
                span.addEventListener('animationend', (e) => {
                    e.target.classList.remove('active');
                });
            });
        },
        initialize_intro(){
            const spans = document.querySelectorAll('.word span');

            spans.forEach((span, index) => {
                // span.classList.add('before');

                span.addEventListener('animationend', (e) => {
                    e.target.classList.remove('entering');
                    span.removeEventListener('animationend', (e));
                });

                setTimeout(() => {
                    span.classList.remove('before');
                    span.classList.add('entering');
                }, 150 * (index+1))
            });
        },
        initialize_before(){
            const spans = document.querySelectorAll('.word span');

            spans.forEach((span) => {
                span.classList.add('before');
            });
        }
    }
}
</script>


<style scoped>
    .word {
        /* @apply text-cyan; */
        color: var(--color);
        font-family: 'Arial';
        font-weight: bold;
        white-space: nowrap;
    }

    .word span {
        cursor: pointer;
        display: inline-block;
        white-space: nowrap;
    }

    .word span.active {
        animation: boing 1.33s ease-in-out;
	    transform-origin: bottom center;
    }

    .word span.entering {
        animation: intro 0.5s ease-in-out forwards;
	    transform-origin: bottom center;
    }

    .word span.before {
        opacity: 0;
    }

    @keyframes intro {
        0% {
            opacity: 0;
            color: var(--color2);
            transform: scale(0.5) translate(0, 0) rotate(-30deg);
        }
        80% {
            transform: scaleY(1.3);
        }
        100% {
            opacity: 1;
            transform: scale(1) translate(0, 0) rotate(0deg);
            color: var(--color);
        }
    }

    @keyframes boing {
        0%, 100% {
            transform: scale(1) translate(0, 0);
            color: var(--color);
        }
        19%, 28% {
            transform: scale(1.2, 0.8) translate(0, 0);
        }
        37%{
            transform: scale(0.8, 1.2) translate(0, 0);
        }
        50%{
            transform: scale(1.1, 0.9) translate(0, 0);
            color: var(--color2);
        }
        62%{
            transform: scale(0.9, 1.1) translate(0, 0);
        }
        75%{
            transform: scale(1.05, 0.95) translate(0, 0);
        }
        87%{
            transform: scale(0.95, 1.05) translate(0, 0);
        }
    }

</style>
