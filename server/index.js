const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const businessLoanRoutes = require('./routes/businessLoanRoutes');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Create Express App
const app = express();

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());

// Default route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Authentication Backend'
  });
});

// Routes
app.use('/api', authRoutes);

app.use("/api", businessLoanRoutes);

// Handle undefined routes
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Cannot find ${req.originalUrl} on this server`
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});