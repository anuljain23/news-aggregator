// app.js
// Load environment variables from .env file
const { config } = require('dotenv');
config();

const express = require('express');
const mongoose = require('mongoose');

const { logger } = require('./middleware/logger');
const { userRoutes } = require('./routes/user.routes');
const { newsRoutes } = require('./routes/news.routes');

const app = express();

// middleware
app.use(logger);    // logger middleware
app.use(express.json());    // parse application/json
app.use(express.urlencoded({ extended: true }));    // parse application/x-www-form-urlencoded


// routes
app.use('/users', userRoutes);   // user routes
// app.use('/news', newsRoutes);     // news routes
app.get('/', (req, res) => {    // health check route
    res.status(200).json({
        status: 'Ok',
        message: 'Server is working'
    });
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {   // Successful connection
        console.log("Connected to MongoDB");
    }).catch((error) => {   // Error connecting to MongoDB
        console.error('Failed to connect to MongoDB:', error);
        process.exitCode = 1;
    });

module.exports = app;