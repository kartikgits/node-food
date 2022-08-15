const restaurant = require('../../models/restaurant.model');

// Check duplicate restaurant email
checkDuplicateRestaurantEmail = (req, res, next) => {
    restaurant.findByEmail({
        email: req.body.email
    }, (err, restaurant) => {
        if (restaurant) {
            res.status(400).send({
                message: 'Restaurant email already exists'
            });
            return;
        }

        if(!req.body.restaurant_login_password || !req.body.restaurant_name || !req.body.restaurant_address_pincode || !req.body.restaurant_address_locality || !req.body.restaurant_address_area || !req.body.restaurant_address_city || !req.body.restaurant_address_state || !req.body.restaurant_phone || !req.body.restaurant_email || !req.body.restaurant_image_url || !req.body.restaurant_open_time || !req.body.restaurant_close_time) {
            res.status(400).send({
                message: 'Check all required fields'
            });
            return;
        }
        
        next();
    });
}

const verifySignUp = {
    checkDuplicateRestaurantEmail: checkDuplicateRestaurantEmail
};

module.exports = verifySignUp;