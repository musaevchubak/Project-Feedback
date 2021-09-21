const express = require('express');
const sessions = require('express-session');
const Mongostore = require('connect-mongo');
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');
const { dbConnectionUrl } = require('../db/dbConfig');

function middleware(app) {
  app.set('view engine', 'hbs');
  app.set('views', path.join(process.env.PWD, 'src', 'views'));
  // подключаем partials
  hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'));

  app.use(morgan('dev'));

  app.use(express.static(path.join(process.env.PWD, 'public')));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(sessions({
    // node ====> require('crypto').randomBytes(64).toString('hex')
    secret: 'dc3f5495229291f0ba9926adcc3728ffa41e237865e50ed80188c40241384662d723e63fa30965567a236dee83fd066f21ae19118ba00a45ca7a156f38c6ac5f',
    name: 'sid',
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: false,
      // maxAge: 60 * 1e3,
    },
    store: Mongostore.create({ mongoUrl: dbConnectionUrl }),
  }));

  app.use((req, res, next) => {
    if (req.session.userId) {
      res.locals.userId = req.session.userId;
      res.locals.userName = req.session.userName;
      res.locals.finishYear = req.session.finishYear;
      res.locals.userLinks = req.session.userLinks;
      res.locals.userSurname = req.session.userSurname;
      res.locals.userPhone = req.session.userPhone;
      res.locals.userEmail = req.session.userEmail;
    }
    next();
  });
}

const protectProfile = (req, res, next) => {
  if (!req.session.userId) res.redirect('/');
  next();
};

module.exports = { middleware, protectProfile };
