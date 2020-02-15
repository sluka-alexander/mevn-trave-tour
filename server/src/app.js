const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const cors = require('cors');
const morgan = require('morgan');

const key = require('../keys/key');
const app = express();

const PORT = process.env.PORT || 8081;
let db;

const Tour = require('../models/Tour');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('hello');
});

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
 try{
   const tours = await Tour.find();
   res.json(tours);
 }catch (err) {
   res.sendStatus(500);
 }
});

app.post('/tours/new', async (req, res) => {
  let tour = new Tour({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price
  });
  try {
  const savedTour = await tour.save()
    res.json(savedTour);
  }catch (err) {
    res.sendStatus(500)
  }

});
