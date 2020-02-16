<template>
  <div>
    <h1>New tour</h1>
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
      <button @click="addTour()">Add tour</button>
    </form>
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
      this.$router.push({ name: 'Tours' });

      await TourService.addNewTour({
        name: this.tour.name,
        category: this.tour.category,
        description: this.tour.desc,
        price: this.tour.price,
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import './common/variables';
@import './common/mixins';
@import './common/placeholders';
@import './common/functions';

form{
  margin: 0 auto;
  width: 350px;
  padding: 50px;

  -webkit-box-shadow: 0px 4px 58px -2px rgba(220,213,222,1);
  -moz-box-shadow: 0px 4px 58px -2px rgba(220,213,222,1);
  box-shadow: 0px 4px 58px -2px rgba(220,213,222,1);

  .form-item{
    @extend %flex-center;

    flex-direction: column;
    width: 100%;
  }

  label{
    @include color-and-weight($black,$bold);

    font-size: calcFluidFontSize($font-M, $font-M, 320, 1920);
    margin: 10px 0;
  }
  input, textarea, select{
    @include color-and-weight($black,$regular);

    font-size: calcFluidFontSize($font-S, $font-S, 320, 1920);
    font-family: "Montserrat", sans-serif;
    border: 1px solid $gray;
    outline: 0;
    width: 100%;
    resize: none;
    margin: 0;
    padding: 10px 0;
  }
  button{
    @include color-and-weight($white,$regular);

    font-size: calcFluidFontSize($font-M, $font-M, 320, 1920);
    border: none;
    padding: 10px 50px;
    margin: 20px auto;
    background-color: $purple;
    cursor: pointer;
    transition: .3s;
    border-radius: 50px;
    outline: 0;

    &:hover{
      background-color: $pink;
    }
  }
}
</style>
