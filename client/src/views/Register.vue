<template>
  <div>
    <div class="container">
      <transition name="smooth">
        <div v-if="isConfirmForm" class="page-form"></div>
      </transition>
      <div class="title-item">
        <transition name="animate" appear enter-active-class="animated fadeInRight fast">
          <div>
            {{ $t('LoginAndRegister.titleRegisterTxt') }}
          </div>
        </transition>
        <transition name="animate" appear enter-active-class="animated zoomInDown fast">
        <div class="icon icon_user"
             :class="{'icon_user-correct' : !$v.$invalid,
              'icon_user-incorrect' : $v.name.$error || $v.email.$error || $v.password.$error}"
        ></div>
        </transition>
      </div>
      <transition name="animate" appear enter-active-class="animated zoomIn faster">
        <form @submit.prevent="addUser" class="form"
              :class="{'form_dark-theme' : this.$store.state.isDarkTheme}">
          <transition name="animate" appear enter-active-class="animated zoomIn faster"
                      leave-active-class="animated zoomOutLeft faster">
            <div v-if="isConfirmForm" class="confirm-form">
              <div class="confirm-form__icon confirm-form__icon_register">
              </div>
              <div class="confirm-form__title">
                {{ $t('LoginAndRegister.confirmTxtOne') }}<br>
                {{ $t('LoginAndRegister.confirmTxtTwo') }}
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
            <label for="name">{{ $t('LoginAndRegister.nameTxt') }}</label>
            <transition name="animate" appear enter-active-class="animated flash delay-1s">
            <input
              type="text"
              id="name"
              v-model.trim="name"
              :placeholder="$t('LoginAndRegister.placeholder')"
              @blur="$v.name.$touch()"
              :class="{'animated shake': $v.name.$error}">
            </transition>
            <div class="error" v-if="!$v.name.required">
              {{ $t('validates.field') }}
            </div>
            <div class="error" v-if="!$v.name.minLength">
              {{ $t('validates.least') }}
            {{$v.name.$params.minLength.min}}
          </div>
          </div>
          <div class="form__item"
               :class="{'form__item_err' : $v.email.$error}">
            <label for="email">{{ $t('LoginAndRegister.emailTxt') }}</label>
            <input
              type="email"
              id="email"
              v-model.trim="email"
              :placeholder="$t('LoginAndRegister.placeholder')"
              @blur="$v.email.$touch()"
              :class="{'animated shake': $v.email.$error}">
            <div class="error " v-if="!$v.email.required">
              {{ $t('validates.field') }}
            </div>
            <div class="error" v-if="!$v.email.email">
              {{ $t('validates.email') }}
            </div>
          </div>
          <div class="form__item"
               :class="{'form__item_err' : $v.password.$error}">
            <label for="password">{{ $t('LoginAndRegister.passwordTxt') }}</label>
            <input
              type="password"
              id="password"
              v-model.trim="password"
              :placeholder="$t('LoginAndRegister.placeholder')"
              @blur="$v.password.$touch()"
              :class="{'animated shake': $v.password.$error}">
            <div class="error" v-if="!$v.password.required">
              {{ $t('validates.field') }}
            </div>
            <div class="error"
                 v-if="!$v.password.minLength">
              {{ $t('validates.short') }}
            </div>
            <div class="error" v-if="!$v.password.maxLength">
              {{ $t('validates.long') }}
            </div>
          </div>
          <div class="error">{{ Error }}</div>
          <div v-if="$v.$invalid" class="button button_no-active" >
            {{ $t('LoginAndRegister.signUpBtn') }}
          </div>
          <div v-else @click="register" class="button">
            {{ $t('LoginAndRegister.signUpBtn') }}
          </div>
        </form>
      </transition>
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
