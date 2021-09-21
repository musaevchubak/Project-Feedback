const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model('Company', companySchema)
