<template>
  <div id="app">
    <div class="container">
      <header class="header">
        <router-link to="/" class="logo">advento</router-link>
        <div class="navbar">
          <div class="navbar__left">
            <router-link to="/" class="navbar__item">Home</router-link>
            <router-link :to="{ path: '/tours/', query: { search: ''} }"
                         class="navbar__item">Tours</router-link>
            <router-link to="/tours/new" class="navbar__item">New tour</router-link>
          </div>
        </div>
        <div class="navbar">
          <div class="navbar__right">
            <router-link to="/user/login" class="navbar__item">Login</router-link>
            <router-link to="/user/register" class="navbar__item
            navbar__right__item">Register</router-link>
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
    };
  },
};

</script>
<style lang="scss">
  @import 'views/scss/main';
</style>
