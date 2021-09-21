const { Router } = require('express');
const { protectProfile } = require('../middleware/middleware');
const FeedBack = require('../models/feedbackModel');
const User = require('../models/userModel')

const router = Router();

router.route('/')
  .get(protectProfile, async (req, res) => {
    const userFeedBacks = await FeedBack.find({ author: req.session.userId }).populate('positionName').populate('technologies');
    console.log(userFeedBacks);
    res.render('profile', { userFeedBacks });
  });


router.route("/:id/edit")
  .get(protectProfile, async (req, res) => {
    console.log(req.params.id);
    let profile = await User.findById(req.params.id);
    if (req.session.userId) {
      return res.render("editProfile");
    }
    return res.redirect("/user/signUp");
  })
  .patch(protectProfile, async (req, res) => {
    const { name, surname, phone, email, program, groupName, year, links } = req.body
    try {
      const updateUser = await User.findByIdAndUpdate(req.params.id, { name, surname, phone, email, program, groupName, year, links }, { new: true })
      req.session.userName = updateUser.name
      req.session.userSurname = updateUser.surname
      req.session.finishYear = updateUser.year
      req.session.userLinks = updateUser.links
      req.session.userPhone = updateUser.phone
      req.session.userEmail = updateUser.email
      console.log(req.session);
      res.sendStatus(200)
    } catch (error) {
      console.error(error.message)
    }
  })


module.exports = router;
