<template>
  <div>
    <div class="container">
      <transition name="animate" appear enter-active-class="animated zoomIn faster"
                  leave-active-class="animated zoomOutLeft faster">
        <div v-if="isConfirmForm" class="confirm-form">
          <div class="confirm-form__icon confirm-form__icon_register">
          </div>
          <div class="confirm-form__title">
            {{ $t('confirmForm.register.first') }} <br>
            {{ $t('confirmForm.register.second') }}
          </div>
          <div class="confirm-form__buttons">
            <button type="submit" class="confirm-form__button confirm-form__button_positive"
                    @click="redirect">
              {{ $t('btn.ok') }}
            </button>
          </div>
        </div>
      </transition>
      <transition name="smooth">
        <div v-if="isConfirmForm" class="page-form" @click="redirect"></div>
      </transition>
      <div class="title-item">
        <transition name="animate" appear enter-active-class="animated fadeInRight fast">
          <div>
            {{ $t('titleRoute.signUp') }}
          </div>
        </transition>
        <transition name="animate" appear enter-active-class="animated zoomInDown fast">
        <div class="icon icon_user"
             :class="{'icon_user-correct animated heartBeat' : !$v.$invalid,
              'icon_user-incorrect animated heartBeat' :
              $v.name.$error || $v.email.$error || $v.password.$error}"
        ></div>
        </transition>
      </div>
      <transition name="animate" appear enter-active-class="animated zoomIn faster">
        <form class="form"
              :class="{'form_dark-theme' : this.$store.state.isDarkTheme}">
          <div class="form__item"
               :class="{'form__item_err' : $v.name.$error}">
            <label for="name">{{ $t('form.titleInput.name') }}</label>
            <transition name="animate" appear enter-active-class="animated flash delay-1s">
            <input
              type="text"
              id="name"
              v-model.trim="name"
              :placeholder="$t('form.placeholder')"
              @blur="$v.name.$touch()"
              :class="{'animated shake': $v.name.$error}">
            </transition>
            <div class="error" v-if="!$v.name.required">
              {{ $t('validates.field') }}
            </div>
            <div class="error" v-if="!$v.name.minLength">
                {{ $t('validates.min') }}
              {{$v.name.$params.minLength.min}}
            </div>
            <div class="error" v-if="!$v.name.maxLength">
                {{ $t('validates.max') }}
              {{$v.name.$params.maxLength.max}}
            </div>
          </div>
          <div class="form__item"
               :class="{'form__item_err' : $v.email.$error}">
            <label for="email">{{ $t('form.titleInput.email') }}</label>
            <input
              type="email"
              id="email"
              v-model.trim="email"
              :placeholder="$t('form.placeholder')"
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
            <label for="password">{{ $t('form.titleInput.password') }}</label>
            <input
              type="password"
              id="password"
              v-model.trim="password"
              :placeholder="$t('form.placeholder')"
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
              {{$v.password.$params.maxLength.max}}
            </div>
          </div>
          <div class="error" v-if="validate">{{ $t('validates.register') }}</div>
          <div v-if="$v.$invalid" class="button button_no-active" >
            {{ $t('btn.signUp') }}
          </div>
          <div v-else class="button" @click="register">
            {{ $t('btn.signUp') }}
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
      name: null,
      email: null,
      password: null,
      validate: false,
      isConfirmForm: false,
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
      maxLength: maxLength(30),
    },
  },
  methods: {
    redirect() {
      this.$router.push({ name: 'Login' });
    },
    register() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('register', data)
        .then(() => {
          this.isConfirmForm = !this.isConfirmForm;
        })
        .catch((err) => {
          this.validate = true;
          console.error(err);
        });
    },
  },
};
</script>
