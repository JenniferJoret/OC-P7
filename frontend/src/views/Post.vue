<template>
  <div>
    <post></post>
    <comment></comment>
  </div>
</template>
<script>

import Post from '../components/Post.component';
import Comment from '../components/Comment.component';

export default {
  name: 'single-post',
  components: {
  Post,
  Comment,
  }
}
</script>