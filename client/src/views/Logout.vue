<template>
  <h1>Logout</h1>
</template>

<script>
export default {
  name: 'Logout',
  mounted() {
    this.$router.push({ name: 'Home' });
  },
};

</script>

<style scoped>

</style>
