-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: mycoffee
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
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `parent_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (14,'Tea','tea',1,'2025-04-03 14:41:54',NULL,0),(17,'Coffee','coffee',1,'2025-04-16 15:14:16',NULL,0),(18,'Cream-Juice','cream',1,'2025-04-30 21:15:18',NULL,0),(19,'Coconut','coconut',1,'2025-04-30 21:15:40',NULL,0),(20,'Smoothie','smoothie',1,'2025-04-30 21:15:57',NULL,0),(21,'Snak','snak',1,'2025-04-30 21:16:12',NULL,0),(29,'Fresh Fruit','fresh',1,'2025-04-30 22:19:27',NULL,0);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_by` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (4,'borith','012-12-13-13','borith@gmail.com','SHV','cust',NULL,'2025-04-16 16:29:15',1),(6,'dara','015045421','dara@gmail.com','st131','staff',NULL,'2025-04-17 06:28:42',1),(7,'seyha','012-12-36-12','seyha@gmail.com','st132','cashier',NULL,'2025-04-23 09:11:34',1);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `ref_no` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `amount` decimal(7,2) DEFAULT '0.00',
  `remarks` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `expense_date` datetime DEFAULT NULL,
  `create_by` int DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expanse_type` varchar(120) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `create_by` (`create_by`),
  CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `expenses_ibfk_3` FOREIGN KEY (`create_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
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
  `product_id` int DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `price` decimal(7,2) DEFAULT NULL,
  `discount` decimal(7,2) DEFAULT NULL,
  `total` decimal(7,2) DEFAULT NULL,
  `product_type` varchar(120) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=330 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (1,32,NULL,1,2.00,0.00,2.00,NULL),(2,33,NULL,1,4.00,0.00,4.00,NULL),(8,37,NULL,1,2.00,0.00,2.00,NULL),(16,41,16,1,1.50,0.00,1.50,NULL),(19,42,16,1,1.50,0.00,1.50,NULL),(21,43,16,1,1.50,0.00,1.50,NULL),(28,44,16,1,1.50,0.00,1.50,NULL),(33,45,16,1,1.50,0.00,1.50,NULL),(35,46,16,1,1.50,0.00,1.50,NULL),(39,49,16,1,1.25,0.00,1.25,NULL),(42,51,16,1,1.25,0.00,1.25,NULL),(43,52,16,1,1.25,0.00,1.25,NULL),(45,54,16,1,1.25,0.00,1.25,NULL),(72,79,19,1,2.00,0.00,2.00,NULL),(73,82,19,1,2.00,0.00,2.00,NULL),(74,83,19,1,2.00,0.00,2.00,NULL),(75,84,19,2,2.00,0.00,4.00,NULL),(76,85,14,2,2.00,0.00,4.00,NULL),(77,86,16,1,1.25,0.00,1.25,NULL),(78,87,12,1,2.00,0.00,2.00,NULL),(79,88,12,1,2.00,0.00,2.00,NULL),(80,89,12,1,2.00,0.00,2.00,NULL),(81,90,12,1,2.00,0.00,2.00,NULL),(82,91,8,1,1.25,0.00,1.25,NULL),(84,105,16,1,1.25,0.00,1.25,NULL),(101,115,12,1,2.00,0.00,2.00,NULL),(103,116,12,1,2.00,0.00,2.00,NULL),(105,117,12,1,2.00,0.00,2.00,NULL),(107,118,12,1,2.00,0.00,2.00,NULL),(109,119,12,1,2.00,0.00,2.00,NULL),(115,122,8,1,1.25,0.00,1.25,NULL),(122,126,14,1,2.00,0.00,2.00,NULL),(123,126,16,1,1.25,0.00,1.25,NULL),(124,127,16,1,1.25,0.00,1.25,NULL),(125,128,14,1,2.00,0.00,2.00,NULL),(136,139,12,1,2.00,0.00,2.00,NULL),(137,140,12,1,2.00,0.00,2.00,NULL),(138,141,12,1,2.00,0.00,2.00,NULL),(139,142,12,1,2.00,0.00,2.00,NULL),(140,143,8,1,1.25,0.00,1.25,NULL),(141,144,12,1,2.00,0.00,2.00,NULL),(142,145,9,1,2.00,0.00,2.00,NULL),(143,146,12,1,2.00,0.00,2.00,NULL),(144,146,9,1,2.00,0.00,2.00,NULL),(145,147,9,1,2.00,0.00,2.00,NULL),(146,148,8,1,1.25,0.00,1.25,NULL),(147,149,8,1,1.25,0.00,1.25,NULL),(148,150,14,1,2.00,0.00,2.00,NULL),(149,151,9,1,2.00,0.00,2.00,NULL),(150,152,8,1,1.25,0.00,1.25,NULL),(151,153,14,1,2.00,0.00,2.00,NULL),(152,154,9,1,2.00,0.00,2.00,NULL),(153,155,8,1,1.25,0.00,1.25,NULL),(154,156,8,1,1.25,0.00,1.25,NULL),(155,157,15,1,2.00,0.00,2.00,NULL),(156,158,14,1,2.00,0.00,2.00,NULL),(157,158,15,1,2.00,0.00,2.00,NULL),(158,158,16,2,1.25,0.00,2.50,NULL),(165,163,9,1,2.00,0.00,2.00,NULL),(183,180,9,1,2.00,0.00,2.00,NULL),(184,181,12,1,2.00,0.00,2.00,NULL),(185,182,8,1,1.25,0.00,1.25,NULL),(186,182,9,1,2.00,0.00,2.00,NULL),(187,183,8,1,1.25,0.00,1.25,NULL),(188,183,9,1,2.00,0.00,2.00,NULL),(189,183,12,1,2.00,0.00,2.00,NULL),(190,183,14,1,2.00,0.00,2.00,NULL),(191,183,15,1,2.00,0.00,2.00,NULL),(192,183,16,1,1.25,0.00,1.25,NULL),(193,183,19,1,2.00,0.00,2.00,NULL),(194,183,20,1,1.50,0.00,1.50,NULL),(195,183,24,1,1.50,0.00,1.50,NULL),(196,183,27,1,1.50,0.00,1.50,NULL),(197,184,9,1,2.00,0.00,2.00,NULL),(198,185,12,1,2.00,0.00,2.00,NULL),(199,185,8,1,1.25,0.00,1.25,NULL),(200,186,8,1,1.25,0.00,1.25,NULL),(201,186,9,1,2.00,0.00,2.00,NULL),(202,187,12,1,2.00,0.00,2.00,NULL),(203,188,8,1,1.25,0.00,1.25,NULL),(204,189,8,1,1.25,0.00,1.25,NULL),(205,190,12,1,2.00,0.00,2.00,NULL),(206,191,NULL,1,2.00,0.00,2.00,NULL),(207,191,NULL,1,1.25,0.00,1.25,NULL),(208,191,NULL,1,2.00,0.00,2.00,NULL),(209,192,NULL,1,1.25,0.00,1.25,NULL),(210,192,NULL,1,2.00,0.00,2.00,NULL),(211,192,NULL,1,2.00,0.00,2.00,NULL),(212,193,NULL,1,1.25,0.00,1.25,NULL),(213,193,NULL,1,2.00,0.00,2.00,NULL),(214,193,NULL,1,2.00,0.00,2.00,NULL),(215,194,NULL,1,1.25,0.00,1.25,NULL),(216,194,NULL,1,2.00,0.00,2.00,NULL),(217,195,NULL,1,2.00,0.00,2.00,NULL),(218,195,NULL,1,1.25,0.00,1.25,NULL),(219,196,NULL,1,2.00,0.00,2.00,NULL),(220,196,NULL,1,2.00,0.00,2.00,NULL),(221,197,NULL,1,2.00,0.00,2.00,NULL),(222,198,NULL,1,1.25,0.00,1.25,NULL),(223,199,NULL,1,1.25,0.00,1.25,NULL),(224,200,NULL,1,2.00,0.00,2.00,NULL),(225,201,NULL,1,2.00,0.00,2.00,NULL),(226,202,NULL,1,2.00,0.00,2.00,NULL),(227,203,NULL,1,2.00,0.00,2.00,NULL),(228,204,NULL,1,2.00,0.00,2.00,NULL),(229,205,NULL,1,1.50,0.00,1.50,NULL),(230,206,NULL,1,2.00,0.00,2.00,NULL),(231,207,NULL,1,2.00,0.00,2.00,NULL),(232,208,NULL,1,2.00,0.00,2.00,NULL),(233,209,NULL,1,1.50,0.00,1.50,NULL),(234,210,NULL,1,2.00,0.00,2.00,NULL),(235,211,NULL,1,2.00,0.00,2.00,NULL),(236,212,NULL,1,2.00,0.00,2.00,NULL),(237,213,NULL,1,2.00,0.00,2.00,NULL),(238,214,NULL,1,2.00,0.00,2.00,NULL),(239,215,NULL,1,2.00,0.00,2.00,NULL),(240,216,NULL,1,1.25,0.00,1.25,NULL),(241,217,NULL,1,2.00,0.00,2.00,NULL),(242,218,NULL,1,2.00,0.00,2.00,NULL),(243,219,NULL,1,2.00,0.00,2.00,NULL),(244,220,NULL,1,2.00,0.00,2.00,NULL),(245,221,NULL,1,2.00,0.00,2.00,NULL),(246,222,NULL,1,2.00,0.00,2.00,NULL),(247,223,NULL,1,2.00,0.00,2.00,NULL),(248,224,NULL,1,2.00,0.00,2.00,NULL),(249,225,NULL,1,2.00,0.00,2.00,NULL),(250,226,NULL,1,2.00,0.00,2.00,NULL),(251,227,NULL,1,2.00,0.00,2.00,NULL),(252,228,NULL,1,1.25,0.00,1.25,NULL),(253,229,NULL,1,2.00,0.00,2.00,NULL),(254,230,NULL,1,2.00,0.00,2.00,NULL),(255,231,NULL,1,1.25,0.00,1.25,NULL),(256,232,NULL,1,2.00,0.00,2.00,NULL),(257,233,NULL,1,2.00,0.00,2.00,NULL),(258,234,NULL,1,2.00,0.00,2.00,NULL),(259,235,NULL,1,1.25,0.00,1.25,NULL),(260,236,NULL,1,2.00,0.00,2.00,NULL),(261,237,NULL,1,1.25,0.00,1.25,NULL),(262,238,NULL,1,2.00,0.00,2.00,NULL),(263,239,NULL,1,2.00,0.00,2.00,NULL),(264,240,NULL,1,2.00,0.00,2.00,NULL),(265,241,NULL,1,2.00,0.00,2.00,NULL),(266,242,NULL,1,2.00,0.00,2.00,NULL),(267,243,NULL,1,2.00,0.00,2.00,NULL),(268,244,NULL,1,2.00,0.00,2.00,NULL),(269,245,NULL,1,2.00,0.00,2.00,NULL),(270,246,NULL,1,1.25,0.00,1.25,NULL),(271,247,NULL,1,2.00,0.00,2.00,NULL),(272,248,NULL,1,2.00,0.00,2.00,NULL),(273,249,NULL,1,1.25,0.00,1.25,NULL),(274,250,NULL,1,2.00,0.00,2.00,NULL),(275,251,NULL,1,2.00,0.00,2.00,NULL),(276,252,NULL,1,2.00,0.00,2.00,NULL),(277,253,NULL,1,2.00,0.00,2.00,NULL),(278,254,NULL,1,2.00,0.00,2.00,NULL),(279,255,NULL,1,2.00,0.00,2.00,NULL),(280,256,NULL,1,2.00,0.00,2.00,NULL),(281,257,NULL,1,2.00,0.00,2.00,NULL),(282,258,NULL,1,2.00,0.00,2.00,NULL),(283,259,NULL,1,2.00,0.00,2.00,NULL),(284,259,NULL,1,2.00,0.00,2.00,NULL),(285,259,NULL,1,1.50,0.00,1.50,NULL),(286,259,NULL,1,2.00,0.00,2.00,NULL),(287,260,NULL,1,2.00,0.00,2.00,NULL),(288,261,NULL,1,2.00,0.00,2.00,NULL),(289,262,NULL,1,2.00,0.00,2.00,NULL),(290,263,NULL,1,2.00,0.00,2.00,NULL),(291,264,NULL,1,1.25,0.00,1.25,NULL),(292,265,NULL,1,2.00,0.00,2.00,NULL),(293,266,NULL,1,2.00,0.00,2.00,NULL),(294,267,NULL,1,1.25,0.00,1.25,NULL),(295,268,NULL,1,2.00,0.00,2.00,NULL),(296,269,NULL,1,2.00,0.00,2.00,NULL),(297,270,NULL,1,2.00,0.00,2.00,NULL),(298,271,NULL,1,2.00,0.00,2.00,NULL),(299,272,NULL,1,1.25,0.00,1.25,NULL),(300,273,NULL,1,2.00,0.00,2.00,NULL),(301,274,NULL,1,2.00,0.00,2.00,NULL),(302,275,NULL,1,2.00,0.00,2.00,NULL),(303,276,NULL,1,1.50,0.00,1.50,NULL),(304,277,NULL,1,2.00,0.00,2.00,NULL),(305,278,NULL,1,2.00,0.00,2.00,NULL),(306,279,NULL,1,2.00,0.00,2.00,NULL),(307,280,NULL,1,1.25,0.00,1.25,NULL),(308,281,NULL,1,1.50,0.00,1.50,NULL),(309,282,NULL,1,1.25,0.00,1.25,NULL),(310,283,NULL,1,1.50,0.00,1.50,NULL),(311,284,NULL,1,2.00,0.00,2.00,NULL),(312,285,NULL,1,1.50,0.00,1.50,NULL),(314,287,NULL,1,2.00,0.00,2.00,NULL),(315,288,NULL,1,2.00,0.00,2.00,NULL),(316,288,NULL,1,2.00,0.00,2.00,NULL),(317,289,NULL,1,2.00,0.00,2.00,NULL),(318,290,NULL,1,2.00,0.00,2.00,NULL),(319,291,NULL,1,2.00,0.00,2.00,NULL),(320,292,NULL,1,2.00,0.00,2.00,NULL),(321,293,NULL,1,2.00,0.00,2.00,NULL),(322,294,NULL,1,1.25,0.00,1.25,NULL),(323,295,NULL,1,2.00,0.00,2.00,NULL),(324,296,NULL,1,2.00,0.00,2.00,NULL),(325,297,NULL,2,1.25,0.00,2.50,NULL),(326,297,NULL,1,2.00,0.00,2.00,NULL),(327,297,NULL,1,2.00,0.00,2.00,NULL),(328,297,NULL,1,2.00,0.00,2.00,NULL),(329,298,NULL,1,2.00,0.00,2.00,NULL);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_no` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `customer_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `paid_amount` decimal(7,2) NOT NULL DEFAULT '0.00',
  `payment_method` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `remark` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '0',
  `create_by` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `total_amount` decimal(7,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=299 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (5,'INV005',4,8,0.00,'Crypto',NULL,'ranh','2025-04-18 18:39:11',2.00),(6,'INV006',4,8,0.00,'Crypto',NULL,'ranh','2025-04-18 18:49:50',4.00),(7,'INV007',6,8,0.00,'Crypto',NULL,'ranh','2025-04-18 18:55:03',2.00),(8,'INV008',6,8,0.00,'Cash',NULL,'ranh','2025-04-18 18:58:13',2.00),(9,'INV009',4,16,0.00,'Cash','0','lan','2025-04-18 18:59:45',2.00),(10,'INV010',4,8,0.00,'Crypto',NULL,'ranh','2025-04-19 04:17:04',4.00),(11,'INV011',4,8,0.00,'Crypto','0','ranh','2025-04-19 05:10:51',4.00),(12,'INV012',4,8,0.00,'Cash','0','ranh','2025-04-19 06:02:48',2.00),(13,'INV013',4,8,0.00,'Cash','0','ranh','2025-04-19 06:33:42',4.00),(14,'INV014',4,8,0.00,'Cash','0','ranh','2025-04-19 11:52:51',2.00),(15,'INV015',4,8,0.00,'Cash','0','ranh','2025-04-19 14:25:07',2.00),(16,'INV016',4,8,0.00,'Cash','0','ranh','2025-04-19 14:26:20',2.00),(17,'INV017',6,8,0.00,'Cash','0','ranh','2025-04-19 14:27:28',8.00),(18,'INV018',4,8,0.00,'Cash','0','ranh','2025-04-19 14:29:01',8.00),(19,'INV019',4,8,0.00,'Cash','0','ranh','2025-04-19 14:29:27',4.00),(20,'INV020',4,8,0.00,'Cash','0','ranh','2025-04-19 14:30:44',4.00),(21,'INV021',4,8,0.00,'Cash','0','ranh','2025-04-19 14:32:01',2.00),(22,'INV022',4,8,0.00,'Cash','0','ranh','2025-04-19 15:32:01',2.00),(23,'INV023',4,8,0.00,'Crypto','0','ranh','2025-04-19 15:42:01',8.00),(24,'INV024',4,8,0.00,'Cash','0','ranh','2025-04-19 15:53:56',14.00),(25,'INV025',4,8,0.00,'Cash','2','ranh','2025-04-19 15:54:34',2.00),(26,'INV026',4,8,0.00,'Cash',NULL,'ranh','2025-04-19 16:03:22',6.00),(27,'INV027',4,8,0.00,'Cash',NULL,'ranh','2025-04-19 16:16:08',10.00),(28,'INV028',4,8,0.00,'Cash','0','ranh','2025-04-20 05:37:25',2.00),(29,'INV029',4,8,0.00,'Crypto','2.0','ranh','2025-04-20 09:35:24',4.00),(30,'INV030',4,8,0.00,'ABA','0','ranh','2025-04-20 15:59:38',2.00),(31,'INV031',4,8,0.00,'ABA','0','ranh','2025-04-20 16:04:30',6.00),(32,'INV032',4,8,0.00,'Cash','0','ranh','2025-04-20 16:30:43',2.00),(33,'INV033',4,8,0.00,'Cash','0','ranh','2025-04-20 16:34:48',4.00),(34,'INV034',4,8,0.00,'Cash','0','ranh','2025-04-20 17:37:21',2.00),(35,'INV035',4,16,0.00,'Cash','0','lan','2025-04-20 17:42:04',4.00),(36,'INV036',4,16,0.00,'Cash','0','lan','2025-04-20 17:42:27',4.00),(37,'INV037',4,16,0.00,'Cash','0','lan','2025-04-20 17:50:12',2.00),(38,'INV038',4,16,6.00,'ABA',NULL,'lan','2025-04-20 17:54:55',6.00),(39,'INV039',6,16,3.00,'Cash','0','lan','2025-04-20 18:01:30',4.00),(40,'INV040',4,16,5.00,'Cash','0','lan','2025-04-20 18:06:15',4.00),(41,'INV041',4,1,3.50,'Crypto','0','ranh','2025-04-21 15:03:05',4.00),(42,'INV042',4,1,7.50,'Crypto','0','ranh','2025-04-21 15:04:01',8.00),(43,'INV043',6,1,9.50,'ABA','0','ranh','2025-04-21 15:04:43',10.00),(44,'INV044',6,1,10.00,'Crypto','0','ranh','2025-04-21 15:10:48',10.00),(45,'INV045',4,1,7.50,'Crypto','0','ranh','2025-04-21 15:12:25',8.00),(46,'INV046',4,1,3.50,'Cash','0','ranh','2025-04-21 15:13:49',4.00),(47,'INV047',4,1,1.25,'Cash','0','ranh','2025-04-21 15:14:56',1.00),(48,'INV048',6,1,1.25,'Crypto','0','ranh','2025-04-21 15:28:34',1.25),(49,'INV049',4,1,3.25,'Cash','0','ranh','2025-04-21 16:46:16',3.25),(50,'INV050',NULL,1,0.00,'Cash',NULL,'ranh','2025-04-22 20:06:19',2.00),(51,'INV051',NULL,1,3.25,'Wing','0','ranh','2025-04-22 20:07:19',3.25),(52,'INV052',NULL,1,1.25,'Cash','0','ranh','2025-04-23 09:23:00',1.25),(53,'INV053',NULL,6,2.00,'Crypto','0','lan','2025-04-23 09:26:11',2.00),(54,'INV054',NULL,6,1.25,'Acleda',NULL,'lan','2025-04-23 09:31:11',1.25),(55,'INV055',NULL,6,2.00,'Cash',NULL,'lan','2025-04-23 09:33:15',2.00),(56,'INV056',NULL,NULL,2.00,'Cash','0',NULL,'2025-04-23 15:10:56',2.00),(57,'INV057',NULL,NULL,3.25,'Crypto','0',NULL,'2025-04-23 15:16:13',3.25),(58,'INV058',NULL,NULL,4.00,'Cash','0',NULL,'2025-04-23 15:17:03',4.00),(59,'INV059',NULL,NULL,2.00,'Cash','0',NULL,'2025-04-23 15:27:04',2.00),(60,'INV060',NULL,NULL,2.00,'Cash','0',NULL,'2025-04-23 15:30:35',2.00),(61,'INV061',NULL,NULL,2.00,'Cash','0',NULL,'2025-04-23 15:33:50',2.00),(62,'INV062',NULL,NULL,2.00,'Cash','0',NULL,'2025-04-23 15:35:12',2.00),(63,'INV063',NULL,NULL,2.00,'Cash','0',NULL,'2025-04-23 15:41:26',2.00),(64,'INV064',7,NULL,2.00,'ABA','0',NULL,'2025-04-23 16:06:33',2.00),(65,'INV065',4,NULL,1.00,'Cash','0',NULL,'2025-04-23 16:17:51',2.00),(66,'INV066',4,NULL,2.00,'Cash','0',NULL,'2025-04-23 16:23:15',2.00),(67,'INV067',4,1,1.25,'Cash','0','ranh','2025-04-23 16:26:08',1.25),(68,'INV068',4,NULL,2.00,'Cash','0',NULL,'2025-04-23 16:34:04',2.00),(69,'INV069',4,NULL,2.00,'Cash','0',NULL,'2025-04-23 16:41:03',2.00),(70,'INV070',4,1,2.00,'Cash','0','ranh','2025-04-23 16:52:14',2.00),(71,'INV071',4,NULL,2.00,'Cash','0',NULL,'2025-04-23 17:18:05',2.00),(72,'INV072',4,NULL,2.00,'Cash','0',NULL,'2025-04-23 17:22:21',2.00),(73,'INV073',6,1,1.25,'Cash','0','ranh','2025-04-23 17:24:26',1.25),(74,'INV074',4,29,1.25,'Cash','0','amz','2025-04-23 17:27:58',1.25),(75,'INV075',7,30,2.00,'Cash','0','ranhsamnang','2025-04-23 17:30:48',2.00),(76,'INV076',4,1,2.00,'Crypto','0','ranh','2025-04-24 13:42:49',2.00),(77,'INV077',7,1,2.00,'Cash','0','ranh','2025-04-24 13:44:08',2.00),(78,'INV078',4,1,2.00,'Cash','0','ranh','2025-04-24 18:25:26',2.00),(79,'INV079',4,1,2.00,'Cash','0','ranh','2025-04-25 05:55:19',2.00),(80,'INV080',7,1,0.00,'Crypto','0','ranh','2025-04-25 06:02:46',2.00),(81,'INV081',4,1,2.00,'Cash','0','ranh','2025-04-25 06:07:10',2.00),(82,'INV082',4,1,2.00,'Cash','0','ranh','2025-04-25 06:08:43',2.00),(83,'INV083',4,1,2.00,'Cash','0','ranh','2025-04-25 13:52:40',2.00),(84,'INV084',6,1,2.00,'Cash','0','ranh','2025-04-26 18:33:02',4.00),(85,'INV085',4,36,2.00,'Cash','0','dara','2025-04-27 05:07:52',2.00),(86,'INV086',7,36,1.25,'ABA','0','dara','2025-04-27 05:10:54',1.25),(87,'INV087',NULL,36,2.00,'Acleda','0','dara','2025-04-27 05:27:06',2.00),(88,'INV088',4,36,2.00,'ABA','0','dara','2025-04-27 05:27:41',2.00),(89,'INV089',4,36,2.00,'Cash','0','dara','2025-04-27 05:29:12',2.00),(90,'INV090',4,1,2.00,'Cash','0','ranh','2025-05-02 13:42:46',2.00),(91,'INV091',7,1,1.25,'Cash','0','ranh','2025-05-02 13:56:07',1.25),(92,'INV092',4,1,2.00,'Cash','0','ranh','2025-05-02 18:43:02',0.00),(93,'INV093',4,1,3.25,'Cash','0','ranh','2025-05-05 19:36:38',3.25),(94,'INV094',4,1,3.25,'Cash','0','ranh','2025-05-05 19:36:40',3.25),(95,'INV095',4,1,3.25,'Cash','0','ranh','2025-05-05 19:36:41',3.25),(96,'INV096',4,1,3.25,'Cash','0','ranh','2025-05-05 19:36:41',3.25),(97,'INV097',4,1,3.25,'Cash','0','ranh','2025-05-05 19:38:16',3.25),(98,'INV098',4,1,2.00,'Cash','0','ranh','2025-05-06 06:17:25',2.00),(99,'INV099',4,1,2.00,'Cash','0','ranh','2025-05-06 06:21:31',2.00),(100,'INV100',6,1,2.00,'Cash','0','ranh','2025-05-06 06:24:22',2.00),(101,'INV101',6,1,2.00,'Wing','0','ranh','2025-05-06 06:28:18',2.00),(102,'INV102',4,1,2.00,'Acleda','0','ranh','2025-05-06 06:30:40',2.00),(103,'INV103',4,1,2.00,'Wing','0','ranh','2025-05-06 06:33:07',2.00),(105,'INV104',6,1,2.00,'Cash','0','ranh','2025-05-07 15:49:35',1.25),(115,'INV106',4,1,3.00,'Cash','0','ranh','2025-05-08 17:07:06',4.00),(116,'INV116',4,1,3.00,'Cash','0','ranh','2025-05-08 17:07:19',4.00),(117,'INV117',4,1,3.00,'Cash','0','ranh','2025-05-08 17:07:32',4.00),(118,'INV118',4,1,3.00,'Cash','0','ranh','2025-05-08 17:07:33',4.00),(119,'INV119',4,1,3.00,'Cash','0','ranh','2025-05-08 17:07:34',4.00),(120,'INV120',4,1,3.00,'Cash','0','ranh','2025-05-08 17:07:34',4.00),(122,'INV121',4,1,3.00,'Cash','0','ranh','2025-05-08 17:08:01',3.25),(123,'INV123',4,1,3.00,'Cash','0','ranh','2025-05-08 17:08:02',3.25),(126,'INV124',4,1,3.00,'Cash','0','ranh','2025-05-08 17:08:50',3.25),(127,'INV127',6,1,1.00,'Cash',NULL,'ranh','2025-05-08 17:10:23',1.25),(128,'INV128',7,1,2.00,'Cash','0','ranh','2025-05-08 17:11:09',2.00),(137,'INV129',4,1,2.00,'Cash','0','ranh','2025-05-12 05:37:16',2.00),(139,'INV138',4,1,2.00,'Cash',NULL,'ranh','2025-05-12 05:39:51',2.00),(140,'INV140',6,1,2.00,'Cash','0','ranh','2025-05-12 05:42:24',2.00),(141,'INV141',6,1,2.00,'Cash','0','ranh','2025-05-12 10:49:14',2.00),(142,'INV142',4,1,2.00,'Cash','0','ranh','2025-05-12 17:00:59',2.00),(143,'INV143',4,1,1.00,'Cash','0','ranh','2025-05-12 17:07:04',1.25),(144,'INV144',6,1,2.00,'Cash','0','ranh','2025-05-14 10:56:12',2.00),(145,'INV145',6,1,2.00,'Wing','0','ranh','2025-05-14 10:58:23',2.00),(146,'INV146',6,1,4.00,'Cash',NULL,'ranh','2025-05-14 12:47:56',4.00),(147,'INV147',4,1,3.00,'Cash',NULL,'ranh','2025-05-14 19:09:06',2.00),(148,'INV148',4,1,2.00,'Cash',NULL,'ranh','2025-05-14 19:10:00',1.25),(149,'INV149',4,1,2.00,'Cash',NULL,'ranh','2025-05-14 20:09:26',1.25),(150,'INV150',4,1,5.00,'Cash',NULL,'ranh','2025-05-14 20:11:02',2.00),(151,'INV151',4,1,5.00,'Cash',NULL,'ranh','2025-05-14 21:04:01',2.00),(152,'INV152',4,1,4.00,'Cash',NULL,'ranh','2025-05-14 21:20:42',1.25),(153,'INV153',6,1,5.00,'Cash',NULL,'ranh','2025-05-14 21:22:39',2.00),(154,'INV154',6,1,5.00,'Cash',NULL,'ranh','2025-05-14 21:45:54',2.00),(155,'INV155',4,1,0.00,'Cash',NULL,'ranh','2025-05-14 21:53:33',1.25),(156,'INV156',4,1,0.00,'Cash',NULL,'ranh','2025-05-14 21:54:42',1.25),(157,'INV157',4,1,5.00,'Cash',NULL,'ranh','2025-05-14 22:03:53',2.00),(158,'INV158',6,1,10.00,'Cash','0','ranh','2025-05-14 22:04:26',6.50),(163,'INV159',4,1,10.00,'Cash',NULL,'ranh','2025-05-14 22:32:27',4.00),(164,'INV164',4,1,10.00,'Cash',NULL,'ranh','2025-05-14 22:55:12',0.00),(165,'INV165',4,1,10.00,'Cash',NULL,'ranh','2025-05-14 22:55:14',0.00),(166,'INV166',4,1,10.00,'Cash',NULL,'ranh','2025-05-14 22:55:15',0.00),(170,'INV167',4,1,5.00,'Cash',NULL,'ranh','2025-05-14 22:58:50',2.00),(171,'INV171',4,1,5.00,'Cash',NULL,'ranh','2025-05-14 22:58:57',2.00),(172,'INV172',7,1,5.00,'Cash',NULL,'ranh','2025-05-14 22:59:08',2.00),(177,'INV173',4,1,4.00,'Cash',NULL,'ranh','2025-05-14 22:59:44',2.00),(178,'INV178',4,1,4.00,'Cash',NULL,'ranh','2025-05-14 22:59:50',2.00),(179,'INV179',4,1,5.00,'Cash','0','ranh','2025-05-14 23:01:04',2.00),(180,'INV180',4,1,5.00,'Cash',NULL,'ranh','2025-05-14 23:11:07',2.00),(181,'INV181',4,1,5.00,'Wing',NULL,'ranh','2025-05-15 01:23:27',2.00),(182,'INV182',6,1,5.00,'ABA',NULL,'ranh','2025-05-15 01:24:19',3.25),(183,'INV183',4,1,20.00,'Cash',NULL,'ranh','2025-05-15 01:25:08',17.00),(184,'INV184',4,1,5.00,'Cash',NULL,'ranh','2025-05-15 01:33:12',2.00),(185,'INV185',7,1,5.00,'Crypto',NULL,'ranh','2025-05-15 01:48:23',3.25),(186,'INV186',4,1,5.00,'Cash',NULL,'ranh','2025-05-15 10:25:58',3.25),(187,'INV187',7,1,5.00,'Cash',NULL,'ranh','2025-05-15 10:48:34',2.00),(188,'INV188',4,1,2.00,'Cash',NULL,'ranh','2025-05-15 10:54:22',1.25),(189,'INV189',4,1,2.00,'Cash',NULL,'ranh','2025-05-15 10:55:04',1.25),(190,'INV190',4,1,2.00,'Cash',NULL,'ranh','2025-05-15 11:20:27',2.00),(191,'INV191',4,1,10.00,'Cash',NULL,'ranh','2025-05-15 19:45:23',5.25),(192,'INV192',7,1,10.00,'Cash',NULL,'ranh','2025-05-15 19:47:35',5.25),(193,'INV193',7,1,6.00,'ABA',NULL,'ranh','2025-05-15 19:48:53',5.25),(194,'INV194',4,1,5.00,'Cash',NULL,'ranh','2025-05-15 19:54:25',3.25),(195,'INV195',6,1,5.00,'Cash',NULL,'ranh','2025-05-15 19:55:22',3.25),(196,'INV196',4,1,5.00,'Cash',NULL,'ranh','2025-05-15 20:56:25',4.00),(197,'INV197',6,1,5.00,'Cash','0','ranh','2025-05-15 20:58:26',2.00),(198,'INV198',4,1,5.00,'Cash','0','ranh','2025-05-15 21:03:18',1.25),(199,'INV199',4,1,2.00,'Cash','0','ranh','2025-05-15 21:05:09',1.25),(200,'INV200',6,1,5.00,'Wing','0','ranh','2025-05-15 21:18:41',2.00),(201,'INV201',4,1,5.00,'Cash','0','ranh','2025-05-15 21:26:43',2.00),(202,'INV202',4,1,2.50,'Cash','0','ranh','2025-05-15 21:29:38',2.00),(203,'INV203',4,1,5.00,'Cash','0','ranh','2025-05-15 21:30:14',2.00),(204,'INV204',4,1,5.00,'Cash','0','ranh','2025-05-15 21:31:15',2.00),(205,'INV205',4,1,2.00,'Cash',NULL,'ranh','2025-05-15 21:32:20',1.50),(206,'INV206',4,1,5.00,'Cash',NULL,'ranh','2025-05-15 21:33:19',2.00),(207,'INV207',4,1,5.00,'Cash','0','ranh','2025-05-15 21:42:10',2.00),(208,'INV208',4,1,5.00,'Cash','0','ranh','2025-05-15 21:44:48',2.00),(209,'INV209',4,1,2.00,'Cash',NULL,'ranh','2025-05-15 21:46:15',1.50),(210,'INV210',4,1,5.00,'Cash',NULL,'ranh','2025-05-15 21:51:48',2.00),(211,'INV211',4,1,2.00,'Cash',NULL,'ranh','2025-05-15 21:53:26',2.00),(212,'INV212',4,1,5.00,'Cash','0','ranh','2025-05-15 21:58:22',2.00),(213,'INV213',4,1,5.00,'Cash','0','ranh','2025-05-15 22:04:24',2.00),(214,'INV214',4,1,2.00,'Cash','0','ranh','2025-05-15 22:06:16',2.00),(215,'INV215',4,1,2.00,'Cash','0','ranh','2025-05-15 22:07:52',2.00),(216,'INV216',7,1,5.00,'Cash','0','ranh','2025-05-15 22:11:26',1.25),(217,'INV217',4,1,5.00,'Cash',NULL,'ranh','2025-05-15 22:13:47',2.00),(218,'INV218',4,1,5.00,'Cash',NULL,'ranh','2025-05-15 22:14:17',2.00),(219,'INV219',4,1,5.00,'Cash','0','ranh','2025-05-15 22:35:19',2.00),(220,'INV220',4,1,5.00,'Cash','0','ranh','2025-05-15 22:36:29',2.00),(221,'INV221',4,1,3.00,'Cash','0','ranh','2025-05-15 22:40:13',2.00),(222,'INV222',6,1,5.00,'ABA',NULL,'ranh','2025-05-15 22:43:23',2.00),(223,'INV223',4,1,5.00,'Cash',NULL,'ranh','2025-05-15 22:46:06',2.00),(224,'INV224',4,1,5.00,'Cash','0','ranh','2025-05-15 22:52:56',2.00),(225,'INV225',4,1,4.00,'Cash','0','ranh','2025-05-15 23:05:14',2.00),(226,'INV226',4,1,5.00,'Cash','0','ranh','2025-05-16 09:49:54',2.00),(227,'INV227',6,1,3.00,'Cash','0','ranh','2025-05-16 09:51:40',2.00),(228,'INV228',7,1,2.00,'Cash','0','ranh','2025-05-16 09:53:30',1.25),(229,'INV229',6,1,5.00,'ABA','0','ranh','2025-05-16 09:56:38',2.00),(230,'INV230',6,1,4.00,'ABA','0','ranh','2025-05-16 09:57:07',2.00),(231,'INV231',4,1,5.00,'Cash','0','ranh','2025-05-16 09:58:02',1.25),(232,'INV232',NULL,1,5.00,'Cash','0','ranh','2025-05-16 10:01:48',2.00),(233,'INV233',NULL,1,5.00,'Cash','0','ranh','2025-05-16 10:04:16',2.00),(234,'INV234',NULL,1,5.00,'ABA','0','ranh','2025-05-16 10:06:44',2.00),(235,'INV235',NULL,1,3.00,'Cash','0','ranh','2025-05-16 10:10:43',1.25),(236,'INV236',NULL,1,5.00,'Cash','0','ranh','2025-05-16 10:11:31',2.00),(237,'INV237',NULL,1,5.00,'Cash','0','ranh','2025-05-16 10:12:25',1.25),(238,'INV238',NULL,1,5.00,'Cash','0','ranh','2025-05-16 10:15:30',2.00),(239,'INV239',NULL,1,5.00,'Cash','0','ranh','2025-05-16 10:24:02',2.00),(240,'INV240',NULL,1,5.00,'ABA','0','ranh','2025-05-16 10:24:22',2.00),(241,'INV241',NULL,1,5.00,'Cash','0','ranh','2025-05-16 10:28:30',2.00),(242,'INV242',NULL,1,5.00,'ABA','0','ranh','2025-05-16 10:28:52',2.00),(243,'INV243',NULL,1,5.00,'Wing','0','ranh','2025-05-16 10:33:07',2.00),(244,'INV244',NULL,36,5.00,'Crypto','0','vireak','2025-05-16 10:34:18',2.00),(245,'INV245',NULL,42,5.00,'ABA','0','srey la','2025-05-16 10:53:43',2.00),(246,'INV246',NULL,42,3.00,'ABA','0','srey la','2025-05-16 10:55:52',1.25),(247,'INV247',NULL,42,5.00,'ABA','0','srey la','2025-05-16 10:56:33',2.00),(248,'INV248',NULL,1,5.00,'ABA','0','ranh','2025-05-16 11:38:57',2.00),(249,'INV249',NULL,1,3.00,'ABA','0','ranh','2025-05-16 11:42:13',1.25),(250,'INV250',NULL,1,3.00,'ABA','0','ranh','2025-05-16 11:43:02',2.00),(251,'INV251',NULL,1,5.00,'Cash','0','ranh','2025-05-16 11:43:30',2.00),(252,'INV252',NULL,1,5.00,'ABA','0','ranh','2025-05-16 11:45:18',2.00),(253,'INV253',NULL,1,3.00,'ABA','0','ranh','2025-05-16 11:45:58',2.00),(254,'INV254',NULL,1,5.00,'ABA','0','ranh','2025-05-16 11:51:02',2.00),(255,'INV255',NULL,1,3.00,'ABA','0','ranh','2025-05-16 11:51:25',2.00),(256,'INV256',NULL,1,6.00,'ABA','0','ranh','2025-05-16 11:51:55',2.00),(257,'INV257',NULL,1,5.00,'ABA','0','ranh','2025-05-16 11:52:30',2.00),(258,'INV258',NULL,1,5.00,'ABA','0','ranh','2025-05-16 11:52:53',2.00),(259,'INV259',NULL,1,10.00,'ABA','0','ranh','2025-05-16 11:56:19',7.50),(260,'INV260',NULL,1,5.00,'Cash','0','ranh','2025-05-16 16:18:07',2.00),(261,'INV261',6,1,5.00,'Cash','0','ranh','2025-05-16 16:20:06',2.00),(262,'INV262',NULL,1,5.00,'Wing','0','ranh','2025-05-16 16:24:57',2.00),(263,'INV263',NULL,1,10.00,'Cash','0','ranh','2025-05-16 16:28:47',2.00),(264,'INV264',NULL,1,5.00,'Wing','0','ranh','2025-05-16 16:30:52',1.25),(265,'INV265',NULL,1,3.00,'Wing','0','ranh','2025-05-16 16:50:12',2.00),(266,'INV266',6,1,5.00,'Cash','0','ranh','2025-05-16 16:51:13',2.00),(267,'INV267',7,1,5.00,'Cash','0','ranh','2025-05-16 16:52:29',1.25),(268,'INV268',NULL,1,2.00,'Wing','0','ranh','2025-05-16 17:02:25',2.00),(269,'INV269',6,1,5.00,'Wing','0','ranh','2025-05-16 17:04:56',2.00),(270,'INV270',7,1,6.00,'Wing','0','ranh','2025-05-16 17:06:19',2.00),(271,'INV271',4,1,5.00,'Cash','0','ranh','2025-05-16 17:07:41',2.00),(272,'INV272',4,1,2.00,'Cash','0','ranh','2025-05-16 17:08:16',1.25),(273,'INV273',NULL,1,5.00,'Wing','0','ranh','2025-05-16 17:09:48',2.00),(274,'INV274',NULL,1,2.00,'Wing','0','ranh','2025-05-16 17:10:30',2.00),(275,'INV275',NULL,1,5.00,'Wing','0','ranh','2025-05-16 17:13:30',2.00),(276,'INV276',NULL,1,5.00,'Cash','0','ranh','2025-05-16 17:17:15',1.50),(277,'INV277',NULL,1,5.00,'Cash','0','ranh','2025-05-16 17:23:24',2.00),(278,'INV278',NULL,1,5.00,'Wing','0','ranh','2025-05-16 17:27:56',2.00),(279,'INV279',6,1,5.00,'Wing','0','ranh','2025-05-16 18:15:59',2.00),(280,'INV280',7,1,3.00,'ABA','0','ranh','2025-05-16 18:19:22',1.25),(281,'INV281',6,1,3.00,'Cash','0','ranh','2025-05-16 18:23:54',1.50),(282,'INV282',NULL,1,5.00,'ABA','0','ranh','2025-05-16 18:26:12',1.25),(283,'INV283',NULL,1,3.00,'Wing','0','ranh','2025-05-16 18:29:29',1.50),(284,'INV284',NULL,1,10.00,'Cash','0','ranh','2025-05-16 18:32:54',2.00),(285,'INV285',NULL,1,20.00,'Cash','0','ranh','2025-05-16 18:37:34',1.50),(287,'INV286',NULL,1,7.00,'ABA',NULL,'ranh','2025-05-18 08:45:21',2.00),(288,'INV288',NULL,1,20.00,'Acleda','','ranh','2025-05-18 08:47:42',4.00),(289,'INV289',NULL,1,33.00,'Acleda','','ranh','2025-05-18 08:49:39',2.00),(290,'INV290',NULL,1,10.00,'Cash',NULL,'ranh','2025-05-18 08:53:41',2.00),(291,'INV291',4,1,10.00,'Wing','0','ranh','2025-05-18 08:59:00',2.00),(292,'INV292',6,1,1.00,'Cash',NULL,'ranh','2025-05-18 09:00:51',2.00),(293,'INV293',6,36,5.00,'Wing','0','vireak','2025-05-18 09:11:56',2.00),(294,'INV294',4,36,10.00,'Cash',NULL,'vireak','2025-05-18 09:13:32',1.25),(295,'INV295',6,1,5.00,'Cash','0','ranh','2025-05-18 15:57:32',2.00),(296,'INV296',4,1,5.00,'ABA','0','ranh','2025-05-18 16:01:15',2.00),(297,'INV297',4,1,10.00,'Cash','0','ranh','2025-05-18 16:02:03',8.50),(298,'INV298',7,1,5.00,'ABA','0','ranh','2025-05-18 16:04:51',2.00);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `group` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_menu` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `route_key` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'View Users','User Management','yes','user.view'),(2,'Create User','User Management','no','user.create'),(3,'Edit User','User Management','no','user.edit'),(4,'Delete User','User Management','no','user.delete'),(5,'View Roles','Role Management','yes','role.view'),(6,'Edit Role','Role Management','no','role.edit'),(7,'Access Dashboard','Dashboard','yes','dashboard.access');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
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
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (1,8,'upload_image_optional-1744737368259-84761076'),(2,16,'upload_image_optional-1744738483927-887238508'),(3,16,'upload_image_optional-1744739983683-540398848'),(4,24,'upload_image_optional-1746718701793-547226465'),(5,24,'upload_image_optional-1746718831754-85391392');
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int DEFAULT NULL,
  `barcode` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `brand` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `qty` int NOT NULL DEFAULT '0',
  `price` decimal(7,2) NOT NULL DEFAULT '0.00',
  `status` tinyint(1) DEFAULT '1',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_by` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `discount` decimal(5,2) NOT NULL DEFAULT '0.00',
  `product_type` varchar(120) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (8,17,'P011','coffee','mondolkiri','coffee',6,1.25,1,'upload_image-1747456584555-151890143','admin','2025-01-27 06:27:48',0.00,NULL),(9,14,'P012','tea','mondolkiri','soft_drink',4,2.00,1,'upload_image-1745073557495-797544134','ranh','2025-04-04 05:44:16',0.00,NULL),(12,14,'P013','green tea','arabia','hot drink',5,2.00,1,'upload_image-1745073625266-330630551','ranh','2025-04-09 16:37:32',0.00,NULL),(14,17,'P014','black_coffee','arabia','coffee',4,2.00,1,'upload_image-1745073636578-81175154','ranh','2025-04-15 15:51:50',0.00,NULL),(15,17,'P015','amazon','arabia','coffee',9,2.00,1,'upload_image-1745073658691-453329945','ranh','2025-04-15 17:19:56',0.00,NULL),(16,14,'P016','blue tea','green-tea','tea',9,1.25,1,'upload_image-1745073806980-119492351','ranh','2025-04-15 17:20:58',0.00,NULL),(19,17,'P017','amz','arabia','test',3,2.00,1,'upload_image-1745077744859-854754053','ranh','2025-04-19 15:49:04',0.00,NULL),(20,14,'P020','blue tea','green-tea','tea',5,1.50,1,'upload_image-1745726771482-61453166','dara','2025-04-27 04:06:11',0.00,NULL),(24,19,'P024','Coconut','soda','ice-coconut',4,1.50,1,'upload_image-1747041388174-513740364','ranh','2025-05-07 16:51:19',0.00,NULL),(27,17,'P025','coffee','mondolkiri','cafe',0,1.50,1,'upload_image-1747318032338-655261286','ranh','2025-05-12 04:43:29',0.00,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `permissions` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','[\"{\\\"all\\\": true}\"]','2025-04-19 18:17:02','2025-05-04 17:46:36'),(2,'Cashier','{\"pos\": true, \"product\": false}','2025-04-19 18:17:02','2025-05-19 06:14:03');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `code` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `description` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `create_by` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_type` varchar(120) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `supplier_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,NULL,'Dara','1001','0967811911','dara@gmail.com','st134','cofe','2025-05-09 13:46:38',NULL,'Americano'),(2,NULL,'Nary','1002','0967811911','borith@gmail.com','st131','cream','2025-05-09 13:49:46',NULL,'Chocolate Jelly'),(3,NULL,'Nita','1003','011811911','chandar123@gmail.com','st131','milk','2025-05-09 14:06:24',NULL,'Coffee Milk');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int DEFAULT NULL,
  `name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `create_by` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'ranh','kealranh@gmail.com','$2b$10$df5aGiBAXhh8jWvcN2iOCO9EU3kqwkoeN2VTdCW11PMgTeA3YTLqa',1,'ranh','2024-12-11 15:32:21'),(36,2,'vireak','vireak@gmail.com','$2b$10$EEZ5LlHIH/nN.7fUCc3/DugYjwGz/fP2YfSPRWpmsY.c9ZvrFp4Yu',1,'ranh','2025-04-26 18:19:27'),(42,2,'srey la','sreyla@gmail.com','$2b$10$O1Q6h0.kOHw878vtPck9zOSJqjHUwVYVG1wQ0wkSXw1vxqMLOsmhC',1,'vireak','2025-05-04 15:57:42');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'mycoffee'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-19 13:23:39
