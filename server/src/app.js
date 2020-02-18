const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.set('useCreateIndex', true);

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
app.use(cors());


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

app.get('/tours', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.post('/tours/new', async (req, res) => {
  let tour = new Tour({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
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
});