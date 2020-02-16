import Api from './Api';

export default {
  getTours() {
    return Api().get('/tours');
  },
  addNewTour(params) {
    return Api().post('/tours/new', params);
  },
};
