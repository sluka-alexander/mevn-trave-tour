import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = import('../views/Home.vue');
const Register = import('../views/Register.vue');
const Login = import('../views/Login.vue');
const Users = import('../views/Users.vue');
const Tours = import('../views/Tours.vue');
const NewTour = import('../views/NewTour.vue');
const EditTour = import('../views/EditTour.vue');
const Dashboard = import('../views/Dashboard.vue');
const Logout = import('../views/Logout.vue');
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
    path: '/register',
    name: 'Register',
    component: () => Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => Login,
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
  },
  {
    path: '/tours/:id',
    name: 'EditTour',
    component: () => EditTour,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => Dashboard,
  },
  {
    path: '/error',
    name: 'Error',
    component: () => Error,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => Logout,
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
