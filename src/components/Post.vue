<script setup>
import TagBadge from './TagBadge.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  brief: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  postLink: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div class="post">
    <div class="title">
      <router-link :to="{ name: 'postView', params: { postLink: postLink } }">
        {{ title }}
      </router-link>
    </div>

    <div class="brief">
      <p> {{ brief }} </p>

    </div>
    <div class="timestamps">
      <p> Created at: {{ createdAt }} </p>
    </div>

    <div class="tag">
      <p> Tagged with: </p>
      <TagBadge :topicName="tag"></TagBadge>
    </div>

    <div class="line"></div>
  </div>
</template>

<style lang="scss" scoped>
.post {
  width: 100%;
  height: 100%;
  display: flex;

  flex-direction: column;
  align-items: space-between;

  margin-top: 2rem;
}

.post .title a {
  text-decoration: none;
  color: var(--reverse-color);
  font-size: 1.5rem;

}

.post .title a:hover {
  text-decoration: underline;
}

.post .brief {
  width: 70%;
  color: gray;
  font-size: 0.8rem;
}

.post .timestamps {
  width: 100%;
  color: var(--extrainfo-color);
  font-size: 0.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.post .line {
  width: 100%;
  height: 1px;
  background-color: var(--line-color);
  margin-bottom: 2rem;
}

.tag {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: var(--reverse-color);
}

.tag .tag-badge {
  background-color: var(--extrainfo-color);
  color: var(--reverse-color);
  border-radius: 5px;
  padding: 0.5rem;
  margin-left: 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
}
</style>
