const restaurant = require('../../models/restaurant.model');

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
const config = require('../../../config/auth.config');

exports.signup = (req, res) => {
    // Save Restaurant in the database
    restaurant.create({
        restaurant_name: req.body.restaurant_name,
        restaurant_email: req.body.restaurant_email,
        restaurant_address_pincode: req.body.restaurant_address_pincode,
        restaurant_address_locality: req.body.restaurant_address_locality,
        restaurant_address_area: req.body.restaurant_address_area,
        restaurant_address_city: req.body.restaurant_address_city,
        restaurant_address_state: req.body.restaurant_address_state,
        restaurant_phone: req.body.restaurant_phone,
        restaurant_image_url: req.body.restaurant_image_url,
        restaurant_status: req.body.restaurant_status || 'active',
        restaurant_keywords: req.body.restaurant_keywords || '',
        restaurant_open_time: req.body.restaurant_open_time,
        restaurant_close_time: req.body.restaurant_close_time,
        restaurant_login_password: bcrypt.hashSync(req.body.restaurant_login_password, 10),
    }, (err, restaurant) => {
        if (err) {
            return res.status(400).send({
                message: err.message
            });
        }
        res.status(200).json({
            message: 'Restaurant Registration Successful',
            id: restaurant.insertId
        });
    });
}

exports.signin = (req, res) => {
    restaurant.findByEmail(req.body.email, (err, restaurant) => {
        if (!restaurant) {
            return res.status(404).send({
                message: 'Restaurant Not Found'
            });
        }
        if (err) {
            return res.status(400).send({
                message: err
            });
        }
        bcrypt.compare(req.body.password, restaurant.restaurant_login_password, (err, isMatch) => {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            }
            if (isMatch) {
                let token = jwt.sign({
                    restaurant_id: restaurant.restaurant_id
                }, config.secret, {
                    // expiresIn: 60 * 60 * 24
                    expiresIn: 60
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