import Api from './Api';

export default {
  fetchTours() {
    return Api().get('/tours');
  },
  addNewTour(params) {
    return Api().post('/tours/new', params);
  },
  getTour(params) {
    return Api().get(`tours/${params.id}`);
  },
  updateTour(params) {
    return Api().put(`tours/${params.id}`, params);
  },
  deleteTour(id) {
    return Api().delete(`tours/${id}`);
  },
};
