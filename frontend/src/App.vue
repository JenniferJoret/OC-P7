<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg fixed-top px-0 px-md-5 justify-content-around d-flex no-wrap" id="nav">
            <button class="d-lg-none btn btn-outline-light px-2 order-0" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <i class="fas fa-bars"></i>
            </button>
            <a class="navbar-brand m-0 order-1 col-8 col-md-auto mx-auto text-center" href="#">
                <img class="img-fluid" src="../src/assets/icon-left-font-monochrome-white.svg" alt="">
            </a>
            <div class="collapse navbar-collapse order-3 order-lg-2" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto px-3">
                    <li v-if="currentUser" class="nav-item">
                        <router-link to="/posts" class="nav-link">
                            <font-awesome-icon icon="home" /> Accueil
                        </router-link>
                    </li>
                    <li v-else class="nav-item">
                        <router-link to="/home" class="nav-link">
                            <font-awesome-icon icon="home" /> Accueil
                        </router-link>
                    </li>
                    <li v-if="currentUser" class="nav-item">
                        <router-link to="/addPost" class="nav-link">
                            <font-awesome-icon icon="edit" /> Ajouter un post
                        </router-link>
                    </li>
                    <div v-if="!currentUser" class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <router-link to="/signUp" class="nav-link">
                                <font-awesome-icon icon="user-plus" /> Inscription
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/login" class="nav-link">
                                <font-awesome-icon icon="sign-in-alt" /> Connexion
                            </router-link>
                        </li>
                    </div>
                    <div v-if="currentUser" class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <router-link to="/profile" class="nav-link">
                                <font-awesome-icon icon="user" /> {{ currentUser.firstName }}
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href @click.prevent="logOut">
                                <font-awesome-icon icon="sign-out-alt" /> Déconnexion
                            </a>
                        </li>
                    </div>
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
            logOut() {
                this.$store.dispatch('auth/logout');
                this.$router.push('/login');
            }
        }
    };
</script>