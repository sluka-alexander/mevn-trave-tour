import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    isAdmin: false,
    error: '',
    isDarkTheme: localStorage.getItem('darkMode') || false,
    users: [],
    editTour: [],
    allTours: [],
    lang: localStorage.getItem('lang') || 'en',
  },
  actions: {
    register({ commit }, user) {
      this.state.error = '';
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({ url: 'http://localhost:8081/user/register', data: user, method: 'POST' })
          .then((res) => {
            this.state.error = res.data.message;
            resolve(res);
          }).catch((err) => {
            reject(err);
          });
      });
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({ url: 'http://localhost:8081/user/login', data: user, method: 'POST' })
          .then((res) => {
            localStorage.setItem('token', res.data.token);
            commit('auth_success', res.data.token, res.data.user);
            this.state.user = res.data.user;
            if (res.data.user.role === 'admin') {
              this.state.isAdmin = true;
            }
            resolve(res);
          })
          .catch((err) => {
            commit('auth_error', err);
            localStorage.removeItem('token');
            this.state.error = 'login failed';
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common.Authorization;
        resolve();
      });
    },
    clearError() {
      this.state.error = '';
    },
    dashboard({ commit }) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({
          url: 'http://localhost:8081/user/dashboard',
          method: 'POST',
          headers: {
            'auth-token': `Bearer ${localStorage.getItem('token')}`,
          },
        })
          .then((res) => {
            this.state.user = res.data.user;
            if (res.data.user.role === 'admin') {
              this.state.isAdmin = true;
            }
            resolve(res);
          })
          .catch((err) => {
            commit('auth_error', err);
            reject(err);
          });
      });
    },
    users({ commit }) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({
          url: 'http://localhost:8081/user/users',
          method: 'POST',
          headers: {
            'auth-token': `Bearer ${localStorage.getItem('token')}`,
          },
        })
          .then((res) => {
            this.state.users = res.data;
          })
          .catch((err) => {
            commit('auth_error', err);
            reject(err);
          });
      });
    },
    newTour({ commit }, data) {
      try {
        commit('auth_request');
        axios({
          url: 'http://localhost:8081/tours/new',
          method: 'POST',
          data,
          headers: {
            'auth-token': `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } catch (err) {
        console.error(err);
      }
    },
    getEditTour({ commit }, params) {
      try {
        commit('auth_request');
        axios({
          url: `http://localhost:8081/tours/${params.id}`,
          method: 'POST',
          headers: {
            'auth-token': `Bearer ${localStorage.getItem('token')}`,
          },
        }).then((res) => {
          this.state.editTour = res.data;
        });
      } catch (err) {
        console.error(err);
      }
    },
    updateTour({ commit }, data) {
      try {
        commit('auth_request');
        axios({
          url: `http://localhost:8081/tours/${data.id}`,
          method: 'PUT',
          data,
          headers: {
            'auth-token': `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } catch (err) {
        console.error(err);
      }
    },
    fetchTours() {
      try {
        axios({
          url: 'http://localhost:8081/tours',
          method: 'GET',
        })
          .then((res) => {
            this.state.allTours = res.data;
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.error(err);
      }
    },
    getTourSortDesc() {
      try {
        axios({
          url: 'http://localhost:8081/tours/desc',
          method: 'GET',
        })
          .then((res) => {
            this.state.allTours = res.data;
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.error(err);
      }
    },
    getTourSortAsc() {
      try {
        axios({
          url: 'http://localhost:8081/tours/asc',
          method: 'GET',
        })
          .then((res) => {
            this.state.allTours = res.data;
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.error(err);
      }
    },
    deleteTour({ commit }, id) {
      try {
        commit('auth_request');
        axios({
          url: `http://localhost:8081/tours/${id}`,
          method: 'DELETE',
          headers: {
            'auth-token': `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } catch (err) {
        console.error(err);
      }
    },
    checkDarkTheme() {
      const html = document.getElementsByTagName('html');
      if (this.state.isDarkTheme) {
        html[0].classList.add('dark-mode');
      } else localStorage.removeItem('darkMode');
    },
    darkTheme({ commit }) {
      const html = document.getElementsByTagName('html');
      commit('darkTheme');
      localStorage.setItem('darkMode', this.state.isDarkTheme);
      if (this.state.isDarkTheme) {
        html[0].classList.add('dark-mode');
      } else {
        html[0].classList.remove('dark-mode');
        localStorage.removeItem('darkMode');
      }
    },
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, token, user) {
      state.status = 'success';
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
      state.isAdmin = false;
      state.users = {};
    },
    darkTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
      state.status = 'theme edited';
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    DataUser: (state) => state.user,
    Error: (state) => state.error,
    isAdmin: (state) => state.isAdmin,
    users: (state) => state.users,
    EditTour: (state) => state.editTour,
    allTours: (state) => state.allTours,
    isDarkTheme: (state) => state.isAdmin,
  },
});
