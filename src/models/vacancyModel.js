const { Schema, model } = require('mongoose');

const vacancySchema = Schema({
  name: String,
});

const PositionModel = model('Vacancy', vacancySchema);

module.exports = PositionModel;
