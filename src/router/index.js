import { createRouter, createWebHistory } from "vue-router"
import { routeGuard } from "./guard"
import Home from "../pages/Home"
import NotFound from '../pages/NotFound.vue'

const routes = [
  {
    path: '/company/:company_id/',
    name: 'Home',
    beforeEnter: routeGuard,
    component: Home
  },
  {
    path: '/company/:company_id/application/:application_id',
    name: 'AppHome',
    beforeEnter: routeGuard,
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
  base: process.env.BASE_URL,
  routes
})

export default router