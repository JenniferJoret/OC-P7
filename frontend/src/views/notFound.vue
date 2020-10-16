<template>
    <div class="m-align">
        <div class="d-flex bg-t-white flex-column justify-content-center text-center m-auto p-5">
            <h1>Cette page n'existe pas !</h1>
                <router-link v-if="currentUser" to="/posts" class="nav-link">
                    Retour à l'accueil
                </router-link>
                <router-link v-else to="/home" class="nav-link">
                    Retour à l'accueil
                </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
        }
    };
</script>