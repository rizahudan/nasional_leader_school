import 'babel-polyfill';
import routes from 'imports/routes/server/index.js';

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;
// mongoose.connect('mongodb://192.168.137.1/nasional_leader_school', { useNewUrlParser: true });
mongoose.connect('mongodb://192.168.137.1:27017/react', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(express.static('.build/client'));
routes(app);
app.get('/getUsername', (req, res) => res.send({ username: 'hudan' }));
app.listen(PORT, () => {
  console.log(`test Listening on port ${PORT}!`);
});
