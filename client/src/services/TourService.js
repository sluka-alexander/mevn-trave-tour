import Api from './Api';

export default {
  fetchTours() {
    return Api().get('/tours');
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
  getTourSortDesc() {
    return Api().get('tours/desc');
  },
  getTourSortAsc() {
    return Api().get('tours/asc');
  },
  getToursPage(params) {
    return Api().get(`tours/pages/${params.page}`);
  },
};
