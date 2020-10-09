<template>
    <nav class="navbar navbar-expand-lg fixed-top px-0 px-md-5 justify-content-around d-flex no-wrap" id="nav">
        <button class="d-lg-none btn btn-outline-light px-2 order-0" type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
        </button>
        <a class="navbar-brand m-0 order-1 col-8 col-md-auto mx-auto text-center" href="index.html">
            <img class="img-fluid" src="../src/assets/icon-left-font-monochrome-white.svg" alt="">
        </a>

        <div class="collapse navbar-collapse order-3 order-lg-2" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto px-3">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">Accueil</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/f-media" class="nav-link">Forum multimédia</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/f-text" class="nav-link">Forum textuel</router-link>
                </li>
            </ul>

        </div>
        <a href="" class="user-btn order-2 order-lg-3 d-flex flex-column  flex-lg-row align-items-center">
            <span class="far fa-user-circle fa-2x pr-2"></span>Utilisateur
        </a>
    </nav>
    <router-view />
</template>