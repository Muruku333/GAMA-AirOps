-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: gama_db
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aircrafts`
--

DROP TABLE IF EXISTS `aircrafts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aircrafts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(100) NOT NULL,
  `value` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aircrafts`
--

LOCK TABLES `aircrafts` WRITE;
/*!40000 ALTER TABLE `aircrafts` DISABLE KEYS */;
INSERT INTO `aircrafts` VALUES (1,'Hawker 800XP',370),(2,'Hawker 900XP',370);
/*!40000 ALTER TABLE `aircrafts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_type` int NOT NULL,
  `category_value` int NOT NULL,
  `discount` int NOT NULL,
  `duration` varchar(20) NOT NULL,
  `amount_1` decimal(15,4) NOT NULL,
  `amount_2` decimal(15,4) NOT NULL,
  `amount_3` decimal(15,4) NOT NULL,
  `amount_4` decimal(15,4) NOT NULL,
  `subTotal_1` decimal(15,4) NOT NULL,
  `subTotal_2` decimal(15,4) NOT NULL,
  `subTotal_3` decimal(15,4) NOT NULL,
  `subTotal_4` decimal(15,4) NOT NULL,
  `st_after_discount_1` decimal(15,4) NOT NULL,
  `st_after_discount_2` decimal(15,4) NOT NULL,
  `st_after_discount_3` decimal(15,4) NOT NULL,
  `st_after_discount_4` decimal(15,4) NOT NULL,
  `gst_1` decimal(15,4) NOT NULL,
  `gst_2` decimal(15,4) NOT NULL,
  `gst_3` decimal(15,4) NOT NULL,
  `gst_4` decimal(15,4) NOT NULL,
  `grandTotal_1` decimal(15,4) NOT NULL,
  `grandTotal_2` decimal(15,4) NOT NULL,
  `grandTotal_3` decimal(15,4) NOT NULL,
  `grandTotal_4` decimal(15,4) NOT NULL,
  `customer_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,3,340000,0,'4 hrs 45 mins',1800000.0000,1750000.0000,1700000.0000,0.0000,1800000.0000,1750000.0000,1700000.0000,0.0000,1800000.0000,1750000.0000,1700000.0000,0.0000,324000.0000,315000.0000,306000.0000,0.0000,2124000.0000,2065000.0000,2006000.0000,0.0000,1),(2,2,350000,0,'3 hrs 55 mins',1440000.0000,1400000.0000,1360000.0000,0.0000,1440000.0000,1400000.0000,1360000.0000,0.0000,1440000.0000,1400000.0000,1360000.0000,0.0000,259200.0000,252000.0000,244800.0000,0.0000,1699200.0000,1652000.0000,1604800.0000,0.0000,2),(3,3,340000,0,'6 hrs 7 mins',2250000.0000,2187500.0000,2125000.0000,0.0000,2250000.0000,2187500.0000,2125000.0000,0.0000,2250000.0000,2187500.0000,2125000.0000,0.0000,405000.0000,393750.0000,382500.0000,0.0000,2655000.0000,2581250.0000,2507500.0000,0.0000,3),(4,3,340000,1000,'4 hrs 6 mins',1530000.0000,1487500.0000,1445000.0000,0.0000,1531055.0000,1488555.0000,1446055.0000,1055.0000,1530055.0000,1487555.0000,1445055.0000,55.0000,275409.9000,267759.9000,260109.9000,9.9000,1805464.9000,1755314.9000,1705164.9000,64.9000,4),(5,4,700000,19000,'4 hrs 26 mins',1620000.0000,1575000.0000,1530000.0000,3150000.0000,1620165.0000,1575165.0000,1530165.0000,3150165.0000,1601165.0000,1556165.0000,1511165.0000,3131165.0000,288209.7000,280109.7000,272009.7000,563609.7000,1889374.7000,1836274.7000,1783174.7000,3694774.7000,5),(6,3,340000,322,'3 hrs 19 mins',1260000.0000,1225000.0000,1190000.0000,1244796.0000,1266661.0000,1231661.0000,1196661.0000,1251457.0000,1266339.0000,1231339.0000,1196339.0000,1251135.0000,227941.0200,221641.0200,215341.0200,225204.3000,1494280.0200,1452980.0200,1411680.0200,1476339.3000,6),(7,4,400000,1000,'3 hrs 25 mins',1350000.0000,1312500.0000,1275000.0000,1500000.0000,1350015.0000,1312515.0000,1275015.0000,1500015.0000,1349015.0000,1311515.0000,1274015.0000,1499015.0000,242822.7000,236072.7000,229322.7000,269822.7000,1591837.7000,1547587.7000,1503337.7000,1768837.7000,7),(8,2,350000,222,'3 hrs 20 mins',1260000.0000,1225000.0000,1190000.0000,1555554.0000,1260014.0000,1225014.0000,1190014.0000,1555568.0000,1259792.0000,1224792.0000,1189792.0000,1555346.0000,226762.5600,220462.5600,214162.5600,279962.2800,1486554.5600,1445254.5600,1403954.5600,1835308.2800,8);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `charge_boxes`
--

DROP TABLE IF EXISTS `charge_boxes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `charge_boxes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `value` int NOT NULL,
  `customer_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `charge_boxes_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer_details` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `charge_boxes`
--

LOCK TABLES `charge_boxes` WRITE;
/*!40000 ALTER TABLE `charge_boxes` DISABLE KEYS */;
INSERT INTO `charge_boxes` VALUES (16,'Airport Handling Charges',0,1),(17,'Crew Accomodation Charges',0,1),(18,'Ground Handling Charges',0,1),(19,'Halt Charges',0,1),(20,'Other Charges',0,1),(41,'Airport Handling Charges',1,4),(42,'Crew Accomodation Charges',232,4),(43,'Ground Handling Charges',434,4),(44,'Halt Charges',45,4),(45,'Other Charges',343,4),(46,'Airport Handling Charges',11,5),(47,'Crew Accomodation Charges',22,5),(48,'Ground Handling Charges',33,5),(49,'Halt Charges',44,5),(50,'Other Charges',55,5),(51,'Airport Handling Charges',0,3),(52,'Crew Accomodation Charges',0,3),(53,'Ground Handling Charges',0,3),(54,'Halt Charges',0,3),(55,'Other Charges',0,3),(56,'Airport Handling Charges',0,2),(57,'Crew Accomodation Charges',0,2),(58,'Ground Handling Charges',0,2),(59,'Halt Charges',0,2),(60,'Other Charges',0,2),(61,'Airport Handling Charges',121,6),(62,'Crew Accomodation Charges',233,6),(63,'Ground Handling Charges',2331,6),(64,'Halt Charges',444,6),(65,'Other Charges',3532,6),(66,'Airport Handling Charges',1,7),(67,'Crew Accomodation Charges',2,7),(68,'Ground Handling Charges',3,7),(69,'Halt Charges',4,7),(70,'Other Charges',5,7),(76,'Airport Handling Charges',1,8),(77,'Crew Accomodation Charges',3,8),(78,'Ground Handling Charges',4,8),(79,'Halt Charges',6,8),(80,'Other Charges',0,8);
/*!40000 ALTER TABLE `charge_boxes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_details`
--

DROP TABLE IF EXISTS `customer_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_details` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(100) NOT NULL,
  `trip_type` int NOT NULL,
  `aircraft_id` int NOT NULL,
  PRIMARY KEY (`customer_id`),
  KEY `aircraft_id` (`aircraft_id`),
  CONSTRAINT `customer_details_ibfk_1` FOREIGN KEY (`aircraft_id`) REFERENCES `aircrafts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_details`
--

LOCK TABLES `customer_details` WRITE;
/*!40000 ALTER TABLE `customer_details` DISABLE KEYS */;
INSERT INTO `customer_details` VALUES (1,'ddd',1,2),(2,'Murujkjkjbkjhkjkjnkjnk',1,1),(3,'mmmm',1,1),(4,'Muru',1,1),(5,'KKKKK',1,1),(6,'S',1,1),(7,'aaaaaaaaaaaa',1,1),(8,'wsdsdd',1,1);
/*!40000 ALTER TABLE `customer_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fdtl_masters_aircraft`
--

DROP TABLE IF EXISTS `fdtl_masters_aircraft`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fdtl_masters_aircraft` (
  `id` int NOT NULL AUTO_INCREMENT,
  `aircraft_id` varchar(45) NOT NULL,
  `operator_id` varchar(45) NOT NULL,
  `reg_no` varchar(45) NOT NULL,
  `model` varchar(45) NOT NULL,
  `min_cabin_crew` int DEFAULT NULL,
  `min_flight_crew` int DEFAULT NULL,
  `no_of_cabin` int DEFAULT NULL,
  `no_of_fo` int DEFAULT NULL,
  `no_of_fe` int DEFAULT NULL,
  `c_cls_capacity` int DEFAULT NULL,
  `y_cls_capacity` int DEFAULT NULL,
  `seating_capacity` int DEFAULT NULL,
  `time_formate` varchar(45) NOT NULL,
  `local_time` tinyint DEFAULT NULL,
  `utctime` tinyint DEFAULT NULL,
  `block_opening_hrs` timestamp NULL DEFAULT NULL,
  `time_in_air_opening_hrs` timestamp NULL DEFAULT NULL,
  `not_in_service` varchar(45) DEFAULT NULL,
  `not_in_service_from` date DEFAULT NULL,
  `freight_capacity` float DEFAULT NULL,
  `unit` varchar(45) DEFAULT NULL,
  `created_by` varchar(45) NOT NULL,
  `modified_by` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`aircraft_id`),
  KEY `fdtl_aircraft_1_idfk_idx` (`created_by`) /*!80000 INVISIBLE */,
  KEY `fdtl_aircraft_2_idfk_idx` (`modified_by`),
  KEY `fdtl_aircraft_3_idfk_idx` (`operator_id`),
  CONSTRAINT `fdtl_aircraft_1_idfk` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fdtl_aircraft_2_idfk` FOREIGN KEY (`modified_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fdtl_aircraft_3_idfk` FOREIGN KEY (`operator_id`) REFERENCES `fdtl_masters_operator` (`operator_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fdtl_masters_aircraft`
--

LOCK TABLES `fdtl_masters_aircraft` WRITE;
/*!40000 ALTER TABLE `fdtl_masters_aircraft` DISABLE KEYS */;
INSERT INTO `fdtl_masters_aircraft` VALUES (1,'AC-0001','OP-0001','efwe','asdfe',0,0,0,0,0,0,0,0,'UTC',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'SAPL-0001','SAPL-0001','2023-12-18 13:07:20','2023-12-18 18:37:20');
/*!40000 ALTER TABLE `fdtl_masters_aircraft` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fdtl_masters_aircraft_before_insert` BEFORE INSERT ON `fdtl_masters_aircraft` FOR EACH ROW BEGIN
    DECLARE next_increment INT;
    
    -- Find the next increment
    SET next_increment = COALESCE(
        (SELECT MAX(CAST(SUBSTRING_INDEX(`aircraft_id`, '-', -1) AS UNSIGNED)) + 1
         FROM `fdtl_masters_aircraft` 
         WHERE `aircraft_id` LIKE 'AC-%'), 1);
    
    SET NEW.`aircraft_id` = CONCAT('AC-', LPAD(next_increment, 4, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fdtl_masters_aircraft_model`
--

DROP TABLE IF EXISTS `fdtl_masters_aircraft_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fdtl_masters_aircraft_model` (
  `id` int NOT NULL AUTO_INCREMENT,
  `model_id` varchar(45) NOT NULL,
  `model_name` varchar(45) DEFAULT NULL,
  `single_engine` tinyint DEFAULT NULL,
  `wing_type` varchar(45) DEFAULT NULL,
  `created_by` varchar(45) NOT NULL,
  `modified_by` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`model_id`),
  KEY `model_list_idx` (`created_by`,`modified_by`),
  KEY `model_list_1_idx` (`modified_by`),
  CONSTRAINT `model_list_1_idx` FOREIGN KEY (`modified_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `model_list_idx` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fdtl_masters_aircraft_model`
--

LOCK TABLES `fdtl_masters_aircraft_model` WRITE;
/*!40000 ALTER TABLE `fdtl_masters_aircraft_model` DISABLE KEYS */;
INSERT INTO `fdtl_masters_aircraft_model` VALUES (38,'AM-0001','Hawker 800XP',0,'Fixed Wing','SAPL-0001','SAPL-0001','2023-12-16 07:11:23','2023-12-16 12:41:23'),(39,'AM-0002','Hawker 900XP',1,'Rotary Wing','SAPL-0001','SAPL-0001','2023-12-18 12:08:39','2023-12-18 17:38:39');
/*!40000 ALTER TABLE `fdtl_masters_aircraft_model` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fdtl_masters_aircraft_model_before_insert` BEFORE INSERT ON `fdtl_masters_aircraft_model` FOR EACH ROW BEGIN
    DECLARE next_increment INT;
    
    -- Find the next increment
    SET next_increment = COALESCE(
        (SELECT MAX(CAST(SUBSTRING_INDEX(`model_id`, '-', -1) AS UNSIGNED)) + 1
         FROM `fdtl_masters_aircraft_model`
         WHERE `model_id` LIKE 'AM-%'), 1);
    
    SET NEW.`model_id` = CONCAT('AM-', LPAD(next_increment, 4, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fdtl_masters_airport`
--

DROP TABLE IF EXISTS `fdtl_masters_airport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fdtl_masters_airport` (
  `id` varchar(45) NOT NULL,
  `airport_name` varchar(45) DEFAULT NULL,
  `iata_code` varchar(45) DEFAULT NULL,
  `iaco_code` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `longitude` varchar(45) DEFAULT NULL,
  `latitude` varchar(45) DEFAULT NULL,
  `remark` varchar(45) DEFAULT NULL,
  `critical_airport` varchar(45) DEFAULT NULL,
  `alertable_airport` varchar(45) DEFAULT NULL,
  `attachments` longblob,
  `from_time` timestamp NULL DEFAULT NULL,
  `to_time` timestamp NULL DEFAULT NULL,
  `day` varchar(45) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `modified_by` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `airport_1_idx` (`created_by`),
  KEY `airport_2_idx` (`modified_by`),
  CONSTRAINT `airport_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `airport_2` FOREIGN KEY (`modified_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fdtl_masters_airport`
--

LOCK TABLES `fdtl_masters_airport` WRITE;
/*!40000 ALTER TABLE `fdtl_masters_airport` DISABLE KEYS */;
/*!40000 ALTER TABLE `fdtl_masters_airport` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fdtl_masters_airport_before_insert` BEFORE INSERT ON `fdtl_masters_airport` FOR EACH ROW BEGIN
    DECLARE next_increment INT;
    
    -- Find the next increment
    SET next_increment = COALESCE(
        (SELECT MAX(CAST(SUBSTRING_INDEX(`id`, '-', -1) AS UNSIGNED)) + 1
         FROM `fdtl_masters_airport` 
         WHERE `id` LIKE 'Ap-%'), 1);
    
    SET NEW.`id` = CONCAT('Ap-', LPAD(next_increment, 4, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fdtl_masters_city`
--

DROP TABLE IF EXISTS `fdtl_masters_city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fdtl_masters_city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city_id` varchar(45) NOT NULL,
  `city_name` varchar(45) NOT NULL,
  `zone_id` int NOT NULL,
  `country_id` varchar(45) NOT NULL,
  `created_by` varchar(45) NOT NULL,
  `modified_by` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`city_id`),
  KEY `city_idx` (`created_by`),
  KEY `city_2_idx` (`modified_by`),
  KEY `city_3_idx` (`zone_id`),
  KEY `city_4_idx` (`country_id`),
  CONSTRAINT `city_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `city_2` FOREIGN KEY (`modified_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `city_3` FOREIGN KEY (`zone_id`) REFERENCES `fdtl_masters_zone_list` (`id`),
  CONSTRAINT `city_4` FOREIGN KEY (`country_id`) REFERENCES `fdtl_masters_country` (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fdtl_masters_city`
--

LOCK TABLES `fdtl_masters_city` WRITE;
/*!40000 ALTER TABLE `fdtl_masters_city` DISABLE KEYS */;
INSERT INTO `fdtl_masters_city` VALUES (2,'CT-0001','llkldkfm',8,'CU-0001','SAPL-0001','SAPL-0001','2023-12-19 19:01:18','2023-12-20 12:47:33');
/*!40000 ALTER TABLE `fdtl_masters_city` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fdtl_masters_city_before_insert` BEFORE INSERT ON `fdtl_masters_city` FOR EACH ROW BEGIN
    DECLARE next_increment INT;
    
    -- Find the next increment
    SET next_increment = COALESCE(
        (SELECT MAX(CAST(SUBSTRING_INDEX(`city_id`, '-', -1) AS UNSIGNED)) + 1
         FROM `fdtl_masters_city` 
         WHERE `city_id` LIKE 'CT-%'), 1);
    
    SET NEW.`city_id` = CONCAT('CT-', LPAD(next_increment, 4, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fdtl_masters_country`
--

DROP TABLE IF EXISTS `fdtl_masters_country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fdtl_masters_country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `country_id` varchar(45) NOT NULL,
  `country_name` varchar(225) DEFAULT NULL,
  `created_by` varchar(85) NOT NULL,
  `modified_by` varchar(85) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`country_id`),
  KEY `contry_name_1_idx` (`created_by`),
  KEY `contry_name_2_idx` (`modified_by`),
  KEY `country_name_3_idx` (`country_id`),
  CONSTRAINT `contry_name_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `contry_name_2` FOREIGN KEY (`modified_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fdtl_masters_country`
--

LOCK TABLES `fdtl_masters_country` WRITE;
/*!40000 ALTER TABLE `fdtl_masters_country` DISABLE KEYS */;
INSERT INTO `fdtl_masters_country` VALUES (41,'CU-0001','India','SAPL-0001','SAPL-0001','2023-12-19 12:46:27','2023-12-19 18:16:27');
/*!40000 ALTER TABLE `fdtl_masters_country` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fdtl_masters_country_before_insert` BEFORE INSERT ON `fdtl_masters_country` FOR EACH ROW BEGIN
    DECLARE next_increment INT;
    
    -- Find the next increment
    SET next_increment = COALESCE(
        (SELECT MAX(CAST(SUBSTRING_INDEX(`country_id`, '-', -1) AS UNSIGNED)) + 1
         FROM `fdtl_masters_country` 
         WHERE `country_id` LIKE 'CU-%'), 1);
    
    SET NEW.`country_id` = CONCAT('CU-', LPAD(next_increment, 4, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fdtl_masters_crew`
--

DROP TABLE IF EXISTS `fdtl_masters_crew`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fdtl_masters_crew` (
  `id` varchar(45) NOT NULL,
  `operator` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `code` varchar(45) DEFAULT NULL,
  `nationality` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `designation` varchar(45) DEFAULT NULL,
  `on_duty_as` varchar(45) DEFAULT NULL,
  `contry_code` varchar(45) DEFAULT NULL,
  `mobile_no` varchar(45) DEFAULT NULL,
  `date_of_birth` varchar(45) DEFAULT NULL,
  `date_of_joining` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `passport_no` varchar(45) DEFAULT NULL,
  `not_in_Service` tinyint DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `modified_by` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `crew_1_idx` (`created_by`),
  KEY `crew_2_idx` (`modified_by`),
  CONSTRAINT `crew_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `crew_2` FOREIGN KEY (`modified_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fdtl_masters_crew`
--

LOCK TABLES `fdtl_masters_crew` WRITE;
/*!40000 ALTER TABLE `fdtl_masters_crew` DISABLE KEYS */;
/*!40000 ALTER TABLE `fdtl_masters_crew` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fdtl_masters_crew_before_insert` BEFORE INSERT ON `fdtl_masters_crew` FOR EACH ROW BEGIN
    DECLARE next_increment INT;
    
    -- Find the next increment
    SET next_increment = COALESCE(
        (SELECT MAX(CAST(SUBSTRING_INDEX(`id`, '-', -1) AS UNSIGNED)) + 1
         FROM `fdtl_masters_crew` 
         WHERE `id` LIKE 'Cr-%'), 1);
    
    SET NEW.`id` = CONCAT('Cr-', LPAD(next_increment, 4, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fdtl_masters_crew_training_doc_master`
--

DROP TABLE IF EXISTS `fdtl_masters_crew_training_doc_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fdtl_masters_crew_training_doc_master` (
  `id` varchar(45) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `group_code` varchar(45) DEFAULT NULL,
  `warning_days` int DEFAULT NULL,
  `frequency_unit` varchar(45) DEFAULT NULL,
  `frequency` int DEFAULT NULL,
  `renewal_period` varchar(45) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `modified_by` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `crew_training_doc_master_list_idx` (`created_by`),
  KEY `crew_training_doc_master_list_1_idx` (`modified_by`),
  CONSTRAINT `crew_training_doc_master_list` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `crew_training_doc_master_list_1` FOREIGN KEY (`modified_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fdtl_masters_crew_training_doc_master`
--

LOCK TABLES `fdtl_masters_crew_training_doc_master` WRITE;
/*!40000 ALTER TABLE `fdtl_masters_crew_training_doc_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `fdtl_masters_crew_training_doc_master` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fdtl_masters_crew_training_doc_master_list_before_insert` BEFORE INSERT ON `fdtl_masters_crew_training_doc_master` FOR EACH ROW BEGIN
    DECLARE next_increment INT;
    
    -- Find the next increment
    SET next_increment = COALESCE(
        (SELECT MAX(CAST(SUBSTRING_INDEX(`id`, '-', -1) AS UNSIGNED)) + 1
         FROM `fdtl_masters_crew_training_doc_master_list` 
         WHERE `id` LIKE 'Cr_Td-%'), 1);
    
    SET NEW.`id` = CONCAT('Cr_Td-', LPAD(next_increment, 4, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fdtl_masters_delay_category`
--

DROP TABLE IF EXISTS `fdtl_masters_delay_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fdtl_masters_delay_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` varchar(45) NOT NULL,
  `category_name` varchar(45) DEFAULT NULL,
  `delay_type` varchar(45) DEFAULT NULL,
  `created_by` varchar(45) NOT NULL,
  `modified_by` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`category_id`),
  KEY `delay_category_list_idx` (`created_by`),
  KEY `delay_category_list_1_idx` (`modified_by`),
  KEY `delay_category_list_2_idx` (`category_id`),
  CONSTRAINT `delay_category_list` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `delay_category_list_1` FOREIGN KEY (`modified_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fdtl_masters_delay_category`
--

LOCK TABLES `fdtl_masters_delay_category` WRITE;
/*!40000 ALTER TABLE `fdtl_masters_delay_category` DISABLE KEYS */;
INSERT INTO `fdtl_masters_delay_category` VALUES (23,'DC-0001','Test Cat 1','Controllable','SAPL-0001','SAPL-0001','2023-12-20 04:30:09','2023-12-20 10:00:09'),(24,'DC-0002','Test Cat 2','Uncontrollable','SAPL-0001','SAPL-0001','2023-12-20 04:30:22','2023-12-20 10:00:55');
/*!40000 ALTER TABLE `fdtl_masters_delay_category` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fdtl_masters_delay_category_BEFORE_INSERT` BEFORE INSERT ON `fdtl_masters_delay_category` FOR EACH ROW BEGIN
    DECLARE next_increment INT;
    
    -- Find the next increment
    SET next_increment = COALESCE(
        (SELECT MAX(CAST(SUBSTRING_INDEX(`category_id`, '-', -1) AS UNSIGNED)) + 1
         FROM `fdtl_masters_delay_category` 
         WHERE `category_id` LIKE 'DC-%'), 1);
    
    SET NEW.`category_id` = CONCAT('DC-', LPAD(next_increment, 4, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fdtl_masters_delay_explanation`
--

DROP TABLE IF EXISTS `fdtl_masters_delay_explanation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fdtl_masters_delay_explanation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `explanation_id` varchar(45) NOT NULL,
  `explanation_name` varchar(45) NOT NULL,
  `delay_category_id` varchar(45) NOT NULL,
  `created_by` varchar(45) NOT NULL,
  `modified_by` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`explanation_id`),
  KEY `delay_explanation_1_idx` (`created_by`),
  KEY `delay_explanation_2_idx` (`modified_by`),
  KEY `delay_explanation_3_idx` (`delay_category_id`),
  CONSTRAINT `delay_explanation_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `delay_explanation_2` FOREIGN KEY (`modified_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `delay_explanation_3` FOREIGN KEY (`delay_category_id`) REFERENCES `fdtl_masters_delay_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fdtl_masters_delay_explanation`
--

LOCK TABLES `fdtl_masters_delay_explanation` WRITE;
/*!40000 ALTER TABLE `fdtl_masters_delay_explanation` DISABLE KEYS */;
INSERT INTO `fdtl_masters_delay_explanation` VALUES (12,'DE-0001','Test Exp 1','DC-0002','SAPL-0001','SAPL-0001','2023-12-20 04:31:16','2023-12-20 10:01:23');
/*!40000 ALTER TABLE `fdtl_masters_delay_explanation` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fdtl_masters_delay_explanation_BEFORE_INSERT` BEFORE INSERT ON `fdtl_masters_delay_explanation` FOR EACH ROW BEGIN
    DECLARE next_increment INT;
    
    -- Find the next increment
    SET next_increment = COALESCE(
        (SELECT MAX(CAST(SUBSTRING_INDEX(`explanation_id`, '-', -1) AS UNSIGNED)) + 1
         FROM `fdtl_masters_delay_explanation` 
         WHERE `explanation_id` LIKE 'DE-%'), 1);
    
    SET NEW.`explanation_id` = CONCAT('DE-', LPAD(next_increment, 4, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fdtl_masters_duty_status_details`
--

DROP TABLE IF EXISTS `fdtl_masters_duty_status_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fdtl_masters_duty_status_details` (
  `id` varchar(45) NOT NULL,
  `duty_status` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `from_time` timestamp NULL DEFAULT NULL,
  `to_time` timestamp NULL DEFAULT NULL,
  `utc_from_time` timestamp NULL DEFAULT NULL,
  `utc_to_time` timestamp NULL DEFAULT NULL,
  `Total_Time` timestamp NULL DEFAULT NULL,
  `on_duty_as` varchar(45) DEFAULT NULL,
  `pre_day` tinyint DEFAULT NULL,
  `next_day` tinyint DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `modified_by` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `duty_status_details_idx` (`created_by`) /*!80000 INVISIBLE */,
  KEY `duty_status_details_1_idx` (`modified_by`),
  CONSTRAINT `duty_status_details_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `duty_status_details_2` FOREIGN KEY (`modified_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fdtl_masters_duty_status_details`
--

LOCK TABLES `fdtl_masters_duty_status_details` WRITE;
/*!40000 ALTER TABLE `fdtl_masters_duty_status_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `fdtl_masters_duty_status_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fdtl_masters_duty_status_details_before_insert` BEFORE INSERT ON `fdtl_masters_duty_status_details` FOR EACH ROW BEGIN
    DECLARE next_increment INT;
    
    -- Find the next increment
    SET next_increment = COALESCE(
        (SELECT MAX(CAST(SUBSTRING_INDEX(`id`, '-', -1) AS UNSIGNED)) + 1
         FROM `fdtl_masters_duty_status_details` 
         WHERE `id` LIKE 'Dsd-%'), 1);
    
    SET NEW.`id` = CONCAT('Dsd-', LPAD(next_increment, 4, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fdtl_masters_groups`
--

DROP TABLE IF EXISTS `fdtl_masters_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fdtl_masters_groups` (
  `id` varchar(45) NOT NULL,
  `operation` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `crew` varchar(45) DEFAULT NULL,
  `on_duty_as` varchar(45) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `modified_by` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `groups_idx` (`created_by`),
  KEY `groups_1_idx` (`modified_by`),
  CONSTRAINT `groups_1_idx` FOREIGN KEY (`modified_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `groups_idx` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fdtl_masters_groups`
--

LOCK TABLES `fdtl_masters_groups` WRITE;
/*!40000 ALTER TABLE `fdtl_masters_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `fdtl_masters_groups` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fdtl_masters_groups_before_insert` BEFORE INSERT ON `fdtl_masters_groups` FOR EACH ROW BEGIN
    DECLARE next_increment INT;
    
    -- Find the next increment
    SET next_increment = COALESCE(
        (SELECT MAX(CAST(SUBSTRING_INDEX(`id`, '-', -1) AS UNSIGNED)) + 1
         FROM `fdtl_masters_groups` 
         WHERE `id` LIKE 'Grp-%'), 1);
    
    SET NEW.`id` = CONCAT('Grp-', LPAD(next_increment, 4, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fdtl_masters_hotel`
--

DROP TABLE IF EXISTS `fdtl_masters_hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fdtl_masters_hotel` (
  `id` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `phone_no` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `modified_by` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `hotel_idx` (`created_by`) /*!80000 INVISIBLE */,
  KEY `hotel_1_idx` (`modified_by`) /*!80000 INVISIBLE */,
  CONSTRAINT `hotel_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `hotel_2` FOREIGN KEY (`modified_by`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fdtl_masters_hotel`
--

LOCK TABLES `fdtl_masters_hotel` WRITE;
/*!40000 ALTER TABLE `fdtl_masters_hotel` DISABLE KEYS */;
/*!40000 ALTER TABLE `fdtl_masters_hotel` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fdtl_masters_hotel_before_insert` BEFORE INSERT ON `fdtl_masters_hotel` FOR EACH ROW BEGIN
    DECLARE next_increment INT;
    
    -- Find the next increment
    SET next_increment = COALESCE(
        (SELECT MAX(CAST(SUBSTRING_INDEX(`id`, '-', -1) AS UNSIGNED)) + 1
         FROM `fdtl_masters_hotel` 
         WHERE `id` LIKE 'Htl-%'), 1);
    
    SET NEW.`id` = CONCAT('Htl-', LPAD(next_increment, 4, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fdtl_masters_operator`
--

DROP TABLE IF EXISTS `fdtl_masters_operator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fdtl_masters_operator` (
  `id` int NOT NULL AUTO_INCREMENT,
  `operator_id` varchar(45) NOT NULL,
  `operator_name` varchar(45) NOT NULL,
  `created_by` varchar(45) NOT NULL,
  `modified_by` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`operator_id`),
  KEY `fdtl_operator_1_idfk_idx` (`created_by`) /*!80000 INVISIBLE */,
  KEY `fdtl_operator_2_idfk_idx` (`modified_by`),
  KEY `fdtl_operator_3_idfk_idx` (`operator_id`),
  CONSTRAINT `fdtl_operator_1_idfk` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fdtl_operator_2_idfk` FOREIGN KEY (`modified_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fdtl_masters_operator`
--

LOCK TABLES `fdtl_masters_operator` WRITE;
/*!40000 ALTER TABLE `fdtl_masters_operator` DISABLE KEYS */;
INSERT INTO `fdtl_masters_operator` VALUES (1,'OP-0001','Sparzana Aviation Pvt Ltd','SAPL-0001','SAPL-0001','2023-12-18 13:05:30','2023-12-18 13:05:30');
/*!40000 ALTER TABLE `fdtl_masters_operator` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fdtl_masters_operator_BEFORE_INSERT` BEFORE INSERT ON `fdtl_masters_operator` FOR EACH ROW BEGIN
    DECLARE next_increment INT;
    
    -- Find the next increment
    SET next_increment = COALESCE(
        (SELECT MAX(CAST(SUBSTRING_INDEX(`operator_id`, '-', -1) AS UNSIGNED)) + 1
         FROM `fdtl_masters_operator` 
         WHERE `operator_id` LIKE 'OP-%'), 1);
    
    SET NEW.`operator_id` = CONCAT('OP-', LPAD(next_increment, 4, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fdtl_masters_zone_list`
--

DROP TABLE IF EXISTS `fdtl_masters_zone_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fdtl_masters_zone_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `zone` varchar(255) NOT NULL,
  `gmt` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fdtl_masters_zone_list`
--

LOCK TABLES `fdtl_masters_zone_list` WRITE;
/*!40000 ALTER TABLE `fdtl_masters_zone_list` DISABLE KEYS */;
INSERT INTO `fdtl_masters_zone_list` VALUES (1,'(GMT-11:00) Midway Island, Samoa','-11:00:00'),(2,'(GMT-10:00) Hawaii','-10:00:00'),(3,'(GMT-09:00) Alaska','-09:00:00'),(4,'(GMT-08:00) Pacific Time (US & Canada)','-08:00:00'),(5,'(GMT-07:00) Mountain Time (US & Canada)','-07:00:00'),(6,'(GMT-06:00) Central Time (US & Canada), Mexico City','-06:00:00'),(7,'(GMT-05:00) Eastern Time (US & Canada), Lima','-05:00:00'),(8,'(GMT-05:00) Bogota, Panama','-05:00:00'),(9,'(GMT-04:00) Atlantic Time (Canada), La Paz, Santiago','-04:00:00'),(10,'(GMT-03:30) Newfoundland','-03:30:00'),(11,'(GMT-03:00) Brazil, Buenos Aires, Georgetown','-03:00:00'),(12,'(GMT-02:00) Mid-Atlantic','-02:00:00'),(13,'(GMT-01:00) Azores, Cape Verde Islands','-01:00:00'),(14,'(GMT 00:00) Western Europe Time, Dublin, Lisbon, London, Casablanca, Greenwich','00:00:00'),(15,'(GMT 00:00) Conakry','00:00:00'),(16,'(GMT+01:00) Douala, Cameroon','01:00:00'),(17,'(GMT+01:00) Brussels, Copenhagen, Madrid, Paris','01:00:00'),(18,'(GMT+02:00) Kaliningrad, South Africa, Cairo','02:00:00'),(19,'(GMT+03:00) Baghdad, Riyadh, Moscow, St. Petersburg, East Africa','03:00:00'),(20,'(GMT+03:30) Tehran','03:30:00'),(21,'(GMT+04:00) Abu Dhabi, Muscat, Yerevan, Baku','04:00:00'),(22,'(GMT+04:00) Tbilisi','04:00:00'),(23,'(GMT+04:30) Kabul','04:30:00'),(24,'(GMT+05:00) Ekaterinburg, Islamabad, Karachi, Tashkent','05:00:00'),(25,'(GMT+05:30) Mumbai, Kolkata, Chennai, New Delhi','05:30:00'),(26,'(GMT+05:30) Kathmandu','05:30:00'),(27,'(GMT+06:00) Almaty, Dhaka, Colombo','06:00:00'),(28,'(GMT+06:30) Yangon, Cocos Islands','06:30:00'),(29,'(GMT+07:00) Bangkok, Hanoi, Jakarta','07:00:00'),(30,'(GMT+08:00) Beijing, Perth, Singapore, Hong Kong','08:00:00'),(31,'(GMT+09:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk','09:00:00'),(32,'(GMT+09:30) Adelaide, Darwin','09:30:00'),(33,'(GMT+10:00) Eastern Australia, Guam, Vladivostok','10:00:00'),(34,'(GMT+11:00) Magadan, Solomon Islands, New Caledonia','11:00:00'),(35,'(GMT+12:00) Auckland, Wellington, Fiji, Kamchatka, Eniwetok, Kwajalein','12:00:00');
/*!40000 ALTER TABLE `fdtl_masters_zone_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'Agartala Airport (VEAT)','Agartala'),(2,'Agatti Aerodrome (VOAT)','Agatti'),(3,'Agra Airport / Agra Air Force Base (VIAG)','Agra, India'),(4,'Akola Airport (VAAK)','Akola, India'),(5,'Along Airport (VEAN)','Along, India'),(6,'Lucknow Amausi Airport (VILK)','Lucknow'),(7,'Ambala Air Force Base (VIAM)','Ambala'),(8,'Anand Arakkonam Air Force Base (VOAR)','Arakkonam'),(9,'Aurangabad Airport (VAAU)','Aurangabad'),(10,'Bagdogra Airport / Bagdogra Air Force Base (VEBD)','Bagdogra / Siliguri'),(11,'Bakshi Ka Talab Air Force Base (VIBL)','Bareilly'),(12,'Balurghat Airport (VEBG)','Balurghat'),(13,'Bamrauli Air Force Base (VIAL)','Allahabad'),(14,'Bangalore International Airport (VOBL)','Bangalore'),(15,'Bareli Airport (VIBY)','Bareli'),(16,'Behala Airport (VEBA)','Behala'),(17,'Belgaum Airport (VABM)','Belgaum'),(18,'Bellary Airport (VOBI)','Bellary'),(19,'Bhavnagar Airport (VABV)','Bhavnagar'),(20,'Bhisiana Air Force Base (VIBT)','Bhatinda'),(21,'Bhopal Airport (Bairagarh Airport) (VABP)','Bhopal'),(22,'Bhuj Airport (VABJ)','Bhuj, Gujarat, India'),(23,'Bhuntar Airport (VIBR)','Kullu / Manali'),(24,'Bidar Air Force Station (VOBR)','Bidar'),(25,'Biju Patnaik Airport (VEBS)','Bhubaneswar'),(26,'Bilaspur Airport (VABI)','Bilaspur'),(27,'Birsa Munda Airport (Ranchi Airport) (VERC)','Ranchi'),(28,'Calicut International Airport (Karipur Airport) (VOCL)','Kozhikode (Calicut)'),(29,'Car Nicobar Air Force Base (VOCX)','Car Nicobar'),(30,'Chabua Air Force Base (Jorhat Airport) (VEJT)','Jorhat'),(31,'Chakeri Air Force Station (VICX)','Kanpur'),(32,'Chakulia Airport (VECK)','Chakulia'),(33,'Chandigarh Airport (Chandigarh Air Force Base) (VICG)','Chandigarh'),(34,'Chatrapati Shivaji International Airport (VABB)','Mumbai (Bombay)'),(35,'Chennai International Airport (VOMM)','Chennai / Madras'),(36,'Cochin International Airport (Kochi) (VOCI)','Kochi / Nedumbassery'),(37,'Cochin Navy Airbase (VOCC)','Kochi'),(38,'Coimbatore Airport (VOCB)','Coimbatore'),(39,'Cooch Behar Airport (VECO)','Cooch Behar'),(40,'Cuddapah Airport (VOCP)','Cuddapah'),(41,'Dabolim Airport (VAGO) (Goa Airport) / Dabolim Navy','Dabolim'),(42,'Daman Airport (VADN)','Daman'),(43,'Daparizo Airport (VADZ)','Daparizo'),(44,'Daporijo Airport (VEDZ)','Daporijo'),(45,'Devi Ahilyabai Holkar International Airport (VAID)','Indore'),(46,'Dhanbad Airport (VEDB)','Dhanbad'),(47,'Dibrugarh Airport (VEMN) (Mohanbari Airport)','Dibrugarh'),(48,'Dimapur Airport (VEMR) (Dimapur Air Force Base)','Dimapur'),(49,'Donakonda Airport (VODK)','Donakonda'),(50,'Dr. Babasaheb Ambedkar International Airport (VANP)','Nagpur'),(51,'Dundigul Air Force Academy (VODG)','Hyderabad'),(52,'Gaggal Airport (Kangra Airport) (VIGG)','Kangra / Dharamsala'),(53,'Gaya Airport (VEGY)','Gaya'),(54,'Gorakhpur Air Force Base (VEGK)','Gorakhpur'),(55,'Guna Airport (VAGN)','Guna'),(56,'Gwalior Airport / Maharajpur Air Force Base (VIGR)','Gwalior'),(57,'Hakimpet Air Force Station (VOHK)','Secunderabad'),(58,'Hindon Air Force Base (VIDX)','Ghaziabad'),(59,'Hindustan Airport (VOBG)','Bangalore'),(60,'Hirakud Airport (VEHK)','Hirakud'),(61,'Hissar Airport (VIHR)','Hissar'),(62,'Hubli Airport (VAHB)','Hubli'),(63,'Imphal Airport (Tulihal Airport) (VEIM)','Imphal'),(64,'Indira Gandhi International Airport (VIDP)','New Delhi'),(65,'Jabalpur Airport (VAJB)','Jabalpur'),(66,'Jaipur Airport (Sanganer Airport) (VIJP)','Jaipur'),(67,'Jaisalmer Airport (VIJR)','Jaisalmer'),(68,'Jammu Airport (VIJU)','Jammu'),(69,'Jamnagar Airport / Jamnagar Air Force Base (VAJM)','Jamnagar'),(70,'Jamshedpur Airport (VEJS)','Jamshedpur'),(71,'Jeypore Airport (VEJP)','Jeypore'),(72,'Jhansi Airport (VIJN)','Jhansi'),(73,'Jharsuguda Airport (VEJH)','Jharsuguda'),(74,'Jodhpur Airport / Jodhpur Air Force Base (VIJO)','Jodhpur'),(75,'Jolly Grant Airport (VIDN)','Dehradun'),(76,'Juhu Airport (VAJJ)','Mumbai (Bombay)'),(77,'Junagadh Airport (Keshod Airport) (VAKS)','Keshod'),(78,'Kailashahar Airport (VEKR)','Kailashahar'),(79,'Kamalpur Airport (VEKM)','Kamalpur'),(80,'Kandla Airport (Gandhidham Airport) (VAKE)','Gandhidham / Kandla'),(81,'Kanpur Airport (Chakeri Airport) (VIKA)','Kanpur'),(82,'Khajuraho Airport (VIKI)','Khajuraho'),(83,'Khandwa Airport (VAKD)','Khandwa'),(84,'Khowai Airport (VEKW)','Khowai'),(85,'Kolhapur Airport (VAKP)','Kolhapur'),(86,'Kota Airport (VIKO)','Kota'),(87,'Leh Kushok Bakula Rimpochee Airport (VILH)','Leh'),(88,'Lilabari Airport (VELR)','North Lakhimpur'),(89,'Lok Nayak Jaya Prakash Narayan Airport (Patna) (VEPT)','Patna'),(90,'Lokpriya Gopinath Bordoloi International Airport (VEGT)','Guwahati'),(91,'Madurai Airport (VOMD)','Madurai'),(92,'Malda Airport (VEMH)','Malda'),(93,'Mangalore International Airport (VOML)','Mangalore'),(94,'Muzzafarpur Airport (VEMZ)','Muzzafarpur'),(95,'Mysore Airport (VOMY)','Mysore'),(96,'Nal Air Force Base (VIBK)','Bikaner'),(97,'Nanded Airport (VAND)','Nanded'),(98,'Nasik Road Airport (VANR)','Nasik'),(99,'Netaji Subhash Chandra Bose International Airport (VECC)','Kolkata (Calcutta)'),(100,'Neyvafli Airport (VONV)','Neyvafli'),(101,'Panagarh Air Force Base (VEPH)','Panagarh'),(102,'Pant Nagar Airport (Pantnagar Airport) (VIPT)','Pant Nagar / Nainital'),(103,'Pasighat Airport (VEPG)','Pasighat'),(104,'Pathankot Air Force Base (VIPK)','Pathankot'),(105,'Pondicherry Airport (VOPC)','Pondicherry'),(106,'Porbandar Airport (VAPR)','Porbandar'),(107,'Pune Airport / Lohegaon Air Force Base (VAPO)','Pune (Poona)'),(108,'Purnea Airport (VEPU)','Purnia (Purnea)'),(109,'Raipur Airport (VARP)','Raipur'),(110,'Raja Sansi International Airport (Amritsar Int\'l) (VIAR)','Amritsar'),(111,'Rajahmundry Airport (VORY)','Rajahmundry'),(112,'Rajiv Gandhi International Airport (VOHS)','Hyderabad, India'),(113,'Rajkot Airport (VARK)','Rajkot'),(114,'Ramagundam Airport (VORG)','Ramagundam'),(115,'Ratnagiri Airport (VARG)','Ratnagiri'),(116,'Raxaul Airport (VERL)','Raxaul'),(117,'Rourkela Airport (VERK)','Rourkela'),(118,'Rupsi Airport (VERU)','Rupsi'),(119,'Safdarjung Airport (Safdarjung Air Force Station) (VIDD)','New Delhi'),(120,'Sahnewal Airport (VILD)','Ludhiana'),(121,'Salem Airport (VOSM)','Salem'),(122,'Sardar Vallabhbhai Patel International Airport (VAAH)','Ahmedabad'),(123,'Satna Airport (VIST)','Satna'),(124,'Shillong Airport (Barapani Airport) (VEBI)','Shillong'),(125,'Shimla Airport (VISM)','Shimla'),(126,'Sholapur Airport (VASL)','Sholapur (Solapur)'),(127,'Silchar Airport (Kumbhirgram Air Force Base) (VEKU)','Silchar'),(128,'Sirsa Air Force Base (VIAX)','Adampur'),(129,'Sri Sathya Sai Airport (VOPN)','Puttaparthi'),(130,'Srinagar Airport / Srinagar Air Force Base (VISR)','Srinagar'),(131,'Sulur Air Force Base (VOSX)','Sulur'),(132,'Surat Airport (VASU)','Surat'),(133,'Tambaram Air Force Base (VOTX)','Chennai'),(134,'Tanjore Air Force Base (VOTJ)','Tanjore (Thanjavur)'),(135,'Tezpur Airport (Tezpur Air Force Base) (VETZ)','Tezpur'),(136,'Tezu Airport (VETJ)','Tezu'),(137,'Thiruvananthapuram International Airport (FC (VOTV)','Thiruvananthapuram'),(138,'Tiruchirapalli Airport (VOTR)','Tiruchirapalli (Trichy)'),(139,'Tirupati Airport (VOTP)','Tirupati (Tirupathi)'),(140,'Turial Air Force Base (VEAZ)','Aizwal'),(141,'Udaipur Airport (VAUD)','Udaipur'),(142,'Udhampur Air Force Base (VIUX)','Udhampur'),(143,'Uttarlai Airport (VIUT)','Uttarlai'),(144,'Vadodara Airport / Vadodara Air Force Base (VABO)','Vadodara (Baroda)'),(145,'Varanasi Airport (VIBN)','Varanasi'),(146,'Vijayawada Airport (VOBZ)','Vijayawada'),(147,'Vir Savarkar Airport (Port Blair Airport) (VOPB)','Port Blair'),(148,'Visakhapatnam Airport (VEVZ)','Visakhapatnam'),(149,'Warangal Airport (VOWA)','Warangal'),(150,'Yelahanka Air Force Station (VOYK)','Yelahanka'),(151,'Shirdi Airport (VASD)','Shirdi,  Maharashtra');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_history`
--

DROP TABLE IF EXISTS `login_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) NOT NULL,
  `login_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `logout_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `status` enum('Logged-In','Logged-Out') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `login_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_history`
--

LOCK TABLES `login_history` WRITE;
/*!40000 ALTER TABLE `login_history` DISABLE KEYS */;
INSERT INTO `login_history` VALUES (1,'SAPL-0001','2023-11-27 10:01:25',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(2,'SAPL-0001','2023-11-27 10:35:18','2023-11-27 10:37:43','Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-Out'),(3,'SAPL-0001','2023-11-27 10:42:26',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(4,'SAPL-0001','2023-11-28 04:17:59','2023-11-28 04:18:22','Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-Out'),(5,'SAPL-0003','2023-11-28 04:45:49',NULL,'Murugesh','Kumar','kumarmurugesh14032001@gmail.com','kumarmurugesh14032001@gmail.com','Logged-In'),(6,'SAPL-0001','2023-11-28 04:47:45',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(7,'SAPL-0001','2023-11-28 07:11:29',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(8,'SAPL-0001','2023-11-28 18:21:41',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(9,'SAPL-0001','2023-11-29 04:18:54',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(10,'SAPL-0001','2023-11-30 04:38:44',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(11,'SAPL-0001','2023-11-30 07:01:26',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(12,'SAPL-0001','2023-12-01 04:37:24',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(13,'SAPL-0001','2023-12-02 04:26:21','2023-12-02 04:26:32','Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-Out'),(14,'SAPL-0001','2023-12-02 04:31:13',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(15,'SAPL-0001','2023-12-06 14:13:32',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(16,'SAPL-0001','2023-12-06 14:14:39',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(17,'SAPL-0001','2023-12-06 14:21:03',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(18,'SAPL-0001','2023-12-08 04:41:55',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(19,'SAPL-0001','2023-12-08 11:40:47',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(20,'SAPL-0001','2023-12-09 04:55:35',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(21,'SAPL-0001','2023-12-09 10:11:50',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(22,'SAPL-0001','2023-12-09 10:36:55',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(23,'SAPL-0001','2023-12-12 12:34:17','2023-12-12 12:34:24','Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-Out'),(24,'SAPL-0001','2023-12-12 12:34:33','2023-12-12 12:34:48','Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-Out'),(25,'SAPL-0001','2023-12-12 12:35:47','2023-12-12 12:35:50','Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-Out'),(26,'SAPL-0001','2023-12-12 12:35:58',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(27,'SAPL-0001','2023-12-13 04:32:39','2023-12-13 04:32:45','Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-Out'),(28,'SAPL-0001','2023-12-13 04:32:54','2023-12-13 11:48:43','Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-Out'),(29,'SAPL-0001','2023-12-13 11:49:42',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(30,'SAPL-0001','2023-12-13 14:36:52','2023-12-13 14:36:56','Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-Out'),(31,'SAPL-0001','2023-12-13 14:37:47','2023-12-13 14:38:14','Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-Out'),(32,'SAPL-0001','2023-12-13 14:38:52',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(33,'SAPL-0001','2023-12-13 14:39:22',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(34,'SAPL-0001','2023-12-14 04:33:58',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(35,'SAPL-0001','2023-12-14 06:12:05',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(36,'SAPL-0001','2023-12-15 05:22:36',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(37,'SAPL-0001','2023-12-15 08:56:44',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(38,'SAPL-0001','2023-12-16 05:03:23',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(39,'SAPL-0001','2023-12-18 04:55:53',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(40,'SAPL-0001','2023-12-19 04:36:57','2023-12-19 05:26:56','Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-Out'),(41,'SAPL-0001','2023-12-19 05:27:29',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In'),(42,'SAPL-0001','2023-12-19 17:42:56',NULL,'Murugesh','Kumar','murugesh.k@refex.co.in','murugesh.k@refex.co.in','Logged-In');
/*!40000 ALTER TABLE `login_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proforma_invoice`
--

DROP TABLE IF EXISTS `proforma_invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proforma_invoice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `proforma_invoice_number` varchar(45) NOT NULL,
  `customer_name` varchar(45) NOT NULL,
  `customer_company_name` varchar(45) NOT NULL,
  `customer_address` varchar(45) NOT NULL,
  `customer_gst_no` varchar(45) NOT NULL,
  `hsn_code` varchar(45) NOT NULL,
  `aircraft_region` varchar(45) NOT NULL,
  `amount_charge_in_word` varchar(45) NOT NULL,
  `tax_amount_in_word` varchar(45) NOT NULL,
  `pi_status` varchar(45) NOT NULL,
  `quotation_no` varchar(45) NOT NULL,
  `assigned_to` varchar(45) NOT NULL,
  `created_by` varchar(45) NOT NULL,
  `modified_by` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`proforma_invoice_number`),
  KEY `proforma_invoice_ibfk_2_idx` (`assigned_to`) /*!80000 INVISIBLE */,
  KEY `proforma_invoice_ibfk_1_idx` (`quotation_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proforma_invoice`
--

LOCK TABLES `proforma_invoice` WRITE;
/*!40000 ALTER TABLE `proforma_invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `proforma_invoice` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `proforma_invoice_before_insert` BEFORE INSERT ON `proforma_invoice` FOR EACH ROW BEGIN
    DECLARE next_increment INT;
    
    -- Calculate the current year
    SET @current_year = YEAR(CURRENT_TIMESTAMP);
    
    -- Find the next increment
    SET next_increment = COALESCE(
        (SELECT MAX(SUBSTRING(`proforma_invoice_number`, LENGTH(CONCAT('PI-', @current_year, '/SAPL/VT-VPA/')) + 1)) + 1 
         FROM `proforma_invoice` 
         WHERE `proforma_invoice_number` LIKE CONCAT('PI-', @current_year, '/SAPL/VT-VPA/%')), 1);
    
    -- Generate the new proforma_invoice_number
    SET NEW.`proforma_invoice_number` = CONCAT('PI-', @current_year, '/SAPL/VT-VPA/', LPAD(next_increment, 4, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `quotations`
--

DROP TABLE IF EXISTS `quotations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quotation_no` varchar(45) NOT NULL,
  `category_id` int NOT NULL,
  `assigned_to` varchar(45) NOT NULL,
  `created_by` varchar(45) NOT NULL,
  `modified_by` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`quotation_no`),
  KEY `id_idx` (`category_id`) /*!80000 INVISIBLE */,
  KEY `foreign_key_ibk_1_idx` (`assigned_to`),
  KEY `quotations_ibfk_3_idx` (`created_by`),
  KEY `quotations_ibfk_4_idx` (`modified_by`),
  CONSTRAINT `quotations_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `quotations_ibfk_2` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`user_id`),
  CONSTRAINT `quotations_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `quotations_ibfk_4` FOREIGN KEY (`modified_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotations`
--

LOCK TABLES `quotations` WRITE;
/*!40000 ALTER TABLE `quotations` DISABLE KEYS */;
INSERT INTO `quotations` VALUES (1,'QU-2023/SAPL/VT-VPA/0001',1,'SAPL-0001','SAPL-0001','SAPL-0001','2023-10-17 12:04:50','2023-10-26 15:12:51'),(2,'QU-2023/SAPL/VT-VPA/0002',2,'SAPL-0001','SAPL-0001','SAPL-0001','2023-10-18 11:36:23','2023-10-18 17:06:23'),(3,'QU-2023/SAPL/VT-VPA/0003',3,'SAPL-0001','SAPL-0001','SAPL-0001','2023-10-18 11:51:34','2023-10-18 17:21:34'),(4,'QU-2023/SAPL/VT-VPA/0004',4,'SAPL-0001','SAPL-0001','SAPL-0001','2023-10-25 08:59:57','2023-10-25 14:29:57'),(5,'QU-2023/SAPL/VT-VPA/0005',5,'SAPL-0001','SAPL-0001','SAPL-0001','2023-10-26 05:56:58','2023-10-26 11:26:58'),(6,'QU-2023/SAPL/VT-VPA/0006',5,'SAPL-0001','SAPL-0001','SAPL-0001','2023-10-27 09:06:21','2023-10-27 14:36:21'),(7,'QU-2023/SAPL/VT-VPA/0007',4,'SAPL-0001','SAPL-0001','SAPL-0001','2023-10-27 09:06:21','2023-10-27 14:36:21'),(8,'QU-2023/SAPL/VT-VPA/0008',3,'SAPL-0001','SAPL-0001','SAPL-0001','2023-10-27 09:06:21','2023-10-27 14:36:21'),(9,'QU-2023/SAPL/VT-VPA/0009',2,'SAPL-0001','SAPL-0001','SAPL-0001','2023-10-27 09:06:21','2023-10-27 14:36:21'),(10,'QU-2023/SAPL/VT-VPA/0010',1,'SAPL-0001','SAPL-0001','SAPL-0001','2023-10-27 09:06:21','2023-10-27 14:36:21'),(11,'QU-2023/SAPL/VT-VPA/0011',3,'SAPL-0001','SAPL-0001','SAPL-0001','2023-10-27 11:50:09','2023-10-27 17:20:09'),(12,'QU-2023/SAPL/VT-VPA/0012',2,'SAPL-0001','SAPL-0001','SAPL-0001','2023-10-27 11:50:09','2023-10-27 17:20:09'),(13,'QU-2023/SAPL/VT-VPA/0013',6,'SAPL-0001','SAPL-0001','SAPL-0001','2023-10-30 08:53:26','2023-10-30 14:23:26'),(14,'QU-2023/SAPL/VT-VPA/0014',7,'SAPL-0001','SAPL-0001','SAPL-0001','2023-10-30 10:25:51','2023-10-30 15:55:51'),(15,'QU-2023/SAPL/VT-VPA/0015',8,'SAPL-0001','SAPL-0001','SAPL-0001','2023-11-03 10:54:31','2023-11-03 16:24:31');
/*!40000 ALTER TABLE `quotations` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `quotations_before_insert` BEFORE INSERT ON `quotations` FOR EACH ROW BEGIN
    DECLARE next_increment INT;
    
    -- Calculate the current year
    SET @current_year = YEAR(CURRENT_TIMESTAMP);
    
    -- Find the next increment
    SET next_increment = COALESCE(
        (SELECT MAX(SUBSTRING(`quotation_no`, LENGTH(CONCAT('QU-', @current_year, '/SAPL/VT-VPA/')) + 1)) + 1 
         FROM `quotations` 
         WHERE `quotation_no` LIKE CONCAT('QU-', @current_year, '/SAPL/VT-VPA/%')), 1);
    
    -- Generate the new proforma_invoice_number
    SET NEW.`quotation_no` = CONCAT('QU-', @current_year, '/SAPL/VT-VPA/', LPAD(next_increment, 4, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `trip_details`
--

DROP TABLE IF EXISTS `trip_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trip_details` (
  `trip_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `departure_location_id` int NOT NULL,
  `arrival_location_id` int NOT NULL,
  `pax` varchar(10) NOT NULL,
  `date_time` datetime NOT NULL,
  `duration_minutes` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`trip_id`),
  KEY `customer_id` (`customer_id`),
  KEY `departure_location_id` (`departure_location_id`),
  KEY `arrival_location_id` (`arrival_location_id`),
  CONSTRAINT `trip_details_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer_details` (`customer_id`),
  CONSTRAINT `trip_details_ibfk_2` FOREIGN KEY (`departure_location_id`) REFERENCES `locations` (`location_id`),
  CONSTRAINT `trip_details_ibfk_3` FOREIGN KEY (`arrival_location_id`) REFERENCES `locations` (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip_details`
--

LOCK TABLES `trip_details` WRITE;
/*!40000 ALTER TABLE `trip_details` DISABLE KEYS */;
INSERT INTO `trip_details` VALUES (7,1,2,4,' ','2023-10-29 07:24:00',131,765000.00),(8,1,4,1,' ','2023-10-30 02:29:00',154,935000.00),(17,4,1,3,'1','2023-10-26 23:00:00',145,850000.00),(18,4,3,27,' ','2023-10-27 19:00:00',101,595000.00),(19,5,1,2,'Ferry','2023-10-27 16:05:00',236,2800000.00),(20,5,2,2,' ','2023-10-28 02:10:00',30,350000.00),(21,3,1,2,'Ferry','2023-10-20 23:23:00',236,1360000.00),(22,3,2,4,' ','2023-10-21 23:23:00',131,765000.00),(23,2,1,3,'Ferry','2023-10-19 17:53:00',145,875000.00),(24,2,3,4,'Ferry','2023-10-20 17:53:00',90,525000.00),(25,6,1,3,'Ferry','2023-10-31 02:15:00',145,850000.00),(26,6,3,6,'Ferry','2023-11-01 01:05:00',54,340000.00),(27,7,1,3,'Ferry','2023-10-31 01:05:00',125,900000.00),(28,7,3,6,'6','2023-10-31 01:09:00',80,600000.00),(31,8,3,60,'4','2023-11-04 02:08:00',115,700000.00),(32,8,60,6,' ','2023-11-05 16:00:00',85,525000.00);
/*!40000 ALTER TABLE `trip_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(45) NOT NULL,
  `is_verified` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`user_id`),
  KEY `user_id_idx` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'SAPL-0001','Murugesh','Kumar','murugesh.k@refex.co.in','7305880787','murugesh.k@refex.co.in','$2b$10$mGqxMkhohkrRgdbHWIv2EumRPjXBt8LdXStLG8NNRYogmJ8uhTYOe','SuperAdmin',1,'2023-11-19 14:50:21','2023-11-20 05:54:22'),(2,'SAPL-0002','Dinesh','Ravi','dinesh.r@refex.co.in','9361083127','dinesh.r@refex.co.in','$2b$10$pcs41dGdFawjO7H0rwdzAOE6kXYL2mHDsuJQHnxwQ07k7xaXWLBku','SuperAdmin',1,'2023-11-19 14:50:21','2023-11-28 04:46:56'),(37,'SAPL-0003','Murugesh','Kumar','kumarmurugesh14032001@gmail.com','7305880787','kumarmurugesh14032001@gmail.com','$2b$10$saCTej10U56aQb1sPiDIvueYlMkRqSSssW./nYusLJ8YkLcesSedW','User',1,'2023-11-28 04:44:59','2023-11-28 04:45:32');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `users_before_insert` BEFORE INSERT ON `users` FOR EACH ROW BEGIN
  DECLARE next_increment INT;
  SET next_increment = COALESCE(
    (SELECT MAX(SUBSTRING(`user_id`, LENGTH('SAPL-') + 1)) + 1 
     FROM `users` 
     WHERE `user_id` LIKE 'SAPL-%'), 1);
  SET NEW.`user_id` = CONCAT('SAPL-', LPAD(next_increment, 4, '0'));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'gama_db'
--

--
-- Dumping routines for database 'gama_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-20 12:54:34
