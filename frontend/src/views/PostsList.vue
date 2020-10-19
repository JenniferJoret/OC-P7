<template>
  <section id="listPosts" class="d-flex flex-column flex-wrap col-12 mt-3">
    <!-- BLOC SIDE -->
    <div class="bg-main-color p-4 info-fixed --left d-none d-xl-block">
      <h2 class="actus text-white text-center pb-4">Dernières actualités chez <span
          class="text-second">Groupomania</span> </h2>
      <hr>
      <div class="text-center text-white py-2">
        <h3>L'Automne est arrivé !</h3>
        <p class=""> Préparez-vous à la fête d'Halloween et n'oubliez pas de participer à la tombola !</p>
      </div>
      <div class="text-center text-white py-2">
        <h3>Réunion trimestrielle</h3>
        <p class="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores quia, officia autem,
          aliquid voluptatibus suscipit provident molestiae soluta corporis recusandae quisquam, doloremque ab hic! Eum
          molestias quae odio placeat animi. </p>
      </div>
    </div>
    <!-- SECTION ARTICLES -->
    <section class="articles d-flex w-100 flex-column align-items-center mb-5 py-2 px-0 col-xl-6 mx-auto">
      <h1 class="bg-t-white px-5 py-3 w-100 text-center text-second mx-auto">Fil d'actualité</h1>
      <article class="bg-t-white p-3 my-3 d-table w-100" v-for="(post, index) in posts" :key="index">
        <div class="mx-auto text-center px-md-4 pt-3">
          <!-- TITRE POST -->
          <h2>
            <router-link class="h2" :to="'/post/' + post.id">{{ post.title }}</router-link>
          </h2>
          <hr>
          <!-- DATE/UTILISATEUR -->
          <div class="d-flex flex-column flex-md-row text-left">
            <p class="date px-md-2 mb-0"><span class="far fa-clock pr-1"></span> Posté
              {{ getInterval(post.created_at) }}</p>
            <p class="user px-md-2 mb-0"><span
                class="fas fa-user-circle pr-1"></span>{{ post.user.firstName +' ' + post.user.lastName }}</p>
          </div>
          <hr>
        </div>
        <!-- CONTENU POST -->
        <p class="mx-auto text-md-justify px-3 px-md-5 post-content">{{ post.content }}</p>
        <!-- BOUTONS LIKE ET DISLIKE -->
        <div class="d-flex flex-column flex-md-row mx-auto px-lg-4 pb-3">
          <div class="d-flex mx-auto mx-md-4">
            <button class="btn btn-outline-dark px-2 mx-1" :class="post.liked ? 'active' : ''"
              @click="like(post.id)"><span class="fas fa-thumbs-up pr-1"></span>
              {{ getCountLikes(post.usersLiked) }}</button>
            <button class="btn btn-outline-dark px-2 mx-1 " :class="post.disliked ? 'active' : ''"
              @click="dislike(post.id)"><span class="fas fa-thumbs-down pr-1"></span>
              {{ getCountLikes(post.usersDisliked) }}</button>
          </div>
          <!-- BOUTON COMMENTAIRES -->
          <router-link class="d-flex mx-auto mx-md-4 comment-link btn btn-outline-dark mt-3 mt-md-0"
            :to="'/post/' + post.id">
            {{ post.commentsCount }} commentaire(s) <span class="fas fa-comment-dots pl-1"></span> </router-link>
        </div>
      </article>

      <span class="bg-t-white px-5 py-3 w-100 text-center">Il n'y a plus rien à afficher !</span>
    </section>

    <!-- BLOC SIDE -->
    <div class=" bg-main-color p-4 info-fixed --right d-none d-xl-block">
      <h2 class="actus text-white text-center pb-4">Dernières actualités chez <span
          class="text-second">Groupomania</span> </h2>
      <hr>
      <div class="text-center text-white py-2">
        <h3>L'Automne est arrivé !</h3>
        <p class=""> Préparez-vous à la fête d'Halloween et n'oubliez pas de participer à la tombola !</p>
      </div>
      <div class="text-center text-white py-2">
        <h3>Réunion trimestrielle</h3>
        <p class="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores quia, officia autem,
          aliquid voluptatibus suscipit provident molestiae soluta corporis recusandae quisquam, doloremque ab hic! Eum
          molestias quae odio placeat animi. </p>
      </div>

    </div>
  </section>
  <!--End #main -->
</template>

<script>
import PostDataService from "../services/PostDataService";

import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

export default {
  name: "posts-list",
  data() {
    return {
      posts: [],
      currentPost: null,
      currentIndex: -1
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    //find all posts
    retrievePosts() {
      PostDataService.getAll()
        .then(response => {
          response.data.forEach(
            element => {
              if (element.usersDisliked.includes(this.currentUser.id)) {
            element.liked = false
            element.disliked = true
          } else if (element.usersLiked.includes(this.currentUser.id)) {
            element.liked = true
            element.disliked = false
          }
            }
          )
          this.posts = response.data;
        })
    },
    //post likes
    like(postId) {
      PostDataService.get(postId)
        .then(response => {
          this.currentPost = response.data;
          const postLikes = this.currentPost.usersLiked;
          let sendLike = 0;
          if (!postLikes.includes(this.currentUser.id)) {
            sendLike = 1;
          }
          var data = {
            userId: this.currentUser.id,
            like: sendLike
          }
          PostDataService.likePost(this.currentPost.id, data)
            .then(response => {
              for (var i = 0, len = this.posts.length; i < len; i++) {
                if (this.posts[i].id == response.data.id) {
                  this.posts[i].usersDisliked = response.data.usersDisliked;
                  this.posts[i].usersLiked = response.data.usersLiked;
                  if (this.posts[i].usersLiked.includes(this.currentUser.id)) {
                    this.posts[i].liked = true
                    this.posts[i].disliked = false
                  } else {
                    this.posts[i].liked = false
                  }
                }
              }
            })
          })
    },
    //post dislikes
    dislike(postId) {
      PostDataService.get(postId)
        .then(response => {
          this.currentPost = response.data;
          const postDislikes = this.currentPost.usersDisliked;
          let sendLike = 0;
          if (!postDislikes.includes(this.currentUser.id)) {
            sendLike = -1;
          }
          var data = {
            userId: this.currentUser.id,
            like: sendLike
          }
          PostDataService.likePost(this.currentPost.id, data)
            .then(response => {
              for (var i = 0, len = this.posts.length; i < len; i++) {
                if (this.posts[i].id == response.data.id) {
                  this.posts[i].usersDisliked = response.data.usersDisliked;
                  this.posts[i].usersLiked = response.data.usersLiked;
                  if (this.posts[i].usersDisliked.includes(this.currentUser.id)) {
                    this.posts[i].liked = false
                    this.posts[i].disliked = true
                  } else {
                    this.posts[i].disliked = false
                  }
                }
              }
            })
        })
    },
    //get time interval
    getInterval(date) {
      var interval = moment(date).fromNow();
      return interval
    },
    //get count of likes and dislikes
    getCountLikes(str) {
      let likes = str.split(',');
      likes = likes.length;
      return likes - 1
    },
  },

  mounted() {
    this.retrievePosts();
  }
}


</script>
