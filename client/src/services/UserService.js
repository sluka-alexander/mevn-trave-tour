import Api from './Api';

export default {
  addNewUser(params) {
    return Api().post('/user/register', params);
  },
  Login(params) {
    return Api().post('/user/login', params);
  },
  Dashboard() {
    return Api().get('/user/dashboard',
      { headers: { token: localStorage.getItem('token') } });
  },
  LogOut() {
    return Api().get('/user/logout');
  },
  getUsers() {
    return Api().get('user/users');
  },
};
