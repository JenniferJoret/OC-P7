<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="profile-img-card" />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="firstName">Prénom</label>
            <input v-model="user.firstName" v-validate="'required|min:3|max:20'" type="text" class="form-control"
              name="firstName" />
            <div v-if="submitted && errors.has('firstName')" class="alert-danger">{{errors.first('firstName')}}</div>
          </div>
          <div class="form-group">
            <label for="lastName">Nom</label>
            <input v-model="user.lastName" v-validate="'required|min:3|max:20'" type="text" class="form-control"
              name="lastName" />
            <div v-if="submitted && errors.has('lastName')" class="alert-danger">{{errors.first('lastName')}}</div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input v-model="user.email" v-validate="'required|email|max:50'" type="email" class="form-control"
              name="email" />
            <div v-if="submitted && errors.has('email')" class="alert-danger">{{errors.first('email')}}</div>
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input v-model="user.password" v-validate="'required|min:6|max:40'" type="password" class="form-control"
              name="password" autocomplete="on"/>
            <div v-if="submitted && errors.has('password')" class="alert-danger">{{errors.first('password')}}</div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">S'inscrire</button>
          </div>
        </div>
      </form>

      <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">{{message}}</div>
    </div>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    //register user
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/signUp', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};
</script>
