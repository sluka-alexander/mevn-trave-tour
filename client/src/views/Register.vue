<template>
  <div>
    <div class="container">
      <transition name="smooth">
        <div v-if="isConfirmForm" class="page-form"></div>
      </transition>
      <div class="title-item">
        Register
        <div class="icon icon_user"
             :class="{'icon_user-correct' : !$v.$invalid,
              'icon_user-incorrect' : $v.name.$error || $v.email.$error || $v.password.$error}"
        ></div>
      </div>

      <form @submit.prevent="addUser" class="form">
        <transition name="smooth">
          <div v-if="isConfirmForm" class="confirm-form">
            <div class="confirm-form__icon confirm-form__icon_register">
            </div>
            <div class="confirm-form__title">
              Congratulations,<br>
              you can now log in
            </div>
            <div class="confirm-form__buttons">
              <button type="submit" class="confirm-form__button confirm-form__button_positive"
                      @click="Redirect">
                OK</button>
            </div>
          </div>
        </transition>
        <div class="form__item"
             :class="{'form__item_err' : $v.name.$error}">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            v-model.trim="name"
            placeholder="Enter your name"
            @blur="$v.name.$touch()"
          >
          <div class="error" v-if="!$v.name.required">Fill in the field</div>
          <div class="error" v-if="!$v.name.minLength">Name must have at least
          {{$v.name.$params.minLength.min}}
        </div>
        </div>
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
          <div class="error " v-if="!$v.email.required">Fill in the field</div>
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
          <div class="error"
               v-if="!$v.password.minLength">Password is too short</div>
          <div class="error" v-if="!$v.password.maxLength">Password is too long</div>
        </div>
        <div class="error">{{ Error }}</div>
        <div v-if="$v.$invalid" class="button button_no-active" >Sign up</div>
        <div v-else @click="register" class="button">Sign up</div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  required, minLength, maxLength, email,
} from 'vuelidate/lib/validators';

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      isConfirmForm: false,
      error: '',
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(16),
    },
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
    Redirect() {
      this.$router.push({ name: 'Login' });
    },
    register() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin,
      };
      this.$store.dispatch('register', data);
      setTimeout(() => {
        if (!this.Error) {
          this.isConfirmForm = !this.isConfirmForm;
        }
      }, 500);
    },
  },
  mounted() {
    this.$store.dispatch('clearError');
  },
};
</script>
