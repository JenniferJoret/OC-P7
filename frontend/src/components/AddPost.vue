<template>
  <div class="submit-form mt-5 pt-5">
    <div v-if="!submitted">
      <div class="form-group mt-5 pt-5">
        <label for="title">Titre</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="post.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="content">Contenu</label>
        <input
          class="form-control"
          id="content"
          required
          v-model="post.content"
          name="content"
        />
      </div>

      <button @click="savePost" class="btn btn-success">Poster !</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newPost">Un autre ?</button>
    </div>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";

export default {
  name: "add-post",
  data() {
    return {
      post: {
        title: "",
        content: "",
      },
      submitted : true
    };
  },
  methods: {
    savePost() {
      var data = {
        title: this.post.title,
        content: this.post.content
      };

      PostDataService.create(data)
        .then(response => {
          this.post.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newPost() {
      this.submitted = false;
      this.post = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
