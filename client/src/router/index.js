import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../views/store';

const Home = import('../views/Home.vue');
const Register = import('../views/Register.vue');
const Login = import('../views/Login.vue');
const Users = import('../views/Users.vue');
const EditUser = import('../views/Edit-user.vue');
const Tours = import('../views/Tours.vue');
const NewTour = import('../views/New-tour.vue');
const EditTour = import('../views/Edit-tour.vue');
const Dashboard = import('../views/Dashboard.vue');
const NotFound = import('../views/Not-found.vue');
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
      notAuth: true,
    },
  },
  {
    path: '/user/login',
    name: 'Login',
    component: () => Login,
    meta: {
      notAuth: true,
    },
  },
  {
    path: '/user/dashboard',
    name: 'Dashboard',
    component: () => Dashboard,
    meta: {
      auth: true,
    },
  },
  {
    path: '/user/:id',
    name: 'EditUser',
    component: () => EditUser,
    meta: {
      Admin: true,
    },
  },
  {
    path: '/users',
    name: 'User',
    component: () => Users,
    meta: {
      Admin: true,
    },
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
      Admin: true,
    },
  },
  {
    path: '/tours/:id',
    name: 'EditTour',
    component: () => EditTour,
    meta: {
      Admin: true,
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
  if (to.matched.some((record) => record.meta.auth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next({ name: 'Login' });
  }
  if (to.matched.some((record) => record.meta.Admin)) {
    setTimeout(() => {
      if (store.getters.isAdmin) {
        next();
      } else {
        next({ name: 'Home' });
      }
    }, 0);
  }
  if (to.matched.some((record) => record.meta.notAuth)) {
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
