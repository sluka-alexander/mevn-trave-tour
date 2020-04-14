<template>
  <div class="users">
    <div class="container">
      <div class="title-item">
        <transition name="animate" appear enter-active-class="animated fadeInRight fast">
        <div>
          {{ $t('users.titleTxt') }}
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
          </div>
        </div>
      </transition>
    </div>
    <div class="pages">
      <div v-for="(index) in Math.ceil(users.length/perPage)" v-bind:key='index.id'>
        <router-link :to="{ query: { page: index }}" class="page">{{ index }}
        </router-link>
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
};
</script>

<style scoped>

</style>
