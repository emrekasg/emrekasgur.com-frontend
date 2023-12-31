import HomeView from '../views/HomeView.vue'

export default [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
    },
    {
        path: '/post/:postLink',
        name: 'postView',
        component: () => import('../views/PostView.vue')
    },
    {
        path: '/topics',
        name: 'topicsView',
        component: () => import('../views/TopicsView.vue')
    },
    {
        path: '/topic/:topicName',
        name: 'topicView',
        component: () => import('../views/TopicView.vue')
    }
]