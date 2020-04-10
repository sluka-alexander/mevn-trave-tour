<template>
  <div>
    <div class="container">
      <div class="title-item">
        {{ $t('Tour.titleTxt') }}
        <div class="icon icon_new"></div>
      </div>
      <form @submit.prevent="addTour" class="form">
        <div class="form__item"
             :class="{'form__item_err' : $v.tour.name.$error}">
          <label for="name">{{ $t('Tour.formTxt.name') }}</label>
          <input
            type="text"
            id="name"
            v-model.trim="tour.name"
            :placeholder="$t('Tour.formTxt.enter')"
            @blur="$v.tour.name.$touch()"
          >
          <div class="error" v-if="!$v.tour.name.required">
            {{ $t('Tour.error.field') }}
          </div>
          <div class="error" v-if="!$v.tour.name.minLength">
            {{ $t('Tour.error.least') }}
            {{$v.tour.name.$params.minLength.min}}
          </div>
        </div>
        <div class="form__item">
          <label for="category">{{ $t('Tour.formTxt.category') }}</label>
          <select type="text"
                  id="category"
                  v-model.trim="tour.category"
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
          <label for="desc">{{ $t('Tour.formTxt.desc') }}</label>
          <input
            id="desc"
            v-model.trim="tour.desc"
            :placeholder="$t('Tour.formTxt.enter')"
            @blur="$v.tour.desc.$touch()"
          >
          <div class="error" v-if="!$v.tour.desc.required">
            {{ $t('Tour.error.field') }}
          </div>
          <div class="error" v-if="!$v.tour.desc.minLength">
            {{ $t('newTour.error.least') }}
            {{$v.tour.desc.$params.minLength.min}}
          </div>
        </div>
        <div class="form__item"
             :class="{'form__item_err' : $v.tour.price.$error}">
          <label for="price">{{ $t('Tour.formTxt.price') }}</label>
          <input
            type="number"
            id="price"
            v-model.trim="tour.price"
            :placeholder="$t('Tour.formTxt.enter')"
            @blur="$v.tour.price.$touch()"
          >
          <div class="error" v-if="!$v.tour.price.required">
            {{ $t('Tour.error.field') }}
          </div>
        </div>
        <div v-if="$v.$invalid" class="button button_no-active">
          {{ $t('Tour.btnTxt') }}
        </div>
        <button v-else type="submit" class="button">
          {{ $t('Tour.btnTxt') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';

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
      price: { required },
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
