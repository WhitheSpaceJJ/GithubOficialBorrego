CREATE DATABASE  IF NOT EXISTS `consejeria_demandas` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `consejeria_demandas`;
-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: consejeria_demandas
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `demanda`
--

DROP TABLE IF EXISTS `demanda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `demanda` (
  `id_demanda` int NOT NULL AUTO_INCREMENT,
  `id_proceso_judicial` int DEFAULT NULL,
  `tipo_demanda` varchar(25) DEFAULT NULL,
  `descripcion_demanda` varchar(200) DEFAULT NULL,
  `fecha_demanda` date DEFAULT NULL,
  PRIMARY KEY (`id_demanda`),
  KEY `id_proceso_judicial` (`id_proceso_judicial`),
  CONSTRAINT `demanda_ibfk_1` FOREIGN KEY (`id_proceso_judicial`) REFERENCES `proceso_judicial` (`id_proceso_judicial`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `demanda`
--

LOCK TABLES `demanda` WRITE;
/*!40000 ALTER TABLE `demanda` DISABLE KEYS */;
/*!40000 ALTER TABLE `demanda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `denuncia`
--

DROP TABLE IF EXISTS `denuncia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `denuncia` (
  `id_denuncia` int NOT NULL AUTO_INCREMENT,
  `id_proceso_judicial` int DEFAULT NULL,
  `causa_penal` varchar(25) DEFAULT NULL,
  `delito` varchar(25) DEFAULT NULL,
  `modalidad` varchar(25) DEFAULT NULL,
  `hechos` varchar(25) DEFAULT NULL,
  `plazo_cierre` varchar(25) DEFAULT NULL,
  `unidad_mp` varchar(25) DEFAULT NULL,
  `estrategia` varchar(25) DEFAULT NULL,
  `id_juez` int DEFAULT NULL,
  PRIMARY KEY (`id_denuncia`),
  KEY `id_proceso_judicial` (`id_proceso_judicial`),
  KEY `id_juez` (`id_juez`),
  CONSTRAINT `denuncia_ibfk_1` FOREIGN KEY (`id_proceso_judicial`) REFERENCES `proceso_judicial` (`id_proceso_judicial`),
  CONSTRAINT `denuncia_ibfk_2` FOREIGN KEY (`id_juez`) REFERENCES `juez` (`id_juez`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `denuncia`
--

LOCK TABLES `denuncia` WRITE;
/*!40000 ALTER TABLE `denuncia` DISABLE KEYS */;
/*!40000 ALTER TABLE `denuncia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `escolaridad`
--

DROP TABLE IF EXISTS `escolaridad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `escolaridad` (
  `id_escolaridad` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_escolaridad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `escolaridad`
--

LOCK TABLES `escolaridad` WRITE;
/*!40000 ALTER TABLE `escolaridad` DISABLE KEYS */;
/*!40000 ALTER TABLE `escolaridad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_procesal`
--

DROP TABLE IF EXISTS `estado_procesal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_procesal` (
  `id_estado_procesal` int NOT NULL AUTO_INCREMENT,
  `descripcion_estado_procesal` varchar(200) DEFAULT NULL,
  `fecha_estado_procesal` date DEFAULT NULL,
  `id_proceso_judicial` int DEFAULT NULL,
  PRIMARY KEY (`id_estado_procesal`),
  KEY `id_proceso_judicial` (`id_proceso_judicial`),
  CONSTRAINT `estado_procesal_ibfk_1` FOREIGN KEY (`id_proceso_judicial`) REFERENCES `proceso_judicial` (`id_proceso_judicial`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_procesal`
--

LOCK TABLES `estado_procesal` WRITE;
/*!40000 ALTER TABLE `estado_procesal` DISABLE KEYS */;
/*!40000 ALTER TABLE `estado_procesal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etnia`
--

DROP TABLE IF EXISTS `etnia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `etnia` (
  `id_etnia` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_etnia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etnia`
--

LOCK TABLES `etnia` WRITE;
/*!40000 ALTER TABLE `etnia` DISABLE KEYS */;
/*!40000 ALTER TABLE `etnia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Imputado`
--

DROP TABLE IF EXISTS `Imputado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Imputado` (
  `id_participante` int NOT NULL,
  `delito` varchar(255) NOT NULL,
  PRIMARY KEY (`id_participante`),
  CONSTRAINT `imputado_ibfk_1` FOREIGN KEY (`id_participante`) REFERENCES `participante` (`id_participante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Imputado`
--

LOCK TABLES `Imputado` WRITE;
/*!40000 ALTER TABLE `Imputado` DISABLE KEYS */;
/*!40000 ALTER TABLE `Imputado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juez`
--

DROP TABLE IF EXISTS `juez`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `juez` (
  `id_juez` int NOT NULL AUTO_INCREMENT,
  `nombre_juez` varchar(50) NOT NULL,
  PRIMARY KEY (`id_juez`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juez`
--

LOCK TABLES `juez` WRITE;
/*!40000 ALTER TABLE `juez` DISABLE KEYS */;
/*!40000 ALTER TABLE `juez` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juzgado`
--

DROP TABLE IF EXISTS `juzgado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `juzgado` (
  `id_juzgado` int NOT NULL AUTO_INCREMENT,
  `nombre_juzgado` varchar(50) NOT NULL,
  PRIMARY KEY (`id_juzgado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juzgado`
--

LOCK TABLES `juzgado` WRITE;
/*!40000 ALTER TABLE `juzgado` DISABLE KEYS */;
/*!40000 ALTER TABLE `juzgado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ocupacion`
--

DROP TABLE IF EXISTS `ocupacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ocupacion` (
  `id_ocupacion` int NOT NULL AUTO_INCREMENT,
  `descripcion_ocupacion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_ocupacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ocupacion`
--

LOCK TABLES `ocupacion` WRITE;
/*!40000 ALTER TABLE `ocupacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `ocupacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participante`
--

DROP TABLE IF EXISTS `participante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participante` (
  `id_participante` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `edad` int DEFAULT NULL,
  `DTYPE` varchar(20) DEFAULT NULL,
  `id_escolaridad` int DEFAULT NULL,
  `id_etnia` int DEFAULT NULL,
  `id_ocupacion` int DEFAULT NULL,
  `id_persona` int NOT NULL,
  PRIMARY KEY (`id_participante`),
  UNIQUE KEY `id_persona_UNIQUE` (`id_persona`),
  KEY `id_escolaridad` (`id_escolaridad`),
  KEY `id_etnia` (`id_etnia`),
  KEY `id_ocupacion` (`id_ocupacion`),
  CONSTRAINT `participante_ibfk_1` FOREIGN KEY (`id_escolaridad`) REFERENCES `escolaridad` (`id_escolaridad`),
  CONSTRAINT `participante_ibfk_2` FOREIGN KEY (`id_etnia`) REFERENCES `etnia` (`id_etnia`),
  CONSTRAINT `participante_ibfk_3` FOREIGN KEY (`id_ocupacion`) REFERENCES `ocupacion` (`id_ocupacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participante`
--

LOCK TABLES `participante` WRITE;
/*!40000 ALTER TABLE `participante` DISABLE KEYS */;
/*!40000 ALTER TABLE `participante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proceso_judicial`
--

DROP TABLE IF EXISTS `proceso_judicial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proceso_judicial` (
  `id_proceso_judicial` int NOT NULL AUTO_INCREMENT,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_proceso` date DEFAULT NULL,
  `fecha_conclusion` date DEFAULT NULL,
  `area_seguimiento` varchar(255) DEFAULT NULL,
  `numero_expediente` varchar(25) DEFAULT NULL,
  `DTYPE` varchar(20) DEFAULT NULL,
  `id_juzgado` int DEFAULT NULL,
  PRIMARY KEY (`id_proceso_judicial`),
  KEY `id_juzgado` (`id_juzgado`),
  CONSTRAINT `proceso_judicial_ibfk_1` FOREIGN KEY (`id_juzgado`) REFERENCES `juzgado` (`id_juzgado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proceso_judicial`
--

LOCK TABLES `proceso_judicial` WRITE;
/*!40000 ALTER TABLE `proceso_judicial` DISABLE KEYS */;
/*!40000 ALTER TABLE `proceso_judicial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promovente`
--

DROP TABLE IF EXISTS `promovente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promovente` (
  `id_participante` int NOT NULL,
  `espanol` tinyint NOT NULL,
  PRIMARY KEY (`id_participante`),
  CONSTRAINT `promovente_ibfk_1` FOREIGN KEY (`id_participante`) REFERENCES `participante` (`id_participante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promovente`
--

LOCK TABLES `promovente` WRITE;
/*!40000 ALTER TABLE `promovente` DISABLE KEYS */;
/*!40000 ALTER TABLE `promovente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prueba`
--

DROP TABLE IF EXISTS `prueba`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prueba` (
  `id_prueba` int NOT NULL AUTO_INCREMENT,
  `descripcion_prueba` varchar(200) NOT NULL,
  `id_proceso_judicial` int DEFAULT NULL,
  PRIMARY KEY (`id_prueba`),
  KEY `id_proceso_judicial` (`id_proceso_judicial`),
  CONSTRAINT `prueba_ibfk_1` FOREIGN KEY (`id_proceso_judicial`) REFERENCES `proceso_judicial` (`id_proceso_judicial`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prueba`
--

LOCK TABLES `prueba` WRITE;
/*!40000 ALTER TABLE `prueba` DISABLE KEYS */;
/*!40000 ALTER TABLE `prueba` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-02 20:24:32
