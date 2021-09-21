const { protectProfile } = require('../middleware/middleware');
const FeedbackModel = require('../models/feedbackModel');
const TechnologyModel = require('../models/technologyModel');
const PositionModel = require('../models/vacancyModel');

const router = require('express').Router();

router.get('/', (req, res) => {
  req.session.userId ? res.render('review') : res.redirect('user/signUp');
});

router.post('/', async (req, res) => {
  const {
    company,
    dateOfInterview,
    positionName,
    technologies,
    techquestions,
    generalquestions,
    locationOfCompany,
    comments,
  } = req.body;
  const newTechnologies = await TechnologyModel.create({ name: technologies });
  const newPositionName = await PositionModel.create({ name: positionName });
  const newFeedback = await FeedbackModel.create({
    company,
    dateOfInterview,
    comments,
    author: req.session.userId,
    locationOfCompany,
    positionName: newPositionName,
    technologies: newTechnologies,
    techquestions,
    generalquestions,
  });
  res.redirect('/');
});

router.route('/:id/edit')
  .get(protectProfile, async (req, res) => {
    try {
      const selectedFeedBack = await FeedbackModel.findById(req.params.id).populate('positionName').populate('technologies');
      res.render('editReview', { selectedFeedBack });
    } catch (error) {
      console.error(error.message);
    }
  })
  .patch(async (req, res) => {
    const {
      comments,
      company,
      dateOfInterview,
      generalquestions,
      locationOfCompany,
      positionName,
      technologies,
      techquestions,
    } = req.body;
    try {
      const selectedFeedBack = await FeedbackModel.findByIdAndUpdate(req.params.id,
        {
          company,
          dateOfInterview,
          comments,
          locationOfCompany,
          techquestions,
          generalquestions,
        }, { new: true });

      await PositionModel.findByIdAndUpdate(selectedFeedBack.positionName, { name: positionName }, { new: true });
      await TechnologyModel.findByIdAndUpdate(selectedFeedBack.technologies, { name: technologies }, { new: true });
      res.sendStatus(200);
    } catch (error) {
      console.error(error.message);
    }
  })
  .delete (protectProfile, async (req, res) => {
    try {
      await FeedbackModel.findByIdAndDelete(req.params.id);
      res.sendStatus(200);
    } catch (error) {
      console.error(error.message);
    }
  });

router.get("/:id/edit", async (req, res) => {
  if (req.session?.userName) {
    let review = await FeedbackModel.findById(req.params.id);
    res.render("editReview", { review });
  }
  return res.redirect("/user/signUp");
});


module.exports = router;
