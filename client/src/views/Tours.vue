
<template>
  <div class="tours">
    <h1>Tours</h1>
    <table>
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
      </tr>
    </table>
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

<style scoped lang="scss">

  table {
    margin: 0 auto;
    font-size: 18px;
    background: white;
    max-width: 70%;
    width: 70%;
    border-collapse: collapse;
    -webkit-box-shadow: 0px 4px 58px -2px rgba(220,213,222,1);
    -moz-box-shadow: 0px 4px 58px -2px rgba(220,213,222,1);
    box-shadow: 0px 4px 58px -2px rgba(220,213,222,1);
  }

  th {
    font-weight: 600;
    border-bottom: 2px solid #6678b1;
    padding: 10px 8px;
  }
  td {
    color: #669;
    padding: 9px 8px;
    transition: .3s linear;
    border-bottom: 1px solid #ccc;
  }
</style>
