import { createRouter, createWebHistory } from "vue-router"
import Home from "./pages/Home.vue"
import NotFound from './pages/NotFound.vue'

const routes = [
  {
    path: '/company/:company_id/',
    name: 'Home',
    component: Home
  },
  {
    path: '/company/:company_id/application/:application_id',
    name: 'AppHome',
    component: Home
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  base: '/',
  routes
})

export default router