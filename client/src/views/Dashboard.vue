<template>
    <div>
      <div class="title-item">
        Hello
        <div class="icon icon__welcome"></div>
      </div>
    </div>
</template>

<script>
import UserService from '../services/UserService';

export default {
  name: 'Dashboard',
  methods: {
    async Dashboard() {
      try {
        await UserService.Dashboard;
      } catch (err) {
        console.log(err);
        await this.$router.push({ name: 'Login' });
      }
    },
  },
  mounted() {
    this.Dashboard();
  },
};
</script>

<style scoped>

</style>
