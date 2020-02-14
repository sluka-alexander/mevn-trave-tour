import Api from './Api';

export default {
  getTours() {
    return Api().get('tours');
  },
};
