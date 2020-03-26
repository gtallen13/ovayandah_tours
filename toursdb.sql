-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2020 at 05:29 AM
-- Server version: 10.1.40-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `toursdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `actividades`
--

CREATE TABLE `actividades` (
  `id` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `actividades`
--

INSERT INTO `actividades` (`id`, `nombre`) VALUES
(1, 'Snorkel'),
(2, 'Buceo'),
(3, 'Parasailing'),
(4, 'Windsurfing'),
(5, 'Nadar con delfines'),
(6, 'Canopy'),
(7, 'Jet Ski'),
(8, 'Pesca Deportiva'),
(9, 'SeaTrek'),
(10, 'Sky Swimming'),
(11, 'Visita al Zoologico'),
(12, 'ATV');

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `primer_nombre` varchar(20) NOT NULL,
  `primer_apellido` varchar(20) NOT NULL,
  `telefono` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clientes`
--

INSERT INTO `clientes` (`id`, `email`, `primer_nombre`, `primer_apellido`, `telefono`) VALUES
(123, 'jagom@gmail.com', 'Jago ', 'Morse', '(898) 790-3914'),
(124, 'bcorbett@gmail.com', 'Corbett', 'Bentley ', '(996) 311-5279'),
(125, 'MundaneGamer@gmail.com', 'Brenden ', 'Ramsey', '(334) 466-2702'),
(126, 'NextGamer@gmail.com', 'Imran ', 'Lawson', '(986) 222-6332'),
(127, 'DoubtfulGamer@gmail.com', 'Kiyan ', 'Oneill', '(676) 952-0304'),
(128, 'aWide7@gmail.com', 'Vinay ', 'Vinay ', '(299) 951-6876'),
(129, 'aGaudy7@gmail.com', 'Peyton ', 'Knox', '(691) 660-5820'),
(130, 'aMilky7@gmail.com', 'Alfie-Jay', 'Kaufman', '(478) 468-8888'),
(131, 'aDetermined7@gmail.com', 'Zara ', 'Adkins', '(687) 436-4918'),
(132, 'aDetermined73@gmail.com', 'Marek ', 'Webster', '(235) 344-5409'),
(133, 'aLame7@gmail.com', 'Emilis ', 'Serrano', '(974) 927-3356'),
(134, 'yellowBroken@yahoo.com', 'Habibah ', 'Miranda', '(312) 280-9628'),
(135, 'yellowCurly@yahoo.com', 'Zachary ', 'Martinez', '(707) 508-9874'),
(136, 'yellowWide-eyed@yahoo.com', 'Rosina ', 'Roberts', '(356) 508-8066'),
(137, 'yellowAbashed@yahoo.com', 'Lesley ', 'Beard', '(592) 437-9090'),
(138, 'leFlimsy@yahoo.com', 'Tayyab ', 'Naylor', '(421) 580-1508'),
(139, 'leSuperficial@yahoo.com', 'Ricky ', 'Mcfarlane', '(845) 572-4230'),
(140, 'leGabby@yahoo.com', 'Youssef ', 'Mcintyre', '(728) 677-5440'),
(141, 'usAblaze@yahoo.com', 'Jarrod ', 'Stanley', '(629) 288-5323'),
(142, 'usCurioussup@yahoo.comusCuriou', 'Susan ', 'Escobar', '(947) 378-8708'),
(143, 'usCalculatingsup@yahoo.com', 'Rhiannon ', 'Prosser', '(856) 772-4986'),
(144, 'usIcysup@yahoo.com', 'Neriah ', 'Bradford', '(708) 382-6475'),
(145, 'usPrevioussup@yahoo.com', 'Macauly ', 'Green', '(956) 258-4991'),
(146, 'usPushysup@yahoo.com', 'Dustin ', 'Sharples', '(731) 260-3260'),
(147, 'usEarlysup@yahoo.com', 'Duane ', 'Meyer', '(386) 726-3530'),
(148, 'artIll-fatedish@yahoo.com', 'Paloma ', 'Rivera', '(328) 346-6510'),
(149, 'artSlowish@yahoo.com', 'Kayson ', 'Vega', '(476) 655-9840'),
(150, 'artHelplessish@yahoo.com', 'Niall ', 'Lees', '(791) 868-7819'),
(151, 'artCarelessish@unicah.edu', 'Jared ', 'Macleod', '(840) 415-1050'),
(152, 'artFamiliarish@unicah.edu', 'Kiran ', 'Chamberlain', '(500) 901-7527'),
(153, 'artHandsomelyish@unicah.edu', 'Rueben ', 'Shannon', '(371) 212-5816'),
(154, 'artMushyish@unicah.edu', 'Ayaz ', 'Pope', '(461) 527-6580'),
(155, 'artMaterialish@unicah.edu', 'Izzy ', 'George', '(573) 989-5064'),
(156, 'artOptimalish@unicah.edu', 'Can ', 'Wilcox', '(986) 460-4021'),
(157, 'artOmniscientish@unicah.edu', 'Reiss ', 'Clarke', '(294) 870-0938'),
(158, 'artCrowdedish@unicah.edu', 'Kirstin ', 'Coates', '(418) 978-2014'),
(159, 'artSeriousish@unicah.edu', 'Dora ', 'Archer', '(208) 348-7831'),
(160, 'Depressedbear@unicah.edu', 'Nada ', 'Romero', '(571) 818-0314'),
(161, 'Lethalbear@unicah.edu', 'Ryley ', 'Rose', '(569) 716-3284'),
(162, 'Haplessbear@unicah.edu', 'Kiyan ', 'Mejia', '(398) 534-0255'),
(163, 'Adhocbear@unicah.edu', 'Shania ', 'Singleton', '(259) 558-2540'),
(164, 'Coolbear@unicah.edu', 'Honor ', 'Dunne', '(990) 574-9386'),
(165, 'helpfulVictoriouscrow@unicah.e', 'Mahdi ', 'Castaneda', '(723) 560-8345'),
(166, 'helpfulFullcrow@unicah.edu', 'Siobhan ', 'Gilmour', '(528) 802-5924'),
(167, 'helpfulAwarecrow@unicah.edu', 'Arron ', 'Travis', '(975) 673-2791'),
(168, 'helpfulActuallycrow123@unicah.', 'Elysia ', 'Aldred', '(537) 774-2416'),
(169, 'helpfulMadlycrow123@gmail.com', 'Shaunie ', 'Kenny', '(225) 242-2669'),
(170, 'helpfulLanguidcrow123@gmail.co', 'Marilyn ', 'Randolph', '(356) 669-7181'),
(171, 'helpfulNinecrow123@gmail.com', 'Ehsan ', 'Brewer', '(321) 321-2429'),
(172, 'helpfulHigh-pitchedcrow123@gma', 'Hanifa ', 'Guy', '(943) 829-6846'),
(173, 'helpfulGeneralcrow123@gmail.co', 'Alessandra ', 'Padilla', '(357) 900-6860'),
(174, 'helpfulDeadpancrow123@gmail.co', 'Alesha ', 'Kinney', '(993) 506-8517'),
(175, 'fireHushed89@gmail.com', 'Elize ', 'Adamson', '(773) 315-0936'),
(176, 'fireThird89@gmail.com', 'Clarice ', 'Rodriguez', '(276) 729-2399'),
(177, 'fireBig89@gmail.com', 'Lyla-Rose', 'Cornish', '(419) 253-1528'),
(178, 'fireHulking89@gmail.com', 'Ioan ', 'Sullivanx', '(381) 401-1869'),
(179, 'fireScreeching89@gmail.com', 'Annabella ', 'Dotson', '(217) 633-5054'),
(180, 'fireMoaning89@gmail.com', 'Aarush ', 'Ireland', '(921) 760-7391'),
(181, 'fireThankful89@gmail.com', 'Bonita ', 'Aguirre', '(367) 607-0502'),
(182, 'fireConscious89@gmail.com', 'Ella-Rose', 'Turnbull', '(406) 684-3040'),
(183, 'gtallpadi13@gmail.com', 'George', 'Allen', '(504) 9928-316'),
(184, 'hola12345@yahoo.com', 'Jorge', 'Paz', '(504) 9889-3445'),
(185, 'ades12343@yahoo.com', 'Israel', 'Saerio', '(504) 9554-5544'),
(186, 'prixs123823@gmail.com', 'Patricio', 'Santosis', '(504) 9445-3445'),
(187, 'gigi1223@gmail.com', 'Panfilo', 'Gonzo', '(504) 9434-6745'),
(188, 'geradt3823@gmail.com', 'Domingo', 'Mondragon', '(504) 9545-3467'),
(189, 'preciode23@gmail.com', 'Mily', 'Contreras', '(504) 9345-9445'),
(190, 'bcdff563@gmail.com', 'Herrero', 'Vaca', '(504) 9845-7644'),
(191, 'yunque43@gmail.com', 'Almen', 'Almendarez', '(504) 9445-3445'),
(192, 'tiburcis11@gmail.com', 'Andino', 'Carias', '(504) 9245-9875'),
(193, 'taerico@gmail.com', 'Josesi', 'Chicas', '(504) 8445-3345'),
(194, 'porfirio45@gmail.com', 'Porfirio', 'Sosa', '(504) 8945-3325'),
(195, 'carciotu77@gmail.com', 'Jeracito', 'Juda', '(504) 9885-3887'),
(196, 'beddrom7@gmail.com', 'Alcides', 'Castrillo', '(504) 9910-3881');

-- --------------------------------------------------------

--
-- Table structure for table `departamentos`
--

CREATE TABLE `departamentos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `departamentos`
--

INSERT INTO `departamentos` (`id`, `nombre`) VALUES
(1, 'Islas de la Bahia');

-- --------------------------------------------------------

--
-- Table structure for table `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `contra` varchar(20) NOT NULL,
  `primer_nombre` varchar(20) NOT NULL,
  `primer_apellido` varchar(20) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `email` varchar(30) NOT NULL,
  `id_posicion` int(11) NOT NULL,
  `tipo_usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `empleados`
--

INSERT INTO `empleados` (`id`, `username`, `contra`, `primer_nombre`, `primer_apellido`, `telefono`, `email`, `id_posicion`, `tipo_usuario_id`) VALUES
(1, 'gtallen13', 'rhcp90', 'George', 'Allen', '99283163', 'gtallenpadi13@gmail.com', 1, 1),
(2, 'ccnav30', 'guapo20', 'Carlos', 'Navarro', '99881731', 'carloscuadra@gmail.com', 1, 1),
(3, 'gustavoo23', 'kranox', 'Gustavo', 'Cano', '33565821', 'gustavoc23@gmail.com', 1, 1),
(4, 'jdavid7', 'jgiron', 'Jorge', 'Giron', '98716381', 'jorgegiron@gmail.com', 1, 1),
(5, 'djdavid', 'davsua20', 'David', 'Colindres', '98612713', 'davidcol@gmail.com', 1, 1),
(6, 'lball', 'yeahyah', 'Lloyd ', 'Ball', '33562512', 'lball@gmail.com', 2, 2),
(7, 'bonniem', 'pass231', 'Bonnie ', 'Marks', '99017313', 'bmarks@yahoo.com', 3, 2),
(8, 'teresa32', 'terter1', 'Teresa ', 'Bowler', '90927391', 'terebow@gmail.com', 2, 2),
(9, 'denicano', 'cano671', 'Deniz ', 'Cano', '33526255', 'denizcano@hotmail.com', 2, 2),
(10, 'tehough', 'mrlonely12', 'Teri ', 'Hough', '99081831', 'houghteri@yahoo.com', 2, 2),
(11, 'abdulerson', 'dreaming190', 'Abdullahi ', 'Dickerson', '82738103', 'abdul@yahoo.com', 2, 2),
(12, 'guslinear', 'linearequake', 'Gus ', 'Lin', '33579390', 'lingusss@outlook.com', 3, 2),
(13, 'cranaor', 'simpleton77', 'Lorna ', 'Crane', '90908989', 'lornacr@gmail.com', 3, 2),
(14, 'ownez', 'mamamia90', 'Zakariyah ', 'Owen', '34524163', 'owen59@yahoo.com', 3, 2),
(15, 'kailantrayor', 'pizzamia', 'Kailan ', 'Traynor', '89890921', 'kailanntray@yahoo.com', 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `empleados_reservaciones`
--

CREATE TABLE `empleados_reservaciones` (
  `id` int(11) NOT NULL,
  `reservacion_id` int(11) NOT NULL,
  `empleados_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `municipios`
--

CREATE TABLE `municipios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `id_departamento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `municipios`
--

INSERT INTO `municipios` (`id`, `nombre`, `id_departamento`) VALUES
(1, 'Roatan', 1),
(2, 'Jose Santos Guardiol', 1);

-- --------------------------------------------------------

--
-- Table structure for table `posiciones`
--

CREATE TABLE `posiciones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posiciones`
--

INSERT INTO `posiciones` (`id`, `nombre`) VALUES
(1, 'Administrativo'),
(2, 'Tour Guide'),
(3, 'Transportista');

-- --------------------------------------------------------

--
-- Table structure for table `reservaciones`
--

CREATE TABLE `reservaciones` (
  `id` int(11) NOT NULL,
  `fecha_inicio_tour` datetime NOT NULL,
  `fecha_final_tour` datetime NOT NULL,
  `cantidad_turistas` int(11) NOT NULL,
  `precio_total` decimal(8,2) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `id_clientes` int(11) NOT NULL,
  `tours_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reservaciones`
--

INSERT INTO `reservaciones` (`id`, `fecha_inicio_tour`, `fecha_final_tour`, `cantidad_turistas`, `precio_total`, `fecha_creacion`, `id_clientes`, `tours_id`) VALUES
(2, '2019-03-12 10:00:00', '2019-03-12 14:00:00', 2, '298.00', '2019-02-12 15:00:00', 123, 1),
(3, '2019-05-31 14:30:00', '2019-05-31 18:30:00', 10, '1490.00', '0000-00-00 00:00:00', 123, 1),
(4, '2019-04-22 15:30:00', '2019-04-22 20:30:00', 5, '745.00', '2019-04-12 22:45:42', 123, 1),
(5, '2019-12-13 10:00:00', '2019-12-13 15:30:00', 1, '149.00', '2019-12-03 01:24:25', 123, 1),
(6, '2018-09-07 08:30:00', '2018-09-07 13:50:00', 7, '2243.50', '2018-08-07 08:49:24', 123, 2),
(7, '2019-09-09 12:30:05', '2019-09-09 17:45:00', 3, '961.50', '2019-08-09 01:45:05', 123, 2),
(8, '2018-01-21 09:30:00', '2018-01-21 17:30:00', 5, '1602.50', '2018-01-15 09:34:13', 124, 2),
(9, '2018-01-21 09:30:00', '2018-01-21 12:40:12', 1, '320.50', '2018-01-19 09:34:13', 125, 2),
(10, '2019-02-05 14:40:00', '2019-02-05 19:00:00', 2, '641.00', '2019-01-02 14:47:07', 126, 2),
(11, '2019-02-05 10:00:00', '2019-02-05 14:00:00', 1, '320.50', '2019-01-05 14:47:07', 126, 2),
(12, '2019-02-05 14:47:07', '2019-02-06 12:00:00', 3, '961.50', '2019-01-05 14:47:07', 127, 2),
(13, '2019-03-07 15:00:00', '2019-03-07 20:30:00', 1, '200.35', '2019-03-01 15:00:46', 127, 3),
(14, '2019-03-10 15:00:00', '2019-03-07 18:30:00', 3, '601.50', '2019-02-07 15:13:41', 127, 3),
(15, '2020-02-18 16:00:00', '2020-02-18 20:30:00', 2, '400.70', '2020-02-09 16:27:46', 128, 3),
(16, '2019-04-24 11:30:00', '2019-04-24 18:00:00', 4, '392.34', '2019-02-10 11:29:53', 129, 4),
(17, '2020-01-02 07:30:00', '2020-01-02 10:30:00', 2, '641.00', '2020-01-02 07:30:00', 130, 2),
(18, '2020-02-02 08:30:00', '2020-02-02 09:30:00', 4, '1282.00', '2020-02-02 07:30:00', 140, 2),
(19, '2020-01-25 13:00:00', '2020-01-25 16:00:00', 1, '320.50', '2020-01-24 10:39:00', 138, 2),
(20, '2019-10-10 09:30:00', '2019-10-10 10:30:00', 1, '149.00', '2019-10-10 08:30:00', 150, 1),
(21, '2020-01-13 14:00:00', '2020-01-13 16:30:00', 2, '298.00', '2020-01-12 17:30:00', 135, 1),
(22, '2020-02-03 11:30:00', '2020-02-03 13:30:00', 3, '447.00', '2020-02-02 18:30:00', 139, 1),
(23, '2019-08-23 13:45:00', '2019-08-23 15:45:00', 9, '1341.00', '2019-08-15 13:30:00', 167, 1),
(24, '2019-09-02 09:45:00', '2019-09-02 11:45:00', 1, '130.78', '2019-09-02 08:30:00', 154, 4),
(25, '2020-01-25 08:20:00', '2020-01-25 12:00:00', 6, '784.68', '2020-01-22 15:13:00', 143, 4),
(26, '2020-03-11 09:35:00', '2020-03-11 10:45:00', 2, '641.00', '2020-03-02 17:00:00', 147, 2),
(27, '2019-11-28 13:00:00', '2019-11-28 17:00:00', 8, '726.24', '2019-11-13 15:30:00', 149, 6),
(28, '2020-01-09 09:30:00', '2020-01-09 11:30:00', 1, '125.45', '2020-01-06 09:30:00', 164, 9),
(29, '2019-04-24 11:30:00', '2019-04-24 15:00:00', 2, '400.07', '2019-02-10 11:29:53', 129, 3),
(30, '2018-03-09 07:30:00', '2018-03-09 17:00:00', 3, '632.70', '2018-02-14 14:29:53', 129, 5),
(31, '2019-03-15 08:30:00', '2019-03-15 15:00:00', 4, '443.12', '2019-02-14 14:29:53', 129, 7),
(32, '2018-03-09 07:30:00', '2018-03-09 17:00:00', 3, '632.70', '2018-02-14 14:29:53', 129, 5),
(33, '2017-05-09 08:30:00', '2017-05-09 17:00:00', 5, '1600.00', '2017-02-14 14:29:53', 129, 8),
(34, '2018-12-19 09:00:00', '2018-12-19 14:00:00', 3, '961.50', '2018-02-18 14:29:53', 129, 2),
(35, '2019-07-10 10:30:00', '2019-07-10 17:00:00', 4, '843.60', '2019-03-14 15:29:53', 129, 5),
(36, '2018-04-25 09:30:00', '2018-04-25 16:00:00', 3, '376.35', '2018-02-20 10:29:53', 129, 9),
(37, '2019-08-05 08:30:00', '2019-08-05 20:00:00', 1, '125.45', '2019-02-01 13:29:53', 129, 9),
(38, '2018-04-25 09:30:00', '2018-04-25 17:00:00', 3, '961.50', '2018-02-14 14:24:53', 178, 2),
(39, '2019-05-15 08:00:00', '2019-05-15 18:00:00', 6, '544.68', '2018-02-19 14:29:53', 185, 6),
(40, '2018-11-17 08:30:00', '2018-11-17 16:00:00', 3, '300.00', '2018-05-15 14:29:53', 139, 11),
(41, '2019-04-26 10:00:00', '2019-04-26 13:00:00', 2, '250.90', '2019-01-12 11:00:53', 150, 9),
(42, '2019-04-29 10:30:00', '2019-04-29 17:00:00', 2, '421.80', '2019-01-12 11:02:50', 150, 5),
(43, '2018-03-15 08:30:00', '2018-03-15 15:00:00', 4, '443.12', '2018-02-14 14:29:53', 153, 7),
(44, '2019-03-09 07:30:00', '2019-03-09 17:00:00', 5, '1600.00', '2019-02-14 14:29:53', 159, 8),
(45, '2020-01-09 08:30:00', '2020-01-09 17:00:00', 3, '960.00', '2017-02-14 14:29:53', 170, 8),
(46, '2019-12-19 14:00:00', '2019-12-19 18:00:00', 10, '3205.00', '2019-02-18 14:29:53', 175, 2),
(47, '2017-07-10 11:30:00', '2017-07-10 17:00:00', 6, '600.00', '2017-03-14 15:29:53', 173, 11),
(48, '2018-10-25 13:00:00', '2018-10-25 16:00:00', 15, '3163.50', '2018-09-20 10:29:53', 180, 5),
(49, '2019-06-05 10:30:00', '2019-06-05 16:00:00', 7, '2243.50', '2019-05-20 13:29:53', 182, 2),
(50, '2018-04-25 09:00:00', '2018-04-25 17:00:00', 12, '1200.00', '2018-02-14 14:24:53', 184, 11),
(51, '2018-05-15 08:00:00', '2018-05-15 18:00:00', 6, '544.68', '2018-02-19 14:29:53', 185, 6),
(52, '2019-11-17 10:30:00', '2019-11-17 16:00:00', 20, '6400.00', '2019-05-15 14:29:53', 188, 8),
(53, '2019-04-26 10:00:00', '2019-04-26 13:00:00', 2, '250.90', '2019-01-12 11:00:53', 150, 9),
(54, '2019-04-25 11:00:00', '2019-04-25 17:30:00', 6, '894.00', '2019-02-11 18:30:00', 130, 2),
(55, '2019-05-01 11:00:00', '2019-05-01 13:10:00', 8, '1046.24', '2019-02-12 15:45:00', 131, 3),
(56, '2019-05-03 09:00:00', '2019-05-03 12:50:00', 2, '641.00', '2019-02-13 17:30:40', 130, 2),
(57, '2019-05-05 08:00:00', '2019-05-05 11:50:00', 4, '698.80', '2019-02-14 15:30:40', 131, 1),
(58, '2019-05-03 09:00:00', '2019-05-03 10:50:00', 2, '642.00', '2019-02-15 14:50:40', 132, 2),
(59, '2019-05-04 07:30:00', '2019-05-04 11:50:00', 3, '961.50', '2019-02-16 10:10:40', 133, 3),
(60, '2019-05-05 14:00:00', '2019-05-05 19:10:00', 5, '1298.00', '2019-02-18 17:30:40', 134, 5),
(61, '2019-05-06 10:00:00', '2019-05-06 18:50:00', 2, '298.00', '2019-02-21 14:30:40', 135, 1),
(62, '2019-05-07 15:00:00', '2019-05-07 15:50:00', 3, '698.34', '2019-02-23 11:30:40', 136, 3),
(63, '2019-05-08 09:00:00', '2019-05-08 14:50:00', 3, '961.50', '2019-02-25 14:30:40', 137, 1),
(64, '2019-05-09 19:00:00', '2019-05-09 19:50:00', 3, '961.50', '0000-00-00 00:00:00', 138, 4),
(65, '2019-05-10 12:00:00', '2019-05-10 13:50:00', 8, '1687.20', '0000-00-00 00:00:00', 139, 4),
(66, '2019-05-17 08:00:00', '2019-05-17 13:40:00', 2, '298.00', '2019-03-01 15:30:00', 140, 1),
(67, '2019-05-18 07:00:00', '2019-05-18 15:00:00', 4, '843.60', '2019-03-09 16:00:00', 141, 2),
(68, '2019-05-19 09:40:00', '2019-05-19 13:56:00', 3, '961.50', '2019-03-10 14:00:00', 142, 5),
(69, '2019-05-20 13:00:00', '2019-05-20 17:29:00', 1, '320.50', '2019-03-10 17:59:00', 143, 2),
(70, '2019-05-21 17:00:00', '2019-05-21 19:50:00', 3, '961.50', '2019-03-13 19:59:00', 144, 4),
(71, '2019-05-23 10:40:00', '2019-05-23 11:59:00', 3, '632.70', '2019-03-14 13:30:40', 145, 2),
(72, '2019-05-22 13:00:00', '2019-05-22 14:29:00', 1, '320.50', '2019-03-10 16:59:00', 146, 3),
(73, '2019-05-28 17:00:00', '2019-05-28 19:50:00', 3, '961.50', '2019-03-13 20:00:00', 147, 2),
(74, '2019-05-24 10:00:00', '2019-05-24 13:11:00', 3, '632.70', '2019-03-14 14:30:40', 148, 3),
(75, '2019-05-25 08:00:00', '2019-05-25 17:40:00', 2, '298.00', '2019-03-01 18:30:00', 149, 1),
(76, '2019-05-26 07:00:00', '2019-05-26 13:00:00', 4, '843.60', '2019-03-09 14:59:00', 150, 3),
(77, '2019-05-27 07:00:00', '2019-05-27 16:20:00', 4, '843.60', '2019-03-09 16:30:00', 151, 2),
(78, '2020-01-01 08:50:00', '2020-01-01 13:00:00', 4, '843.60', '2019-03-10 16:50:00', 151, 1),
(79, '2020-01-03 09:20:00', '2020-01-03 16:40:00', 2, '298.00', '2019-03-14 17:30:00', 152, 3),
(80, '2020-01-05 07:00:00', '2020-01-05 12:30:00', 4, '843.60', '2019-03-15 16:00:00', 153, 1),
(81, '2020-01-08 08:40:00', '2020-01-08 16:30:00', 3, '961.50', '2019-03-17 15:00:00', 154, 4),
(82, '2020-01-10 12:00:00', '2020-01-10 13:29:00', 1, '320.50', '2019-03-20 18:59:00', 155, 1),
(83, '2020-01-11 09:00:00', '2020-01-11 14:40:00', 3, '961.50', '2019-03-21 19:39:00', 156, 2),
(84, '2020-10-26 10:00:00', '2020-10-26 13:00:00', 2, '250.90', '2019-11-12 11:00:53', 150, 9),
(85, '2020-04-29 10:30:00', '2020-04-29 17:00:00', 2, '421.80', '2020-01-12 11:02:50', 150, 5),
(86, '2020-07-15 08:30:00', '2020-07-15 15:00:00', 4, '443.12', '2020-02-14 14:29:53', 153, 7),
(87, '2020-04-09 07:30:00', '2020-04-09 17:00:00', 5, '1600.00', '2020-02-14 14:29:53', 159, 8),
(88, '2020-09-09 08:30:00', '2020-09-09 17:00:00', 3, '960.00', '2020-02-14 14:29:53', 170, 8),
(89, '2020-05-19 14:00:00', '2020-05-19 18:00:00', 10, '3205.00', '2019-12-18 14:29:53', 175, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `ID` int(11) NOT NULL,
  `nombre_tipo` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`ID`, `nombre_tipo`) VALUES
(1, 'Administrativo'),
(2, 'Empleado');

-- --------------------------------------------------------

--
-- Table structure for table `tours`
--

CREATE TABLE `tours` (
  `ID` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `precio` decimal(8,2) NOT NULL,
  `descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tours`
--

INSERT INTO `tours` (`ID`, `nombre`, `precio`, `descripcion`) VALUES
(1, 'Snorkel-Scubba', '149.00', 'Se uno con el mar y conoces sus maravillas. Haz snorkeling y scubba diving'),
(2, 'Para Ski', '320.50', 'Conoces el cielo y el mar haciendo parasailing y manejando una jet ski'),
(3, 'Skyswim & Snorkel', '200.35', 'Cae dos metros y mete al agua para hacer snorkel'),
(4, 'Zoo Day', '130.78', 'Visista a parques donde conoceras, alimentar y hasta jugar con los animales'),
(5, 'Cano Diving', '210.90', 'Haz canopy luego metete al mar para hacer scubba diving'),
(6, 'Seatreking', '90.78', 'Ponte un casco y conoce las profundidades del mar'),
(7, 'Fishing Day', '110.78', 'Tomate un dia de pesca. Atrapa pescados y luego sueltalos.'),
(8, 'Surf & Turf', '320.00', 'Disfruta del Windsurfing y luego maneja de una ATV en terrenos piedrosos'),
(9, 'ATV Day', '125.45', 'Maneja las calles en una ATV '),
(10, 'Windsurf-up', '110.90', 'Haz windsurfing en aguas cristalinas y siente la brisa en tu cara'),
(11, 'Swimming with Dolphins', '100.00', 'En un dia espectacular nada con los delfines, toma fotos y dales besos');

-- --------------------------------------------------------

--
-- Table structure for table `tours_actividades`
--

CREATE TABLE `tours_actividades` (
  `id` int(11) NOT NULL,
  `id_actividad` int(11) NOT NULL,
  `id_tour` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tours_actividades`
--

INSERT INTO `tours_actividades` (`id`, `id_actividad`, `id_tour`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 7, 2),
(4, 3, 2),
(5, 10, 3),
(6, 1, 3),
(7, 11, 4),
(8, 6, 5),
(9, 2, 5),
(10, 9, 6),
(11, 8, 7),
(12, 4, 8),
(13, 12, 8),
(14, 12, 9),
(15, 4, 10),
(16, 5, 11);

-- --------------------------------------------------------

--
-- Table structure for table `tours_ubicaciones`
--

CREATE TABLE `tours_ubicaciones` (
  `id` int(11) NOT NULL,
  `id_tours` int(11) NOT NULL,
  `id_ubicaciones` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tours_ubicaciones`
--

INSERT INTO `tours_ubicaciones` (`id`, `id_tours`, `id_ubicaciones`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 2, 5),
(5, 3, 8),
(6, 4, 9),
(7, 4, 11),
(8, 5, 16),
(9, 5, 8),
(10, 6, 10),
(11, 7, 5),
(12, 8, 6),
(13, 8, 16),
(14, 9, 16),
(15, 10, 12),
(16, 11, 5);

-- --------------------------------------------------------

--
-- Table structure for table `ubicaciones`
--

CREATE TABLE `ubicaciones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `id_municipio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ubicaciones`
--

INSERT INTO `ubicaciones` (`id`, `nombre`, `id_municipio`) VALUES
(1, 'Bananarama', 1),
(2, 'Henry Morgan', 1),
(3, 'Mayan Princess', 1),
(4, 'Infinity Bay', 1),
(5, 'Anthony\'s Key', 1),
(6, 'Foster\'s', 1),
(7, 'Grand Hotel Roatan', 1),
(8, 'Tabyana', 1),
(9, 'Little French Key', 1),
(10, 'Bucaneer', 1),
(11, 'Iguana Farm', 1),
(12, 'Media Luna Resort', 2),
(13, 'Frank\'s Hideaway', 1),
(14, 'Beacher\'s', 1),
(15, 'Pristine Bay', 1),
(16, 'Gumbalimba Park', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `departamentos`
--
ALTER TABLE `departamentos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`,`email`),
  ADD KEY `tipo_usuario_id` (`tipo_usuario_id`),
  ADD KEY `id_posicion` (`id_posicion`);

--
-- Indexes for table `empleados_reservaciones`
--
ALTER TABLE `empleados_reservaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservacion_id` (`reservacion_id`),
  ADD KEY `empleados_id` (`empleados_id`);

--
-- Indexes for table `municipios`
--
ALTER TABLE `municipios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_departamento` (`id_departamento`);

--
-- Indexes for table `posiciones`
--
ALTER TABLE `posiciones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservaciones`
--
ALTER TABLE `reservaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tours_id` (`tours_id`),
  ADD KEY `id_clientes` (`id_clientes`);

--
-- Indexes for table `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tours`
--
ALTER TABLE `tours`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tours_actividades`
--
ALTER TABLE `tours_actividades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_actividad` (`id_actividad`),
  ADD KEY `id_tour` (`id_tour`);

--
-- Indexes for table `tours_ubicaciones`
--
ALTER TABLE `tours_ubicaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tours` (`id_tours`),
  ADD KEY `id_ubicaciones` (`id_ubicaciones`);

--
-- Indexes for table `ubicaciones`
--
ALTER TABLE `ubicaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_municipio` (`id_municipio`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actividades`
--
ALTER TABLE `actividades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=197;

--
-- AUTO_INCREMENT for table `departamentos`
--
ALTER TABLE `departamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `empleados_reservaciones`
--
ALTER TABLE `empleados_reservaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `municipios`
--
ALTER TABLE `municipios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `posiciones`
--
ALTER TABLE `posiciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reservaciones`
--
ALTER TABLE `reservaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tours`
--
ALTER TABLE `tours`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tours_actividades`
--
ALTER TABLE `tours_actividades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tours_ubicaciones`
--
ALTER TABLE `tours_ubicaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `ubicaciones`
--
ALTER TABLE `ubicaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`tipo_usuario_id`) REFERENCES `tipo_usuario` (`ID`),
  ADD CONSTRAINT `empleados_ibfk_2` FOREIGN KEY (`id_posicion`) REFERENCES `posiciones` (`id`);

--
-- Constraints for table `empleados_reservaciones`
--
ALTER TABLE `empleados_reservaciones`
  ADD CONSTRAINT `empleados_reservaciones_ibfk_1` FOREIGN KEY (`reservacion_id`) REFERENCES `reservaciones` (`id`),
  ADD CONSTRAINT `empleados_reservaciones_ibfk_2` FOREIGN KEY (`empleados_id`) REFERENCES `empleados` (`id`);

--
-- Constraints for table `municipios`
--
ALTER TABLE `municipios`
  ADD CONSTRAINT `municipios_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id`);

--
-- Constraints for table `reservaciones`
--
ALTER TABLE `reservaciones`
  ADD CONSTRAINT `reservaciones_ibfk_1` FOREIGN KEY (`tours_id`) REFERENCES `tours` (`ID`),
  ADD CONSTRAINT `reservaciones_ibfk_2` FOREIGN KEY (`id_clientes`) REFERENCES `clientes` (`id`);

--
-- Constraints for table `tours_actividades`
--
ALTER TABLE `tours_actividades`
  ADD CONSTRAINT `tours_actividades_ibfk_1` FOREIGN KEY (`id_actividad`) REFERENCES `actividades` (`id`),
  ADD CONSTRAINT `tours_actividades_ibfk_2` FOREIGN KEY (`id_tour`) REFERENCES `tours` (`ID`);

--
-- Constraints for table `tours_ubicaciones`
--
ALTER TABLE `tours_ubicaciones`
  ADD CONSTRAINT `tours_ubicaciones_ibfk_1` FOREIGN KEY (`id_tours`) REFERENCES `tours` (`ID`),
  ADD CONSTRAINT `tours_ubicaciones_ibfk_2` FOREIGN KEY (`id_ubicaciones`) REFERENCES `ubicaciones` (`id`);

--
-- Constraints for table `ubicaciones`
--
ALTER TABLE `ubicaciones`
  ADD CONSTRAINT `ubicaciones_ibfk_1` FOREIGN KEY (`id_municipio`) REFERENCES `municipios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
