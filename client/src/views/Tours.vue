<template>
  <div class="tours" :class="{'tours_dark-theme' : this.$store.state.isDarkTheme}">
    <transition name="animate" appear enter-active-class="animated zoomIn faster"
                leave-active-class="animated zoomOutLeft faster">
      <div v-if="confirmFormEdit" class="confirm-form">
        <div class="confirm-form__icon confirm-form__icon_warning"></div>
        <div class="confirm-form__title">
          {{ $t('confirmForm.warning.first') }} <br>
          {{ $t('confirmForm.warning.second') }}
        </div>
        <div class="confirm-form__buttons">
          <router-link v-bind:to="{ name: 'EditTour', params:
                  { id: clickId } }">
            <div class="confirm-form__button confirm-form__button_positive">
              {{ $t('btn.edit') }}
            </div>
          </router-link>
          <div class="confirm-form__button confirm-form__button_negative"
               @click="confirmFormEdit = !confirmFormEdit">
            {{ $t('btn.cancel') }}
          </div>
        </div>
      </div>
    </transition>
    <transition name="animate" appear enter-active-class="animated zoomIn faster"
                leave-active-class="animated zoomOutLeft faster">
      <div v-if="confirmFormDelete" class="confirm-form">
        <div class="confirm-form__icon confirm-form__icon_warning"></div>
        <div class="confirm-form__title">
          {{ $t('confirmForm.warning.first') }} <br>
          {{ $t('confirmForm.warning.second') }}
        </div>
        <div class="confirm-form__buttons">
          <div class="confirm-form__button confirm-form__button_positive"
                 @click="deleteTour(clickId)">
            {{ $t('btn.delete') }}
          </div>
          <div class="confirm-form__button confirm-form__button_negative"
               @click="closeForm">
            {{ $t('btn.cancel') }}
          </div>
        </div>
      </div>
    </transition>
    <div v-if="confirmFormEdit || confirmFormDelete" class="page-form"
         @click="closeForm"></div>
    <div class="container">
      <div class="title-item">
        <transition name="animate" appear enter-active-class="animated fadeInRight fast">
          <div>
            {{ $t('titleRoute.tours') }}
          </div>
        </transition>
        <transition name="animate" appear enter-active-class="animated zoomInDown fast">
          <div class="icon icon_tours"></div>
        </transition>
        <div class="loading" v-if="!filteredTours.length && !NotTours"></div>
      </div>
      <div style="text-align: center;" v-if="!filteredTours.length && NotTours">
        {{ $t('tours.warningTxt') }}
      </div>
      <transition name="animate" appear enter-active-class="animated zoomIn faster delay">
        <div class="table-tours">
          <input v-if="allTours.length" v-model="search"
                 :placeholder="$t('startingBlock.searchTxt')">
          <button v-if="search " class="table-tours__search-item"
                  :class="{'table-tours__search-item_dark-theme' : this.$store.state.isDarkTheme}"
                  @click="cleanSearch">{{ search }}
            <i class="fas fa-times"></i>
          </button>
          <table v-if="filteredTours.length"
                 :class="{'table-dark-theme' : this.$store.state.isDarkTheme}">
            <tr class="tr" :class="{'tr-dark-theme' : this.$store.state.isDarkTheme}">
              <th>{{ $t('tours.tableTxt.name') }}</th>
              <th>{{ $t('tours.tableTxt.category') }}</th>
              <th>{{ $t('tours.tableTxt.desc') }}</th>
              <th>{{ $t('tours.tableTxt.price') }}
                <router-link v-if="this.$route.query.sort !== 'price_desc'"  :to="{query:
                  { search: search, sort: 'price_desc' } }"
                             class="fas fa-arrow-down"></router-link>
                <router-link v-else-if="this.$route.query.sort === 'price_desc'" :to="{query:
                  { search: search, sort: 'price_asc' } }" class="fas fa-arrow-up"></router-link>
              </th>
              <th>{{ $t('tours.tableTxt.date') }}</th>
              <th v-if="isAdmin">{{ $t('btn.edit') }}</th>
              <th v-if="isAdmin">{{ $t('btn.delete') }}</th>
            </tr>
            <tr v-for="tour in filteredTours.slice(0, initialNumberOfTours)"
                :key="tour.name + tour.isActive ">
              <td>{{ tour.name }}</td>
              <td>{{ tour.category}}</td>
              <td>{{ tour.description}}</td>
              <td>{{ tour.price}}$</td>
              <td>{{ tour.date}}</td>
              <td v-if="isAdmin">
                <div @click="updateTour">
                  <i class="fas fa-pencil-alt btn-edit" v-bind:id="tour._id"></i>
                </div>
              </td>
              <td v-if="isAdmin">
                <div @click="deleteForm">
                  <i class="fas fa-trash-alt btn-delete" v-bind:id="tour._id"></i>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </transition>
      <transition name="animate" appear enter-active-class="animated bounceInLeft"
                  leave-active-class="animated bounceOutLeft delay">
        <button v-if="filteredTours.length &&
         filteredTours.length > initialNumberOfTours" class="button-load-tours"
                @click="loadMoreTours">
          {{ $t('btn.loadTours') }}
        </button>
      </transition>
    </div>
  </div>
</template>

<script>
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
      initialNumberOfTours: 5,
    };
  },
  methods: {
    getAllTours() {
      this.$store.dispatch('getAllTours');
    },

    sortTours() {
      if (this.$route.query.sort === 'price_desc') {
        this.$store.dispatch('getTourSortDesc');
      } else if (this.$route.query.sort === 'price_asc') {
        this.$store.dispatch('getTourSortAsc');
      } else {
        this.getAllTours();
      }
    },

    cleanSearch() {
      this.search = '';
    },

    closeForm() {
      this.confirmFormDelete = false;
      this.confirmFormEdit = false;
    },

    deleteForm(event) {
      this.confirmFormDelete = !this.confirmFormDelete;
      if (event) {
        this.clickId = event.target.id;
      }
    },

    deleteTour(value) {
      this.$store.dispatch('deleteTour', value).then(() => {
        this.confirmFormDelete = !this.confirmFormDelete;
        this.sortTours();
      });
    },

    updateTour(event) {
      this.confirmFormEdit = !this.confirmFormEdit;
      if (event) {
        this.clickId = event.target.id;
      }
    },

    loading() {
      setTimeout(() => {
        this.NotTours = !this.NotTours;
      }, 200);
    },

    loadMoreTours() {
      this.initialNumberOfTours += 10;
    },
  },
  computed: {
    allTours() {
      return this.$store.getters.allTours;
    },
    filteredTours() {
      return this.allTours.filter((tour) => tour.name.toLowerCase().match(this.search.toLowerCase())
          || tour.category.toLowerCase().match(this.search.toLowerCase()));
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  mounted() {
    this.sortTours();
    this.loading();
  },
  watch: {
    search(newVal) {
      this.$router.push({ query: { ...this.$route.query, search: newVal } });
    },
    '$route.query.search': function (val) {
      this.search = val;
      this.initialNumberOfTours = 5;
    },
    '$route.query.sort': function () {
      this.sortTours();
    },
  },
};
</script>
