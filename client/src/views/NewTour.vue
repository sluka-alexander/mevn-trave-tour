<template>
  <div>
    <div class="container">
      <div class="title-item">
        Add tour
        <div class="icon icon__new"></div>
      </div>
      <form @submit.prevent="addTour">
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
            {{$v.tour.name.$params.minLength.min}}
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
            {{$v.tour.desc.$params.minLength.min}}
          </div>
        </div>
        <div class="form-item"
             :class="{'form-item-err' : $v.tour.price.$error}">
          <label for="price">Price</label>
          <input
            type="text"
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
        <div v-if="$v.$invalid" class="button-no-active">Add tour</div>
        <button type="submit" v-else>Add tour</button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, numeric } from 'vuelidate/lib/validators';
import TourService from '../services/TourService';

export default {
  name: 'NewTour',
  data() {
    return {
      tour: {
        name: '',
        category: 'Nature',
        desc: '',
        price: '',
      },
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
    async addTour() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log('error');
      } else {
        await TourService.addNewTour({
          name: this.tour.name,
          category: this.tour.category,
          desc: this.tour.desc,
          price: this.tour.price,
        });
        await this.$router.push({ name: 'Tours' });
      }
    },
  },
};
</script>
