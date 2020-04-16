<template>
  <div class="users">
    <transition name="animate" appear enter-active-class="animated zoomIn faster"
                leave-active-class="animated zoomOutLeft faster">
      <div v-if="confirmForm" class="confirm-form">
        <div class="confirm-form__icon confirm-form__icon_warning"></div>
        <div class="confirm-form__title">
          {{ $t('confirmForm.warning.first') }} <br>
          {{ $t('confirmForm.warning.second') }}
        </div>
        <div class="confirm-form__buttons">
          <router-link v-bind:to="{ name: 'EditUser', params:
                  { id: clickIdUser } }">
            <div class="confirm-form__button confirm-form__button_positive">
              {{ $t('btn.edit') }}
            </div>
          </router-link>
          <div class="confirm-form__button confirm-form__button_negative"
               @click="confirmForm = !confirmForm">
            {{ $t('btn.cancel') }}
          </div>
        </div>
      </div>
    </transition>
    <div v-if="confirmForm" class="page-form"
         @click="confirmForm = !confirmForm"></div>
    <div class="container">
      <div class="title-item">
        <transition name="animate" appear enter-active-class="animated fadeInRight fast">
        <div>
          {{ $t('titleRoute.users') }}
        </div>
        </transition>
        <transition name="animate" appear enter-active-class="animated zoomInDown fast">
          <div class="icon icon_users"></div>
        </transition>
      </div>
      <transition name="animate" appear enter-active-class="animated zoomIn faster delay">
        <div>
          <div v-for="(user, index) in users.slice((perPage * $route.query.page) - 2,
          (perPage * $route.query.page) - 2 + perPage)" v-bind:key="user.id"
               class="users__item">
            <div class="users__photo">
              <div class="users__index">
                {{index + $route.query.page * 2 - 1 }}
              </div>
            </div>
            <div class="users__name">
              {{ $t('users.nameTxt') }} <span class="bold">{{ user.name }}</span>
            </div>
            <div class="users__email">
              {{ $t('users.emailTxt') }} <span class="bold">{{ user.email }}</span>
            </div>
            <div class="users__role">
              {{ $t('users.roleTxt') }} <span class="bold">{{ user.role }}</span>
            </div>
            <div class="users__edit" :id="user._id" @click="updateUser">
              {{ $t('btn.edit') }}
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="container">
      <div class="pages">
        <div v-for="(index) in Math.ceil(users.length/perPage)" v-bind:key='index.id'>
          <router-link :to="{ query: { page: index }}" class="page">{{ index }}
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Users',
  data() {
    return {
      firstPage: 1,
      perPage: 2,
      clickIdUser: null,
      confirmForm: false,
    };
  },
  watch: {
    '$route.query.page': function () {

    },
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
  },
  mounted() {
    this.$store.dispatch('users');
  },
  methods: {
    updateUser(event) {
      this.confirmForm = !this.confirmForm;
      if (event) {
        this.clickIdUser = event.target.id;
      }
    },
  },
};
</script>
