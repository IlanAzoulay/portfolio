<template>
    <div class="bg-gray_moi min-h-screen">
        <div style="padding-left: 4vw; padding-top: 7vh;">
            <h1>
                Contact me!
            </h1>
            <h2 style="padding-top:2vh; padding-bottom:3vh;">
                I'm open to new job opportunities, project ideas, or anything else!
            </h2>
            <div class="grid grid-cols-3">
                <div class="col-span-2">
                    <form class=" flex flex-col space-y-6">
                        <div class=" flex flex-row space-x-6">
                            <input v-model="user.name" type="text_small" placeholder="Your name" required>
                            <input v-model="user.email" type="email" placeholder="youraddress@protonmail.com" required>
                        </div>
                        <input v-model="user.subject" type="text_small" placeholder="Subject" required>
                        <textarea v-model="user.message" placeholder="Hi Ilan! I am writing to you about..." required/>
                    </form>
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
    h1 {
        @apply text-cyan;
        font-family: Arial;
        font-size: 2.25vw;
        font-weight: bold;
    }
    h2{
        @apply text-white;
        font-family: Arial;
        font-size: 1.25vw;
    }

    input, textarea {
        @apply text-white;
        @apply bg-gray_moi-light;
        font-family: Arial;
        font-size: 1.2vw;
        width: 100%;
        padding: 1.75vh 1vw;  /* Y, X */
        /* display: inline-block; */
        box-sizing: border-box;
        box-shadow: 0 0 0.1vw cyan; /* Glow */
        transition: all 0.5s;
    }
    textarea {
        height: 50vh;
    }
    input:focus, textarea:focus {
        outline: none !important;
        border-color: cyan;
        box-shadow: 0 0 0.5vw cyan; /* Glow */
        transition: all 0.5s;
    }

</style>
