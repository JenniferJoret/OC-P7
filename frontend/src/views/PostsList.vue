<template>
  <div id="listPosts" class="d-flex flex-column flex-wrap col-12">
    <div class="bg-main-color p-4 info-fixed --left d-none d-xl-block">
      <h2 class="actus text-white text-center pb-4">Dernières actualités chez <span
          class="text-second">Groupomania</span> </h2>
      <hr>
      <div class="text-center text-white py-2">
        <h4>L'Automne est arrivé !</h4>
        <p class=""> Préparez-vous à la fête d'Halloween et n'oubliez pas de participer à la tombola !</p>
      </div>
      <div class="text-center text-white py-2">
        <h4>Réunion trimestrielle</h4>
        <p class="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores quia, officia autem,
          aliquid voluptatibus suscipit provident molestiae soluta corporis recusandae quisquam, doloremque ab hic! Eum
          molestias quae odio placeat animi. </p>
      </div>
    </div>
    <h1 class="bg-t-white px-5 py-3 w-100 text-center text-second col-xl-6 mx-auto">Fil d'actualité</h1>

    <section class="articles d-flex w-100 flex-column align-items-center mb-5 py-2 col-xl-6 mx-auto">
      <article class="main-post bg-t-white m-4 d-table" v-for="(post, index) in posts" :key="index">
        <div class="post-content mx-auto text-center px-4 pt-3">
          <router-link class="h2"  :to="'/post/' + post.id">{{ post.title }}</router-link>
          <hr>
          <div class="d-flex">
            <div class="date px-2"><p><i class="far fa-clock pr-1"></i> Posté {{ getInterval(post.created_at) }}</p></div>
            <div class="user px-2"><i class="fas fa-user-circle pr-1"></i><a href="profile.html">{{ post.user.firstName +' ' + post.user.lastName }}</a>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center px-4">
          <p>{{ post.content }}</p>
        </div>
        <div class="counters-line d-flex mx-auto px-4 pb-3">
          <div class="like btn btn-outline-dark px-2 mx-1"><a href="#"><i class="fas fa-thumbs-up pr-1"></i>21</a>
          </div>
          <div class="dislike btn btn-outline-dark px-2 mx-1 "><a href="#"><i
                class="fas fa-thumbs-down pr-1"></i>4012</a></div>
          <div class="comments btn btn-outline-dark px-2 mx-4"><a href="post.html">63 commentaires<i class="fas fa-comment-dots pl-1"></i></a></div>
        </div>
      </article>
      
<span class="bg-t-white px-5 py-3 w-100 text-center">Il n'y a plus rien à afficher !</span>
    </section>

<div class=" bg-main-color p-4 info-fixed --right d-none d-xl-block">
      <h2 class="actus text-white text-center pb-4">Dernières actualités chez <span
          class="text-second">Groupomania</span> </h2>
      <hr>
      <div class="text-center text-white py-2">
        <h4>L'Automne est arrivé !</h4>
        <p class=""> Préparez-vous à la fête d'Halloween et n'oubliez pas de participer à la tombola !</p>
      </div>
      <div class="text-center text-white py-2">
        <h4>Réunion trimestrielle</h4>
        <p class="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores quia, officia autem,
          aliquid voluptatibus suscipit provident molestiae soluta corporis recusandae quisquam, doloremque ab hic! Eum
          molestias quae odio placeat animi. </p>
      </div>

    </div>
  </div>
  <!--End #main -->
</template>

<script>
import PostDataService from "../services/PostDataService";
import moment from 'moment';
import 'moment/locale/fr';  // without this line it didn't work
moment.locale('fr');


export default {
  name: "posts-list",
  data() {
    return {
      posts: [],
      currentPost: null,
      currentIndex: -1,
    };
  },
  methods: {
    retrievePosts() {
      PostDataService.getAll()
        .then(response => {
          this.posts = response.data;
        })
    },
    getInterval(date) {
      var interval = moment(date).fromNow();
      return interval
    }
  },
  
  mounted() {
    this.retrievePosts();
  }
}


</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>