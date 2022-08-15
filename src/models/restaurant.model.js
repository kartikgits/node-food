'use strict';

let databaseConnection = require('../../config/db.config.js');

    // `restaurant_id` int(11) NOT NULL AUTO_INCREMENT,
    // `restaurant_login_password` varchar(255) NOT NULL,
    // `restaurant_name` varchar(255) NOT NULL,
    // `restaurant_keywords` varchar(255) NOT NULL,
    // `restaurant_address_pincode` varchar(10) NOT NULL,
    // `restaurant_address_locality` varchar(255) NOT NULL,
    // `restaurant_address_area` varchar(255) NOT NULL,
    // `restaurant_address_city` varchar(255) NOT NULL,
    // `restaurant_address_state` varchar(255) NOT NULL,
    // `restaurant_phone` varchar(255) NOT NULL,
    // `restaurant_email` varchar(255) NOT NULL,
    // `restaurant_image_url` varchar(255) NOT NULL,
    // `restaurant_status` enum('active','inactive') NOT NULL,
    // `created_at` datetime NOT NULL,
    // `updated_at` datetime NOT NULL default CURRENT_TIMESTAMP,
    // `restaurant_open_time` time NOT NULL,
    // `restaurant_close_time` time NOT NULL,
    // PRIMARY KEY (`restaurant_id`),
    // index idx_res_name (`restaurant_name`, `restaurant_keywords`)

let Restaurant = function(restaurant) {
    this.restaurant_name = restaurant.restaurant_name;
    this.restaurant_login_password = restaurant.restaurant_login_password;
    this.restaurant_keywords = restaurant.restaurant_keywords;
    this.restaurant_address_pincode = restaurant.restaurant_address_pincode;
    this.restaurant_address_locality = restaurant.restaurant_address_locality;
    this.restaurant_address_area = restaurant.restaurant_address_area;
    this.restaurant_address_city = restaurant.restaurant_address_city;
    this.restaurant_address_state = restaurant.restaurant_address_state;
    this.restaurant_phone = restaurant.restaurant_phone;
    this.restaurant_email = restaurant.restaurant_email;
    this.restaurant_image_url = restaurant.restaurant_image_url;
    this.restaurant_status = restaurant.restaurant_status ? restaurant.restaurant_status : 'active';
    this.created_at = new Date();
    this.updated_at = new Date();
    this.restaurant_open_time = restaurant.restaurant_open_time;
    this.restaurant_close_time = restaurant.restaurant_close_time;
}

// Create a new restaurant
Restaurant.create = (newRestaurant, result) => {
    databaseConnection.query('INSERT INTO Restaurant SET ?', newRestaurant, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        console.log(`Created restaurant: ${res.insertId}`);
        result(null, res.insertId);
    }
    );
}

// Find restaurants by id
Restaurant.findById = (restaurantId, result) => {
    databaseConnection.query(`SELECT * FROM Restaurant WHERE restaurant_id = ${restaurantId}`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(`Found restaurant: ${res[0].restaurant_id}`);
            result(null, res[0]);
            return;
        }

        // Not found restaurant with the id
        result({ kind: 'not_found' }, null);
    }
    );
}

// Find restaurants by email
Restaurant.findByEmail = (restaurantEmail, result) => {
    databaseConnection.query(`SELECT * FROM Restaurant WHERE restaurant_email = '${restaurantEmail}'`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(`Found restaurant: ${res[0].restaurant_id}`);
            result(null, res[0]);
            return;
        }

        // Not found restaurant with the email
        result({ kind: 'not_found' }, null);
    });
}

// Find restaurants by name and keywords
Restaurant.findByNameAndKeywords = (restaurantName, restaurantKeywords, result) => {
    databaseConnection.query(`SELECT * FROM Restaurant WHERE restaurant_name = '${restaurantName}' AND restaurant_keywords = '${restaurantKeywords}'`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(`Found restaurant: ${res[0].restaurant_id}`);
            result(null, res[0]);
            return;
        }

        // Not found restaurant with the id
        result({ kind: 'not_found' }, null);
    }
    );
}

// Find all restaurants
Restaurant.getAll = result => {
    databaseConnection.query('SELECT * FROM Restaurant', (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }

        console.log('Restaurants: ', res);
        result(null, res);
    }
    );
}

// Update a restaurant
Restaurant.updateById = (id, restaurant, result) => {
    databaseConnection.query('UPDATE Restaurant SET restaurant_name = ?, restaurant_login_password = ?, restaurant_keywords = ?, restaurant_address_pincode = ?, restaurant_address_locality = ?, restaurant_address_area = ?, restaurant_address_city = ?, restaurant_address_state = ?, restaurant_phone = ?, restaurant_email = ?, restaurant_image_url = ?, restaurant_status = ?, restaurant_open_time = ?, restaurant_close_time = ? WHERE restaurant_id = ?', [restaurant.restaurant_name, restaurant.restaurant_login_password, restaurant.restaurant_keywords, restaurant.restaurant_address_pincode, restaurant.restaurant_address_locality, restaurant.restaurant_address_area, restaurant.restaurant_address_city, restaurant.restaurant_address_state, restaurant.restaurant_phone, restaurant.restaurant_email, restaurant.restaurant_image_url, restaurant.restaurant_status, restaurant.restaurant_open_time, restaurant.restaurant_close_time, id], (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log(`Updated restaurant: ${id}`);
        result(null, res);
    }
    );
}

// Delete a restaurant
Restaurant.remove = (id, result) => {
    databaseConnection.query('DELETE FROM Restaurant WHERE restaurant_id = ?', id, (err, res) => {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log(`Deleted restaurant: ${id}`);
        result(null, res);
    }
    );
}

// `service_pincode_id` int(11) NOT NULL AUTO_INCREMENT,
// `service_pincode` varchar(10) NOT NULL,
// `service_status` enum('active','inactive') NOT NULL,
// `restaurant_id` int(11) NOT NULL,
// PRIMARY KEY (`service_pincode_id`),
// foreign key (`restaurant_id`) references `Restaurant`(`restaurant_id`) on delete cascade on update cascade

// Add new service pincodes
Restaurant.addServicePincodes = (servicePincodesAndStatuses, restaurantId, result) => {
    let sql = 'INSERT INTO ServicePincode (service_pincode, service_status, restaurant_id) VALUES ';
    servicePincodesAndStatuses.forEach((servicePincodeAndStatus, index) => {
        sql += `('${servicePincodeAndStatus.pincode}', ${servicePincodeAndStatus.status}, ${restaurantId})`;
        if (index < servicePincodesAndStatuses.length - 1) {
            sql += ',';
        }
    });
    databaseConnection.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        console.log(`Created service pincodes: ${res.insertId}`);
        result(null, res.insertId);
    });
}

// Find service pincodes by id
Restaurant.findServicePincodesById = (restaurantId, result) => {
    databaseConnection.query(`SELECT * FROM ServicePincode WHERE restaurant_id = ${restaurantId}`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(`Found service pincodes: ${res[0].service_pincode_id}`);
            result(null, res);
            return;
        }

        // Not found service pincodes with the id
        result({ kind: 'not_found' }, null);
    });
}

// Update service pincodes by restaurant id
Restaurant.updateServicePincodesById = (restaurantId, servicePincodesAndStatuses, result) => {
    databaseConnection.query(`DELETE FROM ServicePincode WHERE restaurant_id = ${restaurantId}`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        Restaurant.addServicePincodes(servicePincodesAndStatuses, restaurantId, result);
    });
}

// Delete service pincode by restaurant id
Restaurant.deleteServicePincodesById = (restaurantId, servicePincode, result) => {
    databaseConnection.query(`DELETE FROM ServicePincode WHERE restaurant_id = ${restaurantId} AND service_pincode = '${servicePincode}'`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log(`Deleted service pincodes: ${res.affectedRows}`);
        result(null, res);
    });
}

module.exports = Restaurant;