<template>
  <div>
    <div class="starting-section">
      <div class="main-img"></div>
      <div class="layer line-back"></div>

      <div class="container">
        <div class="main-info">
          <div class="main-info__subtitle">Choose the best destination</div>
          <div class="main-info__title">Adventure<br>Without BOUNDARIES...</div>
        </div>
        <div class="search">
          <input type="text" class="search__input" placeholder="Find out the best place..."
                 v-model="search">
          <router-link :to="{ name: 'Tours', query: { search: search } }"
                       class="search__button">Search
          </router-link>
        </div>
      </div>
    </div>

    <div class="experience">
      <div class="container">
        <div class="title">Experience <br> travel with us</div>
        <div class="boxes">
          <div class="experience__column">
            <div class="box img-experience-1"></div>
            <div class="text-box">
              <div class="title-box">Blue hill trial</div>
              <div class="subtitle-box">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Amet architecto
                autem commodi esse, eum excepturi iste laudantium
              </div>
            </div>
          </div>
          <div class="experience__column">
            <div class="box img-experience-2"></div>
            <div class="text-box">
              <div class="title-box">Blue hill trial</div>
              <div class="subtitle-box">Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Amet architecto
                autem commodi esse, eum excepturi iste laudantium
              </div>
            </div>
          </div>
          <div class="experience__column">
            <div class="box img-experience-3"></div>
            <div class="text-box">
              <div class="title-box">Blue hill trial</div>
              <div class="subtitle-box">Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Amet architecto
                autem commodi esse, eum excepturi iste laudantium
              </div>
            </div>
          </div>
          <div class="experience__column">
            <div class="box img-experience-4"></div>
            <div class="text-box">
              <div class="title-box">Blue hill trial</div>
              <div class="subtitle-box">Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Amet architecto
                autem commodi esse, eum excepturi iste laudantium
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="choose-caterory">
      <div class="container">
        <div class="title">Choose <br> your category</div>
        <div class="up-content">
          <div class="subtitle">
            <div class='slider__category js-slider'>
              <div class="slider__body" v-bind:style='{left: sliderOffsetLeft + "px"}'>
                <div class="slider__slide js-slide">
                  As absolute is by amounted repeated entirely ye returned.
                  These ready timed enjoy might sir yet one since
                  As am hastily invited settled at limited civilly fortune me.
                </div>
                <div class="slider__slide js-slide">
                  Years drift never if could forty being no. On estimable dependent as
                  suffering on my. Rank it long have sure in room what as he
                  As am hastily invited settled at limited civilly fortune me.
                </div>
                <div class="slider__slide js-slide">
                  Possession travelling sufficient yet our. Talked vanity looked in to.
                  Gay perceive led believed endeavor.
                  As am hastily invited settled at limited civilly fortune me.
                </div>
                <div class="slider__slide js-slide">
                  Taken no great widow spoke of it small.
                  Genius use except son esteem merely her limits. Sons park by do make on.
                  As am hastily invited settled at limited civilly fortune me.
                </div>
              </div>
            </div>
          </div>
          <div class="up-content__arrows">
            <div class="up-content__arrows__arrow" @click='prevSlide'
                 :class="{'up-content__arrows__arrow__inactive' :
               sliderActive === 1}">
              <i class="fas fa-arrow-left"></i>
            </div>
            <div class="up-content__arrows__arrow" @click="nextSlide"
                 :class="{'up-content__arrows__arrow__inactive' :
               sliderActive === sliderAllCount}">
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>

        <div class="boxes">
          <div class="experience__column">
            <router-link :to="{ name: 'Tours', query: { search: 'mountain' } }">
              <div class="box img-category-1">
                <div class="box__category">Mountain</div>
              </div>
            </router-link>
          </div>
          <div class="experience__column">
            <router-link :to="{ name: 'Tours', query: { search: 'waterfall' } }">
              <div class="box img-category-2">
                <div class="box__category">Waterfall</div>
              </div>
            </router-link>
          </div>
          <div class="experience__column">
            <router-link :to="{ name: 'Tours', query: { search: 'snow' } }">
              <div class="box img-category-3">
                <div class="box__category">Snow</div>
              </div>
            </router-link>
          </div>
          <div class="experience__column">
            <router-link :to="{ name: 'Tours', query: { search: 'nature' } }">
              <div class="box img-category-4">
                <div class="box__category">Nature</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="adventure-trip">
      <div class="container">
        <div class="title">Our <br> Adventure Trip</div>
        <div class="subtitle">Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Ad aliquam dicta
          doloremque
          est,
          excepturi fugit, labore mollitia natus obcaecati
          officiis perspiciatis quod sed tempore tenetur ullam
          vel
          voluptatibus. Ab architecto asperiores autem commodi
          corporis cupiditate debitis doloremque dolorum
          eaque
          earum
          in incidunt, iure labore libero magnam maiores
          maxime molestias neque
        </div>
        <div class="video-block" v-if="video">
          <div class="video-block__blackout">
            <div class="video-block__blackout__circle" @click="video = !video">
              <div class="video-block__blackout__circle__second">
                <i class="fas fa-play" style="color: #433A8B"></i>
              </div>
            </div>
          </div>
        </div>
        <iframe v-if="!video" src="https://www.youtube.com/embed/bYVebL_BYqo"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
        </iframe>
      </div>
    </div>

    <div class="awesome-clients">
      <div class="container">
        <div class="title">Our <br>Awesome Clients</div>
        <div class="subtitle">Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Adipisci aspernatur
          deserunt dignissimos ea, earum eos eum ipsam libero
          nisi, optio pariatur porro quae quam
          quas qui quibusdam, quos
          repudiandae vel veniam vitae? Culpa error,
          laboriosam? Aperiam aut consectetur eum quod
          repellendus. Animi
          aspernatur, aut blanditiis dignissimos
        </div>
        <div  class="awesome-clients__slider">
          <div class="awesome-clients__slider__arrow" @click="prevSl"
               :class="{'awesome-clients__slider__arrow__inactive' :
               activeSlide === 1}">
            <i class="fas fa-angle-left" style="color: white"></i>
          </div>
          <div class="slider__clients js-slider-client">
            <div class="slider__body" v-bind:style='{left: sliderOffsetClients + "px"}'>
              <div v-for="index in 5" v-bind:key="index.id" class="slider__slide js-slide">
                <div class="awesome-clients__slider__client awesome-clients__slider__client__small"
                     @click="activeSlide = index"
                     v-bind:class=" ['img-clients-' + index,
                     { 'awesome-clients__slider__client__large': activeSlide === index,
                     'awesome-clients__slider__client__medium ': activeSlide === index + 1 ||
                     activeSlide === index - 1}]">
                </div>
              </div>
            </div>
          </div>
          <div class="awesome-clients__slider__arrow"
               :class="{'awesome-clients__slider__arrow__inactive' :
               activeSlide === sliderAllClients}" @click="nextSl">
            <i class="fas fa-angle-right" style="color: white"></i>
          </div>
        </div>
        <div class="awesome-clients__info">
          <div v-if="activeSlide === 1" class="awesome-clients__info__name">Milana Searle</div>
          <div v-else-if="activeSlide === 2" class="awesome-clients__info__name">Josh Dolan</div>
          <div v-else-if="activeSlide === 3" class="awesome-clients__info__name">Alex Smith</div>
          <div v-else-if="activeSlide === 4" class="awesome-clients__info__name">Chyna Hunter</div>
          <div v-else-if="activeSlide === 5" class="awesome-clients__info__name">Kiya Lennon</div>
          <div class="awesome-clients__info__review">Lorem ipsum
            dolor sit amet, consectetur adipisicing elit.
            Consectetur, delectus dicta
            hic
            ipsum laborum libero magnam ratione veritatis
            vitae voluptates
          </div>
        </div>
      </div>
    </div>

    <div class="feedback">
      <div class="feedback__color-back">
        <div class="container">
          <div class="email">
            <input class="email__input" placeholder="Enter your mail address">
            <div class="email__button">Book Now</div>
          </div>
        </div>
        <div class="text-end">START YOUR ADVENTURE WITH US</div>
      </div>
    </div>

    <div class="footer">
      <div class="container">
        <div class="content">
          <div class="content__left">
            <div class="content__left__logo">advento</div>
            <div class="subtitle">Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Amet aspernatur
              at
              dolor earum enim eos esse fugit
            </div>
            <div class="subtitle">
              +123 456 789<br>
              info@advento.com<br>
              www.advento.com<br>
            </div>
            <div class="content__left__icons">
              <i class="content__left__icons__icon fab fa-facebook-f icon"></i>
              <i class="content__left__icons__icon fab fa-twitter icon"></i>
              <i class="content__left__icons__icon fab fa-pinterest-p icon"></i>
              <i class="content__left__icons__icon fab fa-instagram icon"></i>
              <i class="content__left__icons__icon fab fa-google-plus-g icon"></i>
            </div>
          </div>

          <div class="content__right">
            <div class="content__right__column">
              <div class="content__right__column__title">
                Activities
              </div>
              <div class="content__right__column__items">
                <div class="content__right__column__items_item">Mountain Biking</div>
                <br>
                <div class="content__right__column__items_item">Hiking</div>
                <br>
                <div class="content__right__column__items_item">Destination</div>
                <br>
                <div class="content__right__column__items_item">Stories</div>
                <br>
              </div>
            </div>
            <div class="content__right__column">
              <div class="content__right__column__title">
                Booking
              </div>
              <div class="content__right__column__items">
                <div class="content__right__column__items_item">Ticket</div>
                <br>
                <div class="content__right__column__items_item">Travel Product</div>
                <br>
                <div class="content__right__column__items_item">Packages</div>
                <br>
                <div class="content__right__column__items_item">Accommodation</div>
                <br>
              </div>
            </div>
            <div class="content__right__column">
              <div class="content__right__column__title">
                Contact
              </div>
              <div class="content__right__column__items">
                <div class="content__right__column__items_item">Team</div>
                <br>
                <div class="content__right__column__items_item">Jobs</div>
                <br>
                <div class="content__right__column__items_item">Tourist Office</div>
                <br>
                <div class="content__right__column__items_item">Brochures</div>
                <br>
              </div>
            </div>
          </div>
        </div>
        <div class="made"> © All Rights Reserved by ADVENTO | Made with ♥ | 2019</div>
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
      // Всего слайдов
      sliderAllCount: 0,
      // Номер активного слайда
      sliderActive: 1,
      // Отступ тела со слайдами в контейнере
      sliderOffsetLeft: 0,
      // Шаг одного слайда = его длина
      sliderOffsetStep: 0,
      sliderAllClients: 0,
      activeSlide: 1,
      sliderOffsetStepClients: 0,
      sliderOffsetClients: 0,
    };
  },
  methods: {
    // Иницилизация слайдера
    initSlider() {
      const sliderBody = this.$el.querySelector('.js-slider');
      const sliderSlidies = sliderBody.querySelectorAll('.js-slide');
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
      const sliderSlidies = this.$el.querySelectorAll('.awesome-clients__slider__client');
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

    nextSl() {
      if (this.activeSlide < this.sliderAllClients) {
        this.activeSlide += 1;
        this.openSlideClients(this.activeSlide);
      }
    },

    prevSl() {
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
