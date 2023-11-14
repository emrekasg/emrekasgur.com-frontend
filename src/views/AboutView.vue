<template>
  <div class="about">
    <button class="email" @click="this.open('mailto: me@emrekasgur.com')">
      Email
    </button>
    <button class="github" @click="this.open('https://github.com/emrekasg')">
      Github
    </button>
    <button class="instagram" @click="this.open('https://instagram.com/emrekasgur')">
      Instagram
    </button>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  methods: {
    open(url) {
      window.open(url, '_blank')
    }
  }
}

</script>
<style lang="scss" scoped>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

button {
  width: 100%;
  height: 2rem;
  margin: 1rem;
  color: var(--background-color);
  background-color: var(--reverse-color);
  border: 1px solid var(--reverse-color);
  border-radius: 5px;
  cursor: pointer;
}
</style>