<template>
  <section class="articles d-flex flex-column align-items-center col-xl-6 mx-auto mb-3 px-0">
    <article class="bg-t-white p-3  my-3 d-table w-100" v-if="post !== null">
      <div class="mx-auto text-center px-md-4">
        <!-- TITRE POST -->
        <h1 class="h1">{{ post.title }}</h1>
        <hr>
        <div class="d-flex justify-content-between">
          <!-- DATE/UTILISATEUR -->
          <div class="d-flex flex-column flex-md-row text-left">
            <p class="date px-md-2 mb-0"><span class="far fa-clock pr-1"></span>Posté
              {{ getInterval(post.created_at) }}</p>
            <p class="user px-md-2 mb-0"><span
                class="fas fa-user-circle pr-1"></span>{{ post.user.firstName + ' ' + post.user.lastName }}</p>
          </div>
        <!-- BOUTONS EDITER/SUPPRIMER -->
          <div class="d-flex flex-column flex-md-row">
            <button v-if="post.userId === currentUser.id" class="mx-2 edit-delete" @click="editPost(post)"><span
                class="fas fa-edit pr-1"></span> </button>
            <button v-if="post.userId === currentUser.id || isAdmin()" class="mx-2 edit-delete"
              @click="deletePost()"><span class="fas fa-trash-alt pr-1"></span> </button>
          </div>
        </div>
        <hr>
      </div>
      <div class="px-md-4">
        <!-- EDITION POST -->
        <div class="d-flex flex-column col-9 mx-auto" v-if="post.isEditing">
          <label for="title">Titre</label>
          <input class="form-control" id="title" required v-model="post.title" name="content" value="{}" />
          <label for="content">Contenu</label>
          <textarea class="form-control" type="text" id="content" required v-model="post.content" name="content"
            value="{}"></textarea>
          <button @click="updatePost(post)" class="btn btn-success mx-auto my-3">Mettre à jour !</button>
        </div>
        <!-- CONTENU POST -->
        <p v-else class="mx-auto text-md-justify px-md-5 post-content">{{ post.content }}</p>
      </div>
      <!-- BOUTONS LIKE ET DISLIKE -->
      <div class="d-flex flex-column flex-md-row mx-auto px-lg-4 pb-3">
        <div class="d-flex mx-auto mx-md-4 ">
          <button class="btn btn-outline-dark px-2 mx-1" :class="post.liked ? 'active' : ''"
            @click="like(post.id)"><span class="fas fa-thumbs-up pr-1"></span>
            {{ getCountLikes(post.usersLiked) }}</button>
          <button class="btn btn-outline-dark px-2 mx-1" :class="post.disliked ? 'active' : ''"
            @click="dislike(post.id)"><span class="fas fa-thumbs-down pr-1"></span>
            {{ getCountLikes(post.usersDisliked) }}</button>
        </div>
        <!-- BOUTON COMMENTAIRES -->
        <router-link class="d-flex mx-auto mx-md-4 comment-link btn btn-outline-dark mt-3 mt-md-0" :to="'/post/' + post.id"> {{ commentsCount }} commentaire(s) <span class="fas fa-comment-dots pl-1"></span> </router-link>
      </div>
    </article>
  </section>
</template>

<script>
import PostDataService from "../services/PostDataService";
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

export default {
  name: "post",
  data() {
    return {
      post: null,
      liked: false,
      disliked: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    commentsCount() {
      return this.$store.state.commentsCount
    }
  },
  methods: {
    getPost(id) {
      console.log(this.currentUser)
      PostDataService.get(id)
        .then(response => {
          response.data.isEditing = false;
          this.post = response.data;
          if (this.post.usersDisliked.includes(this.currentUser.id)) {
            this.liked = false
            this.disliked = true
          } else if (this.post.usersLiked.includes(this.currentUser.id)) {
            this.liked = true
            this.disliked = false
          }
        })
        .catch(e => {
          console.log(e);
        });
      },
    getInterval(date) {
      var interval = moment(date).fromNow();
      return interval
    },
    like(postId) {
      PostDataService.get(postId)
        .then(response => {
          this.post = response.data;
          const postLikes = this.post.usersLiked;
          let sendLike = 0;
          if (!postLikes.includes(this.currentUser.id)) {
            sendLike = 1;
            this.liked = true
            this.disliked = false
          }else{
            this.liked = false
          }
          var data = {
            userId: this.currentUser.id,
            like: sendLike
          }
          PostDataService.likePost(this.post.id, data)
            .then(response => {
              this.post.usersDisliked = response.data.usersDisliked;
              this.post.usersLiked = response.data.usersLiked;
            })
        })
    },
    dislike(postId) {
      PostDataService.get(postId)
        .then(response => {
          this.post = response.data;
          const postDislikes = this.post.usersDisliked;
          let sendLike = 0;
          if (!postDislikes.includes(this.currentUser.id)) {
            sendLike = -1;
            this.liked = false
            this.disliked = true
          }else{
            this.disliked = false
          }
          var data = {
            userId: this.currentUser.id,
            like: sendLike
          }
          PostDataService.likePost(this.post.id, data)
            .then(response => {
              this.post.usersDisliked = response.data.usersDisliked;
              this.post.usersLiked = response.data.usersLiked;
            })
        })
    },
    getCountLikes(str) {
      let likes = str.split(',');
      likes = likes.length;
      return likes - 1
    },
    editPost(post) {
      post.isEditing = !post.isEditing;
    },
    updatePost(post) {
      var data = {
        userId: post.userId,
        content: post.content,
        title: post.title
      };
      console.log(data)
      PostDataService.update(this.$route.params.id, data)
        .then(response => {
          post.title = response.data.title;
          post.content = response.data.content;
          post.isEditing = false;
        })
    },
    deletePost() {
      PostDataService.delete(this.$route.params.id).then(() => {
        this.$router.push('/posts');
      });
    },
    isAdmin() {
      if (this.currentUser && this.currentUser.roles) {
        console.log(this.currentUser.roles)
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
  },

  mounted() {
    this.getPost(this.$route.params.id)
  }
}
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
