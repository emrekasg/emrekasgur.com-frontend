<template>
    <div class="main">
        <h1>Random sad video</h1>
        <video controls autoplay ref="video">
            <source :src="videoLink" type="video/mp4">
            Your browser does not support the video tag.
        </video>

    </div>
</template>
  
<style lang="scss" scoped>
.main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
        videoLink: '',
    }
  },
  methods: {
    async getVideo() {
      const response = await fetch('https://backend.emrekasgur.com/sad_video');
      const data = await response.json()

      this.videoLink = data.data;
      this.$refs.video.load();
      this.$refs.video.play();
    },

  },
  mounted() {
    this.getVideo();
  },
}
</script>