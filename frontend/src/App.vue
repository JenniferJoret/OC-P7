<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg fixed-top px-0 px-md-5 justify-content-around d-flex " id="nav">
            <button class="d-lg-none btn btn-outline-light px-2 mx-2 order-0" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="fas fa-bars"></span>
            </button>
            <router-link class="navbar-brand m-0 order-1 col-10 col-md-auto mx-auto text-center" v-if="currentUser"
                to="/posts">
                <img class="img-fluid" src="../src/assets/icon-left-font-monochrome-white.svg"
                    alt="Logo de Groupomania">
            </router-link>
            <router-link class="navbar-brand m-0 order-1 col-10 col-md-auto mx-auto text-center" v-else to="/home">
                <img class="img-fluid" src="../src/assets/icon-left-font-monochrome-white.svg"
                    alt="Logo de Groupomania">
            </router-link>
            <div class="collapse navbar-collapse order-3 order-lg-2" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto px-3">
                    <li class="nav-item">
                        <router-link v-if="currentUser" to="/posts" class="nav-link">
                            <span class="fas fa-home pl-1"></span> Accueil
                        </router-link>
                        <router-link v-else to="/home" class="nav-link">
                            <span class="fas fa-home pl-1"></span> Accueil
                        </router-link>
                    </li>
                    <li v-if="currentUser" class="nav-item">
                        <router-link to="/addPost" class="nav-link">
                            <span class="fas fa-edit pl-1"></span> Ajouter un post
                        </router-link>
                    </li>
                    <li v-if="!currentUser" class="nav-item">
                        <router-link to="/signUp" class="nav-link">
                            <span class="fas fa-user-plus pl-1"></span> Inscription
                        </router-link>
                    </li>
                    <li v-if="!currentUser" class="nav-item">
                        <router-link to="/login" class="nav-link">
                            <span class="fas fa-sign-in-alt pl-1"></span> Connexion
                        </router-link>
                    </li>
                    <li v-if="currentUser" class="nav-item">
                        <router-link to="/profile" class="nav-link">
                            <span class="fas fa-user pl-1"></span> {{ currentUser.firstName }}
                        </router-link>
                    </li>
                    <li v-if="currentUser" class="nav-item">
                        <a class="nav-link" href @click.prevent="logOut">
                            <span class="fas fa-sign-out-alt pl-1"></span> Déconnexion
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <router-view />
    </div>
</template>

<script>
export default {
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
    methods: {
        //logout user
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        }
    }
};
</script>