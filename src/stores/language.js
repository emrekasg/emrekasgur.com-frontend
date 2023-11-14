import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', () => {
    const language = localStorage.getItem('language') || 'en'
    const languageRef = ref(language)

    const changeLanguage = (lang) => {
        languageRef.value = lang
        localStorage.setItem('language', lang)
    }

    return {
        language: computed(() => languageRef.value),
        changeLanguage
    }
})
