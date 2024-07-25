import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import NotFound from '../pages/NotFound.vue'
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
    path: '/company/:company_id/application/:application_id',
    name: 'Home',
    beforeEnter: routeGuard,
    component: Home
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
