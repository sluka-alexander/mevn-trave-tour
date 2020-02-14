<template>
  <div class="tours">
    <h1>Tours</h1>
    <h1>{{ tours }}</h1>
  </div>
</template>

<script>
import TourService from '../services/TourService';

export default {
  name: 'Tours',
  data() {
    return {
      tours: [],
    };
  },
  methods: {
    async getTours() {
      const response = await TourService.getTours();
      this.tours = response.data.tours;
    },
  },
  mounted() {
    this.getTours();
  },
};
</script>

<style scoped>

</style>
