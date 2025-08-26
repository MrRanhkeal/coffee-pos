TABLE `stock_coffee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int DEFAULT NULL,
  `product_name` varchar(120),
  `qty` int DEFAULT NULL,
  `description` varchar(120),
  `status` tinyint DEFAULT '1',
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `cost` decimal(7,2) DEFAULT NULL,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `categories` varchar(120)
) 

TABLE `stock_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_product` varchar(120),
  `qty` int NOT NULL,
  `supplier_id` int DEFAULT NULL,
  `description` varchar(120),
  `status` tinyint DEFAULT '1',
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `cost` decimal(7,2) DEFAULT NULL,
  `brand_name` varchar(120),
  `create_by` varchar(120)
) 