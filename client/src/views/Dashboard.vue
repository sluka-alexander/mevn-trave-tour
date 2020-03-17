<template>
    <div>
      <div class="title-item">
        Hello, {{ name}} <br>
        Your email : {{ email }} <br>
        Your role : {{ role }}
        <div class="icon icon__welcome"></div>
      </div>
      <div class="logOut" @click="Logout">LogOut</div>
    </div>
</template>

<script>
import UserService from '../services/UserService';

export default {
  name: 'Dashboard',
  data() {
    return {
      name: '',
      email: '',
      role: '',
      token: localStorage.getItem('token'),
    };
  },
  methods: {
    async Logout() {
      localStorage.clear();
      await this.$router.push('/');
      await window.location.reload();
    },
  },
  mounted() {
    UserService.Dashboard()
      .then((res) => {
        this.name = res.data.user.name;
        this.email = res.data.user.email;
        this.role = res.data.user.role;
      });
  },
};
</script>

<style scoped>

</style>
