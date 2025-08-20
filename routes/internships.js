const express = require('express');
const Internship = require('../models/internship');
const { protect } = require('../middleware/auth'); // Add this import
const router = express.Router();

// 🔒 Protect ALL internship routes - Add this line
router.use(protect);

// Get all internships (now protected)
router.get('/', async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json({
      status: 'success',
      results: internships.length,
      data: { internships }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch internships' });
  }
});

// Create sample internships (now protected)
router.post('/create-sample', async (req, res) => {
  try {
    const sampleInternships = [
      {
        title: "Frontend Developer Intern",
        company: "Tech Solutions Inc",
        skillsRequired: ["HTML", "CSS", "JavaScript", "React"],
        location: "Remote",
        stipend: 15000,
        isRemote: true,
        createdBy: req.user._id // Add user who created this
      },
      {
        title: "Backend Developer Intern", 
        company: "Data Systems Ltd",
        skillsRequired: ["Node.js", "MongoDB", "Express", "Python"],
        location: "Bangalore",
        stipend: 20000,
        isRemote: false,
        createdBy: req.user._id
      },
      {
        title: "Data Science Intern",
        company: "AI Innovations",
        skillsRequired: ["Python", "Machine Learning", "SQL", "Pandas"],
        location: "Hyderabad", 
        stipend: 18000,
        isRemote: true,
        createdBy: req.user._id
      },
      {
        title: "Mobile App Developer Intern",
        company: "AppWorks Studio",
        skillsRequired: ["React Native", "JavaScript", "Firebase"],
        location: "Chennai",
        stipend: 16000,
        isRemote: false,
        createdBy: req.user._id
      }
    ];
    
    // Clear existing internships and insert new ones
    await Internship.deleteMany({});
    await Internship.insertMany(sampleInternships);
    
    res.json({ 
      status: 'success',
      message: 'Sample internships created successfully!',
      count: sampleInternships.length
    });
  } catch (err) {
    console.error('Error creating sample internships:', err);
    res.status(500).json({ error: 'Failed to create sample internships' });
  }
});

// 🔐 Add more protected routes as needed
router.post('/', async (req, res) => {
  try {
    const internship = new Internship({
      ...req.body,
      createdBy: req.user._id // Link to authenticated user
    });
    await internship.save();
    res.status(201).json({
      status: 'success',
      data: { internship }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;