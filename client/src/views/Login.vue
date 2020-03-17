<template>
  <div class="container">
    <div class="title-item">
      Login
      <div class="icon icon__login">
      </div>
      <form>
        <div class="form-item"
             :class="{'form-item-err' : $v.email.$error}">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model.trim="email"
            placeholder="Enter email"
            @blur="$v.email.$touch()"
          >
          <div class="error" v-if="!$v.email.required">Fill in the field</div>
          <div class="error" v-if="!$v.email.email">This is incorrect email</div>
        </div>
        <div class="form-item"
             :class="{'form-item-err' : $v.password.$error}">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model.trim="password"
            placeholder="Enter description"
            @blur="$v.password.$touch()"
          >
          <div class="error" v-if="!$v.password.required">Fill in the field</div>
          <div class="error" v-if="!$v.password.minLength">Password is too short</div>
          <div class="error" v-if="!$v.password.maxLength">Password is too long</div>
        </div>
        <div class="error" v-if="error">{{ error }} </div>
        <div v-if="$v.$invalid" class="button button__no-active" >Sign up</div>
        <div v-else @click="SignIn" class="button">Sign up</div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  required, minLength, maxLength, email,
} from 'vuelidate/lib/validators';
import UserService from '../services/UserService';

export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      email: '',
      password: '',
      validateLogin: false,
      error: '',
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(16),
    },
  },
  methods: {
    async SignIn() {
      await UserService.Login({
        email: this.email,
        password: this.password,
      }).then(async (res) => {
        if (res.data.title === 'login') {
          localStorage.setItem('token', res.data.token);
          await this.$router.push('/');
          window.location.reload();
        }
      }).catch((err) => {
        this.error = err.response.data.title;
      });
    },
  },
};
</script>
