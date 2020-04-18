<template>
  <div>
    <div class="container">
      <div class="title-item">
        <transition name="animate" appear enter-active-class="animated fadeInRight fast">
          <div>
           {{ $t('titleRoute.editTour') }}
          </div>
        </transition>
        <transition name="animate" appear enter-active-class="animated zoomInDown fast">
          <div class="icon icon_edit-tour"></div>
        </transition>
      </div>
      <transition name="animate" appear enter-active-class="animated zoomIn faster">
        <form @submit.prevent="updateTour" class="form"
              :class="{'form_dark-theme' : this.$store.state.isDarkTheme}">
          <div class="form__item"
               :class="{'form__item_err' : $v.tour.name.$error}">
            <label for="name">{{ $t('form.titleInput.name') }}</label>
            <transition name="animate" appear enter-active-class="animated flash delay-1s">
              <input
                type="text"
                id="name"
                v-model.trim="tour.name"
                :placeholder="$t('form.placeholder')"
                @blur="$v.tour.name.$touch()"
                :class="{'animated shake': $v.tour.name.$error}">
            </transition>
            <div class="error" v-if="!$v.tour.name.required">
              {{ $t('validates.field') }}
            </div>
            <div class="error" v-if="!$v.tour.name.minLength">
              {{ $t('validates.min') }}
              {{$v.tour.name.$params.minLength.min}}
            </div>
            <div class="error" v-if="!$v.tour.name.maxLength">
              {{ $t('validates.max') }}
              {{$v.tour.name.$params.maxLength.max}}
            </div>
          </div>
          <div class="form__item">
            <label for="category">{{ $t('form.titleInput.category') }}</label>
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
            <label for="desc">{{ $t('form.titleInput.desc') }}</label>
            <input
              id="desc"
              v-model.trim="tour.description"
              :placeholder="$t('form.placeholder')"
              @blur="$v.tour.description.$touch()"
              :class="{'animated shake': $v.tour.description.$error}">
            <div class="error" v-if="!$v.tour.description.required">
              {{ $t('validates.field') }}
            </div>
            <div class="error" v-if="!$v.tour.description.minLength">
              {{ $t('validates.min') }}
              {{$v.tour.description.$params.minLength.min}}
            </div>
            <div class="error" v-if="!$v.tour.description.maxLength">
              {{ $t('validates.max') }}
              {{$v.tour.description.$params.maxLength.max}}
            </div>
          </div>
          <div class="form__item"
               :class="{'form__item_err' : $v.tour.price.$error}">
            <label for="price">{{ $t('form.titleInput.price') }}</label>
            <input
              type="number"
              id="price"
              v-model.trim="tour.price"
              :placeholder="$t('form.placeholder')"
              @blur="$v.tour.price.$touch()"
              :class="{'animated shake': $v.tour.price.$error}">
            <div class="error" v-if="!$v.tour.price.required">
              {{ $t('validates.field') }}
            </div>
            <div class="error" v-if="!$v.tour.price.maxLength">
              {{ $t('validates.max') }}
              {{$v.tour.price.$params.maxLength.max}}
            </div>
          </div>
          <span style="display: flex;">
            <div v-if="$v.$invalid || oldTour[0].name === tour.name &&
                oldTour[0].category === tour.category &&
                oldTour[0].description === tour.description &&
                String(oldTour[0].price) === String(tour.price)"
              class="button button_no-active">{{ $t('btn.edit') }}
            </div>
            <button type="submit" v-else class="button">{{ $t('btn.edit') }}</button>
            <span class="button-back" @click="back">{{ $t('btn.back') }}</span>
          </span>
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import axios from 'axios';
import endpoints from './store/endpoints.const';
import environment from './store/environment';

export default {
  name: 'EditTour',

  data() {
    return {
      tour: {
        name: null,
      },
      oldTour: [{
        name: null,
      }],
      comparison: false,
    };
  },

  validations: {
    tour: {
      name: { required, minLength: minLength(3), maxLength: maxLength(16) },
      category: { required },
      description: { required, minLength: minLength(10), maxLength: maxLength(30) },
      price: { required, maxLength: maxLength(5) },
    },
  },

  methods: {
    getTour() {
      const tourId = { id: this.$route.params.id };
      axios.get(`${environment.baseUrl}${endpoints.TOURS}`)
        .then((res) => {
        /* eslint no-underscore-dangle: 0 */
          this.oldTour = res.data.filter((tour) => tour._id === tourId.id);
        });
      this.$store.dispatch('getTour', tourId).then(() => {
        this.tour = this.$store.state.editTour;
      });
    },

    updateTour() {
      const data = {
        id: this.$route.params.id,
        date: this.tour.date,
        name: this.tour.name,
        category: this.tour.category,
        description: this.tour.description,
        price: this.tour.price,
      };
      this.$store.dispatch('updateTour', data).then(() => {
        this.$router.go(-1);
      });
    },

    back() {
      this.$router.push({ name: 'Tours' });
    },
  },

  mounted() {
    this.getTour();
  },
};
</script>
