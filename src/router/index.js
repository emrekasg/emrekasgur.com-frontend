import { createRouter, createWebHistory } from 'vue-router'
import mainRoutes from './main'
import sadSubdomainRoutes from './sad'
import cloudRoutes from './cloud'


const host = window.location.host
const isLocalhost = host.indexOf('localhost') > -1
const parts = host.split('.')

let routes = []

if (isLocalhost) {
  routes = mainRoutes;
}else{
  switch (parts[0]) {
    case 'sad':
      routes = sadSubdomainRoutes
      break
    case 'cloud':
      routes = cloudRoutes
      break
    default:
      routes = mainRoutes
      break
  }
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
