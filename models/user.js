// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resume: { type: String }, // Path to uploaded resume file
  skills: [String] // Extracted skills from resume
});

module.exports = mongoose.model('User', userSchema);