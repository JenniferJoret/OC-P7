<template>
  <section class="articles d-flex flex-column align-items-center my-5 py-2 col-xl-6 mx-auto">
      <article class="main-post bg-t-white m-5 d-table">
        <div class="post-content mx-auto text-center px-4">
          <h1 class="h1">{{ post.title }}</h1>
          <hr>
          <div class="d-flex">
            <div class="date px-2"><i class="far fa-clock pr-1"></i>{{ post.createdAt }}</div>
            <div class="user px-2"><i class="fas fa-user-circle pr-1"></i><a href="profile.html">{{ post.user.firstName }}</a>
            </div>
          </div>
        </div>
        <div class="video-wrap my-3 d-flex justify-content-center px-4">
          <p>{{ post.content }}</p>
        </div>
        <div class="counters-line d-flex mx-auto px-4 pb-3">
          <div class="like btn btn-outline-dark px-2 mx-1"><a href="#"><i class="fas fa-thumbs-up pr-1"></i>21</a>
          </div>
          <div class="dislike btn btn-outline-dark px-2 mx-1 "><a href="#"><i
                class="fas fa-thumbs-down pr-1"></i>4012</a></div>
          <div class="comments btn btn-outline-dark px-2 mx-4"><a href="post.html">63 commentaires<i
                class="fas fa-comment-dots pl-1"></i></a></div>
        </div>
      </article>
    </section>
</template>

<script>
import PostDataService from "../services/PostDataService";

export default {
  name: "post",
  data() {
    return {
      post: null,
      message: ''
    };
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

    updatePost() {
      PostDataService.update(this.post.id, this.post)
        .then(response => {
          console.log(response.data);
          this.message = 'The post was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deletePost() {
      PostDataService.delete(this.post.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "post" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {
    this.message = '';
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
