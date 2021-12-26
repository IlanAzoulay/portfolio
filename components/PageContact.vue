<template>
    <div class="min-h-screen">
        <div class="pt-8 pb-20">
            <h1>
                Contact me!
            </h1>
            <h2 class="pt-1 pb-2">
                I'm open to new job opportunities, project ideas, or anything else!
            </h2>

            <div class="grid grid-cols-2 sm:grid-cols-3 pt-2">

                <div class="col-span-2 col-start-1 col-end-3 row-start-1">
                    <form class=" flex flex-col space-y-4 sm:space-y-6">
                        <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6">
                            <input v-model="name" type="text_small" placeholder="Your name" required>
                            <input v-model="email" type="email" placeholder="youraddress@protonmail.com" required>
                        </div>
                        <input v-model="subject" type="text_small" placeholder="Subject" required>
                        <textarea v-model="message" placeholder="Hi Ilan! I am writing to you about..." required/>
                    </form>
                </div>

                <div class="relative w-min pt-4 mx-auto sm:mr-0 sm:ml-auto col-start-1 sm:col-start-2 col-end-3">
                    <div class="button_futurist" @click="checkInput">
                        SEND MESSAGE
                    </div>
                </div>

                <MyPopup ref="popup"
                    :mobile="mobile"
                    :message="popup_Message"/>

            </div>

        </div>

    </div>    
</template>


<script>
import emailjs from 'emailjs-com';
import MyPopup from '@/components/MyPopup.vue'

export default {
    props: {
        mobile: Boolean
    },
    components: {
        MyPopup
    },
    data(){
        /* on definit toutes les variables ici, marche un peu comme un JSON */
        return {
            name: "",
            email: "",
            subject: "",
            message: "",
            popup_Message: ''
        }
    },
    methods: {
        checkInput() {
            if (!this.name.length || !this.email.length || !this.message.length) {
                this.popup_Message = 'Please fill all the fields';
                this.$refs.popup.activate();
            } else {
                this.sendEmail();
                this.popup_Message = 'The message was sent successfully. Thanks!';
                this.$refs.popup.activate();
            }
        },
        sendEmail() {
            emailjs.send(
                process.env.NUXT_ENV_EMAILJS_SERVICEID,
                process.env.NUXT_ENV_EMAILJS_TEMPLATEID,
                {
                    subject: this.subject,
                    from_name: this.name,
                    from_email: this.email,
                    message: this.message
                },
                process.env.NUXT_ENV_EMAILJS_USERID
            );
            this.name = this.email = this.message = this.subject = '';
        }
    }
}
</script>


<style scoped>
    h2{
        @apply text-white text-base opacity-75 py-2 text-center sm:text-left;
        font-family: Arial;
    }

    input, textarea {
        @apply text-white text-sm py-4 px-3;
        @apply bg-gray_moi-light;
        font-family: Arial;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        box-shadow: 0 0 0.1rem cyan; /* Glow */
        transition: all 0.5s;
    }
    textarea {
        height: 20rem;
    }
    input:focus, textarea:focus {
        outline: none !important;
        border-color: cyan;
        box-shadow: 0 0 0.5rem cyan; /* Glow */
        transition: all 0.4s;
    }

</style>
