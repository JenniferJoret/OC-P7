<template>
  <div v-if="currentUser" class="container bg-t-white">
    <h1 class="text-center p-5">
      Profil de <strong>{{currentUser.firstName}}</strong>
    </h1>
    <div class="profile-details col-6 mx-auto py-3">
      <p><strong>Nom :</strong> {{ currentUser.lastName }}</p>
      <p><strong>Prénom :</strong> {{ currentUser.firstName }}</p>
      <p>
        <strong>Jeton d'authentification :</strong>
        {{currentUser.accessToken.substring(0, 20)}} ...
        {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
      </p>
      <p>
        <strong>Identifiant utilisateur :</strong>
        {{currentUser.id}}
      </p>
      <p>
        <strong>Adresse mail :</strong>
        {{currentUser.email}}
      </p>
      <strong>Rôle :</strong>
      <ul>
        <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
      </ul>
      <button @click="deleteUser(currentUser.id)" class="btn btn-danger mx-auto">Supprimer le compte</button>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
deleteUser() {
  const id = this.currentUser.id;
  console.log(id);
  this.$store.dispatch('auth/delete', id)
      .then(() => {
        this.$router.push('/home');
      });
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>