import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { routeGuard } from './guard';
Vue.use(VueRouter)

const routes = [
  {
    path: '/company/:company_id/',
    name: 'Home',
    beforeEnter: routeGuard,
    component: Home
  },
  {
    path: '/company/:company_id/about',
    beforeEnter: routeGuard,
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
