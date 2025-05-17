-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: nitdb
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `status` tinyint(1) NOT NULL,
  `parent_id` int NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Computer','Desc Computer',1,0,'2024-05-27 07:54:34'),(2,'Phone','Desc Phone',1,0,'2024-05-27 07:55:37'),(3,'Monitor','Desc Monitor',0,0,'2024-05-27 07:56:15'),(4,'Printer','Desc Printer',0,0,'2024-05-27 07:58:06'),(5,'LED','Desc LED',1,0,'2024-05-27 07:58:06');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `tel` varchar(18) NOT NULL,
  `email` varchar(120) DEFAULT NULL,
  `address` text,
  `type` varchar(120) DEFAULT NULL,
  `create_by` varchar(120) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tel` (`tel`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (3,'Sok Sokha','096999888','soksokha@gmailcom','#123 St34 PP','VIP',NULL,'2024-10-28 13:49:20'),(4,'Chan Dara','096999889','chandara@gmailcom','#1233 St34e BB','VIP',NULL,'2024-10-28 13:49:20'),(5,'John Doe','0123456789','john.doe@example.com','123 Main St, Phnom Penh','Retail',NULL,'2024-10-28 13:54:02'),(6,'Jane Smith','0987654321','jane.smith@example.com','456 Oak Ave, Siem Reap','Wholesale',NULL,'2024-10-28 13:54:02'),(7,'Alice Johnson','0968887776','alice.j@example.com','789 Pine Rd, Battambang','Retail',NULL,'2024-10-28 13:54:02'),(8,'Bob Brown','0921234567','bob.b@example.com','101 River St, Sihanoukville','Corporate',NULL,'2024-10-28 13:54:02'),(9,'Charlie Davis','0876543210','charlie.d@example.com','202 Beach Rd, Kampot','Retail',NULL,'2024-10-28 13:54:02'),(10,'Eve White','0939876543','eve.w@example.com','303 Lake St, Phnom Penh','Corporate',NULL,'2024-10-28 13:54:02'),(11,'Frank Black','0853210987','frank.b@example.com','404 Hill St, Takeo','Wholesale',NULL,'2024-10-28 13:54:02'),(12,'Grace Lee','0974567890','grace.l@example.com','505 Mountain St, Ratanakiri','Retail',NULL,'2024-10-28 13:54:02'),(13,'Henry Green','0991239876','henry.g@example.com','606 Riverfront Rd, Siem Reap','Corporate',NULL,'2024-10-28 13:54:02'),(14,'Ivy Moore','0817894560','ivy.m@example.com','707 Palm St, Phnom Penh','Retail',NULL,'2024-10-28 13:54:02'),(15,'Jack Wilson','0882345678','jack.w@example.com','808 Sunset Blvd, Kep','Wholesale',NULL,'2024-10-28 13:54:02'),(16,'Karen Young','0945678901','karen.y@example.com','909 Valley Rd, Kampong Cham','Corporate',NULL,'2024-10-28 13:54:02'),(17,'Leo Adams','0866789453','leo.a@example.com','1011 Forest Rd, Kampong Thom','Retail',NULL,'2024-10-28 13:54:02'),(18,'Mia Clark','0824560987','mia.c@example.com','1112 Bamboo St, Phnom Penh','Wholesale',NULL,'2024-10-28 13:54:02'),(19,'Noah Baker','0849876542','noah.b@example.com','1213 Sky Ave, Siem Reap','Corporate',NULL,'2024-10-28 13:54:02'),(20,'Olivia Martinez','0892340987','olivia.m@example.com','1314 Moon Rd, Prey Veng','Retail',NULL,'2024-10-28 13:54:02'),(21,'Paul Rodriguez','0956789012','paul.r@example.com','1415 Hilltop St, Phnom Penh','Corporate',NULL,'2024-10-28 13:54:02'),(22,'Quinn Lopez','0834567890','quinn.l@example.com','1516 Seaside Rd, Kampong Som','Wholesale',NULL,'2024-10-28 13:54:02'),(23,'Ryan Carter','0907894567','ryan.c@example.com','1617 Market St, Siem Reap','Retail',NULL,'2024-10-28 13:54:02'),(24,'Sophia Edwards','0912345678','sophia.e@example.com','1718 Garden Rd, Phnom Penh','Corporate',NULL,'2024-10-28 13:54:02');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `card_id` varchar(120) NOT NULL,
  `dob` datetime NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `tel` varchar(18) NOT NULL,
  `email` varchar(120) DEFAULT NULL,
  `base_salary` decimal(6,2) DEFAULT '0.00',
  `position` varchar(120) NOT NULL,
  `address` text,
  `create_by` varchar(120) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `card_id` (`card_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'John','Doe','C123456','1985-06-15 00:00:00',1,'123-456-7890','john.doe@example.com',3000.50,'Manager','123 Elm Street','admin','2024-10-30 13:48:55'),(2,'Jane','Smith','C123457','1990-02-20 00:00:00',0,'098-765-4321','jane.smith@example.com',2800.75,'Sales Rep','456 Maple Ave','admin','2024-10-30 13:48:55'),(3,'Emily','Johnson','C123458','1992-12-05 00:00:00',0,'111-222-3333','emily.j@example.com',2700.00,'HR','789 Oak Lane','admin','2024-10-30 13:48:55');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expense`
--

DROP TABLE IF EXISTS `expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense` (
  `id` int NOT NULL AUTO_INCREMENT,
  `expense_type_id` int DEFAULT NULL,
  `ref_no` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` decimal(7,2) DEFAULT '0.00',
  `remark` text,
  `expense_date` datetime DEFAULT NULL,
  `create_by` varchar(120) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `expense_type_id` (`expense_type_id`),
  CONSTRAINT `expense_ibfk_1` FOREIGN KEY (`expense_type_id`) REFERENCES `expense_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense`
--

LOCK TABLES `expense` WRITE;
/*!40000 ALTER TABLE `expense` DISABLE KEYS */;
INSERT INTO `expense` VALUES (1,1,'EXP001','Electricity Bill',150.75,'Paid for September','2024-09-30 00:00:00','admin','2024-10-28 14:23:48'),(2,2,'EXP002','Printer Ink',45.00,'Bought black and color ink','2024-10-05 00:00:00','admin','2024-10-28 14:23:48'),(3,3,'EXP003','Taxi Fare',30.50,'Client meeting transportation','2024-10-06 00:00:00','user1','2024-10-28 14:23:48'),(4,4,'EXP004','Team Dinner',120.00,'Monthly team bonding','2024-10-07 00:00:00','admin','2024-10-28 14:23:48'),(5,5,'EXP005','Lunch Meeting',80.25,'Client lunch','2024-10-08 00:00:00','user2','2024-10-28 14:23:48'),(6,6,'EXP006','Social Media Ads',200.00,'October campaign','2024-10-10 00:00:00','admin','2024-10-28 14:23:48'),(7,7,'EXP007','Employee Salary',2500.00,'October payout','2024-10-15 00:00:00','hr_manager','2024-10-28 14:23:48'),(8,8,'EXP008','Office Rent',1000.00,'Paid for October','2024-10-01 00:00:00','finance','2024-10-28 14:23:48'),(9,9,'EXP009','Property Insurance',350.00,'Office coverage','2024-09-20 00:00:00','finance','2024-10-28 14:23:48'),(10,10,'EXP010','AC Maintenance',75.00,'Quarterly service','2024-09-25 00:00:00','admin','2024-10-28 14:23:48'),(11,1,'EXP001','Electricity Bill',150.75,'Paid for September','2024-09-02 00:00:00','admin','2024-06-02 14:11:16'),(12,2,'EXP002','Printer Ink',45.00,'Bought black and color ink','2024-10-08 00:00:00','admin','2024-07-07 14:11:16'),(13,3,'EXP003','Taxi Fare',30.50,'Client meeting transportation','2024-11-04 00:00:00','user1','2024-12-03 14:11:16'),(14,4,'EXP004','Team Dinner',120.00,'Monthly team bonding','2024-12-02 00:00:00','admin','2024-12-03 14:11:16'),(15,5,'EXP005','Lunch Meeting',80.25,'Client lunch','2024-12-02 00:00:00','user2','2024-12-03 14:11:16'),(16,6,'EXP006','Social Media Ads',200.00,'October campaign','2024-12-02 00:00:00','admin','2024-12-03 14:11:16'),(17,7,'EXP007','Employee Salary',2500.00,'October payout','2024-12-02 00:00:00','hr_manager','2024-12-03 14:11:16'),(18,8,'EXP008','Office Rent',1000.00,'Paid for October','2024-12-02 00:00:00','finance','2024-12-03 14:11:16'),(19,9,'EXP009','Property Insurance',350.00,'Office coverage','2024-12-02 00:00:00','finance','2024-12-03 14:11:16'),(20,10,'EXP010','AC Maintenance',75.00,'Quarterly service','2024-12-02 00:00:00','admin','2024-12-03 14:11:16');
/*!40000 ALTER TABLE `expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expense_type`
--

DROP TABLE IF EXISTS `expense_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense_type`
--

LOCK TABLES `expense_type` WRITE;
/*!40000 ALTER TABLE `expense_type` DISABLE KEYS */;
INSERT INTO `expense_type` VALUES (1,'Utilities','UTL'),(2,'Office Supplies','OFS'),(3,'Travel','TRV'),(4,'Entertainment','ENT'),(5,'Meals','MLS'),(6,'Marketing','MKT'),(7,'Salaries','SAL'),(8,'Rent','RNT'),(9,'Insurance','INS'),(10,'Maintenance','MTN');
/*!40000 ALTER TABLE `expense_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_no` varchar(120) NOT NULL,
  `customer_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `total_amount` decimal(6,0) NOT NULL DEFAULT '0',
  `paid_amount` decimal(7,2) NOT NULL DEFAULT '0.00',
  `payment_method` varchar(120) NOT NULL,
  `remark` text,
  `create_by` varchar(120) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (3,'INV003',3,1,3150,3150.35,'Cash','','Admin NIT','2024-10-08 14:19:25'),(4,'INV004',3,1,97,97.20,'Cash','','Admin NIT','2024-10-07 14:24:37'),(5,'INV005',17,1,2160,2160.24,'ABA','Test Remark','Admin NIT','2024-09-02 14:03:34'),(6,'INV006',4,1,32,32.40,'Cash','Test ','Admin NIT','2024-09-09 14:15:04'),(7,'INV007',5,1,1001,1000.91,'Wing','Test ','Admin NIT','2024-11-19 14:16:16'),(8,'INV008',3,1,2070,2070.23,'Cash',NULL,'Admin NIT','2024-11-21 13:59:41'),(9,'INV009',3,1,2070,2070.23,'Cash',NULL,'Admin NIT','2024-11-21 14:02:36'),(10,'INV010',3,1,990,990.11,'Cash',NULL,'Admin NIT','2024-11-21 14:04:44'),(11,'INV011',3,1,11,10.80,'Cash',NULL,'Admin NIT','2024-11-21 14:07:03'),(12,'INV012',3,1,990,990.11,'Cash',NULL,'Admin NIT','2024-11-21 14:08:00'),(13,'INV013',3,1,1080,1080.12,'Cash',NULL,'Admin NIT','2024-11-21 14:09:53'),(14,'INV014',7,1,2081,2081.03,'Cash',NULL,'Admin NIT','2024-11-21 14:20:10'),(15,'INV015',10,1,2081,2081.03,'Wing',NULL,'Admin NIT','2024-11-21 14:27:19'),(16,'INV016',8,1,2081,2081.03,'Wing',NULL,'Admin NIT','2024-11-21 14:32:04'),(17,'INV017',10,1,333,333.00,'Wing','Remark test','Admin NIT','2024-11-24 04:55:04'),(18,'INV018',4,1,1265,1264.50,'AC',NULL,'Admin NIT','2024-11-25 13:37:05'),(19,'INV019',5,1,990,990.00,'AC',NULL,'Admin NIT','2024-11-26 10:43:07'),(20,'INV020',8,1,432,432.00,'AC',NULL,'Admin NIT','2024-11-27 13:36:15'),(21,'INV021',8,1,1283,1282.50,'AC',NULL,'Admin NIT','2024-11-27 13:37:50'),(22,'INV022',7,1,1960,1960.00,'Cash',NULL,'Admin NIT','2024-12-03 13:44:34'),(23,'INV023',7,1,2170,2170.00,'Cash',NULL,'Admin NIT','2024-12-03 13:57:47'),(24,'INV024',9,1,1960,1960.00,'Cash',NULL,'Admin NIT','2024-12-10 14:27:31'),(25,'INV025',6,1,1960,1960.00,'Wing',NULL,'Admin NIT','2024-12-10 14:28:12'),(26,'INV026',7,1,990,990.00,'ABA',NULL,'Admin NIT','2024-12-11 02:37:05'),(27,'INV027',5,1,2160,0.00,'Cash',NULL,'NIT','2025-03-22 12:14:16'),(28,'INV028',5,1,1200,0.00,'Cash',NULL,'NIT','2025-03-23 14:57:38'),(29,'INV029',3,1,1080,1080.00,'Cash','0','NIT','2025-04-23 15:08:26'),(30,'INV030',3,1,1080,1000.00,'Cash','0','NIT','2025-05-05 13:19:04');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `proudct_id` int DEFAULT NULL,
  `qty` int DEFAULT '0',
  `price` decimal(7,2) DEFAULT '0.00',
  `discount` decimal(7,2) DEFAULT '0.00',
  `total` decimal(7,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `proudct_id` (`proudct_id`),
  CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`proudct_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (1,3,1,2,1200.00,9.99,2160.24),(2,3,2,1,1100.00,9.99,990.11),(3,4,4,2,12.00,9.99,21.60),(4,4,5,3,12.00,9.99,32.40),(5,4,6,4,12.00,9.99,43.20),(6,5,1,2,1200.00,9.99,2160.24),(7,6,4,3,12.00,9.99,32.40),(8,7,2,1,1100.00,9.99,990.11),(9,7,4,1,12.00,9.99,10.80),(10,8,1,1,1200.00,9.99,1080.12),(11,8,2,1,1100.00,9.99,990.11),(12,9,1,1,1200.00,9.99,1080.12),(13,9,2,1,1100.00,9.99,990.11),(14,10,2,1,1100.00,9.99,990.11),(15,11,4,1,12.00,9.99,10.80),(16,12,2,1,1100.00,9.99,990.11),(17,13,1,1,1200.00,9.99,1080.12),(18,14,1,1,1200.00,9.99,1080.12),(19,14,2,1,1100.00,9.99,990.11),(20,14,4,1,12.00,9.99,10.80),(21,15,4,1,12.00,9.99,10.80),(22,15,1,1,1200.00,9.99,1080.12),(23,15,2,1,1100.00,9.99,990.11),(24,16,1,1,1200.00,9.99,1080.12),(25,16,2,1,1100.00,9.99,990.11),(26,16,4,1,12.00,9.99,10.80),(27,17,14,1,180.00,10.00,162.00),(28,17,15,1,190.00,10.00,171.00),(29,18,20,1,180.00,10.00,162.00),(30,18,21,1,300.00,10.00,270.00),(31,18,22,1,450.00,15.00,382.50),(32,18,23,1,500.00,10.00,450.00),(33,19,23,1,500.00,10.00,450.00),(34,19,24,1,600.00,10.00,540.00),(35,20,21,1,300.00,10.00,270.00),(36,20,20,1,180.00,10.00,162.00),(37,21,22,1,450.00,15.00,382.50),(38,21,23,2,500.00,10.00,900.00),(39,22,1,1,1200.00,10.00,1080.00),(40,22,2,1,1100.00,20.00,880.00),(41,23,5,1,1600.00,15.00,1360.00),(42,23,6,1,900.00,10.00,810.00),(43,24,1,1,1200.00,10.00,1080.00),(44,24,2,1,1100.00,20.00,880.00),(45,25,2,1,1100.00,20.00,880.00),(46,25,4,1,1200.00,10.00,1080.00),(47,26,23,1,500.00,10.00,450.00),(48,26,24,1,600.00,10.00,540.00),(49,27,1,2,1200.00,10.00,2160.00),(50,28,27,1,1200.00,0.00,1200.00),(51,29,4,1,1200.00,10.00,1080.00),(52,30,4,1,1200.00,10.00,1080.00);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_roles`
--

DROP TABLE IF EXISTS `permission_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission_roles` (
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `permission_id` (`permission_id`),
  CONSTRAINT `permission_roles_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `permission_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_roles`
--

LOCK TABLES `permission_roles` WRITE;
/*!40000 ALTER TABLE `permission_roles` DISABLE KEYS */;
INSERT INTO `permission_roles` VALUES (1,1),(1,2),(4,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(4,8),(1,9),(5,9),(1,10),(5,10),(1,11),(5,11),(1,12),(5,12),(1,13),(5,13),(1,14),(5,14),(1,15),(5,15),(1,16),(5,16),(1,17),(5,17),(1,18),(5,18),(1,19),(5,19),(1,20),(5,20),(1,21),(5,21),(1,22),(5,22),(1,23),(5,23),(1,24),(1,25);
/*!40000 ALTER TABLE `permission_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `group` varchar(255) NOT NULL,
  `is_menu_web` varchar(255) DEFAULT NULL,
  `web_route_key` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'dashboard.get_list','dashboard','1','/'),(2,'pos.get_list','pos','1','/pos'),(3,'customer.get_list','customer','1','/customer'),(4,'customer.get_one','customer',NULL,NULL),(5,'customer.create','customer',NULL,NULL),(6,'customer.update','customer',NULL,NULL),(7,'customer.remove','customer',NULL,NULL),(8,'order.get_list','order','1','/order'),(9,'product.get_list','product','1','/product'),(10,'product.get_one','product',NULL,NULL),(11,'product.create','product',NULL,NULL),(12,'product.update','product',NULL,NULL),(13,'product.remove','product',NULL,NULL),(14,'category.get_list','category','1','/category'),(15,'category.get_one','category',NULL,NULL),(16,'category.create','category',NULL,NULL),(17,'category.update','category',NULL,NULL),(18,'category.remove','category',NULL,NULL),(19,'supplier.get_list','supplier','1','/supplier'),(20,'supplier.get_one','supplier',NULL,NULL),(21,'supplier.create','supplier',NULL,NULL),(22,'supplier.update','supplier',NULL,NULL),(23,'supplier.remove','supplier',NULL,NULL),(24,'expanse_type.get_list','expanse_type','1','/expanse_type'),(25,'expanse_type.get_one','expanse_type',NULL,NULL),(26,'expanse_type.create','expanse_type',NULL,NULL),(27,'expanse_type.update','expanse_type',NULL,NULL),(28,'expanse_type.remove','expanse_type',NULL,NULL),(29,'expanse.get_list','expanse','1','/expanse'),(30,'expanse.get_one','expanse',NULL,NULL),(31,'expanse.create','expanse',NULL,NULL),(32,'expanse.update','expanse',NULL,NULL),(33,'expanse.remove','expanse',NULL,NULL),(34,'employee.get_list','employee','1','/employee'),(35,'employee.get_one','employee',NULL,NULL),(36,'employee.create','employee',NULL,NULL),(37,'employee.update','employee',NULL,NULL),(38,'employee.remove','employee',NULL,NULL),(39,'report.report_sale_summary','report','1','/report_sale_summary'),(40,'report.report_expense_summary','report','1','/report_expense_summary'),(41,'user.get_list','user','1','/user'),(42,'user.get_one','user',NULL,NULL),(43,'user.create','user',NULL,NULL),(44,'user.update','user',NULL,NULL),(45,'user.remove','user',NULL,NULL),(46,'role.get_list','role','1','/role'),(47,'role.get_one','role',NULL,NULL),(48,'role.create','role',NULL,NULL),(49,'role.update','role',NULL,NULL),(50,'role.remove','role',NULL,NULL);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int DEFAULT NULL,
  `barcode` varchar(120) NOT NULL,
  `name` varchar(120) NOT NULL,
  `brand` varchar(120) NOT NULL,
  `description` text,
  `qty` int NOT NULL DEFAULT '0',
  `price` decimal(7,2) NOT NULL DEFAULT '0.00',
  `discount` decimal(5,2) NOT NULL DEFAULT '0.00',
  `status` tinyint(1) DEFAULT '0',
  `image` varchar(255) DEFAULT NULL,
  `create_by` varchar(120) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `p_barcode` (`barcode`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,1,'P001','Mac-Air-M3','Apple','8G SSD256 14-inch',6,1200.00,10.00,1,'upload_image-1742644550252-394856917',NULL,'2024-10-21 14:11:26'),(2,1,'P002','MacBook-Air-M1','Apple','16G 512SSD 14-inch',17,1100.00,20.00,1,'upload_image-1742645556260-629232735',NULL,'2024-10-21 14:15:52'),(4,1,'P004','MacBook-Air-M2','Apple','16G 512SSD 14-inch',21,1200.00,10.00,1,'upload_image-1744738389307-482232896',NULL,'2024-10-21 14:30:15'),(5,1,'P005','Mac-Pro-14-M3','Apple','16G 512SSD 14-inch',11,1600.00,15.00,1,'upload_image-1732418949488-925145326',NULL,'2024-10-21 14:30:42'),(6,1,'P006','Dell Vostro','Dell','16G 512SSD 14-inch',7,900.00,10.00,1,'upload_image-1732419155081-346823043','Admin NIT','2024-10-24 14:33:32'),(7,1,'P007','Dell-Inspiron-3520','Dell','16G 512SSD 14-inch',100,850.00,10.00,1,'upload_image-1732419196878-942196920','Admin NIT','2024-10-30 14:00:26'),(8,1,'P008','Dell-Latitude-3440','Dell','16G SSD512 14-Inch',23,1200.00,10.00,1,'upload_image-1732419631927-282108338','Admin NIT','2024-11-24 03:40:31'),(9,1,'P009','Dell-XPS','Dell','8G SSD512 14-Inch',12,750.00,10.00,1,'upload_image-1732420030815-599717120','Admin NIT','2024-11-24 03:47:10'),(10,1,'P010','HP Pavilion 15-eg0513TX','HP','8G SSD512 16-Inch',10,600.00,15.00,1,'upload_image-1732420756213-831597154','Admin NIT','2024-11-24 03:59:16'),(11,1,'P011','HP Elite x360','HP','8G SSD512 14-Inch',16,650.00,15.00,1,'upload_image-1732420826863-812094034','Admin NIT','2024-11-24 04:00:26'),(12,1,'P012','Lenovo IdeaPad  3 15IAU7','Lenovo','8G SSD512 14-Inch',10,500.00,20.00,1,'upload_image-1732420929099-834601025','Admin NIT','2024-11-24 04:02:09'),(13,1,'P013','Lenovo ThinkPad E14 ','Lenovo','8G SSD512 14-Inch',16,600.00,115.00,1,'upload_image-1742645623878-24906249','Admin NIT','2024-11-24 04:03:06'),(14,3,'P014','Dell P2423D 23.8','Dell','24 FHD | 100Hz | IPS |  DP, HDMI , VGA Ports | Rotation ',9,180.00,10.00,1,'upload_image-1732421918082-356589622','Admin NIT','2024-11-24 04:18:38'),(15,3,'P015','Dell P2425H 24','Dell','24 FHD | 100Hz | IPS |  DP, HDMI , VGA Ports | Rotation ',7,190.00,10.00,1,'upload_image-1732422003213-229621738','Admin NIT','2024-11-24 04:20:03'),(16,3,'P016','Dell P2723D','Dell','24 FHD | 100Hz | IPS |  DP, HDMI , VGA Ports | Rotation ',12,200.00,10.00,1,'upload_image-1732422052745-606082905','Admin NIT','2024-11-24 04:20:52'),(17,3,'P017','Dell P2723QE','Dell','24 FHD | 100Hz | IPS |  DP, HDMI , VGA Ports | Rotation ',10,250.00,10.00,1,'upload_image-1732422091607-526894617','Admin NIT','2024-11-24 04:21:31'),(18,3,'P018','Dell SE2722H ','Dell','24 FHD | 100Hz | IPS |  DP, HDMI , VGA Ports | Rotation ',18,180.00,15.00,1,'upload_image-1732422187814-160403133','Admin NIT','2024-11-24 04:23:07'),(19,3,'P019','Dell U2724D','Dell','24 FHD | 100Hz | IPS |  DP, HDMI , VGA Ports | Rotation ',12,160.00,15.00,1,'upload_image-1732422287255-468708852','Admin NIT','2024-11-24 04:24:47'),(20,2,'P020','Iphone 11','Apple','Ram 8G Storage 128',8,180.00,10.00,1,'upload_image-1732423182959-178284045','Admin NIT','2024-11-24 04:39:42'),(21,2,'P021','Iphone 12','Apple','Ram 8 Storage 128',8,300.00,10.00,1,'upload_image-1732423316577-947628597','Admin NIT','2024-11-24 04:41:56'),(22,2,'P022','Iphone 13','Apple','Ram 8 Storage 128',12,450.00,15.00,1,'upload_image-1732423357382-605211066','Admin NIT','2024-11-24 04:42:37'),(23,2,'P023','Iphone 14','Apple','Ram 8 Storage 128',10,500.00,10.00,1,'upload_image-1732423396136-834570496','Admin NIT','2024-11-24 04:43:16'),(24,2,'P024','Iphone 14 Plus','Apple','Ram 8 Storage 512',18,600.00,10.00,1,'upload_image-1732423433951-65204007','Admin NIT','2024-11-24 04:43:53'),(25,2,'P025','Iphone 16 Pro','Apple','Ram 8 Storage 512',10,1300.00,10.00,1,'upload_image-1732423492118-616624717','Admin NIT','2024-11-24 04:44:52'),(26,2,'P026','Iphone 16','Apple','Ram 8 Storage 128',15,1200.00,15.00,1,'upload_image-1732423554396-181249870','Admin NIT','2024-11-24 04:45:54'),(27,2,'P027','iphone 17','Apple','apple',4,1200.00,0.00,1,'upload_image-1742741807613-885704099','NIT','2025-03-23 14:56:47'),(28,2,'P028','iphone','Apple','apple',5,500.00,0.00,1,'upload_image-1746452708861-70810120','NIT','2025-05-05 13:45:08');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (35,5,'upload_image_optional-1732418908451-685518150'),(36,5,'upload_image_optional-1732418908451-221880615'),(37,6,'upload_image_optional-1732419155081-715685250'),(38,6,'upload_image_optional-1732419155081-851251508'),(39,7,'upload_image_optional-1732419196879-617982234'),(40,8,'upload_image_optional-1732419631928-661221245'),(41,8,'upload_image_optional-1732419631929-894343617'),(42,9,'upload_image_optional-1732420030815-373881475'),(43,9,'upload_image_optional-1732420030816-4834268'),(44,10,'upload_image_optional-1732420756213-322290007'),(45,10,'upload_image_optional-1732420756213-123630834'),(46,11,'upload_image_optional-1732420826863-782682430'),(47,11,'upload_image_optional-1732420826864-783797957'),(48,12,'upload_image_optional-1732420929099-579513495'),(49,12,'upload_image_optional-1732420929099-894636231'),(52,14,'upload_image_optional-1732421918082-628994479'),(53,15,'upload_image_optional-1732422003213-277065142'),(54,16,'upload_image_optional-1732422052745-478561598'),(55,17,'upload_image_optional-1732422091607-686850110'),(56,18,'upload_image_optional-1732422187814-542880302'),(57,19,'upload_image_optional-1732422287256-675957836'),(58,20,'upload_image_optional-1732423182962-50253934'),(59,23,'upload_image_optional-1732423396136-123146333'),(60,24,'upload_image_optional-1732423433952-522420471'),(61,25,'upload_image_optional-1732423492120-657375060'),(62,26,'upload_image_optional-1732423554397-462614648');
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase` (
  `id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int DEFAULT NULL,
  `ref` varchar(255) NOT NULL,
  `shipp_company` varchar(255) DEFAULT NULL,
  `shipp_cost` decimal(7,2) DEFAULT '0.00',
  `paid_amount` decimal(7,2) DEFAULT '0.00',
  `paid_date` datetime DEFAULT NULL,
  `status` varchar(120) DEFAULT NULL,
  `create_by` varchar(120) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `purchase_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_product`
--

DROP TABLE IF EXISTS `purchase_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `qty` int DEFAULT '0',
  `cost` decimal(7,2) DEFAULT '0.00',
  `discount` decimal(7,2) DEFAULT '0.00',
  `amount` decimal(7,2) DEFAULT '0.00',
  `retail_price` decimal(7,2) DEFAULT '0.00',
  `remark` text,
  `status` varchar(120) DEFAULT NULL,
  `create_by` varchar(120) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `purchase_id` (`purchase_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `purchase_product_ibfk_1` FOREIGN KEY (`purchase_id`) REFERENCES `purchase` (`id`),
  CONSTRAINT `purchase_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_product`
--

LOCK TABLES `purchase_product` WRITE;
/*!40000 ALTER TABLE `purchase_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `code` varchar(120) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin','admin'),(2,'Manager','Manager'),(3,'Account','Account'),(4,'Cashier','Cashier'),(5,'Inventory','Inventory');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(18) NOT NULL,
  `code` varchar(18) NOT NULL,
  `tel` varchar(18) NOT NULL,
  `email` varchar(120) DEFAULT NULL,
  `address` text,
  `website` varchar(120) DEFAULT NULL,
  `note` text,
  `create_by` varchar(120) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `tel` (`tel`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'VN-101','VN-101','096998861','vn101@gmail.com','#23 st23 HN','vn101.com','','Admin NIT','2024-10-08 14:12:31'),(5,'VN-102','VN-102','0988888881','vn102@gmail.com','#24 St12','vn102.com',NULL,'Admin NIT','2024-10-09 14:17:35'),(6,'VN-113','VN-103','0988888882','vn103','#123 st 34','vn103','','Admin NIT','2024-10-09 14:18:15');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int DEFAULT NULL,
  `name` varchar(120) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `create_by` varchar(120) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'NIT','adminnit@gmail.com','$2b$10$04E8i2knfsMJujJ.9WwdnOxUWndxJNYmkW7WozAxxE9MuJVMjx15y',1,'Sa','2024-09-16 13:43:55'),(2,1,'Chan Lyly','chanlyly@gmail.com','$2b$10$JNxwvpMnuMyMMImBBxJPCOrPiZIxdpUatGPIVQH5Pun8SXFq2UCKy',1,'Sa','2024-09-16 13:44:14'),(3,2,'Dara Chan','darachan@gmail.com','$2b$10$.S3H2OUf0wmJE1g4aggOrO6i3F6D8du0a7S1mST0b5QhAq91J4Jiu',1,'Admin','2024-09-19 14:10:50'),(4,3,'So Sreyna','soksreyna@gmail.com','$2b$10$gal9us2nwseKVViYQOJInOwzRYN3/NG0kK1bDUlG8MUpGyCHucdbS',1,'Admin NIT','2024-09-19 14:13:00'),(5,4,'Ly Tona','lytona@gmail.com','$2b$10$n2hzz0rIzvDJj9Pu0DPOSedhRcCaToEremPWKwtbKEm17gl5pVWw2',0,'Admin NIT','2024-09-19 14:22:14'),(6,4,'Da Ro','daro@gmailcom','$2b$10$f0A6mcQ6u150JA9bkSqKBOGsAnWyDKyanT1PnS209zXhLJep5cPde',1,'Admin NIT','2024-09-19 14:26:54'),(7,1,'ranh','kealranh@gmail.com','$2b$10$kH.PgC4TRPCeqRDZTN58UeiH.xAp8iv1yrLV3XAX/LriwosrbfMyi',1,'Sa','2025-04-03 15:23:16'),(8,4,'lina','lina@gmail.com','$2b$10$aRQ343dvHayuLy0nmAKs2erqxqPH8ViLS8s/X7ICvlnybjhTTRZ5K',1,NULL,'2025-04-03 15:25:15');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,1),(2,4),(2,5);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'nitdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-09 21:10:21
