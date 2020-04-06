<template>
    <div>
      <div class="title-item">
        <div class="icon icon__welcome"></div>
        Hello, {{ DataUser.name }} !<br>
      </div>
      <div class="info-user">
        Your email : {{ DataUser.email }}<br>
        Your role : {{ DataUser.role }}<br>
      </div>
      <div class="logOut" @click="logout">LogOut</div>
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
