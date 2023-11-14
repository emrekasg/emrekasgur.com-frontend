import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localStorage.getItem('theme') || 'light')

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  const setThemeOnStart = () => {
    const theme = localStorage.getItem('theme') || 'light'
    document.documentElement.setAttribute('data-theme', theme)
  }

  return { theme, toggleTheme, setThemeOnStart }
});