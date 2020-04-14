<template>
    <div class="container">
      <div class="title-item">
        <transition name="animate" appear enter-active-class="animated fadeInRight fast">
          <div>
            {{ $t('LoginAndRegister.titleLoginTxt') }}
          </div>
        </transition>
        <transition name="animate" appear enter-active-class="animated zoomInDown fast">
          <div class="icon icon_login">
          </div>
        </transition>
        <transition name="animate" appear enter-active-class="animated zoomIn faster">
          <form class="form"
                :class="{'form_dark-theme' : this.$store.state.isDarkTheme}">
            <div class="form__item"
                 :class="{'form__item_err': $v.email.$error}">
              <label for="email">{{ $t('LoginAndRegister.emailTxt') }}</label>
              <transition name="animate" appear enter-active-class="animated flash delay-1s">
                <input
                  type="email"
                  id="email"
                  v-model.trim="email"
                  :placeholder="$t('LoginAndRegister.placeholder')"
                  @blur="$v.email.$touch()"
                  :class="{'animated shake': $v.email.$error}">
              </transition>
              <div class="error" v-if="!$v.email.required">
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
              <div class="error" v-if="!$v.password.minLength">
                {{ $t('validates.short') }}
              </div>
              <div class="error" v-if="!$v.password.maxLength">
                {{ $t('validates.long') }}
              </div>
            </div>
            <div class="error">{{ Error }} </div>
            <div v-if="$v.$invalid" class="button button_no-active" >
              {{ $t('LoginAndRegister.signInBtn') }}
            </div>
            <div v-else @click="login" class="button">
              {{ $t('LoginAndRegister.signInBtn') }}
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
  mounted() {
    this.$store.dispatch('clearError');
  },
};
</script>
