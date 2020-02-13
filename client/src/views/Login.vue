<template>
  <div class="login">
    <div class="login__title">
        <h1>Login</h1>
    </div>
      <input type="text" placeholder="Enter login">
      <input type="password" placeholder="Enter password">
    <button>Sign in</button>
  </div>
</template>

<script>

export default {
  name: 'Login',
};
</script>

<style scoped>
  .login{

    margin: 0 auto;
    max-width: 400px;
    background-color: white;
  }
</style>
