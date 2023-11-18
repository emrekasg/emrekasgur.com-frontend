<script setup>
defineProps({
    topicName: {
        type: String,
        required: true
    },
    postCount: {
        type: Number,
        required: false
    },
})
</script>

<template>
    <div class="topic-badge" @click="$router.push({ name: 'topicView', params: { topicName: topicName } })"
        :style="{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }, { color: colors[Math.floor(Math.random() * colors.length)] }">
        {{ topicName }} {{ postCount > 0 ? ': ' + postCount : '' }}
    </div>
</template>

<style lang="scss" scoped>
.topic-badge {
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
}
</style>

<script>
export default {
    name: 'TagBadge',
    data() {
        return {
            colors: [
                '#32a852', '#32a8a6', '#325ba8', '#3c32a8', '#6f32a8', '#6f32a8', '#a8329c', '#a8323c', '#7da832', '#a8a432', '#a85732', '#a83232'
            ]
        }
    }
}

</script>