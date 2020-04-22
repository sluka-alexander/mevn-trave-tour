<template>
  <div>
    <div class="container">
      <div class="title-item">
        <transition name="animate" appear enter-active-class="animated fadeInRight fast">
          <div>
            {{ $t('titleRoute.editUser') }}
          </div>
        </transition>
        <transition name="animate" appear enter-active-class="animated zoomInDown fast">
          <div class="icon icon_edit-user"></div>
        </transition>
      </div>
      <transition name="animate" appear enter-active-class="animated zoomIn faster">
        <form @submit.prevent="updateUser" class="form"
              :class="{'form_dark-theme' : this.$store.state.isDarkTheme}">
          <div class="form__item"
               :class="{'form__item_err' : $v.user.name.$error}">
            <label for="name">{{ $t('form.titleInput.name') }}</label>
            <input
              type="text"
              id="name"
              v-model.trim="user.name"
              :placeholder="$t('form.placeholder')"
              @blur="$v.user.name.$touch()"
              :class="{'animated shake': $v.user.name.$error}">
            <div class="error" v-if="!$v.user.name.required">
              {{ $t('validates.field') }}
            </div>
            <div class="error" v-if="!$v.user.name.minLength">
              {{ $t('validates.least') }}
              {{$v.user.name.$params.minLength.min}}
            </div>
          </div>
          <div class="form__item">
            <label for="role">{{ $t('form.titleInput.role') }}</label>
            <select type="text"
                    id="role"
                    v-model.trim="user.role"
                    @blur="$v.user.role.$touch()"
            >
              <option>{{ $t('role.admin') }}</option>
              <option>{{ $t('role.regular') }}</option>
            </select>
          </div>
          <span style="display: flex;">
            <div v-if="$v.$invalid"
                 class="button button_no-active">{{ $t('btn.edit') }}
            </div>
            <button type="submit" v-else class="button">{{ $t('btn.edit') }}</button>
            <span class="button-back" @click="back">{{ $t('btn.back') }}</span>
          </span>
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'EditUser',

  data() {
    return {
      oldTour: [],
      user: [],
    };
  },

  validations: {
    user: {
      name: { required, minLength: minLength(3) },
      role: { required },
    },
  },
  methods: {
    getUser() {
      const userId = { id: this.$route.params.id };
      this.$store.dispatch('getUser', userId).then(() => {
        this.user = this.$store.state.editUser;
      });
    },

    updateUser() {
      const data = {
        id: this.$route.params.id,
        date: this.user.date,
        name: this.user.name,
        role: this.user.role,
      };
      this.$store.dispatch('updateUser', data)
        .then(() => this.$router.go(-1))
        .catch(err => console.error(err));
    },

    back() {
      this.$router.go(-1);
    },
  },

  mounted() {
    this.getUser();
  },
};
</script>
