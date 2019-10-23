const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

module.exports = (app) => {
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.resolve(__basedir, 'static')));
  app.engine('.hbs', handlebars({ extname: '.hbs' }));
  app.set('view engine', '.hbs');
  app.set('views', path.resolve(__basedir, 'views'));
};