import Api from './Api';

export default {
  addNewUser(params) {
    return Api().post('/register', params);
  },
  Login(params) {
    return Api().post('/login', params);
  },
  Dashboard() {
    return Api().get('/dashboard');
  },
  LogOut() {
    return Api().get('/logout');
  },
};
