<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg fixed-top px-0 px-md-5 justify-content-around d-flex " id="nav">
            <button class="d-lg-none btn btn-outline-light px-2 mx-2 order-0" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="fas fa-bars"></span>
            </button>
                <router-link class="navbar-brand m-0 order-1 col-10 col-md-auto mx-auto text-center" v-if="currentUser" to="/posts">
                    <img class="img-fluid" src="../src/assets/icon-left-font-monochrome-white.svg" alt="Logo de Groupomania">
                </router-link>
                <router-link class="navbar-brand m-0 order-1 col-10 col-md-auto mx-auto text-center" v-else to="/home">
                    <img class="img-fluid" src="../src/assets/icon-left-font-monochrome-white.svg" alt="Logo de Groupomania">
                </router-link>
            <div class="collapse navbar-collapse order-3 order-lg-2" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto px-3">
                    <li class="nav-item">
                        <router-link v-if="currentUser" to="/posts" class="nav-link">
                            <font-awesome-icon icon="home" /> Accueil
                        </router-link>
                        <router-link v-else to="/home" class="nav-link">
                            <font-awesome-icon icon="home" /> Accueil
                        </router-link>
                    </li>
                    <li v-if="currentUser" class="nav-item">
                        <router-link to="/addPost" class="nav-link">
                            <font-awesome-icon icon="edit" /> Ajouter un post
                        </router-link>
                    </li>
                    <li v-if="!currentUser" class="nav-item">
                        <router-link to="/signUp" class="nav-link">
                            <font-awesome-icon icon="user-plus" /> Inscription
                        </router-link>
                    </li>
                    <li v-if="!currentUser" class="nav-item">
                        <router-link to="/login" class="nav-link">
                            <font-awesome-icon icon="sign-in-alt" /> Connexion
                        </router-link>
                    </li>
                    <li v-if="currentUser" class="nav-item">
                        <router-link to="/profile" class="nav-link">
                            <font-awesome-icon icon="user" /> {{ currentUser.firstName }}
                        </router-link>
                    </li>
                    <li v-if="currentUser" class="nav-item">
                        <a class="nav-link" href @click.prevent="logOut">
                            <font-awesome-icon icon="sign-out-alt" /> Déconnexion
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
            logOut() {
                this.$store.dispatch('auth/logout');
                this.$router.push('/login');
            }
        }
    };
</script>