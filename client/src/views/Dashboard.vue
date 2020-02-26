<template>
    <div>
      <div class="title-item">
        Hello, {{ nameUser.name }}
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
      nameUser: '',
    };
  },
  methods: {
    async Dashboard() {
      try {
        const response = await UserService.Dashboard();
        this.nameUser = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async Logout() {
      await UserService.LogOut;
      await this.$router.push({ name: 'Logout' });
    },
  },
  mounted() {
    this.Dashboard();
  },
};
</script>

<style scoped>

</style>
