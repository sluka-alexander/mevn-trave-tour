const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');

mongoose.set('useCreateIndex', true);

//Passport config

require('../config/passport')(passport);

const cors = require('cors');
const morgan = require('morgan');

const key = require('../keys/key');

const app = express();

const PORT = process.env.PORT || 8081;
let db;

const Tour = require('../models/Tour');
const User = require('../models/User');

app.use(morgan('combined'));
app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
next();
});

app.use(require('cookie-parser')());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(key, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}, (err, database) => {
  if (err) {
    console.log(err);
  }
  db = database;
})
    .then(() => console.log('db connected...'))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log('server started');
});

app.get('/', async (req, res) => {
  res.send('welcome');
});

app.get('/tours/:id', async (req,res)=>{
  try {
    const tour = await Tour.findById(req.params.id);
    await res.json(tour);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get('/tours', async (req, res) => {
  try {
    const tours = await Tour.find();
    await res.json(tours);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.put('/tours/:id', (req, res) => {
  Tour.findById(req.params.id, (err, tour) => {
    if (err) {
      console.log(err)
    } else {
      tour.name = req.body.name;
      tour.category = req.body.category;
      tour.description = req.body.desc;
      tour.price = req.body.price;
      tour.save(err => {
        if (err) {
          res.sendStatus(500)
        } else {
          res.sendStatus(200)
        }
      })
    }
  })
});

app.delete('/tours/:id', (req, res) => {
    Tour.remove({ _id: req.params.id }, err => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
});

app.post('/tours/new', async (req, res) => {
  let tour = new Tour({
    name: req.body.name,
    category: req.body.category,
    description: req.body.desc,
    price: req.body.price
  });
  await tour.save((err, doc)=>{
    if(err) {
      console.log(err)
    }
    else {
      res.send(doc);
    }
  });
});


app.post('/register', async (req, res) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  User.findOne({ email: req.body.email }).then(user => {
    if(!user) {
      bcrypt.genSalt(10,  (err, salt) => {
        bcrypt.hash(newUser.password, salt,async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save((err, doc) => {
            if (err) {
              console.log(err)
            } else {
              res.send(doc);
            }
          });
        });
      });
    } else {
      console.log('есть такой уже');
    }
  }).catch(err => console.log(err));
});

app.post('/login', async (req, res, next) => {
  console.log('Cookies: login ', req.cookies);
  try {
     passport.authenticate('local', {
       successRedirect: '/dashboard',
       failureRedirect: '/login',
       failureFlash: true
     })(req, res, next);
   } catch (err) {
     console.log(err);
   }
});

app.get('/dashboard', async (req, res) => {
  console.log('Cookies: dash ', req.cookies);
  try {
    res.json({ name: req.user.name });
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

//{"email": "elka@gmail.com", "password" : "111111"}