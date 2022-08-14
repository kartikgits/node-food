const express = require('express');
const bodyParser = require('body-parser');

// Create a new express app
const app = express();

// Setup the port to listen on
const port = process.env.PORT || 5000;

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Define a root route
app.get('/', (req, res) => {
    res.send('NodeFood API');
});

// Listen for requests
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});