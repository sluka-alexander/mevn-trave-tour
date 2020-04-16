import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ru from './ru';
import en from './en';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'ru',
  messages: {
    en,
    ru,
  },
});
