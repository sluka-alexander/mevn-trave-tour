<template >
  <div id="app">
      <transition name="animate" appear enter-active-class="animated zoomIn faster"
                  leave-active-class="animated zoomOutLeft faster">
        <div v-if="this.$store.state.isConfirmVader" class="confirm-form">
          <div class="confirm-form__icon confirm-form__icon_darth-vader">
          </div>
          <div class="confirm-form__title">
            {{ $t('confirmForm.darthVader.first') }}<br>
            {{ $t('confirmForm.darthVader.second') }}
          </div>
          <div class="confirm-form__buttons">
            <button type="submit" class="confirm-form__button confirm-form__button_positive"
                    @click="closeConfirmFormVader">
              {{ $t('btn.ok') }}
            </button>
          </div>
        </div>
      </transition>
      <div v-if="this.$store.state.isConfirmVader" class="page-form"
           @click="closeConfirmFormVader"></div>
      <div class="icons-lang-desktop">
        <div class="icons-lang-desktop__icon icons-lang-mobile__icon_rus"
             @click="editLanguage('ru')"></div>
        <div class="icons-lang-desktop__icon icons-lang-mobile__icon_eng"
             @click="editLanguage('en')"></div>
      </div>
      <div class="fas fa-moon" @click="darkTheme"
           :class="{'fa-moon_active' : this.$store.state.isDarkTheme}"></div>
      <div class="container">
        <header class="header">
          <router-link to="/" class="logo">advento</router-link>
          <div class="burger-bnt" @click="openBars">
            <div class="burger-bnt__bars"
                 :class="{'burger-bnt__bars_active' : burgerBtn}">
            </div>
          </div>
          <transition name="burger-btn">
            <div v-if="burgerBtn" class="navbar-mobile-bgc">
              <div class="container">
                <div class="navbar-mobile" @click="openBars">
                  <router-link :to="{ path: '/'}"
                               class="navbar-mobile__item">
                    {{ $t('navbar.homeItemTxt') }}
                  </router-link>
                  <router-link :to="{ path: '/tours', query: { search: null} }"
                               class="navbar-mobile__item">
                    {{ $t('navbar.toursItemTxt') }}
                  </router-link>
                  <router-link v-if="isAdmin" to="/tours/new" class="navbar-mobile__item"
                               @click="burgerBtn = !burgerBtn">
                    {{ $t('navbar.newTourItemTxt') }}
                  </router-link>
                  <router-link v-if="isAdmin" :to="{ path: '/users/', query: { page: '1'} }"
                               class="navbar-mobile__item">
                    {{ $t('navbar.usersItemTxt') }}
                  </router-link>
                  <router-link v-if="!isLoggedIn"
                               to="/user/login" class="navbar-mobile__item">
                    {{ $t('navbar.loginItemTxt') }}
                  </router-link>
                  <router-link v-if="!isLoggedIn"
                               to="/user/register" class="navbar-mobile__item">
                    {{ $t('navbar.registerItemTxt') }}
                  </router-link>
                  <router-link v-if="isLoggedIn"
                               to="/user/dashboard" class="navbar-mobile__item">
                    {{ $t('navbar.profileItemTxt') }}
                  </router-link>
                  <div @click="darkTheme" class="navbar-mobile__item"
                       :class="{'navbar-mobile__item_dark-mode' : this.$store.state.isDarkTheme}">
                    Dark Mode
                  </div>
                  <div class="icons-lang-mobile">
                    <div class="icons-lang-mobile__icon icons-lang-mobile__icon_rus"
                         @click="editLanguage('ru')"></div>
                    <div class="icons-lang-mobile__icon icons-lang-mobile__icon_eng"
                         @click="editLanguage('en')"></div>
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <div class="navbar-desktop">
            <div class="navbar-desktop__left">
              <router-link to="/"
                           class="navbar-desktop__item">
                {{ $t('navbar.homeItemTxt') }}
              </router-link>
              <router-link :to="{ path: '/tours', query: { search: null} }"
                           class="navbar-desktop__item">
                {{ $t('navbar.toursItemTxt') }}
              </router-link>
              <router-link v-if="isAdmin" to="/tours/new"
                           class="navbar-desktop__item">
                {{ $t('navbar.newTourItemTxt') }}
              </router-link>
              <router-link v-if="isAdmin" :to="{ path: '/users/', query: { page: '1'} }"
                           class="navbar-desktop__item">
                {{ $t('navbar.usersItemTxt') }}
              </router-link>
            </div>
          </div>
          <div class="navbar-desktop">
            <div class="navbar-desktop__right">
              <div v-if="isLoggedIn" to="/user/dashboard">
                {{ $t('navbar.helloMsg') }},
                {{ dataUser.name }}
              </div>
              <router-link v-if="isLoggedIn" to="/user/dashboard" class="fas fa-home">
              </router-link>
              <router-link v-if="!isLoggedIn" to="/user/login" class="navbar-desktop__item">
                {{ $t('navbar.loginItemTxt') }}
              </router-link>
              <router-link v-if="!isLoggedIn" to="/user/register" class="navbar-desktop__item
              navbar-desktop__right__item">
                {{ $t('navbar.registerItemTxt') }}
              </router-link>
            </div>
          </div>
        </header>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>

export default {

  data() {
    return {
      burgerBtn: false,
      token: localStorage.getItem('token'),
    };
  },

  methods: {
    openBars() {
      this.burgerBtn = !this.burgerBtn;
      const html = document.getElementsByTagName('html')[0];
      html.style.overflow = this.burgerBtn ? 'hidden' : 'auto';
    },

    editLanguage(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem('lang', lang);
    },

    darkTheme() {
      this.$store.dispatch('darkTheme');
    },

    closeConfirmFormVader() {
      this.$store.dispatch('closeConfirmFormVader');
    },
  },

  mounted() {
    if (this.$store.getters.isLoggedIn) {
      this.$store.dispatch('getDataAuthUser');
    }
    if (this.$store.state.lang === 'ru') {
      this.editLanguage('ru');
    }
    this.$store.dispatch('checkDarkTheme');
  },

  computed: {
    isLoggedIn() { return this.$store.getters.isLoggedIn; },
    dataUser() { return this.$store.getters.dataUser; },
    isAdmin() { return this.$store.getters.isAdmin; },
  },
};
</script>

<style lang="scss">
  @import 'views/scss/main';
</style>
