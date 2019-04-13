const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: 'hudan' }));
app.listen(8080, () => {
  mongoose.connect('mongodb://192.168.137.1/nasional_leader_school', { useNewUrlParser: true });
  console.log('Listening on port 8080!');
});
