const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();


// Create express server
const app = express();

// Databases
dbConnection();


// Public directory
app.use(express.static('public'));

// Parse of a body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));


// Listen requests
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});