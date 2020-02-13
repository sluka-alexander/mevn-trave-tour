<template>
  <div class="about">
    <h1>Register</h1>
    <div class="register-form">
      <input type="text" name="password" placeholder="Enter name">
      <input type="email" name="password" placeholder="Enter email">
      <input type="password" name="password" placeholder="Enter password">
    </div>
  </div>
</template>

<style lang="scss">
  .register-form {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 400px;

    input {
      font-size: 18px;
      padding: 20px;
      margin-bottom: 10px;
      outline: 0;
    }
  }
</style>
