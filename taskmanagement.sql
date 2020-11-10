-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: taskmanagement
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (11,'ANKUR KUMAR','ankur@gmail.com','Admin','$2b$10$O..g/pSJzj9ZE.rr7oxe3ewyV1DdEuchuLQL6JkuFjUKECefWTIrq'),(12,'SHYAM KUMAR','shyam@gmail.com','Admin','$2b$10$B2T53QGYB7XxXeiavv1b3e7e7CdR01zs5FCVrM5xSqHJPJiTTbLCa'),(19,'dhananjay','dh12@gmail.com','developer','$2b$10$xPRhUG.c2FGbDo5lLIvdxeaRwbIHJlw4HUsxHQxxSOA/zZnwcydwO'),(20,'Dhanjay','dh1234@gmail.com','manager','$2b$10$AThECzgDF/u90RaWexAiF.ZZDj8Xvrz.BHBhZklHlX89KHp0mJVyK');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,11,'Utiliko','Business automation1',3,'2020-11-09 10:58:04','2020-11-10 10:36:30',0),(3,11,'MilagroCorp','Retail automation',3,'2020-11-09 11:11:56','2020-11-09 11:30:59',0),(4,12,'Style','Test',20,'2020-11-10 09:56:40','2020-11-10 11:07:33',0),(5,12,'Testing','Tested',20,'2020-11-10 10:34:13','2020-11-10 11:09:01',1);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (2,12,0,'Video Calling','Able to video call contacts',1,1,'2020-11-10 12:12:25','2020-11-10 12:35:28',0),(3,20,0,'test task','testing task',0,19,'2020-11-10 12:24:40','2020-11-10 12:24:40',0);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-10 13:34:30
