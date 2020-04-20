import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Axios from 'axios';
import VueWow from 'vue-wow';
import VueKinesis from 'vue-kinesis';
import enums from 'vue-enums';
import router from './router';
import App from './App.vue';
import store from './views/store/index';
import i18n from './i18n';


Vue.use(enums);
Vue.use(VueKinesis);
Vue.use(Vuelidate);
Vue.use(VueWow);
Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

new Vue({
  store,
  router,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
