<template>
    <div v-show="activated" class="fixed top-0 left-0 z-50 w-screen h-screen" >

        <!-- Just the background -->
        <div class="absolute z-0 left-0 top-0 bg-black opacity-70 text-white"
            style="width: 100%; height: 100%;">
        </div>

        <div class="absolute z-10 top-0 left-0 w-full h-full">
            <div id="id_messagebox" class="messagebox z-0" :style="`${common_style} ${get_message_style()}`">
                <div class="closebox z-10 right-0 top-0" @click="activated = false;"
                    :style="`${common_style}`">
                    X
                </div>
                {{message}}
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        mobile: {type: Boolean, required: true},
        message: {type: String, required: true},
        width: {type: Number, default: 20},
        height: {type: Number, default: 20},
        bg_color: {type: String, default: '#1A1A1A'},
        text_color: {type: String, default: 'cyan'},
        border_color: {type: String, default: 'cyan'}
    },
    data() {
        return {
            activated: false,
            closebox_left: undefined,
            closebox_top: undefined,
            common_style: ''
        }
    },

    beforeMount(){
        this.common_style = this.get_style();
    },

    methods: {
        activate(){
            this.activated = true;
        },
        convert_px_to_vw(px) {
            return px * (100 / document.documentElement.clientWidth);
        },
        get_style() {
            var style = 'color:' + this.text_color + ';';
            style += 'border-color:' + this.border_color +';';
            style += 'box-shadow: 0 0 0.25vw ' + this.border_color + ';';
            return style;
        },
        get_message_style(){
            var style = '';
            if (this.mobile){
                style += 'min-width: 80%; max-width: 90%;'
            }
            return style;
        }
    }
}
</script>

<style scoped>
    .messagebox, .closebox {
        @apply absolute text-center text-lg opacity-100 border-2 rounded-lg;
        font-family: Arial;
        font-weight: normal;
        /* white-space: nowrap; */
        display: block;
    }
    .messagebox {
        @apply absolute text-lg;
        @apply px-8 sm:px-24 py-8 mx-auto;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .closebox {
        @apply cursor-pointer text-sm py-1 px-3;
        @apply border-t-0 border-r-0;
        border-radius: 0 0 0 0.5rem; /* Topleft topright bottomright bottomleft */
    }

</style>
