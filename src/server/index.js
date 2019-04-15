import User from 'imports/classes/User';

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;
// mongoose.connect('mongodb://192.168.137.1/nasional_leader_school', { useNewUrlParser: true });
mongoose.connect('mongodb://127.0.0.1:3001/meteor', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(express.static('.build/client'));

require('imports/routes/server/index.js')(app);

app.get('/getUsername', (req, res) => res.send({ username: 'hudan' }));
app.listen(PORT, () => {
  const test = new User({ name: 'test save' });
  test.save();
  console.log(`test Listening on port ${PORT}!`);
});
