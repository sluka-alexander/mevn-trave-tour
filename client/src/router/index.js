import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/users',
    name: 'User',
    component: () => import('../views/Users.vue'),
  },
  {
    path: '/tours',
    name: 'Tours',
    component: () => import('../views/Tours.vue'),
  },
  {
    path: '/newtour',
    name: 'NewTour',
    component: () => import('../views/NewTour.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
