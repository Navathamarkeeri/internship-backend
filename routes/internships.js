const express = require('express');
const Internship = require('../models/internship');
const router = express.Router();

// Get all internships
router.get('/', async (req, res) => {
  const internships = await Internship.find();
  res.json(internships);
});

// Create sample internships (ADD THIS NEW ROUTE)
router.post('/create-sample', async (req, res) => {
  try {
    const sampleInternships = [
      {
        title: "Frontend Developer Intern",
        company: "Tech Solutions Inc",
        skillsRequired: ["HTML", "CSS", "JavaScript", "React"],
        location: "Remote",
        stipend: 15000,
        isRemote: true
      },
      {
        title: "Backend Developer Intern", 
        company: "Data Systems Ltd",
        skillsRequired: ["Node.js", "MongoDB", "Express", "Python"],
        location: "Bangalore",
        stipend: 20000,
        isRemote: false
      },
      {
        title: "Data Science Intern",
        company: "AI Innovations",
        skillsRequired: ["Python", "Machine Learning", "SQL", "Pandas"],
        location: "Hyderabad", 
        stipend: 18000,
        isRemote: true
      },
      {
        title: "Mobile App Developer Intern",
        company: "AppWorks Studio",
        skillsRequired: ["React Native", "JavaScript", "Firebase"],
        location: "Chennai",
        stipend: 16000,
        isRemote: false
      }
    ];
    
    // Clear existing internships and insert new ones
    await Internship.deleteMany({});
    await Internship.insertMany(sampleInternships);
    
    res.json({ 
      message: 'Sample internships created successfully!',
      count: sampleInternships.length
    });
  } catch (err) {
    console.error('Error creating sample internships:', err);
    res.status(500).json({ error: 'Failed to create sample internships' });
  }
});

module.exports = router;