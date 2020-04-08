<template>
  <div>
    <div class="container">
      <div class="title-item">
        Add tour
        <div class="icon icon_new"></div>
      </div>
      <form @submit.prevent="addTour" class="form">
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
            {{$v.tour.name.$params.minLength.min}}
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
             :class="{'form__item_err' : $v.tour.desc.$error}">
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
        <div v-if="$v.$invalid" class="button button_no-active">Add tour</div>
        <button v-else type="submit" class="button">Add tour</button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, numeric } from 'vuelidate/lib/validators';

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
      try {
        const data = {
          name: this.tour.name,
          category: this.tour.category,
          desc: this.tour.desc,
          price: this.tour.price,
        };
        await this.$store.dispatch('newTour', data)
          .then(() => this.$router.push({ name: 'Tours' }));
      } catch (error) {
        console.log(error);
        await this.$router.push({ name: 'Error' });
      }
    },
  },
};
</script>
