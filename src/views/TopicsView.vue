<script setup>
import { watch } from 'vue'
import TagBadge from '../components/TagBadge.vue';
</script>

<template>
  <div class="title">
    Topics
  </div>
  <div class="topic-badges">
    <TagBadge v-for="tag in tags" :topicName="tag.name" :postCount="tag.post_count" />
  </div>
</template>

<style lang="scss" scoped>
.topic-badges {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 2rem;
  font-weight: bold;
}

.topic-badge {
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
}

* {
  color: var(--reverse-color);
}
</style>

<script>
export default {
  name: 'TopicsView',
  data() {
    return {
      tags: [],
    }
  },
  methods: {
    async getTags() {
      const response = await fetch('https://backend.emrekasgur.com/tags');
      const data = await response.json()

      this.tags = data.data;
    },
  },
  created() {
    watch(() => this.$route.params, () => {
      this.tags = this.$route.params.tagName;
      this.getTags();
    }, { immediate: true });
  },
}
</script>