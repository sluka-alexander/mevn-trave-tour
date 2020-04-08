<template>
  <div>
    <transition name="tours">
      <div class="starting-section" @mousemove="Move">
        <div class=" layer-line line-back"></div>
        <div class="container">
          <div class="info-and-img">
            <div class="main-info">
              <div class="main-info__subtitle">Choose the best destination</div>
              <div class="main-info__title">Adventure<br>Without BOUNDARIES...</div>
              <div class="search">
                <input type="text" class="search__input" placeholder="Find out the best place..."
                       v-model="search" @keyup.enter="SearchTour">
                <div class="search__button" @click="SearchTour">
                  Search
                </div>
              </div>
            </div>
            <div class="layer main-img"></div>
          </div>
        </div>
      </div>
    </transition>

    <div class="experience">
      <div class="container">
        <div class="title">Experience <br> travel with us</div>
        <div class="boxes">
          <div class="boxes__column">
            <div class="box img-experience-1"></div>
            <div class="box__text">
              <div class="box__title">Blue hill trial</div>
              <div class="box__subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Amet architecto
                autem commodi esse, eum excepturi iste laudantium
              </div>
            </div>
          </div>
          <div class="boxes__column">
            <div class="box img-experience-2"></div>
            <div class="box__text">
              <div class="box__title">Blue hill trial</div>
              <div class="box__subtitle">Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Amet architecto
                autem commodi esse, eum excepturi iste laudantium
              </div>
            </div>
          </div>
          <div class="boxes__column">
            <div class="box img-experience-3"></div>
            <div class="box__text">
              <div class="box__title">Blue hill trial</div>
              <div class="box__subtitle">Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Amet architecto
                autem commodi esse, eum excepturi iste laudantium
              </div>
            </div>
          </div>
          <div class="boxes__column">
            <div class="box img-experience-4"></div>
            <div class="box__text">
              <div class="box__title">Blue hill trial</div>
              <div class="box__subtitle">Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Amet architecto
                autem commodi esse, eum excepturi iste laudantium
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="choose-category">
      <div class="container">
        <div class="title">Choose <br> your category</div>
        <div class="choose-category__up-content">
          <div class="subtitle">
            <div class='choose-category__slider slider js-slider-category'>
              <div class="slider__body" v-bind:style='{left: sliderOffsetLeft + "px"}'>
                <div class="slider__slide js-slide">
                  As absolute is by amounted repeated entirely ye returned.
                  These ready timed enjoy might sir yet one since
                  As am hastily invited settled at limited civilly fortune me.
                </div>
                <div class="slider__slide js-slide-category">
                  Years drift never if could forty being no. On estimable dependent as
                  suffering on my. Rank it long have sure in room what as he
                  As am hastily invited settled at limited civilly fortune me.
                </div>
                <div class="slider__slide js-slide-category">
                  Possession travelling sufficient yet our. Talked vanity looked in to.
                  Gay perceive led believed endeavor.
                  As am hastily invited settled at limited civilly fortune me.
                </div>
                <div class="slider__slide js-slide-category">
                  Taken no great widow spoke of it small.
                  Genius use except son esteem merely her limits. Sons park by do make on.
                  As am hastily invited settled at limited civilly fortune me.
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
                <div class="box__category">Mountain</div>
              </div>
            </router-link>
          </div>
          <div class="boxes__column">
            <router-link :to="{ name: 'Tours', query: { search: 'waterfall' } }">
              <div class="choose-category__box box img-category-2">
                <div class="box__category">Waterfall</div>
              </div>
            </router-link>
          </div>
          <div class="boxes__column">
            <router-link :to="{ name: 'Tours', query: { search: 'snow' } }">
              <div class="choose-category__box box img-category-3">
                <div class="box__category">Snow</div>
              </div>
            </router-link>
          </div>
          <div class="boxes__column">
            <router-link :to="{ name: 'Tours', query: { search: 'nature' } }">
              <div class="choose-category__box box img-category-4">
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
            <div class="video-block__circle" @click="video = !video">
              <div class="video-block__second-circle">
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

    <div class="clients">
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
        <div  class="clients__slider-and-info">
          <div class="clients__arrow" @click="prevSlideClients"
               :class="{'clients__arrow_inactive' :
               activeSlide === 1}">
            <i class="fas fa-angle-left" style="color: white"></i>
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
            <i class="fas fa-angle-right" style="color: white"></i>
          </div>
        </div>
        <div class="clients__info">
          <div v-if="activeSlide === 1" class="clients__name">Milana Searle</div>
          <div v-else-if="activeSlide === 2" class="clients__name">Josh Dolan</div>
          <div v-else-if="activeSlide === 3" class="clients__name">Alex Smith</div>
          <div v-else-if="activeSlide === 4" class="clients__name">Chyna Hunter</div>
          <div v-else-if="activeSlide === 5" class="clients__name">Kiya Lennon</div>
          <div class="clients__review">Lorem ipsum
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
        <div class="footer__content">
          <div class="footer__left">
            <div class="footer__logo">advento</div>
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
                Activities
              </div>
              <div class="footer__items">
                <div class="footer__item">Mountain Biking</div>
                <br>
                <div class="footer__item">Hiking</div>
                <br>
                <div class="footer__item">Destination</div>
                <br>
                <div class="footer__item">Stories</div>
                <br>
              </div>
            </div>
            <div class="footer__column">
              <div class="footer__title">
                Booking
              </div>
              <div class="footer__items">
                <div class="footer__item">Ticket</div>
                <br>
                <div class="footer__item">Travel Product</div>
                <br>
                <div class="footer__item">Packages</div>
                <br>
                <div class="footer__item">Accommodation</div>
                <br>
              </div>
            </div>
            <div class="footer__column">
              <div class="footer__title">
                Contact
              </div>
              <div class="footer__items">
                <div class="footer__item">Team</div>
                <br>
                <div class="footer__item">Jobs</div>
                <br>
                <div class="footer__item">Tourist Office</div>
                <br>
                <div class="footer__item">Brochures</div>
                <br>
              </div>
            </div>
          </div>
        </div>
        <div class="footer__made"> © All Rights Reserved by ADVENTO | Made with ♥ | 2019</div>
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

    Move(event) {
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
