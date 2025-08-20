const express = require('express');
const Internship = require('../models/internship');
const router = express.Router();

// Get all internships
router.get('/', async (req, res) => {
  const internships = await Internship.find();
  res.json(internships);
});

module.exports = router;