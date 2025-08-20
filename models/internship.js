// models/Internship.js
const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  skillsRequired: [String],
  location: String,
  isRemote: Boolean
});

module.exports = mongoose.model('Internship', internshipSchema);