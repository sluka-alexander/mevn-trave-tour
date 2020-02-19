<template>
  <div class="tours">
    <div v-if="confirmForm" class="page-form"></div>
    <div v-if="confirmForm" class="confirm-form">
      <div class="confirm-form__icon confirm-form__icon__warning">
      </div>
      <div class="confirm-form__title">
        Are you sure?
      </div>
      <div class="confirm-form__buttons">
        <router-link v-bind:to="{ name: 'EditTour', params:
              { id: clickUpdate } }">
          <div class="confirm-form__button confirm-form__button__positive">Confirm</div>
        </router-link>
        <div @click="confirmForm = !confirmForm"
             class="confirm-form__button confirm-form__button__negative">
          Cancel</div>
      </div>
    </div>
      <div class="container">
        <div class="title-item">
          Tours
          <div class="icon icon__tours"></div>
        </div>
        {{ clickUpdate }}
        <table v-if="tours.length">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date</th>
            <th>Edit</th>
            <th @click="clickUpdate" >Delete</th>
          <tr>
          <tr v-for="tour in tours" v-bind:key="tour.id">
            <td>{{ tour.name }}</td>
            <td>{{ tour.category}}</td>
            <td>{{ tour.description}}</td>
            <td>{{ tour.price}}$</td>
            <td>{{ tour.date}}</td>
            <td>
              <div @click="Update">
                <i class="fas fa-pencil-alt btn-edit" v-bind:id="tour._id"></i>
              </div>
            </td>
            <td><i class="fas fa-trash-alt btn-delete" ></i></td>
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
      confirmForm: false,
      clickUpdate: '',
    };
  },
  methods: {
    async getTours() {
      const response = await TourService.fetchTours();
      this.tours = response.data;
    },

    async Update(event) {
      this.confirmForm = !this.confirmForm;
      if (event) {
        this.clickUpdate = event.target.id;
      }
    },
  },
  mounted() {
    this.getTours();
  },
};
</script>
