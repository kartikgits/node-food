const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const createError = require('http-errors');


// Create a new express app
const app = express();

// Setup the port to listen on
const port = process.env.PORT || 5000;

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Enable CORS for all requests
app.use(cors());

// Define a root route
app.get('/', (req, res) => {
    res.send('NodeFood API');
});

// Require restaurant routes
const restaurantRoutes = require('./src/routes/restaurant');

// Using as middleware for all requests to /restaurants
app.use('/api/v1/restaurants', restaurantRoutes);

// Handling Errors
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    res.status(err.statusCode).json({
        message: err.message
    });
})

// Listen for requests
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});