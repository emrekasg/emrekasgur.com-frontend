<script setup>
import { useLanguageStore } from '../stores/language'
import { watch } from 'vue'

import Post from '../components/Post.vue'
</script>

<template>
  <div class="topic-title">
    {{ topicName }}
  </div>
  <div class="posts" v-if="postLoaded && posts != null">
    <Post v-for="post in posts" :key="post.title" :title="post.title" :brief="post.brief" :createdAt="post.created_at"
      :postLink="post.post_link" :tag="post.tag" />
  </div>
  <div v-else-if="postLoaded && posts == null">
    No posts found.
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<style scoped> .posts {
   width: 50%;
   height: 10%;
   display: flex;

   flex-direction: column;
   align-items: space-between;
 }

 .topic-title {
   margin: 3rem;
   font-size: 2rem;
   font-weight: bold;
   color: var(--reverse-color);
   background-color: var(--extrainfo-color);
   padding: 1rem;
   border-radius: 5px;
 }
</style>

<script>

export default {
  name: 'TopicView',
  data() {
    return {
      topicName: this.$route.params.topicName,
      posts: [],
      colors: [],
      postLoaded: false
    }
  },
  methods: {
    async getPostsByTag() {
      const language = useLanguageStore().language;
      const response = await fetch('https://backend.emrekasgur.com/posts?tag=' + this.topicName + '&language=' + language);
      const data = await response.json();

      this.postLoaded = true;
      this.posts = data.data;
    },
  },
  created() {
    watch(() => this.$route.params, () => {
      this.topicName = this.$route.params.topicName;
      this.getPostsByTag();
    }, { immediate: true });
  },
  mounted() {
    const languageStore = useLanguageStore()
    watch(() => languageStore.language, () => {
      this.postLoaded = false;
      this.getPostsByTag()
    })
  },
}

</script>