const express = require('express');
const router = express.Router();
const { authJwt } = require('../../middlewares/restaurant');
const restaurantController = require('../../controllers/restaurant/restaurant.controller');

// Retrieve all restaurants
router.get('/', restaurantController.findAll);

// Create a new restaurant
// router.post('/', restaurantController.create);

// Retrieve a single restaurant with id
router.get('/:id', restaurantController.findById);

// Retrieve a single restaurant with name and keywords
router.get('/name/:name/keywords/:keywords', restaurantController.findByNameAndKeywords);

// Update a restaurant with id
router.put('/admin/:id', [authJwt.verifyToken], restaurantController.update);

// Delete a restaurant with id
router.delete('/admin/:id', [authJwt.verifyToken], restaurantController.delete);

// Add new service pincodes to a restaurant with id
router.post('/admin/:id/pincodes', [authJwt.verifyToken], restaurantController.addServicePincodes);

// Find service pincodes by restaurant id
router.get('/:id/pincodes', restaurantController.findServicePincodesById);

// Update service pincodes by restaurant id
router.put('/admin/:id/pincodes', [authJwt.verifyToken], restaurantController.updateServicePincodesById);

// Delete service pincode by restaurant id
router.delete('/admin/:id/pincodes', [authJwt.verifyToken], restaurantController.deleteServicePincodesById);


module.exports = router;