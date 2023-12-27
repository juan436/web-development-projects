/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `citas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `usuarioId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `citas_usuarios_idx` (`usuarioId`),
  CONSTRAINT `citas_usuarios` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `citasservicios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `citaId` int DEFAULT NULL,
  `servicioId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `citaId_idx` (`citaId`),
  KEY `servicioId_idx` (`servicioId`),
  CONSTRAINT `citasServicios_ibfk_1` FOREIGN KEY (`citaId`) REFERENCES `citas` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `citasServicios_ibfk_2` FOREIGN KEY (`servicioId`) REFERENCES `servicios` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `servicios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) DEFAULT NULL,
  `precio` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) DEFAULT NULL,
  `apellido` varchar(60) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `telefono` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  `confirmado` tinyint(1) DEFAULT NULL,
  `token` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

INSERT INTO `citas` (`id`, `fecha`, `hora`, `usuarioId`) VALUES
(1, '2023-12-29', '17:10:00', 2);


INSERT INTO `citasservicios` (`id`, `citaId`, `servicioId`) VALUES
(13, 5, 2);
INSERT INTO `citasservicios` (`id`, `citaId`, `servicioId`) VALUES
(14, 6, 5);
INSERT INTO `citasservicios` (`id`, `citaId`, `servicioId`) VALUES
(15, 7, 1);
INSERT INTO `citasservicios` (`id`, `citaId`, `servicioId`) VALUES
(16, 7, 2),
(17, 7, 3),
(18, 7, 4),
(19, 1, 1),
(20, 1, 2),
(21, 1, 4);

INSERT INTO `servicios` (`id`, `nombre`, `precio`) VALUES
(1, 'Corte Para Mujer', 15.00);
INSERT INTO `servicios` (`id`, `nombre`, `precio`) VALUES
(2, 'Corte Para Hombre', 5.00);
INSERT INTO `servicios` (`id`, `nombre`, `precio`) VALUES
(3, 'Corte Para Niño', 5.00);
INSERT INTO `servicios` (`id`, `nombre`, `precio`) VALUES
(4, 'Peinado Para Mujer', 20.00),
(5, 'Peinado Para Hombre', 10.00),
(6, 'Peinado Para Niño', 10.00),
(7, 'Corte de Barba', 2.00),
(8, 'Pintado de Cabello', 20.00),
(9, 'Uñas', 4.00),
(10, 'Lavado de Cabello', 2.00),
(11, 'Tratamiento Capilar', 20.00);

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `password`, `telefono`, `admin`, `confirmado`, `token`) VALUES
(1, ' userAdmin', 'admin', 'admin@prueba.com', '$2y$10$kVBUNVTyKIZNdqvhIEUb3.xwDgR07E/hmwdYkgVBoHwnbirg0zuNy', '01549623', 1, 1, '');
INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `password`, `telefono`, `admin`, `confirmado`, `token`) VALUES
(2, ' userStandart ', 'user', 'user@prueba.com', '$2y$10$HiyKeivj13wFPivU53RJvuj1RH2YHFnlVw5clqRJ/guVd5cDKnfuy', '045698732', 0, 1, '');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;