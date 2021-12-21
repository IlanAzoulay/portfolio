<template>
    <div class="min-h-screen">
        <div class="py-8">
            <h1>
                Contact me!
            </h1>
            <h2 class="pt-1 pb-2">
                I'm open to new job opportunities, project ideas, or anything else!
            </h2>
            <div class="grid grid-cols-2 grid-rows-2 sm:grid-cols-3 pt-2">
                <div class="col-span-2 col-start-1 col-end-3 row-start-1">
                    <form class=" flex flex-col space-y-4 sm:space-y-6">
                        <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6">
                            <input v-model="user.name" type="text_small" placeholder="Your name" required>
                            <input v-model="user.email" type="email" placeholder="youraddress@protonmail.com" required>
                        </div>
                        <input v-model="user.subject" type="text_small" placeholder="Subject" required>
                        <textarea v-model="user.message" placeholder="Hi Ilan! I am writing to you about..." required/>
                    </form>
                </div>
                <div class="w-min py-4 mx-auto sm:mr-0 sm:ml-auto col-start-1 sm:col-start-2 col-end-3 row-start-2">
                    <div class="button_futurist">
                        SEND MESSAGE
                    </div>
                </div>
            </div>
        </div>

    </div>    
</template>


<script>
export default {
    data(){
        /* on definit toutes les variables ici, marche un peu comme un JSON */
        return {
            user: {
                name: "",
                email: "",
                subject: "",
                message: ""
            }
        }
    }
}
</script>


<style scoped>
    /* h1 {
        @apply text-cyan;
        font-family: Arial;
        font-size: 2.25vw;
        font-weight: bold;
    } */
    h2{
        @apply text-white text-sm opacity-75 py-2 text-center sm:text-left;
        font-family: Arial;
        /* font-size: 1.25vw; */
    }

    input, textarea {
        @apply text-white text-sm py-4 px-3;
        @apply bg-gray_moi-light;
        font-family: Arial;
        /* font-size: 1.2vw; */
        width: 100%;
        height: 100%;
        /* Y, X */
        /* padding: 1.75vh 1vw;   */
        /* display: inline-block; */
        box-sizing: border-box;
        box-shadow: 0 0 0.1rem cyan; /* Glow */
        transition: all 0.5s;
    }
    textarea {
        height: 50vh;
    }
    input:focus, textarea:focus {
        outline: none !important;
        border-color: cyan;
        box-shadow: 0 0 0.5rem cyan; /* Glow */
        transition: all 0.4s;
    }

</style>
