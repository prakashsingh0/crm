const express = require('express');
const connectDB = require('./config/db');
const customerRoutes = require('./routes/customerRouters');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up CORS options
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true, // Allow cookies to be sent with the request
}));
// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
