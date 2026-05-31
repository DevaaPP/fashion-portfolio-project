// server.js
const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users',     require('./routes/userRoutes'));
app.use('/api/portfolio', require('./routes/portfolioRoutes'));
app.use('/api/contact',   require('./routes/contactRoutes'));
app.use('/api/admin',     require('./routes/adminRoutes'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// 404
app.use('*', (req, res) => res.status(404).json({ message: 'Route not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));