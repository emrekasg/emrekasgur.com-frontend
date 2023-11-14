<script setup>
import { RouterLink, RouterView } from 'vue-router'
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
    </div>

    <div class="theme">
      <button @click="toggleTheme">Toggle theme</button>
    </div>
  </div>


  <div class="main">
    <RouterView></RouterView>
  </div>
</template>

<script>
import { useLanguageStore } from './stores/language';
import { useThemeStore } from './stores/theme';

export default {
  name: 'App',
  methods: {
    changeLanguage(language) {
      useLanguageStore().changeLanguage(language)
    },
    toggleTheme() {
      const themeStore = useThemeStore()
      themeStore.toggleTheme()
    },
  },

  mounted() {
    useThemeStore().setThemeOnStart()
  },
}

</script>

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
</style>
