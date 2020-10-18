<template>
  <div class="container bg-t-white p-4 col-10">
    <h1 class="text-center p-4">Bienvenue sur le réseau social de <span class="text-second">Groupomania</span> !</h1>
    <p class="text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam voluptates mollitia iure dolor aliquam eligendi molestias hic? Officiis tenetur soluta, ea vel, odio sit illum, delectus similique doloribus dolor Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas ut fugiat laudantium at, magnam minus explicabo quisquam enim nostrum? Distinctio quam veritatis iste dolorem, non saepe temporibus officia illo maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit nihil consequuntur eligendi repudiandae labore sunt aliquam omnis, tempore repellendus distinctio quasi suscipit commodi perspiciatis amet earum culpa animi eum fugit?</p>
    <div class="d-flex justify-content-around pt-4 my-4">
    <router-link class="h2" :to="'/signUp'">S'inscrire</router-link>
    <router-link class="h2" :to="'/login'">Se connecter</router-link>
    </div>
  </div>
</template>

<script>
// import UserService from '../services/user.service';

// export default {
//   name: 'Home',
//   data() {
//     return {
//       content: ''
//     };
//   },
//   mounted() {
//     UserService.getPublicContent().then(
//       response => {
//         this.content = response.data;
//       },
//       error => {
//         this.content =
//           (error.response && error.response.data && error.response.data.message) ||
//           error.message ||
//           error.toString();
//       }
//     );
//   }
// };
</script>
