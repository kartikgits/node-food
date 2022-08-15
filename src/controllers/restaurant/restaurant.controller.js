'use strict';

const Restaurant = require('../../models/restaurant.model');

// Find all restaurants
exports.findAll = (req, res) => {
    Restaurant.getAll((err, restaurants) => {
        if (err) {
            res.send(err);
        }
        res.json(restaurants);
    }
    );
}

// Create a new restaurant
exports.create = (req, res) => {
    const newRestaurant = new Restaurant(req.body);

    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send('Provide all required fields');
    } else {
        Restaurant.create(newRestaurant, (err, restaurant) => {
            if (err) {
                return res.status(400).send(err);
            }
            res.json(restaurant);
        });
    }
}

// Find restaurants by id
exports.findById = (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
        if (err) {
            return res.send(err);
        }
        res.json(restaurant);
    });
}

// Find restaurants by name and keywords
exports.findByNameAndKeywords = (req, res) => {
    Restaurant.findByNameAndKeywords(req.params.name, req.params.keywords, (err, restaurant) => {
        if (err) {
            return res.send(err);
        }
        res.json(restaurant);
    }
    );
}

// Update a restaurant
exports.update = (req, res) => {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send('Provide all required fields');
    } else {
        Restaurant.update(req.params.id, new Restaurant(req.body), (err, restaurant) => {
            if (err) {
                return res.status(400).send(err);
            }
            res.json(restaurant);
        });
    }
}

// Delete a restaurant
exports.delete = (req, res) => {
    Restaurant.delete(req.params.id, (err, restaurant) => {
        if (err) {
            return res.send(err);
        }
        res.json({ message: 'Restaurant successfully deleted' });
    }
    );
}

// Add new service pincodes
exports.addServicePincodes = (req, res) => {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send('Provide all required fields');
    } else {
        Restaurant.addServicePincodes(req.body, req.params.id, (err, restaurant) => {
            if (err) {
                return res.status(400).send(err);
            }
            res.json(restaurant);
        });
    }
}

// Find service pincodes by restaurant id
exports.findServicePincodesById = (req, res) => {
    Restaurant.findServicePincodesById(req.params.id, (err, restaurant) => {
        if (err) {
            return res.send(err);
        }
        res.json(restaurant);
    });
}

// Update service pincodes by restaurant id
exports.updateServicePincodesById = (req, res) => {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send('Provide all required fields');
    } else {
        Restaurant.updateServicePincodesById(req.params.id, req.body, (err, restaurant) => {
            if (err) {
                return res.status(400).send(err);
            }
            res.json(restaurant);
        });
    }
}

// Delete service pincode by restaurant id
exports.deleteServicePincodesById = (req, res) => {
    Restaurant.deleteServicePincodesById(req.params.id, (err, restaurant) => {
        if (err) {
            return res.send(err);
        }
        res.json({ message: 'Service pincode successfully deleted' });
    });
}