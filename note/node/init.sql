TABLE `products` (
    `id` int NOT NULL AUTO_INCREMENT,
    `category_id` int DEFAULT NULL,
    `barcode` varchar(120)  NOT NULL,
    `name` varchar(120)  NOT NULL,
    `brand` varchar(120)  NOT NULL,
    `description` varchar(120)  DEFAULT NULL,
    `qty` int NOT NULL DEFAULT '0',
    `price` decimal(7,2) NOT NULL DEFAULT '0.00',
    `status` tinyint(1) DEFAULT '1',
    `image` varchar(255)  DEFAULT NULL,
    `create_by` varchar(120)  DEFAULT NULL,
    `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `discount` decimal(5,2) NOT NULL DEFAULT '0.00',
    `sugar_level_id` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `category_id` (`category_id`),
    KEY `sugar_level_id` (`sugar_level_id`),
    CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
    CONSTRAINT `products_ibfk_2` FOREIGN KEY (`sugar_level_id`) REFERENCES `sugar_level` (`id`)
) 
TABLE `product_details` (
    `id` int NOT NULL AUTO_INCREMENT,
    `product_id` int NOT NULL,
    `key_name` varchar(100)  NOT NULL,
    `value` text ,
    PRIMARY KEY (`id`),
    KEY `product_id` (`product_id`),
    CONSTRAINT `product_details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) 
TABLE `sugar_level` (
    `id` int NOT NULL AUTO_INCREMENT,
    `level_name` varchar(50) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `level_name` (`level_name`)
)
TABLE `category` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(120) NOT NULL,
    `description` varchar(120) DEFAULT NULL,
    `status` tinyint(1) DEFAULT '1',
    `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `create_by` varchar(255) DEFAULT NULL,
    `parent_id` int NOT NULL,
    PRIMARY KEY (`id`)
)
TABLE `order_detail` (
    `id` int NOT NULL AUTO_INCREMENT,
    `order_id` int DEFAULT NULL,
    `product_id` int DEFAULT NULL,
    `qty` int DEFAULT NULL,
    `price` decimal(7,2) DEFAULT NULL,
    `discount` decimal(7,2) DEFAULT NULL,
    `total` decimal(7,2) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `order_id` (`order_id`),
    KEY `product_id` (`product_id`),
    CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
    CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) 