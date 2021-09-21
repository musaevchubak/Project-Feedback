const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname:  {
    type: String,
    required: true,
  },
  phone:  {
    type: Number,
    unique: true,
    required: true,
  },
  email:  {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  program:  {
    type: String,
    required: true,
  },
  year:  {
    type: String,
    required: true,
  },
  groupName:  {
    type: String,
    required: true,
  },
  links:  {
    type: String,
  },

})

module.exports = mongoose.model("User", userSchema)
