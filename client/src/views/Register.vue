<template>
  <div>
    <div class="container">
      <transition name="smooth">
        <div v-if="confirmForm" class="page-form"></div>
      </transition>
      <div class="title-item">
        Register
        <div class="icon icon__user"
             :class="{'icon__user-correct' : !$v.$invalid,
              'icon__user-incorrect' : $v.name.$error || $v.email.$error || $v.password.$error}"
        ></div>
      </div>

      <form @submit.prevent="addUser" >
        <transition name="smooth">
          <div v-if="confirmForm" class="confirm-form">
            <div class="confirm-form__icon confirm-form__icon__register">
            </div>
            <div class="confirm-form__title">
              Congratulations,<br>
              you can now log in
            </div>
            <div class="confirm-form__buttons">
              <button type="submit" class="confirm-form__button confirm-form__button__positive">
                OK</button>
            </div>
          </div>
        </transition>
        <div class="form-item"
             :class="{'form-item-err' : $v.name.$error}">
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
        <div v-if="$v.$invalid" class="button button__no-active" >Sign up</div>
        <div v-else @click="confirmForm = !confirmForm" class="button">Sign up</div>
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
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmForm: false,
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
  methods: {
    async addUser() {
      try {
        this.$v.$touch();
        if (this.$v.$invalid) {
          console.log('error');
        } else {
          await this.$router.push({ name: 'Login' });
          await UserService.addNewUser({
            name: this.name,
            email: this.email,
            password: this.password,
          });
        }
      } catch (error) {
        console.log(error);
        await this.$router.push({ name: 'Register' });
      }
    },
  },
};
</script>
