import Api from './Api';

export default {
  addNewUser(params) {
    return Api().post('/register', params);
  },
  Login(params) {
    return Api().post('/login', params);
  },
};
