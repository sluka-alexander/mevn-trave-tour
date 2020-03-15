<template>
    <div>
      <div class="title-item">
        Hello, {{ name}} <br>
        Your email : {{ email }}
        <div class="icon icon__welcome"></div>
      </div>
      <div class="logOut" @click="Logout">LogOut</div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Dashboard',
  data() {
    return {
      name: '',
      email: '',
      token: localStorage.getItem('token'),
    };
  },
  methods: {
    async Logout() {
      localStorage.clear();
      await this.$router.push('/');
    },
  },
  mounted() {
    axios.get('http://localhost:8081/user/dashboard', { headers: { token: this.token } })
      .then((res) => {
        this.name = res.data.user.name;
        this.email = res.data.user.email;
      });
  },
};
</script>

<style scoped>

</style>
