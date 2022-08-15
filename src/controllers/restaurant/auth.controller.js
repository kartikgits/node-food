const restaurant = require('../../models/restaurant.model');

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
const { config } = require('../../../config/auth.config');

exports.signup = (req, res) => {
    // Save Restaurant in the database
    restaurant.create(req.body, (err, restaurant) => {
        if (err) {
            return res.status(400).send({
                message: err.message
            });
        }
        res.status(200).json({
            message: 'Restaurant Registration Successful',
            id: restaurant.restaurant_id
        });
    });
}

exports.signin = (req, res) => {
    restaurant.findByEmail(req.body.email, (err, restaurant) => {
        if (err) {
            return res.status(400).send({
                message: err.message
            });
        }
        if (!restaurant) {
            return res.status(404).send({
                message: 'Restaurant Not Found'
            });
        }
        bcrypt.compare(req.body.password, restaurant.password, (err, isMatch) => {
            if (err) {
                return res.status(400).send({
                    message: err.message
                });
            }
            if (isMatch) {
                let token = jwt.sign({
                    restaurant_id: restaurant.restaurant_id
                }, config.secret, {
                    expiresIn: 60 * 60 * 24
                });
                res.status(200).json({
                    message: 'Authentication Successful',
                    token: token,
                    restaurant_id: restaurant.restaurant_id,
                    restaurant_name: restaurant.restaurant_name,
                    restaurant_email: restaurant.restaurant_email,
                    restaurant_address_pincode: restaurant.restaurant_address_pincode,
                    restaurant_address_locality: restaurant.restaurant_address_locality,
                    restaurant_address_area: restaurant.restaurant_address_area,
                    restaurant_address_city: restaurant.restaurant_address_city,
                    restaurant_address_state: restaurant.restaurant_address_state,
                    restaurant_phone: restaurant.restaurant_phone,
                    restaurant_image_url: restaurant.restaurant_image_url,
                    restaurant_status: restaurant.restaurant_status,
                    restaurant_open_time: restaurant.restaurant_open_time,
                    restaurant_close_time: restaurant.restaurant_close_time,
                    created_at: restaurant.created_at,
                    updated_at: restaurant.updated_at,
                });
            } else {
                return res.status(400).send({
                    message: 'Invalid Credentials'
                });
            }
        }
        );
    });
}