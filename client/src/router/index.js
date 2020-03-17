import Vue from 'vue';
import VueRouter from 'vue-router';

import UserService from '../services/UserService';

const Home = import('../views/Home.vue');
const Register = import('../views/Register.vue');
const Login = import('../views/Login.vue');
const Users = import('../views/Users.vue');
const Tours = import('../views/Tours.vue');
const NewTour = import('../views/NewTour.vue');
const EditTour = import('../views/EditTour.vue');
const Dashboard = import('../views/Dashboard.vue');
const NotFound = import('../views/NotFound.vue');
const Error = import('../views/Error.vue');

const Authenticated = localStorage.getItem('token');

let role = '';

function roleUser() {
  role = '';
  UserService.Dashboard()
    .then((res) => {
      role = res.data.user.role;
    });
}
roleUser();

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => Home,
  },
  {
    path: '/user/register',
    name: 'Register',
    component: () => Register,
    beforeEnter: ((to, from, next) => {
      if (Authenticated !== null) next({ name: 'Home' });
      else next();
    }),
  },
  {
    path: '/user/login',
    name: 'Login',
    component: () => Login,
    beforeEnter: ((to, from, next) => {
      if (Authenticated !== null) next({ name: 'Home' });
      else next();
    }),
  },
  {
    path: '/user/dashboard',
    name: 'Dashboard',
    component: () => Dashboard,
    beforeEnter: ((to, from, next) => {
      if (Authenticated === null) next({ name: 'Login' });
      else next();
    }),
  },
  {
    path: '/users',
    name: 'User',
    component: () => Users,
    beforeEnter: ((to, from, next) => {
      if (role !== 'admin') next({ name: 'Home' });
      else next();
    }),
  },
  {
    path: '/tours',
    name: 'Tours',
    component: () => Tours,
  },
  {
    path: '/tours/new',
    name: 'NewTour',
    component: () => NewTour,
    beforeEnter: ((to, from, next) => {
      if (role !== 'admin') next({ name: 'Login' });
      else next();
    }),
  },
  {
    path: '/tours/:id',
    name: 'EditTour',
    component: () => EditTour,
    beforeEnter: ((to, from, next) => {
      if (role !== 'admin') next({ name: 'Login' });
      else next();
    }),
  },
  {
    path: '/error',
    name: 'Error',
    component: () => Error,
  },
  {
    path: '/*',
    name: 'NotFound',
    component: () => NotFound,
  },
  {
    path: '/tours/*',
    name: 'NotFound',
    component: () => NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
