const express = require('express');
require('dotenv').config();


// Create express server
const app = express();


// Create a route
// app.get('/', (req, res) => {
//     res.json({
//         ok: true
//     });
// });

// Routes
app.use('/api/auth', require('./routes/auth'));

// Public directory
app.use(express.static('public'));


// Listen requests
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});