<template>
    <div class="container">
      <div class="title-item">
        <transition name="animate" appear enter-active-class="animated zoomInDown fast">
          <div class="icon icon_welcome"></div>
        </transition>
        <transition name="animate" appear enter-active-class="animated fadeInRight fast">
        <div>
          {{ $t('dashboard.helloTxt') }} {{ DataUser.name }} !
        </div>
        </transition>
      </div>
      <transition name="animate" appear enter-active-class="animated zoomIn faster delay">
        <div class="info-user">
          {{ $t('dashboard.emailTxt') }} {{ DataUser.email }}<br>
          {{ $t('dashboard.roleTxt') }} {{ DataUser.role }}<br>
        </div>
      </transition>
      <transition name="animate" appear enter-active-class="animated bounceInLeft">
       <div class="logOut" @click="logout">{{ $t('btn.logOut') }}</div>
      </transition>
    </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      token: localStorage.getItem('token'),
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({ name: 'Login' });
        });
    },
  },
  created() {
    this.$http.interceptors.response.use(undefined, (err) => new Promise(() => {
      if (err.status === 401 && err.config) {
        this.$store.dispatch('logout');
      }
      throw err;
    }));
  },
  computed: {
    DataUser() { return this.$store.getters.DataUser; },
  },
  // mounted() {
  //   this.$store.dispatch('dashboard');
  // },
};
</script>

<style scoped>

</style>
