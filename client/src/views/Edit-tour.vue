<template>
  <div>
    <div class="container">
      <div class="title-item">
        Edit tour
        <div class="icon icon_edit"></div>
      </div>
      <form @submit.prevent="UpdateTour" class="form">
        <div class="form__item"
             :class="{'form__item_err' : $v.tour.name.$error}">
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
        <div class="form__item">
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
        <div class="form__item"
             :class="{'form__item_err' : $v.tour.description.$error}">
          <label for="desc">Description</label>
          <input
            id="desc"
            v-model.trim="tour.description"
            placeholder="Enter description"
            @blur="$v.tour.description.$touch()"
          >
          <div class="error" v-if="!$v.tour.description.required">Fill in the field</div>
          <div class="error" v-if="!$v.tour.description.minLength">Name must have at least
            {{ $v.tour.description.$params.minLength.min }}
          </div>
        </div>
        <div class="form__item"
             :class="{'form__item_err' : $v.tour.price.$error}">
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
          <div v-if="$v.$invalid"
            class="button button_no-active">Edit tour
          </div>
          <button type="submit" v-else class="button">Edit tour</button>
          <span class="button-back" @click="Back">Cancel</span>
        </span>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, numeric } from 'vuelidate/lib/validators';

export default {
  name: 'EditTour',

  data() {
    return {
      oldTour: [],
      tour: [],
      comparison: false,
    };
  },

  validations: {
    tour: {
      name: { required, minLength: minLength(3) },
      category: { required },
      description: { required, minLength: minLength(10) },
      price: { required, numeric },
    },
  },
  methods: {
    async getTour() {
      const tourId = { id: this.$route.params.id };
      await this.$store.dispatch('getEditTour', tourId);
      setTimeout(() => {
        this.tour = this.$store.state.editTour;
      }, 350);
    },

    async UpdateTour() {
      const data = {
        id: this.$route.params.id,
        date: this.tour.date,
        name: this.tour.name,
        category: this.tour.category,
        description: this.tour.description,
        price: this.tour.price,
      };
      await this.$store.dispatch('updateTour', data).then(() => {
        setTimeout(() => {
          this.$router.go(-1);
        }, 300);
      });
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
