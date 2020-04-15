import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'ru',
  messages: {
    en: {
      validates: {
        short: 'Password is too short',
        long: 'Password is too long',
        field: 'Fill in the field',
        least: 'Must have at least ',
        email: 'This is incorrect email',
      },
      confirmForm: {
        darthVader: {
          first: 'Now you are on',
          second: 'he dark side',
        },
      },
      navbar: {
        helloMsg: 'Hi',
        homeItemTxt: 'Home',
        toursItemTxt: 'Tours',
        newTourItemTxt: 'New tour',
        usersItemTxt: 'Users',
        loginItemTxt: 'Login',
        registerItemTxt: 'Register',
        profileItemTxt: 'Profile',
      },
      startingBlock: {
        subtitleMsg: 'Choose the best destination',
        titleMsgOne: 'Adventure',
        titleMsgTwo: 'Without BOUNDARIES...',
        searchTxt: 'Find out the best place...',
        searchButtonTxt: 'Search',
      },
      experienceBlock: {
        titleTxtOne: 'Experience',
        titleTxtTwo: 'travel with us',
        titleBoxTxt: {
          one: 'Island',
          two: 'Norway',
          three: 'Finland',
          four: 'Canada',
        },
        subtitleBoxTxt: 'Lorem ipsum dolor sit amet, consectetur adipisicing '
          + 'elit Amet architecto autem commodi esse, eum excepturi iste laudantium',
      },
      categoryBlock: {
        titleTxtOne: 'Choose',
        titleTxtTwo: 'your category',
        subtitleTxt: 'As absolute is by amounted repeated entirely ye returned. '
          + 'These ready timed enjoy might sir yet one since As am hastily '
          + 'invited settled at limited civilly fortune me.',
        categoryBoxTxt: {
          mountainTxt: 'Mountain',
          waterfallTxt: 'Waterfall',
          snowTxt: 'Snow',
          natureTxt: 'Nature',
        },
      },
      tripBlock: {
        titleTxtOne: 'Our',
        titleTxtTwo: 'Adventure Trip',
        subtitleTxt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
          + 'Ad aliquam dicta doloremque est, excepturi fugit, labore mollitia '
          + 'natus obcaecati officiis perspiciatis quod sed tempore tenetur ullam vel '
          + 'voluptatibus. Ab architecto asperiores autem commodi corporis cupiditate '
          + 'debitis doloremque dolorum eaque earum in incidunt, iure labore libero '
          + 'magnam maiores maxime molestias neque',
      },
      clientsBlock: {
        titleTxtOne: 'Our',
        titleTxtTwo: 'Awesome Clients',
        subtitleTxt: 'Lorem ipsum dolor sit amet,'
          + 'consectetur adipisicing elit. Adipisci aspernatur'
          + 'deserunt dignissimos ea, earum eos eum ipsam libero'
          + 'nisi, optio pariatur porro quae quam'
          + 'quas qui quibusdam, quos'
          + 'repudiandae vel veniam vitae? Culpa error,'
          + 'laboriosam? Aperiam aut consectetur eum quod'
          + 'repellendus. Animi'
          + 'aspernatur, aut blanditiis dignissimos',
        clientsTxt: {
          one: 'Milana Searle',
          two: 'Josh Dolan',
          three: 'Alex Smith',
          four: 'Chyna Hunter',
          five: 'Kiya Lennon',
        },
        reviewTxt: {
          one: 'One advanced diverted domestic sex repeated bringing you old. Possible procured '
            + 'her trifling laughter thoughts property she met way. Companions shy had '
            + 'solicitude favourable own.',
          two: 'Which could saw guest man now heard but. Lasted my coming uneasy marked so should. '
            + 'Gravity letters it amongst herself dearest an windows by. Wooded '
            + 'ladies she basket season',
          three: 'Material confined likewise it humanity raillery an unpacked as he. Three chief '
            + 'merit no if. Now how her edward engage not horses. Oh resolution '
            + 'he dissimilar precaution to comparison an. ',
          four: 'Carriage quitting securing be appetite it declared. High eyes kept so busy feel '
            + 'call in. Would day nor ask walls known. But preserved advantage are '
            + 'but and certainty earnestly enjoyment.',
          five: 'Nor hence hoped her after other known defer his. For county now sister engage '
            + 'had season better had waited. Occasional mrs interested far expression acceptance',
        },
      },
      feedbackBlock: {
        btnTxt: 'Book Now',
        inputTxt: 'Enter your mail address',
        endTxt: 'START YOUR ADVENTURE WITH US',
      },
      footerBlock: {
        subtitleTxt: 'Lorem ipsum dolor sit amet,'
          + 'consectetur adipisicing elit. Amet aspernatur'
          + 'at'
          + 'dolor earum enim eos esse fugit',
        columnTxt: {
          one: {
            title: 'Activities',
            items: {
              one: 'Mountain Biking',
              two: 'Hiking',
              three: 'Destination',
              four: 'Stories',
            },
          },
          two: {
            title: 'Booking',
            items: {
              one: 'Ticket',
              two: 'Travel Product',
              three: 'Packages',
              four: 'Accommodation',
            },
          },
          three: {
            title: 'Contact',
            items: {
              one: 'Jobs',
              two: 'Team',
              three: 'Tourist Office',
              four: 'Brochures',
            },
          },
        },
        madeTxt: '© All Rights Reserved by ADVENTO | Made with ♥ | 2020',
      },
      tours: {
        titleTxt: 'Tours',
        tableTxt: {
          name: 'Name',
          category: 'Category',
          desc: 'Description',
          price: 'Price',
          date: 'Date',
        },
        btnLoadTxt: 'Load more tours',
        confirmTxt: {
          warning: {
            one: 'Do you really',
            two: 'want to do this?',
          },
          deleteBtn: 'Delete',
          editBtn: 'Edit',
          cancelBtn: 'Cancel',
        },
        warningTxt: 'Found Nothing We Have',
      },
      Tour: {
        titleTxt: 'Add tour',
        titleEditTxt: 'Edit tour',
        formTxt: {
          name: 'Name',
          category: 'Category',
          desc: 'Description',
          price: 'Price',
          enter: 'Enter item',
        },
        btnTxt: 'Add tour',
        btnCancelTxt: 'Cancel',
        btnEditTxt: 'Edit tour',
        error: {
          field: 'Fill in the field',
          least: 'Must have at least ',
        },
      },
      users: {
        titleTxt: 'Users',
        nameTxt: 'Name:',
        roleTxt: 'Role:',
        emailTxt: 'Email:',
      },
      dashboard: {
        helloTxt: 'Hello, ',
        nameTxt: 'Your name:',
        roleTxt: 'Your role:',
        emailTxt: 'Your email:',
        logOutBtn: 'LogOut',
      },
      errorAndNotFound: {
        error: 'Error',
        notFound: 'Page not found',
      },
      LoginAndRegister: {
        titleLoginTxt: 'Login',
        titleRegisterTxt: 'Register',
        nameTxt: 'Name',
        emailTxt: 'Email',
        passwordTxt: 'Password',
        signInBtn: 'Sign in',
        signUpBtn: 'Sign up',
        placeholder: 'Enter item',
        confirmTxtOne: 'Congratulations,',
        confirmTxtTwo: 'you can now log in',
      },
    },
    ru: {
      validates: {
        short: 'Пароль слишком короткий',
        long: 'Пароль слишком длинный',
        field: 'Заполните поле',
        least: 'Должен быть не менее ',
        email: 'Введите корректный email',
      },
      confirmForm: {
        darthVader: {
          first: 'Теперь ты',
          second: 'на тёмной стороне!',
        },
      },
      navbar: {
        helloMsg: 'Привет',
        homeItemTxt: 'Главная',
        toursItemTxt: 'Туры',
        newTourItemTxt: 'Создать',
        usersItemTxt: 'Пользователи',
        loginItemTxt: 'Войти',
        registerItemTxt: 'Регистрация',
        profileItemTxt: 'Личный кабинет',
      },
      startingBlock: {
        subtitleMsg: 'Выберите лучшее направление',
        titleMsgOne: 'Приключение',
        titleMsgTwo: 'Без границ',
        searchTxt: 'Найдите своё лучшее место...',
        searchButtonTxt: 'Поиск',
      },
      experienceBlock: {
        titleTxtOne: 'Опыт',
        titleTxtTwo: 'путешествия с нами',
        titleBoxTxt: {
          one: 'Исландия',
          two: 'Норвегия',
          three: 'Финляндия',
          four: 'Канада',
        },
        subtitleBoxTxt: 'Это отличная страна для путешествия для любых времён года. '
          + 'Здесь очень много привлекательный и захватывающих мест',
      },
      categoryBlock: {
        titleTxtOne: 'Выберите',
        titleTxtTwo: 'свою категорию',
        subtitleTxt: 'С другой стороны реализация намеченных плановых заданий позволяет '
          + 'оценить значение модели развития. Идейные соображения высшего порядка',
        categoryBoxTxt: {
          mountainTxt: 'Горы',
          waterfallTxt: 'Водопады',
          snowTxt: 'Снег',
          natureTxt: 'Природа',
        },
      },
      tripBlock: {
        titleTxtOne: 'Наша',
        titleTxtTwo: 'Приключенческая поездка',
        subtitleTxt: 'Маркус Сис и Флориан Ник изучают аудиовизуальные медиа в Университете '
          + 'Штутгарта в Германии. Их проект по итогам семестра представляет собой собранные в '
          + 'короткометражный фильм в разрешении 4K фотографии Исландии, в котором два молодых '
          + 'режиссера прославляют островное государство, заветную цель многих путешественников, '
          + 'фотографов и режиссеров — и все из-за уникальных пейзажей.',
      },
      clientsBlock: {
        titleTxtOne: 'Наши',
        titleTxtTwo: 'потрясающие клинты',
        subtitleTxt: 'Таким образом сложившаяся структура организации позволяет выполнять важные '
          + 'задания по разработке систем массового участия. Идейные соображения высшего порядка, '
          + 'а также реализация намеченных плановых заданий требуют от нас анализа систем массового '
          + 'участия. Товарищи!',
        clientsTxt: {
          one: 'Милана',
          two: 'Джош',
          three: 'Алекс',
          four: 'Чайна',
          five: 'Кия',
        },
        reviewTxt: {
          one: 'Понравилась четкая организация, подобраны интересные экскурсии, заселение '
            + 'в хорошем отеле, рекомендую всем для отдыха о котором не пожалеете',
          two: 'Добрый день, с 20 по 24 февраля был во Львове, поездка в первую очередь '
            + 'запомнилась потрясающей атмосферой этого города, обязательно поеду еще раз',
          three: 'Поездка прошла на "ура"!'
            + 'Дни пролетели незаметно, очень интересно прошло время и занимательно. '
            + 'Спасибо огромное организатору и гиду!',
          four: 'Ездила в Италию. Все сделали быстро и четко. Отели комфортные и близко к морю. 10 из 10',
          five: 'Огромное спасибо приложению “Anventure» за помощь в выборе тура в Париж: '
            + 'подробнейшие консультации, точная информация, все очень четко, грамотно, организованно.',
        },
      },
      feedbackBlock: {
        btnTxt: 'Заказать',
        inputTxt: 'Введить свой email',
        endTxt: 'НАЧНИТЕ ПРИКЛЮЧЕНИЕ ВМЕСТЕ С НАМИ',
      },
      footerBlock: {
        subtitleTxt: 'С другой стороны реализация намеченных плановых заданий позволяет '
          + 'оценить значение модели развития. Идейные соображения высшего порядка',
        columnTxt: {
          one: {
            title: 'Мероприятия',
            items: {
              one: 'Горный велосипед',
              two: 'Поход',
              three: 'Пункт назначения',
              four: 'Истории',
            },
          },
          two: {
            title: 'Бронирование',
            items: {
              one: 'Билеты',
              two: 'Туристический продукт',
              three: 'Пакеты',
              four: 'Проживание',
            },
          },
          three: {
            title: 'Контакты',
            items: {
              one: 'Работа',
              two: 'Команда',
              three: 'Туристический офис',
              four: 'Брошюры',
            },
          },
        },
        madeTxt: '© Все права защищены ADVENTO | Сделано с ♥ | 2020',
      },
      tours: {
        titleTxt: 'Список туров',
        searchTxt: 'Введите название тура',
        tableTxt: {
          name: 'Имя',
          category: 'Категория',
          desc: 'Описание',
          price: 'Цена',
          date: 'Дата',
        },
        btnLoadTxt: 'Загрузить больше',
        confirmTxt: {
          warning: {
            one: 'Вы уверены',
            two: 'в этом?',
          },
          deleteBtn: 'Удалить',
          editBtn: 'Изменить',
          cancelBtn: 'Назад',
        },
        warningTxt: 'Ничего не найдено:(',
      },
      Tour: {
        titleTxt: 'Добавьте тур',
        titleEditTxt: 'Измените тур',
        formTxt: {
          name: 'Имя',
          category: 'Категория',
          desc: 'Описание',
          price: 'Цена',
          enter: 'Введите данные',
        },
        btnTxt: 'Добавить',
        btnCancelTxt: 'Назад',
        btnEditTxt: 'Изменить',
        error: {
          field: 'Заполните это поле',
          least: 'Должно содержать не менее ',

        },
      },
      users: {
        titleTxt: 'Пользователи',
        nameTxt: 'Имя:',
        roleTxt: 'Роль:',
        emailTxt: 'Email:',
      },
      dashboard: {
        helloTxt: 'Добро пожаловать, ',
        nameTxt: 'Твоё имя:',
        roleTxt: 'Твоя роль:',
        emailTxt: 'Твой email:',
        logOutBtn: 'Выйти',
      },
      errorAndNotFound: {
        error: 'Ошибка',
        notFound: 'Страница не найдена',
      },

      LoginAndRegister: {
        titleLoginTxt: 'Вход в систему',
        titleRegisterTxt: 'Регистрация',
        nameTxt: 'Имя',
        emailTxt: 'Email',
        passwordTxt: 'Пароль',
        signInBtn: 'Войти',
        signUpBtn: 'Регистрация',
        placeholder: 'Введите данные',
        confirmTxtOne: 'Поздравляем,',
        confirmTxtTwo: 'теперь вы можете войти',
      },
    },
  },
});
