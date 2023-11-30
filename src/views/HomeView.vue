<script setup>
import Post from '../components/Post.vue'

import { useLanguageStore } from '../stores/language'
import { watch } from 'vue'
</script>

<template>
    <div class="navbar">
    <div class="title">
      Emre Kasgur
    </div>

    <div class="links">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About me</router-link>
    </div>

    <div class="language">
      <a @click="changeLanguage('en')">English</a>
      <a @click="changeLanguage('tr')">Turkish</a>
      <div class="theme">
        <button @click="toggleTheme">Toggle theme</button>
      </div>
    </div>
  </div>


  <div class="main">
    <div class="posts">
    <Post v-for="post in posts" :key="post.title" :title="post.title" :brief="post.brief" :createdAt="post.created_at"
      :postLink="post.post_link" :tag="post.tag"></Post>
  </div>
  </div>
</template>

<style lang="scss" scoped> 
.navbar {
  /* fix it to the top and make it span the %50 of the screen but make sure it is centered in the middle of the screen and not preventing other elements from being displayed */
  display: flex;
  width: 100%;
  height: 15%;

  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: var(--reverse-color);
  font-family: 'Edu TAS Beginner', cursive;
}

.links {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 50%;
  height: 100%;

  background-color: var(--reverse-color);
}

.links a {
  margin: 1rem;
  color: var(--background-color);
  text-decoration: none;
}

.language {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.language a {
  margin: 1rem;
  color: var(--reverse-color);
  text-decoration: none;
  cursor: pointer;
}

.language a:hover {
  text-decoration: underline;
}

.theme {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.theme button {
  margin: 1rem;
  color: var(--background-color);

  text-decoration: none;

  background-color: var(--reverse-color);
  border: 1px solid var(--reverse-color);
  border-radius: 5px;

  padding: 0.5rem;

  cursor: pointer;

  transition: all 0.2s ease-in-out;
}

.theme button:hover {
  background-color: var(--background-color);
  color: var(--reverse-color);
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.posts {
   width: 50%;
   height: 10%;
   display: flex;

   flex-direction: column;
   align-items: space-between;
 }
</style>

<script>
import { useLanguageStore } from '../stores/language';
import { useThemeStore } from '../stores/theme';

export default {
  name: 'HomeView',
  data() {
    return {
      posts: []
    }
  },
  methods: {
    changeLanguage(language) {
      useLanguageStore().changeLanguage(language)
    },
    toggleTheme() {
      const themeStore = useThemeStore()
      themeStore.toggleTheme()
    },
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
    useThemeStore().setThemeOnStart()
    watch(() => languageStore.language, () => {
      this.getPosts()
    });
  }
}
</script>