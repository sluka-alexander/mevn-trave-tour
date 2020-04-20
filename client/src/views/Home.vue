<template>
  <div>
    <kinesis-container>
      <transition name="animate" appear enter-active-class="animated zoomIn faster">
        <kinesis-element :strength="-60" class="line-back">
        </kinesis-element>
      </transition>
      <div class="starting-section">
        <div class="container">
          <div class="info-and-img">
            <transition name="animate" appear enter-active-class="animated bounceInLeft fast">
              <div class="main-info">
                <div class="main-info__subtitle">
                  {{ $t('startingBlock.subtitleMsg') }}
                </div>
                <div class="main-info__title">
                  {{ $t('startingBlock.titleMsgOne') }}<br>
                  {{ $t('startingBlock.titleMsgTwo') }}
                </div>
                <div class="search">
                  <input type="text" class="search__input"
                         :placeholder="$t('startingBlock.searchTxt') "
                         v-model="search" @keyup.enter="searchTour">
                  <div class="search__button" @click="searchTour">
                    {{ $t('btn.search') }}
                  </div>
                </div>
              </div>
            </transition>
            <kinesis-element :strength="17">
              <transition name="animate" appear enter-active-class="animated zoomIn faster">
                <div class="main-img"></div>
              </transition>
            </kinesis-element>
          </div>
        </div>
      </div>
    </kinesis-container>

    <div class="experience">
      <div class="container">
        <div class="title">
          {{ $t('experienceBlock.titleTxtOne') }} <br>
          {{ $t('experienceBlock.titleTxtTwo') }}</div>
        <div class="boxes">
          <div class="boxes__column">
            <div class="box img-experience-1"></div>
            <div class="box__text">
              <div class="box__title">
                {{ $t('experienceBlock.titleBoxTxt.one') }}
              </div>
              <div class="box__subtitle">
                {{ $t('experienceBlock.subtitleBoxTxt') }}
              </div>
            </div>
          </div>
          <div class="boxes__column">
            <div class="box img-experience-2"></div>
            <div class="box__text">
              <div class="box__title">
                {{ $t('experienceBlock.titleBoxTxt.two') }}
              </div>
              <div class="box__subtitle">
                {{ $t('experienceBlock.subtitleBoxTxt') }}
              </div>
            </div>
          </div>
          <div class="boxes__column">
            <div class="box img-experience-3"></div>
            <div class="box__text">
              <div class="box__title">
                {{ $t('experienceBlock.titleBoxTxt.three') }}
              </div>
              <div class="box__subtitle">
                {{ $t('experienceBlock.subtitleBoxTxt') }}
              </div>
            </div>
          </div>
          <div class="boxes__column">
            <div class="box img-experience-4"></div>
            <div class="box__text">
              <div class="box__title">
                {{ $t('experienceBlock.titleBoxTxt.four') }}
              </div>
              <div class="box__subtitle">
                {{ $t('experienceBlock.subtitleBoxTxt') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="choose-category">
      <div class="container">
        <div class="title">
          {{ $t('categoryBlock.titleTxtOne') }} <br>
          {{ $t('categoryBlock.titleTxtTwo') }}
        </div>
        <div class="choose-category__up-content">
          <div class="subtitle">
            <div class='choose-category__slider slider js-slider-category'>
              <div class="slider__body" v-bind:style='{left: sliderOffsetLeftCategory + "px"}'>
                <div class="slider__slide js-slide-category">
                  {{ $t('categoryBlock.subtitleTxt') }}
                </div>
                <div class="slider__slide js-slide-category">
                  {{ $t('categoryBlock.subtitleTxt') }}
                </div>
                <div class="slider__slide js-slide-category">
                  {{ $t('categoryBlock.subtitleTxt') }}
                </div>
                <div class="slider__slide js-slide-category">
                  {{ $t('categoryBlock.subtitleTxt') }}
                </div>
              </div>
            </div>
          </div>
          <div class="choose-category__arrows">
            <div class="choose-category__arrow" @click='prevSlideCategory'
                 :class="{'choose-category__arrow_inactive' :
               sliderActiveCategory === 1}">
              <i class="fas fa-arrow-left"></i>
            </div>
            <div class="choose-category__arrow" @click="nextSlideCategory"
                 :class="{'choose-category__arrow_inactive' :
               sliderActiveCategory === sliderAllCategory}">
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
        <div class="boxes">
          <div class="boxes__column">
            <router-link :to="{ name: 'Tours', query: { search: 'mountain' } }">
              <div class="choose-category__box box img-category-1">
                <div class="box__category">
                  {{ $t('categoryBlock.categoryBoxTxt.mountainTxt') }}
                </div>
              </div>
            </router-link>
          </div>
          <div class="boxes__column">
            <router-link :to="{ name: 'Tours', query: { search: 'waterfall' } }">
              <div class="choose-category__box box img-category-2">
                <div class="box__category">
                  {{ $t('categoryBlock.categoryBoxTxt.waterfallTxt') }}
                </div>
              </div>
            </router-link>
          </div>
          <div class="boxes__column">
            <router-link :to="{ name: 'Tours', query: { search: 'snow' } }">
              <div class="choose-category__box box img-category-3">
                <div class="box__category">
                  {{ $t('categoryBlock.categoryBoxTxt.snowTxt') }}
                </div>
              </div>
            </router-link>
          </div>
          <div class="boxes__column">
            <router-link :to="{ name: 'Tours', query: { search: 'nature' } }">
              <div class="choose-category__box box img-category-4">
                <div class="box__category">
                  {{ $t('categoryBlock.categoryBoxTxt.natureTxt') }}
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="adventure-trip">
      <div class="container">
        <div class="title">
          {{ $t('tripBlock.titleTxtOne') }}<br>
          {{ $t('tripBlock.titleTxtTwo') }}
        </div>
        <div class="subtitle">
          {{ $t('tripBlock.subtitleTxt') }}
        </div>
        <div class="video-block" v-if="video">
          <div class="video-block__blackout">
            <div class="video-block__circle" @click="video = !video">
              <div class="video-block__second-circle">
                <i class="fas fa-play" style="color: #433a8b;"></i>
              </div>
            </div>
          </div>
        </div>
        <iframe v-if="!video" src="https://www.youtube.com/embed/bYVebL_BYqo"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
        </iframe>
      </div>
    </div>

    <div class="clients">
      <div class="container">
        <div class="title">
          {{ $t('clientsBlock.titleTxtOne') }}<br>
          {{ $t('clientsBlock.titleTxtTwo') }}
        </div>
        <div class="subtitle">
          {{ $t('clientsBlock.subtitleTxt') }}
        </div>
        <div  class="clients__slider-and-info">
          <div class="clients__arrow" @click="prevSlideClients"
               :class="{'clients__arrow_inactive' :
               sliderActiveClients === 1}">
            <i class="fas fa-angle-left" style="color: white;"></i>
          </div>
          <div class="clients__slider slider_clients js-slider-client">
            <div class="slider__body" v-bind:style='{left: sliderOffsetLeftClients + "px"}'>
              <div v-for="index in 5" v-bind:key="index.id" class="slider__slide js-slide-client">
                <div class="clients__photo"
                     v-bind:class=" ['img-clients-' + index]">
                </div>
              </div>
            </div>
          </div>
          <div class="clients__arrow"
               :class="{'clients__arrow_inactive' :
               sliderActiveClients === sliderAllClients}" @click="nextSlideClients">
            <i class="fas fa-angle-right" style="color: white;"></i>
          </div>
        </div>
        <div class="clients__info">
          <div v-if="sliderActiveClients === 1" class="clients__name">
            {{ $t('clientsBlock.clientsTxt.one') }}
          </div>
          <div v-else-if="sliderActiveClients === 2" class="clients__name">
            {{ $t('clientsBlock.clientsTxt.two') }}
          </div>
          <div v-else-if="sliderActiveClients === 3" class="clients__name">
            {{ $t('clientsBlock.clientsTxt.three') }}
          </div>
          <div v-else-if="sliderActiveClients === 4" class="clients__name">
            {{ $t('clientsBlock.clientsTxt.four') }}
          </div>
          <div v-else-if="sliderActiveClients === 5" class="clients__name">
            {{ $t('clientsBlock.clientsTxt.five') }}
          </div>
          <div v-if="sliderActiveClients === 1" class="clients__review">
            {{ $t('clientsBlock.reviewTxt.one') }}
          </div>
          <div v-else-if="sliderActiveClients === 2" class="clients__review">
            {{ $t('clientsBlock.reviewTxt.two') }}
          </div>
          <div v-else-if="sliderActiveClients === 3" class="clients__review">
            {{ $t('clientsBlock.reviewTxt.three') }}
          </div>
          <div v-else-if="sliderActiveClients === 4" class="clients__review">
            {{ $t('clientsBlock.reviewTxt.four') }}
          </div>
          <div v-else-if="sliderActiveClients === 5" class="clients__review">
            {{ $t('clientsBlock.reviewTxt.five') }}
          </div>
        </div>
      </div>
    </div>

    <div class="feedback">
      <div class="feedback__color-back">
        <div class="container">
          <div class="email">
            <input class="email__input" :placeholder="$t('feedbackBlock.inputTxt')">
            <div class="email__button">{{ $t('btn.bookNow') }}</div>
          </div>
        </div>
        <div class="text-end">{{ $t('feedbackBlock.endTxt') }}</div>
      </div>
    </div>

    <div class="footer">
      <div class="container">
        <div class="footer__content">
          <div class="footer__left">
            <div class="footer__logo">advento</div>
            <div class="subtitle">
              {{ $t('footerBlock.subtitleTxt') }}
            </div>
            <div class="subtitle">
              +123 456 789<br>
              info@advento.com<br>
              www.advento.com<br>
            </div>
            <div class="footer__icons">
              <i class="footer__icon fab fa-facebook-f icon"></i>
              <i class="footer__icon fab fa-twitter icon"></i>
              <i class="footer__icon fab fa-pinterest-p icon"></i>
              <i class="footer__icon fab fa-instagram icon"></i>
              <i class="footer__icon fab fa-google-plus-g icon"></i>
            </div>
          </div>

          <div class="footer__right">
            <div class="footer__column">
              <div class="footer__title">
                {{ $t('footerBlock.columnTxt.one.title') }}
              </div>
              <div class="footer__items">
                <div class="footer__item">
                  {{ $t('footerBlock.columnTxt.one.items.one') }}
                </div>
                <br>
                <div class="footer__item">
                  {{ $t('footerBlock.columnTxt.one.items.two') }}
                </div>
                <br>
                <div class="footer__item">
                  {{ $t('footerBlock.columnTxt.one.items.three') }}
                </div>
                <br>
                <div class="footer__item">
                  {{ $t('footerBlock.columnTxt.one.items.four') }}
                </div>
                <br>
              </div>
            </div>
            <div class="footer__column">
              <div class="footer__title">
                {{ $t('footerBlock.columnTxt.two.title') }}
              </div>
              <div class="footer__items">
                <div class="footer__item">
                  {{ $t('footerBlock.columnTxt.two.items.one') }}
                </div>
                <br>
                <div class="footer__item">
                  {{ $t('footerBlock.columnTxt.two.items.two') }}
                </div>
                <br>
                <div class="footer__item">
                  {{ $t('footerBlock.columnTxt.two.items.three') }}
                </div>
                <br>
                <div class="footer__item">
                  {{ $t('footerBlock.columnTxt.two.items.four') }}
                </div>
                <br>
              </div>
            </div>
            <div class="footer__column">
              <div class="footer__title">
                {{ $t('footerBlock.columnTxt.three.title') }}
              </div>
              <div class="footer__items">
                <div class="footer__item">
                  {{ $t('footerBlock.columnTxt.three.items.one') }}
                </div>
                <br>
                <div class="footer__item">
                  {{ $t('footerBlock.columnTxt.three.items.two') }}
                </div>
                <br>
                <div class="footer__item">
                  {{ $t('footerBlock.columnTxt.three.items.three') }}
                </div>
                <br>
                <div class="footer__item">
                  {{ $t('footerBlock.columnTxt.three.items.four') }}
                </div>
                <br>
              </div>
            </div>
          </div>
        </div>
        <div class="footer__made"> {{ $t('footerBlock.madeTxt') }} </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      video: true,
      search: null,

      sliderAllCategory: 0,
      sliderActiveCategory: 1,
      sliderOffsetLeftCategory: 0,
      sliderOffsetStepCategory: 0,

      sliderAllClients: 0,
      sliderActiveClients: 1,
      sliderOffsetLeftClients: 0,
      sliderOffsetStepClients: 0,
    };
  },
  methods: {
    searchTour() {
      this.$router.push({ name: 'Tours', query: { search: this.search } });
    },

    initSliderCategory() {
      const sliderBody = this.$el.querySelector('.js-slider-category');
      const sliderSlides = sliderBody.querySelectorAll('.js-slide-category');
      this.sliderOffsetStepCategory = sliderBody.clientWidth;
      this.sliderAllCategory = sliderSlides.length;
    },

    openSlideCategory(id) {
      if (id > 0 && id <= this.sliderAllCategory) {
        this.sliderActiveCategory = id;
        this.sliderOffsetLeftCategory = -(this.sliderActiveCategory
            * this.sliderOffsetStepCategory - this.sliderOffsetStepCategory);
      }
    },

    nextSlideCategory() {
      if (this.sliderActiveCategory < this.sliderAllCategory) {
        this.sliderActiveCategory += 1;
        this.openSlideCategory(this.sliderActiveCategory);
      }
    },

    prevSlideCategory() {
      if (this.sliderActiveCategory > 1) {
        this.sliderActiveCategory -= 1;
        this.openSlideCategory(this.sliderActiveCategory);
      }
    },

    initSliderClients() {
      const sliderBody = this.$el.querySelector('.js-slider-client');
      const sliderSlides = this.$el.querySelectorAll('.js-slide-client');
      this.sliderOffsetStepClients = sliderBody.clientWidth;
      this.sliderAllClients = sliderSlides.length;
    },

    openSlideClients(id) {
      if (id > 0 && id <= this.sliderAllClients) {
        this.sliderActiveClients = id;
        this.sliderOffsetLeftClients = -(this.sliderActiveClients
            * this.sliderOffsetStepClients - this.sliderOffsetStepClients);
      }
    },

    nextSlideClients() {
      if (this.sliderActiveClients < this.sliderAllClients) {
        this.sliderActiveClients += 1;
        this.openSlideClients(this.sliderActiveClients);
      }
    },

    prevSlideClients() {
      if (this.sliderActiveClients > 1) {
        this.sliderActiveClients -= 1;
        this.openSlideClients(this.sliderActiveClients);
      }
    },
  },

  mounted() {
    this.initSliderCategory();
    this.initSliderClients();

    window.addEventListener('resize', () => {
      this.initSliderCategory();
      this.initSliderClients();
      this.openSlideCategory(this.sliderActiveCategory);
      this.openSlideClients(this.sliderActiveClients);
    });
  },
};
</script>
