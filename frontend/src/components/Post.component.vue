<template>
  <section class="articles d-flex flex-column align-items-center my-5 py-2 col-xl-6 mx-auto">
    <article class="main-post bg-t-white m-5 d-table w-100" v-if="post !== null">
      <div class="post-content mx-auto text-center px-4">
        <h1 class="h1">{{ post.title }}</h1>
        <hr>
        <div class="d-flex">
          <div class="date px-2">
            <p><i class="far fa-clock pr-1"></i> Posté {{ getInterval(post.created_at) }}</p>
          </div>
          <div class="user px-2"><i class="fas fa-user-circle pr-1"></i><a
              href="profile.html">{{ post.user.firstName +' ' + post.user.lastName }}</a>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center px-4">
        <p>{{ post.content }}</p>
      </div>
      <div class="counters-line d-flex mx-auto px-4 pb-3">
        <div class="like btn btn-outline-dark px-2 mx-1"><button :class="liked ? 'liked' : ''" @click="like(post.id)"><i
              class="fas fa-thumbs-up pr-1"></i>{{ getCountLikes(post.usersLiked) }}</button>
        </div>
        <div class="dislike btn btn-outline-dark px-2 mx-1 "><button @click="dislike(post.id)"><i
              class="fas fa-thumbs-down pr-1"></i>{{ getCountLikes(post.usersDisliked) }}</button></div>
        <div class="comments btn btn-outline-dark px-2 mx-4">
          <router-link :to="'/post/' + post.id">{{ commentsCount }} commentaires<i class="fas fa-comment-dots pl-1"></i></router-link>
        </div>
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
      dislikes: 0
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    commentsCount(){
        return this.$store.state.commentsCount
    }
  },
  methods: {
    getPost(id) {
      PostDataService.get(id)
        .then(response => {
          this.post = response.data;
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
            this.disliked = true
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
