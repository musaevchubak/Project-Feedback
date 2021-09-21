const { Schema, model } = require('mongoose');

const technologySchema = Schema({
  name: String,
});

const TechnologyModel = model('Technology', technologySchema);

module.exports = TechnologyModel;
