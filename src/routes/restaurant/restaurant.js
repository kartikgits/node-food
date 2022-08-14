const express = require('express');
const router = express.Router();

const restaurantController = require('../../controllers/restaurant.controller');

// Retrieve all restaurants
router.get('/', restaurantController.findAll);

// Create a new restaurant
router.post('/', restaurantController.create);

// Retrieve a single restaurant with id
router.get('/:id', restaurantController.findById);

// Retrieve a single restaurant with name and keywords
router.get('/name/:name/keywords/:keywords', restaurantController.findByNameAndKeywords);

// Update a restaurant with id
router.put('/:id', restaurantController.update);

// Delete a restaurant with id
router.delete('/:id', restaurantController.delete);

module.exports = router;