<template>
  <div class="container">
    <div class="title-item">
      Login
      <div class="icon icon_login">
      </div>
      <form class="form">
        <div class="form__item"
             :class="{'form__item_err' : $v.email.$error}">
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
        <div class="form__item"
             :class="{'form__item_err' : $v.password.$error}">
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
        <div class="error">{{ Error }} </div>
        <div v-if="$v.$invalid" class="button button_no-active" >Sign up</div>
        <div v-else @click="login" class="button">Sign up</div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  required, minLength, maxLength, email,
} from 'vuelidate/lib/validators';

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
  computed: {
    Error() { return this.$store.getters.Error; },
  },
  methods: {
    login() {
      const data = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('login', data)
        .then(() => this.$router.go(-1))
        .catch((err) => console.log(err));
    },
  },
};
</script>
