/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `vendedores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `telefono` varchar(12) DEFAULT NULL,
  `imagen` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `propiedades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `imagen` varchar(200) DEFAULT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `habitaciones` int DEFAULT NULL,
  `wc` int DEFAULT NULL,
  `creado` date DEFAULT NULL,
  `estacionamiento` int DEFAULT NULL,
  `vendedorId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_propiedades_vendedores_idx` (`vendedorId`),
  CONSTRAINT `fk_propiedades_vendedores` FOREIGN KEY (`vendedorId`) REFERENCES `vendedores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

INSERT INTO `usuarios` (`id`, `email`, `password`) VALUES
(2, 'correo@correo.com', '$2y$10$lARuk05L89gL.C5Psk26GezxtqksZBmNmOO1BVwc/QK5mFxRGN2mW');

INSERT INTO `vendedores` (`id`, `nombre`, `apellido`, `telefono`, `imagen`) VALUES
(12, ' Juan', 'Villegas ', '11111111111', 'e9b0bb4542bf3991ebda50ef2334a235.jpg');
INSERT INTO `vendedores` (`id`, `nombre`, `apellido`, `telefono`, `imagen`) VALUES
(13, ' juan', 'fernandez', '11111111111', 'f3e67c37d33539028a471f131326f0bf.jpg');
INSERT INTO `vendedores` (`id`, `nombre`, `apellido`, `telefono`, `imagen`) VALUES
(14, 'jenifer', 'lopez', '22222222222', '33edb2eb169823485184c5ea8665bc0a.jpg');

INSERT INTO `propiedades` (`id`, `titulo`, `precio`, `imagen`, `descripcion`, `habitaciones`, `wc`, `creado`, `estacionamiento`, `vendedorId`) VALUES
(1, ' apartamento Guanare', 150000.00, '864bf9d8b16a6ee391289abaa73b55c9.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing', 3, 2, '2023-11-08', 1, 12);
INSERT INTO `propiedades` (`id`, `titulo`, `precio`, `imagen`, `descripcion`, `habitaciones`, `wc`, `creado`, `estacionamiento`, `vendedorId`) VALUES
(2, ' Casa con vista a la playa', 250000.00, 'e33ce917ae9d90caa41bf47f45041430.jpg', 'adipiscing elit. Nunc erat nisl, consectetur id fe', 2, 1, '2023-11-08', 3, 13);
INSERT INTO `propiedades` (`id`, `titulo`, `precio`, `imagen`, `descripcion`, `habitaciones`, `wc`, `creado`, `estacionamiento`, `vendedorId`) VALUES
(3, ' Casa en Pedregal', 653000.00, '126fbe6b3396d3087b41a185432fef30.jpg', 'adipiscing elit. Nunc erat nisl, consectetur id fe', 2, 3, '2023-11-08', 1, 12);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
