<template>
    <div class="container">
      <div class="title-item">
        <transition name="animate" appear enter-active-class="animated zoomInDown fast">
          <div class="icon icon_welcome"></div>
        </transition>
        <transition name="animate" appear enter-active-class="animated fadeInRight fast">
        <div>
          {{ $t('dashboard.helloTxt') }} {{ dataUser.name }} !
        </div>
        </transition>
      </div>
      <transition name="animate" appear enter-active-class="animated zoomIn faster delay">
        <div class="info-user">
          {{ $t('dashboard.emailTxt') }} {{ dataUser.email }}<br>
          {{ $t('dashboard.roleTxt') }} {{ dataUser.role }}<br>
        </div>
      </transition>
      <transition name="animate" appear enter-active-class="animated bounceInLeft">
       <div class="logOut" @click="logout">{{ $t('btn.logOut') }}</div>
      </transition>
    </div>
</template>

<script>

export default {
  name: 'Dashboard',

  data() {
    return {
      token: localStorage.getItem('token'),
    };
  },

  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({ name: 'Login' });
        }).catch(error => {
          console.error(error);
        });
    },
  },

  computed: {
    dataUser() { return this.$store.getters.dataUser; },
  },
};
</script>
