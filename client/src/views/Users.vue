<template>
  <div class="users">
    <div class="container">
      <div class="title-item">
        Users
        <div class="icon icon__users"></div>
      </div>
      <div v-for="user in users.slice((perPage * $route.query.page) - 2,
      (perPage * $route.query.page) - 2 + perPage)"
           class="users__item" v-bind:key="user.id">
        <div class="users__item__photo">
        </div>
        <div class="users__item_name">
          Name: <span class="bold">{{ user.name }}</span>
        </div>
        <div class="users__item__email">
          Email: <span class="bold">{{ user.email }}</span>
        </div>
        <div class="users__item__role">
          Role: <span class="bold">{{ user.role }}</span>
        </div>
        <button class="users__item__edit">Edit</button>
      </div>
    </div>
    <div class="pages">
      <div v-for="(index) in Math.ceil(users.length/perPage)" v-bind:key='index.id'>
        <router-link :to="{ query: { page: index }}" class="page"
                     :class="{ page__active: index === $route.query.page }" >{{ index }}
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>
import UserService from '../services/UserService';

export default {
  name: 'Users',
  data() {
    return {
      users: [],
      firstPage: 1,
      perPage: 2,
    };
  },
  methods: {
    async GetUsers() {
      const response = await UserService.getUsers();
      this.users = response.data;
    },
  },
  watch: {
    '$route.query.page': function () {

    },
  },
  mounted() {
    this.GetUsers();
  },
};
</script>

<style scoped>

</style>
