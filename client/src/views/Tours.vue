<template>
  <div class="tours">
    <transition name="smooth">
      <div v-if="confirmFormEdit" class="confirm-form">
        <div class="confirm-form__icon confirm-form__icon__warning"></div>
        <div class="confirm-form__title">
          do you really <br> want to do this?
        </div>
        <div class="confirm-form__buttons">
          <router-link v-bind:to="{ name: 'EditTour', params:
                  { id: clickId } }">
            <div class="confirm-form__button confirm-form__button__positive">Edit</div>
          </router-link>
          <div class="confirm-form__button confirm-form__button__negative"
               @click="confirmFormEdit = !confirmFormEdit">
            Cancel
          </div>
        </div>
      </div>
    </transition>
    <transition name="smooth">
      <div v-if="confirmFormDelete" class="confirm-form">
        <div class="confirm-form__icon confirm-form__icon__warning"></div>
        <div class="confirm-form__title">
          do you really <br> want to do this?
        </div>
        <div class="confirm-form__buttons">
          <div class="confirm-form__button confirm-form__button__positive"
                 @click="DeleteTour(clickId)">Delete</div>
          <div class="confirm-form__button confirm-form__button__negative"
               @click="confirmFormDelete = !confirmFormDelete">
            Cancel
          </div>
        </div>
      </div>
    </transition>
    <div v-if="confirmFormEdit || confirmFormDelete" class="page-form"></div>
    <div class="container">
      <div class="title-item">
        Tours
        <div class="icon icon__tours"></div>
      </div>
      <transition name="loading">
        <div class="loading" v-if="!tours.length && !NotTours"></div>
      </transition>
      <transition name="loading">
        <div style="text-align: center" v-if="!tours.length && NotTours">
          Please, add your first tour</div>
      </transition>
      <div class="table-tours">
        <transition name="tours">
          <input v-if="tours.length" v-model="search" placeholder='Enter name of tour'>
        </transition>
          <button v-if="search " class="table-tours__search-item"
                  @click="cleanSearch">{{ search }}
            <i class="fas fa-times"></i>
          </button>
        <transition name="tours">
          <table v-if="tours.length">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price
                <router-link v-if="this.$route.query.sort !== 'price_desc'"  :to="{query:
                { search: search, sort: 'price_desc' } }" class="fas fa-arrow-down"></router-link>
                <router-link v-else-if="this.$route.query.sort === 'price_desc'" :to="{query:
                { search: search, sort: 'price_asc' } }" class="fas fa-arrow-up"></router-link>
              </th>
              <th>Date</th>
              <th>Edit</th>
              <th>Delete</th>
            <tr>
            <tr v-for="tour in filteredTours.slice(0, numberTours)" v-bind:key="tour.id">
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
              <td>
                <div @click="Delete">
                  <i class="fas fa-trash-alt btn-delete" v-bind:id="tour._id"></i>
                </div>
              </td>
            </tr>
          </table>
        </transition>
      </div>
      <transition name="tours">
        <button v-if="filteredTours.length &&
         filteredTours.length > numberTours" class="button-load-tours"
                @click="LoadTours">
          Load more tours
        </button>
      </transition>
<!--      <transition name="tours">-->
<!--        <div class="pages" v-if="filteredTours.length">-->
<!--          <div v-for="(index) in Math.ceil(filteredTours.length/perPage)"
v-bind:key='index.id'>-->
<!--            <router-link :to="{ query: { search: search, sort: $route.query.sort,-->
<!--            page: index }}" class="page">{{ index }}</router-link>-->

<!--          </div>-->
<!--        </div>-->
<!--      </transition>-->
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
      confirmFormEdit: false,
      confirmFormDelete: false,
      buttonEdit: false,
      buttonDelete: false,
      clickId: '',
      NotTours: false,
      search: this.$route.query.search || '',
      sort: this.$route.query.sort || '',
      numberTours: 4,
      // firstPage: 1,
      // perPage: 4,
    };
  },
  methods: {
    async getTours() {
      const response = await TourService.fetchTours();
      this.tours = response.data;
    },

    async Sort() {
      if (this.$route.query.sort === 'price_desc') {
        const response = await TourService.getTourSortDesc();
        this.tours = response.data;
      } else if (this.$route.query.sort === 'price_asc') {
        const response = await TourService.getTourSortAsc();
        this.tours = response.data;
      } else {
        this.getTours();
      }
    },

    async cleanSearch() {
      this.search = '';
    },

    async Update(event) {
      this.confirmFormEdit = !this.confirmFormEdit;
      if (event) {
        this.clickId = event.target.id;
      }
    },

    async Delete(event) {
      this.confirmFormDelete = !this.confirmFormDelete;
      if (event) {
        this.clickId = event.target.id;
      }
    },

    async DeleteTour(value) {
      await TourService.deleteTour(value);
      this.confirmFormDelete = !this.confirmFormDelete;
      this.getTours();
    },

    async Loading() {
      setTimeout(() => {
        this.NotTours = !this.NotTours;
      }, 2000);
    },
    async LoadTours() {
      this.numberTours += 4;
    },
  },
  computed: {
    filteredTours() {
      return this.tours.filter((tour) => tour.name.toLowerCase().match(this.search.toLowerCase())
          || tour.category.toLowerCase().match(this.search.toLowerCase()));
    },
  },
  mounted() {
    this.Sort();
    this.Loading();
  },
  watch: {
    search(newVal) {
      this.$router.push({ query: { ...this.$route.query, search: newVal } });
    },
    '$route.query.search': function (val) {
      this.search = val;
      this.numberTours = 4;
    },
    '$route.query.sort': function () {
      this.Sort();
    },
  },
};
</script>
