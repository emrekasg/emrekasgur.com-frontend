<script setup>
import Post from '../components/Post.vue'

import { useLanguageStore } from '../stores/language'
import { watch } from 'vue'
</script>

<template>
  <div class="posts">
    <Post v-for="post in posts" :key="post.title" :title="post.title" :brief="post.brief" :createdAt="post.created_at"
      :postLink="post.post_link" />
  </div>
</template>

<style scoped>
.posts {
  width: 50%;
  height: 10%;
  display: flex;

  flex-direction: column;
  align-items: space-between;
}
</style>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      posts: []
    }
  },
  methods: {
    async getPosts() {
      const languageStore = useLanguageStore()
      const lang = languageStore.language
      const response = await fetch('https://backend.emrekasgur.com/posts?language=' + lang)
      const data = await response.json()

      this.posts = data.data;
    }
  },
  beforeMount() {
    this.getPosts();
  },
  mounted() {
    const languageStore = useLanguageStore()
    watch(() => languageStore.language, () => {
      this.getPosts()
    });
  }
}
</script>