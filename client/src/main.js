import Vue from 'vue';
import Vuelidate from 'vuelidate';
import router from './router';
import App from './App.vue';

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
