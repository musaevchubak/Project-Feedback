const FeedbackModel = require('../models/feedbackModel')

const router = require('express').Router();

router.get('/', async (req, res) => {
  const allFeedbacks = await FeedbackModel.find().populate('author').populate('positionName').populate('technologies');
  console.log(allFeedbacks);
  res.render('index', { allFeedbacks });
});

module.exports = router;
