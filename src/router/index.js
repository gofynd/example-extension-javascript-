import { createRouter, createWebHistory } from "vue-router"
import { routeGuard } from "./guard"
import Home from "../views/Home"

const routes = [
  {
    path: '/company/:company_id/',
    name: 'Home',
    beforeEnter: routeGuard,
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes
})

export default router