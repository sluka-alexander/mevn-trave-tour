<template>
  <div>
    <transition name="animate" appear enter-active-class="animated zoomIn faster">
      <div class=" layer-line line-back"></div>
    </transition>
      <div class="starting-section" @mousemove="move">
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
                         v-model="search" @keyup.enter="SearchTour">
                  <div class="search__button" @click="SearchTour">
                    {{ $t('btn.search') }}
                  </div>
                </div>
              </div>
            </transition>
            <transition name="animate" appear enter-active-class="animated zoomIn faster">
              <div class="layer main-img"></div>
            </transition>
          </div>
        </div>
      </div>
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
              <div class="slider__body" v-bind:style='{left: sliderOffsetLeft + "px"}'>
                <div class="slider__slide js-slide">
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
            <div class="choose-category__arrow" @click='prevSlide'
                 :class="{'choose-category__arrow_inactive' :
               sliderActive === 1}">
              <i class="fas fa-arrow-left"></i>
            </div>
            <div class="choose-category__arrow" @click="nextSlide"
                 :class="{'choose-category__arrow_inactive' :
               sliderActive === sliderAllCount}">
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
               activeSlide === 1}">
            <i class="fas fa-angle-left" style="color: white;"></i>
          </div>
          <div class="clients__slider slider js-slider-client">
            <div class="slider__body" v-bind:style='{left: sliderOffsetClients + "px"}'>
              <div v-for="index in 5" v-bind:key="index.id" class="slider__slide js-slide-client">
                <div class="clients__photo"
                     @click="activeSlide = index"
                     v-bind:class=" ['img-clients-' + index,
                     { 'awesome-clients__slider__client__large': activeSlide === index,
                     'awesome-clients__slider__client__medium ': activeSlide === index + 1 ||
                     activeSlide === index - 1}]">
                </div>
              </div>
            </div>
          </div>
          <div class="clients__arrow"
               :class="{'clients__arrow_inactive' :
               activeSlide === sliderAllClients}" @click="nextSlideClients">
            <i class="fas fa-angle-right" style="color: white;"></i>
          </div>
        </div>
        <div class="clients__info">
          <div v-if="activeSlide === 1" class="clients__name">
            {{ $t('clientsBlock.clientsTxt.one') }}
          </div>
          <div v-else-if="activeSlide === 2" class="clients__name">
            {{ $t('clientsBlock.clientsTxt.two') }}
          </div>
          <div v-else-if="activeSlide === 3" class="clients__name">
            {{ $t('clientsBlock.clientsTxt.three') }}
          </div>
          <div v-else-if="activeSlide === 4" class="clients__name">
            {{ $t('clientsBlock.clientsTxt.four') }}
          </div>
          <div v-else-if="activeSlide === 5" class="clients__name">
            {{ $t('clientsBlock.clientsTxt.five') }}
          </div>
          <div v-if="activeSlide === 1" class="clients__review">
            {{ $t('clientsBlock.reviewTxt.one') }}
          </div>
          <div v-else-if="activeSlide === 2" class="clients__review">
            {{ $t('clientsBlock.reviewTxt.two') }}
          </div>
          <div v-else-if="activeSlide === 3" class="clients__review">
            {{ $t('clientsBlock.reviewTxt.three') }}
          </div>
          <div v-else-if="activeSlide === 4" class="clients__review">
            {{ $t('clientsBlock.reviewTxt.four') }}
          </div>
          <div v-else-if="activeSlide === 5" class="clients__review">
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
      search: '',
      sliderAllCount: 0,
      sliderActive: 1,
      sliderOffsetLeft: 0,
      sliderOffsetStep: 0,
      sliderAllClients: 0,
      activeSlide: 1,
      sliderOffsetStepClients: 0,
      sliderOffsetClients: 0,
    };
  },
  methods: {
    SearchTour() {
      this.$router.push({ name: 'Tours', query: { search: this.search } });
    },

    move(event) {
      document.querySelector('.layer').style.transform = `translateX(-${event.pageX / 20}px)
        translateY(-${event.pageY / 20}px)`;
      document.querySelector('.layer-line').style.transform = `translateX(${event.pageX / 50}px)
        translateY(${event.pageY / 50}px)`;
    },

    initSlider() {
      const sliderBody = this.$el.querySelector('.js-slider-category');
      const sliderSlidies = sliderBody.querySelectorAll('.js-slide-category');
      this.sliderOffsetStep = sliderBody.clientWidth;
      this.sliderAllCount = sliderSlidies.length;
    },

    openSlide(id) {
      if (id > 0 && id <= this.sliderAllCount) {
        this.sliderActive = id;
        this.sliderOffsetLeft = -(this.sliderActive
            * this.sliderOffsetStep - this.sliderOffsetStep);
      }
    },

    nextSlide() {
      if (this.sliderActive < this.sliderAllCount) {
        this.sliderActive += 1;
        this.openSlide(this.sliderActive);
      }
    },

    prevSlide() {
      if (this.sliderActive > 1) {
        this.sliderActive -= 1;
        this.openSlide(this.sliderActive);
      }
    },

    initSliderClients() {
      const sliderBody = this.$el.querySelector('.js-slider-client');
      const sliderSlidies = this.$el.querySelectorAll('.js-slide-client');
      this.sliderOffsetStepClients = sliderBody.clientWidth;
      this.sliderAllClients = sliderSlidies.length;
    },

    openSlideClients(id) {
      if (id > 0 && id <= this.sliderAllClients) {
        this.activeSlide = id;
        this.sliderOffsetClients = -(this.activeSlide
            * this.sliderOffsetStepClients - this.sliderOffsetStepClients);
      }
    },

    nextSlideClients() {
      if (this.activeSlide < this.sliderAllClients) {
        this.activeSlide += 1;
        this.openSlideClients(this.activeSlide);
      }
    },

    prevSlideClients() {
      if (this.activeSlide > 1) {
        this.activeSlide -= 1;
        this.openSlideClients(this.activeSlide);
      }
    },
  },
  mounted() {
    this.initSlider();
    this.initSliderClients();

    window.addEventListener('resize', () => {
      this.initSlider();
      this.initSliderClients();
      this.openSlide(this.sliderActive);
      this.openSlideClients(this.activeSlide);
    });
  },
};
</script>
