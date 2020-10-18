<template>
  <div class="submit-form bg-t-white p-4 col-xl-6 mx-auto">
    <h1 class="text-center">Ajouter un post</h1>
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Titre</label>
        <input type="text" class="form-control" id="title" required v-model="post.title" name="title" />
      </div>

      <div class="form-group">
        <label for="content">Contenu</label>
        <textarea class="form-control" id="content" required v-model="post.content" name="content"></textarea>
      </div>

      <button @click="savePost" class="btn btn-success">Poster !</button>
    </div>

    <div v-else>
      <h4>Le post a bien été envoyé !</h4>
      <button class="btn btn-success" @click="newPost">Un autre ?</button>
    </div>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";
import Post from '../models/post';

export default {
  name: "add-post",
  data() {
    return {
      post: new Post( '', '', ''),
      submitted: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    savePost() {
      var data = {
        userId: this.currentUser.id,
        title: this.post.title,
        content: this.post.content
      };
      PostDataService.create(data)
        .then(response => {
          this.post.id = response.data.id;
          this.submitted = true;
        })
    },
    
    newPost() {
      this.submitted = false;
      this.post = {};
    }
  }
};
</script>

