-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: movies_db
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `movies_catalogue`
--

DROP TABLE IF EXISTS `movies_catalogue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies_catalogue` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `year` year NOT NULL,
  `genre` varchar(45) NOT NULL,
  `main_actor` varchar(45) NOT NULL,
  `director` varchar(45) NOT NULL,
  `awards` varchar(45) DEFAULT NULL,
  `length` int NOT NULL,
  `rating` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies_catalogue`
--

LOCK TABLES `movies_catalogue` WRITE;
/*!40000 ALTER TABLE `movies_catalogue` DISABLE KEYS */;
INSERT INTO `movies_catalogue` VALUES (1,'El Padrino',1972,'Crimen','Marlon Brando','Francis Ford Coppola','Oscar a la Mejor Película',175,9.2),(2,'Origen',2010,'Ciencia ficción','Leonardo DiCaprio','Christopher Nolan','Oscar a los Mejores Efectos Visuales',148,8.8),(3,'Parásitos',2019,'Drama','Song Kang-Ho','Bong Joon-Ho','Oscar a la Mejor Película',132,8.6),(4,'Pulp Fiction',1994,'Crimen','John Travolta','Quentin Tarantino','Palma de Oro en el Festival de Cannes',154,8.9),(5,'Cadena Perpetua',1994,'Drama','Tim Robbins','Frank Darabont','Nominación al Oscar a Mejor Película',142,9.3);
/*!40000 ALTER TABLE `movies_catalogue` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-27 19:41:30
