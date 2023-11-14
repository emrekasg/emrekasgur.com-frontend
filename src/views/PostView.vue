<script setup>
import { useLanguageStore } from '../stores/language'
import { watch } from 'vue'

import { marked } from 'marked'
</script>

<template>
  <div class="post">
    <div class="post-headers">
      <div class="post-title">
        {{ this.post.title }}
      </div>
      <div class="brief">
        {{ this.post.brief }}
      </div>
    </div>

    <div class="post-content" v-html="this.post.content" />
  </div>
</template>

<style lang="scss" scoped>
.post {
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
</style>

<script>

export default {
  name: 'PostView',
  data() {
    return {
      postLink: this.$route.params.postLink,
      post: [],
    }
  },
  methods: {
    async getPosts() {
      const languageStore = useLanguageStore()
      const lang = languageStore.language
      const response = await fetch('https://backend.emrekasgur.com/posts/' + this.postLink + '?language=' + lang)
      const data = await response.json()

      this.post = data.data;
      this.post.content = marked(this.post.content, {
        sanitize: true,
        breaks: true,
        gfm: true,
        tables: true,
        extensions: ['linkify', 'table', 'tasklist', 'emoji'],
      });
    },
    processContent() {
      return
    }
  },
  beforeMount() {
    this.getPosts()
  },
  mounted() {

    const languageStore = useLanguageStore()
    watch(() => languageStore.language, () => {
      this.getPosts()
    })

  },
}

</script>