<template >
  <div id="app">
    <div class="icons-lang-desktop">
      <div class="icons-lang-desktop__icon icons-lang-mobile__icon_rus"
           @click="setLocale('ru')"></div>
      <div class="icons-lang-desktop__icon icons-lang-mobile__icon_eng"
           @click="setLocale('en')"></div>
    </div>
    <div class="container">
      <header class="header">
        <router-link to="/" class="logo">advento</router-link>
        <div class="burger-bnt" @click="openBars">
          <div v-if="!burgerBtn" class="burger-bnt__bars"></div>
          <div v-if="burgerBtn" class="burger-bnt__cross"></div>
        </div>
        <transition name="burger-btn">
          <div v-if="burgerBtn" class="navbar-mobile-bgc">
            <div class="container">
              <div class="navbar-mobile" @click="openBars">
                <router-link :to="{ path: '/'}"
                             class="navbar-mobile__item">
                  {{ $t('navbar.homeItemTxt') }}
                </router-link>
                <router-link :to="{ path: '/tours', query: { search: ''} }"
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
                <div class="icons-lang-mobile">
                  <div class="icons-lang-mobile__icon icons-lang-mobile__icon_rus"
                       @click="setLocale('ru')"></div>
                  <div class="icons-lang-mobile__icon icons-lang-mobile__icon_eng"
                       @click="setLocale('en')"></div>
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
            <router-link :to="{ path: '/tours', query: { search: ''} }"
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
              {{ DataUser.name }}
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
      role: '',
      name: '',
    };
  },
  methods: {
    openBars() {
      this.burgerBtn = !this.burgerBtn;
      if (this.burgerBtn) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    },
    setLocale(locale) {
      const { sort } = this.$route.query;
      const { page } = this.$route.query;
      const { search } = this.$route.query;

      if (this.$route.query.lang !== locale) {
        this.$i18n.locale = locale;
        this.$router.push({
          query: {
            lang: locale,
            sort,
            page,
            search,
          },
        });
      }
    },
  },
  mounted() {
    if (this.$store.getters.isLoggedIn) {
      this.$store.dispatch('dashboard');
    }
    setTimeout(() => {
      if (this.$route.query.lang === 'ru') {
        this.$i18n.locale = 'ru';
      }
    }, 500);
  },
  computed: {
    isLoggedIn() { return this.$store.getters.isLoggedIn; },
    DataUser() { return this.$store.getters.DataUser; },
    isAdmin() { return this.$store.getters.isAdmin; },
  },
};

</script>
<style lang="scss">
  @import 'views/scss/main';
</style>
