<template>
  <div class="tours">
    <div class="container">
      <div class="title-item">Tours</div>
      <table v-if="tours.length">
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Description</th>
          <th>Price</th>
          <th>Date</th>
        <tr>
        <tr v-for="tour in tours" v-bind:key="tour.id">
          <td>{{ tour.name }}</td>
          <td>{{ tour.category}}</td>
          <td>{{ tour.description}}</td>
          <td>{{ tour.price}}$</td>
          <td>{{ tour.date}}</td>
          <td><i class="fas fa-pencil-alt btn-delete" ></i></td>
          <td><i class="fas fa-trash-alt btn-edit" ></i></td>
        </tr>
      </table>
      <div style="text-align: center" v-if="!tours.length">Please, add your first tour</div>
    </div>
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
      this.tours = response.data;
    },
  },
  mounted() {
    this.getTours();
  },
};
</script>
