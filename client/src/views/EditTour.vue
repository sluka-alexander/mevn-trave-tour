<template>
  <div>
    <div class="container">
      <div class="title-item">
        Edit tour
        <div class="icon icon__edit"></div>
      </div>
      <form @submit.prevent="UpdateTour">
        <div class="form-item"
             :class="{'form-item-err' : $v.tour.name.$error}">
          <label for="name">Name of tour</label>
          <input
            type="text"
            id="name"
            v-model.trim="tour.name"
            placeholder="Enter name"
            @blur="$v.tour.name.$touch()"
          >
          <div class="error" v-if="!$v.tour.name.required">Fill in the field</div>
          <div class="error" v-if="!$v.tour.name.minLength">Name must have at least
            {{ $v.tour.name.$params.minLength.min }}
          </div>
        </div>
        <div class="form-item">
          <label for="category">Category</label>
          <select type="text"
                  id="category"
                  v-model.trim="tour.category"
                  placeholder="Enter category"
                  @blur="$v.tour.category.$touch()"
          >
            <option>Nature</option>
            <option>Snow</option>
            <option>Waterfall</option>
            <option>Mountain</option>
          </select>
        </div>
        <div class="form-item"
             :class="{'form-item-err' : $v.tour.desc.$error}">
          <label for="desc">Description</label>
          <input
            id="desc"
            v-model.trim="tour.desc"
            placeholder="Enter description"
            @blur="$v.tour.desc.$touch()"
          >
          <div class="error" v-if="!$v.tour.desc.required">Fill in the field</div>
          <div class="error" v-if="!$v.tour.desc.minLength">Name must have at least
            {{ $v.tour.desc.$params.minLength.min }}
          </div>
        </div>
        <div class="form-item"
             :class="{'form-item-err' : $v.tour.price.$error}">
          <label for="price">Price</label>
          <input
            type="number"
            id="price"
            v-model.trim="tour.price"
            placeholder="Enter price"
            @blur="$v.tour.price.$touch()"
          >
          <div class="error" v-if="!$v.tour.price.numeric">
            Insert the number
          </div>
          <div class="error" v-if="!$v.tour.price.required">
            Fill in the field
          </div>
        </div>
        <span style="display: flex">
          <div v-if="$v.$invalid ||
            tour.name === oldTour.name &&
            tour.category === oldTour.category &&
            tour.desc === oldTour.desc &&
            Number(tour.price)=== oldTour.price "
            class="button button__no-active">Add tour
          </div>
          <button type="submit" v-else class="button">Add tour</button>
          <span class="button-back" @click="Back">Cancel</span>
        </span>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, numeric } from 'vuelidate/lib/validators';
import TourService from '../services/TourService';


export default {
  name: 'EditTour',

  data() {
    return {
      oldTour: {
        name: '',
        category: '',
        desc: '',
        price: '',
      },
      tour: {
        name: '',
        category: '',
        desc: '',
        price: '',
      },
      comparison: false,
    };
  },

  validations: {
    tour: {
      name: { required, minLength: minLength(3) },
      category: { required },
      desc: { required, minLength: minLength(10) },
      price: { required, numeric },
    },
  },

  methods: {
    async getTour() {
      const tour = await TourService.getTour({
        id: this.$route.params.id,
      });
      this.tour.name = tour.data.name;
      this.tour.category = tour.data.category;
      this.tour.desc = tour.data.description;
      this.tour.price = tour.data.price;

      this.oldTour.name = tour.data.name;
      this.oldTour.category = tour.data.category;
      this.oldTour.desc = tour.data.description;
      this.oldTour.price = tour.data.price;
    },
    async UpdateTour() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log('error');
      } else {
        await TourService.updateTour({
          id: this.$route.params.id,
          date: this.tour.date,
          name: this.tour.name,
          category: this.tour.category,
          desc: this.tour.desc,
          price: this.tour.price,
        });
        await this.$router.go(-1);
      }
    },

    async Back() {
      await this.$router.go(-1);
    },
  },
  mounted() {
    this.getTour();
  },
};
</script>

<style scoped>

</style>
