// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes FIRST
const authRoutes = require('./routes/auth');
const internshipRoutes = require('./routes/internships');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next();
});

// Route mounting
app.use('/api/auth', authRoutes);  
app.use('/api/internships', internshipRoutes);   // ✅ CORRECT
// ADD THIS DEBUG CODE:
console.log('Available internship routes:');
internshipRoutes.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`- ${Object.keys(middleware.route.methods).join(', ').toUpperCase()} ${middleware.route.path}`);
  }
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('Troubleshooting:');
    console.log('1. Check if MONGO_URI in .env is correct');
    console.log('2. Verify your MongoDB Atlas IP whitelist');
    console.log('3. Ensure internet connection is stable');
  });

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../internship-frontend/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../internship-frontend/build', 'index.html'));
  });
} else {
  // Test route for development
  app.get('/', (req, res) => {
    res.send('Backend is running in development mode! ');
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log(`- POST /api/auth/register`);
  console.log(`- GET /api/internships`);
});