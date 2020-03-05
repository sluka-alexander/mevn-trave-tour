import Api from './Api';

export default {
  addNewUser(params) {
    return Api().post('/user/register', params);
  },
  Login(params) {
    return Api().post('/user/login', params);
  },
  Dashboard() {
    return Api().get('/user/dashboard');
  },
  LogOut() {
    return Api().get('/user/logout');
  },
};
