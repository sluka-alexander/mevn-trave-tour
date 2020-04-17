import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import environment from './environment';
import endpoints from './endpoints.const';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: null,
    error: null,
    validate: null,
    token: localStorage.getItem('token') || '',
    isAdmin: false,
    isDarkTheme: localStorage.getItem('darkMode') || false,
    isConfirmVader: false,
    isConfirmVaderSingleAppearance: localStorage.getItem('darthVaderConfirm') || false,
    lang: localStorage.getItem('lang') || 'en',
    user: {},
    users: [],
    editTour: [],
    editUser: [],
    allTours: [],
  },
  actions: {
    register({ commit }, user) {
      this.state.error = '';
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({ url: 'http://localhost:8081/user/register', data: user, method: 'POST' })
          .then((res) => {
            this.state.validate = res.data.message;
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
            this.state.validate = 'login failed';
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
    getUser({ commit }, params) {
      try {
        commit('auth_request');
        axios({
          url: `${environment.baseUrl}${endpoints.USER}${params.id}`,
          method: 'POST',
          headers: {
            'auth-token': `Bearer ${localStorage.getItem('token')}`,
          },
        }).then((res) => {
          this.state.editUser = res.data;
        });
      } catch (err) {
        console.error(err);
      }
    },
    updateUser({ commit }, data) {
      return axios.put(`${environment.baseUrl}${endpoints.USER}${data.id}`, data,
        { headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` } })
        .then(() => {
          commit('success');
        });
    },
    getAllTours({ commit }) {
      return axios.get(`${environment.baseUrl}${endpoints.TOURS}`)
        .then((res) => {
          commit('success');
          this.state.allTours = res.data;
        }).catch(() => {
          commit('error');
        });
    },
    newTour({ commit }, data) {
      return axios.post('http://localhost:8081/tours/new', data, {
        headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` },
      }).then(() => {
        commit('success');
      }).catch(() => {
        commit('error');
      });
    },
    getTour({ commit }, params) {
      return axios.post(`${environment.baseUrl}${endpoints.TOURS}/${params.id}`, params.id,
        { headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` } })
        .then((res) => {
          commit('success');
          this.state.editTour = res.data;
        }).catch(() => {
          commit('error');
        });
    },
    updateTour({ commit }, data) {
      return axios.put(`${environment.baseUrl}${endpoints.TOURS}/${data.id}`, data, {
        headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` },
      }).then(() => {
        commit('success');
      }).catch(() => {
        commit('error');
      });
    },
    deleteTour({ commit }, id) {
      return axios.delete(`${environment.baseUrl}${endpoints.TOURS}/${id}`,
        { headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` } })
        .then(() => {
          commit('success');
        }).catch(() => {
          commit('error');
        });
    },
    getTourSortDesc({ commit }) {
      return axios.get(`${environment.baseUrl}${endpoints.DESC_TOURS}`)
        .then((res) => {
          commit('success');
          this.state.allTours = res.data;
        }).catch(() => {
          commit('error');
        });
    },
    getTourSortAsc({ commit }) {
      return axios.get(`${environment.baseUrl}${endpoints.ASC_TOURS}`)
        .then((res) => {
          commit('success');
          this.state.allTours = res.data;
        }).catch(() => {
          commit('error');
        });
    },
    checkDarkTheme() {
      const html = document.getElementsByTagName('html');
      if (this.state.isDarkTheme) {
        html[0].classList.add('dark-mode');
      } else localStorage.removeItem('darkMode');
    },
    darkTheme({ commit }) {
      const html = document.getElementsByTagName('html')[0];
      commit('darkTheme');
      if (!localStorage.getItem('darthVaderConfirm') && this.state.isDarkTheme) {
        this.state.isConfirmVader = !this.state.isConfirmVader;
        html.style.overflow = 'hidden';
      }
      localStorage.setItem('darkMode', this.state.isDarkTheme);
      if (this.state.isDarkTheme) {
        html.classList.add('dark-mode');
      } else {
        html.classList.remove('dark-mode');
        localStorage.removeItem('darkMode');
      }
    },
    closeConfirmFormVader() {
      const html = document.getElementsByTagName('html')[0];
      this.state.isConfirmVader = !this.state.isConfirmVader;
      localStorage.setItem('darthVaderConfirm', 'true');
      html.style.overflow = 'auto';
    },
  },
  mutations: {
    success(state) {
      state.status = 'Success';
    },
    error(state) {
      state.status = 'Error';
    },
    newTourSuccess(state) {
      state.status = 'New tour created';
    },
    newTourError(state) {
      state.status = 'Error, new tour do not created';
    },
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
    validate: (state) => state.validate,
    isAdmin: (state) => state.isAdmin,
    users: (state) => state.users,
    allTours: (state) => state.allTours,
    isDarkTheme: (state) => state.isAdmin,
  },
});
