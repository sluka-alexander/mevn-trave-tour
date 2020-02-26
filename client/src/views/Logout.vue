<template>
  <h1>Logout</h1>
</template>

<script>
import UserService from '../services/UserService';

export default {
  name: 'Logout',
  methods: {
    async SignOut() {
      await UserService.LogOut();
      await this.$router.push({ name: 'Home' });
    },
  },
  mounted() {
    this.SignOut();
  },
};

</script>

<style scoped>

</style>
