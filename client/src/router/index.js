import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../views/store';

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
    meta: {
      notRequiresAuth: true,
    },
  },
  {
    path: '/user/login',
    name: 'Login',
    component: () => Login,
  },
  {
    path: '/user/dashboard',
    name: 'Dashboard',
    component: () => Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users',
    name: 'User',
    component: () => Users,
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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/tours/:id',
    name: 'EditTour',
    component: () => EditTour,
    meta: {
      requiresAuth: true,
    },
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next({ name: 'Login' });
  }
  if (to.matched.some((record) => record.meta.notRequiresAuth)) {
    if (store.getters.isLoggedIn) {
      next({ name: 'Home' });
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
