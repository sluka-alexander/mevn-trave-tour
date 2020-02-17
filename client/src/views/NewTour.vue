<template>
  <div>
    <div class="container">
      <div class="title-item">Add tour</div>
      <form>
        <div class="form-item">
          <label for="name">Name of tour</label>
          <input
            type="text"
            id="name"
            v-model.trim="tour.name"
            placeholder="Enter name"
          >
        </div>
        <div class="form-item">
          <label for="category">Category</label>
          <select type="text"
                  id="category"
                  v-model.trim="tour.category"
                  placeholder="Enter category"
                  >
            <option>Nature</option>
            <option>Snow</option>
            <option>Waterfall</option>
            <option>Mountain</option>
          </select>
        </div>
        <div class="form-item">
          <label for="desc">Description</label>
          <textarea
            id="desc"
            v-model.trim="tour.desc"
            placeholder="Enter description"
          ></textarea>
        </div>
        <div class="form-item">
          <label for="price">Price</label>
          <input
            type="text"
            id="price"
            v-model.trim="tour.price"
            placeholder="Enter price"
          >
        </div>
        <div class="validate">Fill in all the fields</div>
        <button @click="addTour()">Add tour</button>
      </form>
    </div>
  </div>
</template>

<script>

import TourService from '../services/TourService';

export default {
  name: 'NewTour',
  data() {
    return {
      tour: {
        name: '',
        category: 'Nature',
        description: '',
        price: '',
      },
    };
  },
  methods: {
    async addTour() {
      if (this.tour.name !== ''
        && this.tour.category !== ''
        && this.tour.desc !== ''
        && this.tour.price !== '') {
        this.$router.push({ name: 'Tours' });

        await TourService.addNewTour({
          name: this.tour.name,
          category: this.tour.category,
          description: this.tour.desc,
          price: this.tour.price,
        });
      }
    },
  },
};
</script>
