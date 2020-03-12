<template >
  <div id="app">
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
                             class="navbar-mobile__item">Home
                </router-link>
                <router-link :to="{ path: '/tours/', query: { search: ''} }"
                             class="navbar-mobile__item">Tours
                </router-link>
                <router-link to="/tours/new" class="navbar-mobile__item"
                             @click="burgerBtn = !burgerBtn">New tour
                </router-link>
                <router-link :to="{ path: '/users/', query: { page: '1'} }"
                             class="navbar-mobile__item">Users
                </router-link>
                <router-link to="/user/login" class="navbar-mobile__item">Login</router-link>
                <router-link to="/user/register" class="navbar-mobile__item">Register</router-link>
              </div>
            </div>
          </div>
        </transition>
        <div class="navbar-desktop">
          <div class="navbar-desktop__left">
            <router-link :to="{ path: '/tours/', query: { search: ''} }"
                         class="navbar-desktop__item">Tours</router-link>
            <router-link to="/tours/new" class="navbar-desktop__item">New tour</router-link>
            <router-link :to="{ path: '/users/', query: { page: '1'} }"
                         class="navbar-desktop__item">Users</router-link>
          </div>
        </div>
        <div class="navbar-desktop">
          <div class="navbar-desktop__right">
            <router-link to="/user/login" class="navbar-desktop__item">Login</router-link>
            <router-link to="/user/register" class="navbar-desktop__item
            navbar-desktop__right__item">Register</router-link>
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
  },
};

</script>
<style lang="scss">
  @import 'views/scss/main';
</style>
