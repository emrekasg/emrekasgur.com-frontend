<script setup>
import { useLanguageStore } from '../stores/language'
import { watch } from 'vue'

import { marked } from 'marked'
</script>

<template>
  <div class="post-main" v-if="postLoaded && post != null">
    <div class="post-headers">
      <div class="post-title">
        {{ post.title }}
      </div>
      <div class="date">
        Created at: {{ post.created_at }}<br>
        Updated at: {{ post.updated_at }}
      </div>
    </div>

    <div class="post-content">
      <div v-html="post.content"></div>
    </div>
  </div>
  <div v-else-if="postLoaded && post == null">
    Selected language of this post is not available.
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<style lang="scss" scoped>
.post-main {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: space-between;
}

.post-title {
  font-size: 2rem;
  font-weight: bold;
}

* {
  color: var(--reverse-color);
}

.date {
  font-size: 0.8rem;
  color: var(--extrainfo-color);
}
</style>

<script>

export default {
  name: 'PostView',
  data() {
    return {
      postLink: this.$route.params.postLink,
      post: {},
      postLoaded: false,
    }
  },
  methods: {
    async getPosts() {
      const languageStore = useLanguageStore()
      const lang = languageStore.language
      const response = await fetch('https://backend.emrekasgur.com/posts/' + this.postLink + '?language=' + lang)
      const data = await response.json()


      this.postLoaded = true;

      this.post = data.data;
      this.post.content = marked(this.post.content, {
        sanitize: true,
        breaks: true,
        gfm: true,
        tables: true,
        extensions: ['linkify', 'table', 'tasklist', 'emoji'],
      });
    },
  },
  created() {
    watch(() => this.$route.params, () => {
      this.postLink = this.$route.params.postLink;
      this.getPosts();
    }, { immediate: true })

  },
  mounted() {
    const languageStore = useLanguageStore()
    watch(() => languageStore.language, () => {
      this.postLoaded = false;
      this.getPosts()
    })
  },
}
</script>