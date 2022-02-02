const express = require('express');

const path = require('path');

const bodyparser = require('body-parser');

const dotenv = require('dotenv').config();

const routes = require('./routes/uploadRoutes');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/public/homepage.html`));
});

app.use('/', routes);

app.listen(process.env.PORT, () => {
  console.log('Application started successfully.....!');
});
