const { Schema, model } = require('mongoose');

const feedbackSchema = Schema({
  company: String,
  dateOfInterview: Date,
  comments: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  locationOfCompany: String,
  positionName: {
    type: Schema.Types.ObjectId,
    ref: 'Vacancy',
  },
  technologies:
  {
    type: Schema.Types.ObjectId,
    ref: 'Technology',
  },
  techquestions: String,
  generalquestions: String,
});

const FeedbackModel = model('Feedback', feedbackSchema);

module.exports = FeedbackModel;
