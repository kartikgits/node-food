drop database if exists `nodefood`;

create database `nodefood`;

use `nodefood`;

set FOREIGN_KEY_CHECKS = 0;

create table `Restaurant` (
    `restaurant_id` int(11) NOT NULL AUTO_INCREMENT,
    `restaurant_login_password` varchar(255) NOT NULL,
    `restaurant_name` varchar(255) NOT NULL,
    `restaurant_keywords` varchar(255) NOT NULL,
    `restaurant_address_pincode` varchar(10) NOT NULL,
    `restaurant_address_locality` varchar(255) NOT NULL,
    `restaurant_address_area` varchar(255) NOT NULL,
    `restaurant_address_city` varchar(255) NOT NULL,
    `restaurant_address_state` varchar(255) NOT NULL,
    `restaurant_phone` varchar(255) NOT NULL,
    `restaurant_email` varchar(255) NOT NULL UNIQUE,
    `restaurant_image_url` varchar(255) NOT NULL,
    `restaurant_status` enum('active','inactive') NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL default CURRENT_TIMESTAMP,
    `restaurant_open_time` time NOT NULL,
    `restaurant_close_time` time NOT NULL,
    PRIMARY KEY (`restaurant_id`),
    index idx_res_name (`restaurant_name`, `restaurant_keywords`, `restaurant_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `Product` (
    `product_id` int(11) NOT NULL AUTO_INCREMENT,
    `restaurant_id` int(11) NOT NULL,
    `product_name` varchar(255) NOT NULL,
    `product_keywords` varchar(255) default '' NOT NULL,
    `product_price` decimal(10,2) default 0.00 NOT NULL,
    `product_image_url` varchar(255) NOT NULL,
    `product_type` enum('veg','non-veg', 'egg') NOT NULL,
    `product_status` enum('active','inactive') NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY (`product_id`),
    foreign key (`restaurant_id`) references `Restaurant`(`restaurant_id`) on delete cascade on update cascade,
    fulltext (`product_name`, `product_keywords`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `ServicePincode` (
    `service_pincode_id` int(11) NOT NULL AUTO_INCREMENT,
    `service_pincode` varchar(10) NOT NULL,
    `service_status` enum('active','inactive') NOT NULL,
    `restaurant_id` int(11) NOT NULL,
    PRIMARY KEY (`service_pincode_id`),
    foreign key (`restaurant_id`) references `Restaurant`(`restaurant_id`) on delete cascade on update cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table Cuisine (
    `cuisine_id` int(11) NOT NULL AUTO_INCREMENT,
    `cuisine_name` varchar(255) NOT NULL,
    PRIMARY KEY (`cuisine_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `ProductUnderCuisine` (
    `product_under_cuisine_id` int(11) NOT NULL AUTO_INCREMENT,
    `product_id` int(11) NOT NULL,
    `cuisine_id` int(11) NOT NULL,
    PRIMARY KEY (`product_under_cuisine_id`),
    foreign key (`product_id`) references `Product`(`product_id`) on delete cascade on update cascade,
    foreign key (`cuisine_id`) references `Cuisine`(`cuisine_id`) on delete cascade on update cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `User` (
    `user_id` int(11) NOT NULL AUTO_INCREMENT,
    `user_name` varchar(255) NOT NULL,
    `user_password` varchar(255) NOT NULL,
    `user_phone` varchar(255) NOT NULL UNIQUE,
    `user_status` enum('active','inactive') default 'active' NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_id`),
    index idx_user_phone (`user_phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `UserCart` (
    `user_cart_id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `product_id` int(11) NOT NULL,
    `product_quantity` int(11) NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_cart_id`),
    foreign key (`user_id`) references `User`(`user_id`) on delete cascade on update cascade,
    foreign key (`product_id`) references `Product`(`product_id`) on delete cascade on update cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `Order` (
    `order_id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `order_status` enum('pending','processing','delivered','cancelled') NOT NULL,
    `order_total_amount` decimal(10,2) NOT NULL,
    `order_delivery_pincode` varchar(10) NOT NULL,
    `order_delivery_locality` varchar(255) NOT NULL,
    `order_delivery_area` varchar(255) NOT NULL,
    `order_delivery_city` varchar(255) NOT NULL,
    `order_delivery_state` varchar(255) NOT NULL,
    `order_delivery_phone` varchar(255) NOT NULL,
    `order_delivery_charge` decimal(10,2) NOT NULL,
    `order_payment_mode` enum('cash','card','upi') NOT NULL,
    `order_payment_status` enum('pending','success','failure') NOT NULL,
    `order_payment_id` varchar(255) default 'Cash' NOT NULL,
    `order_delivery_latitude` decimal(10,6) NOT NULL,
    `order_delivery_longitude` decimal(10,6) NOT NULL,
    `order_created_at` datetime NOT NULL,
    `order_updated_at` datetime NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY (`order_id`),
    foreign key (`user_id`) references `User`(`user_id`) on delete cascade on update cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `ProductsInOrder` (
    `products_in_order_id` int(11) NOT NULL AUTO_INCREMENT,
    `order_id` int(11) NOT NULL,
    `product_id` int(11) NOT NULL,
    `product_quantity` int(11) NOT NULL,
    `product_total_amount` decimal(10,2) NOT NULL,
    PRIMARY KEY (`products_in_order_id`),
    foreign key (`order_id`) references `Order`(`order_id`) on delete cascade on update cascade,
    foreign key (`product_id`) references `Product`(`product_id`) on delete cascade on update cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `UserAddress` (
    `user_address_id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `user_address_tag` enum('home','office','other') NOT NULL,
    `user_address_pincode` varchar(10) NOT NULL,
    `user_address_locality` varchar(255) NOT NULL,
    `user_address_area` varchar(255) NOT NULL,
    `user_address_city` varchar(255) NOT NULL,
    `user_address_state` varchar(255) NOT NULL,
    `user_address_phone` varchar(255) NOT NULL,
    `user_address_latitude` decimal(10,6) NOT NULL,
    `user_address_longitude` decimal(10,6) NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_address_id`),
    foreign key (`user_id`) references `User`(`user_id`) on delete cascade on update cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

set FOREIGN_KEY_CHECKS = 1;