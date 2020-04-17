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
      return new Promise((resolve, reject) => {
        axios.post(`${environment.baseUrl}${endpoints.REGISTER}`, user)
          .then((res) => {
            commit('success');
            resolve(res);
          }).catch((err) => {
            commit('errorAuth', err);
            reject(err);
          });
      });
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios.post(`${environment.baseUrl}${endpoints.LOGIN}`, user)
          .then((res) => {
            localStorage.setItem('token', res.data.token);
            commit('successAuth', res.data.token);
            this.state.user = res.data.user;
            if (res.data.user.role === 'admin') {
              this.state.isAdmin = true;
            }
            resolve(res);
          })
          .catch((err) => {
            commit('errorAuth', err);
            localStorage.removeItem('token');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      commit('logout');
      localStorage.removeItem('token');
    },
    dashboard({ commit }) {
      return axios.post(`${environment.baseUrl}${endpoints.DASHBOARD}`, '',
        { headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` } })
        .then((res) => {
          commit('success');
          this.state.user = res.data.user;
          if (res.data.user.role === 'admin') {
            this.state.isAdmin = true;
          }
        }).catch(() => {
          commit('error');
        });
    },
    getAllUsers({ commit }) {
      return axios.post(`${environment.baseUrl}${endpoints.USERS}`, '',
        { headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` } })
        .then((res) => {
          commit('success');
          this.state.users = res.data;
          if (res.data.user.role === 'admin') {
            this.state.isAdmin = true;
          }
        }).catch(() => {
          commit('error');
        });
    },
    getUser({ commit }, params) {
      return axios.post(`${environment.baseUrl}${endpoints.USER}${params.id}`, params.id,
        { headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` } })
        .then((res) => {
          commit('success');
          this.state.editUser = res.data;
        }).catch(() => {
          commit('error');
        });
    },
    updateUser({ commit }, data) {
      return axios.put(`${environment.baseUrl}${endpoints.USER}${data.id}`, data,
        { headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` } })
        .then(() => {
          commit('success');
        }).catch(() => {
          commit('error');
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
      return axios.post(`${environment.baseUrl}${endpoints.NEW_TOUR}`, data, {
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
    loadingAuth(state) {
      state.status = 'loading';
    },
    successAuth(state, token) {
      state.status = 'success';
      state.token = token;
    },
    errorAuth(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
      state.isAdmin = false;
      state.users = {};
    },
    success(state) {
      state.status = 'Success';
    },
    error(state) {
      state.status = 'Error';
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
    isAdmin: (state) => state.isAdmin,
    users: (state) => state.users,
    allTours: (state) => state.allTours,
    isDarkTheme: (state) => state.isAdmin,
  },
});
