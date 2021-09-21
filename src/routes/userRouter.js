const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const { protectProfile } = require('../middleware/middleware');
const FeedbackModel = require('../models/feedbackModel');


router
  .route("/signUp")
  .get((req, res) => {
    res.render("signup");
  })
  .post(async (req, res) => {
    const {
      name,
      surname,
      phone,
      email,
      password,
      program,
      year,
      groupName,
      links,
    } = req.body;

    try {
      if (
        name &&
        surname &&
        phone &&
        email &&
        password &&
        program &&
        year &&
        groupName
      ) {
        if (await User.findOne({ email })) {
          return res.redirect("/user/signIn");
        } else {
          const hash = await bcrypt.hash(password, 10);
          const newUser = await User.create({
            name,
            surname,
            phone,
            email,
            password: hash,
            program,
            year,
            groupName,
            links,
          });
          req.session.userId = newUser._id;
          req.session.userName = newUser.name;
          req.session.userSurname = newUser.surname;
          req.session.finishYear = newUser.year;
          req.session.userLinks = newUser.links;
          req.session.userPhone = newUser.phone
          req.session.userEmail = newUser.email
          res.redirect('/')
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  });

router
  .route("/signIn")
  .get((req, res) => {
    res.render("signin");
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const currUser = await User.findOne({ email });
        if (currUser) {
          if (await bcrypt.compare(password, currUser.password)) {
            req.session.userId = currUser._id;
            req.session.userName = currUser.name;
            req.session.userSurname = currUser.surname;
            req.session.finishYear = currUser.year;
            req.session.userLinks = currUser.links;
            req.session.userPhone = currUser.phone;
            req.session.userEmail = currUser.email;
            return res.redirect("/");
          }
        } else {
          return res.redirect("/user/signUp");
        }
      } else {
        return res.redirect("/user/signIn");
      }
    } catch (error) {
      console.error(error.message);
    }
  });

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie(req.app.get("cookieName"));
  res.redirect("/");
});

router.route('/profile')
  .get(protectProfile, async (req, res) => {
    const userFeedBacks = await FeedbackModel.find({ author: req.session.userId }).populate('positionName').populate('technologies');
    res.render('profile', { userFeedBacks });
  });



module.exports = router;
