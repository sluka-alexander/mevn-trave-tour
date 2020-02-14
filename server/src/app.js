const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();

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

router.get('/tours', (req, res) => {
  Tour.find().toArray((err, docs) => {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  });
});