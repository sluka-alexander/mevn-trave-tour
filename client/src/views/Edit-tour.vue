<template>
  <div>
    <div class="container">
      <div class="title-item">
        <transition name="animate" appear enter-active-class="animated fadeInRight fast">
          <div>
           {{ $t('Tour.titleEditTxt') }}
          </div>
        </transition>
        <transition name="animate" appear enter-active-class="animated zoomInDown fast">
          <div class="icon icon_edit"></div>
        </transition>
      </div>
      <transition name="animate" appear enter-active-class="animated zoomIn faster">
        <form @submit.prevent="UpdateTour" class="form"
              :class="{'form_dark-theme' : this.$store.state.isDarkTheme}">
          <div class="form__item"
               :class="{'form__item_err' : $v.tour.name.$error}">
            <label for="name">{{ $t('Tour.formTxt.name') }}</label>
            <input
              type="text"
              id="name"
              v-model.trim="tour.name"
              :placeholder="$t('Tour.formTxt.enter')"
              @blur="$v.tour.name.$touch()"
              :class="{'animated shake': $v.tour.name.$error}">
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
               :class="{'form__item_err' : $v.tour.description.$error}">
            <label for="desc">{{ $t('Tour.formTxt.desc') }}</label>
            <input
              id="desc"
              v-model.trim="tour.description"
              :placeholder="$t('Tour.formTxt.enter')"
              @blur="$v.tour.description.$touch()"
              :class="{'animated shake': $v.tour.description.$error}">
            <div class="error" v-if="!$v.tour.name.required">
              {{ $t('Tour.error.field') }}
            </div>
            <div class="error" v-if="!$v.tour.name.minLength">
              {{ $t('Tour.error.least') }}
              {{$v.tour.description.$params.minLength.min}}
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
              :class="{'animated shake': $v.tour.price.$error}">
            <div class="error" v-if="!$v.tour.name.required">
              {{ $t('Tour.error.field') }}
            </div>
          </div>
          <span style="display: flex;">
            <div v-if="$v.$invalid"
              class="button button_no-active">{{ $t('Tour.btnEditTxt') }}
            </div>
            <button type="submit" v-else class="button">{{ $t('Tour.btnEditTxt') }}</button>
            <span class="button-back" @click="Back">{{ $t('Tour.btnCancelTxt') }}</span>
          </span>
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';

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
      price: { required },
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
    Back() {
      this.$router.push({ name: 'Tours' });
    },
  },
  mounted() {
    this.getTour();
  },
};
</script>
