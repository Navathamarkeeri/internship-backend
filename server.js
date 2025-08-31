const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const internshipRoutes = require('./routes/internships');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS (allow Netlify + local dev)
app.use(cors({
  origin: ["https://your-frontend.netlify.app", "http://localhost:3000"],
  credentials: true
}));

// Request logging
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/internships', internshipRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err.message));

// Default route
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("⚠️ Error:", err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log('Available routes:');
  console.log('- POST /api/auth/register');
  console.log('- POST /api/auth/login');
  console.log('- GET /api/internships');
});
