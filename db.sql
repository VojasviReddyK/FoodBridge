/*
SQLyog Community Edition- MySQL GUI v7.15 
MySQL - 5.5.29 : Database - wpdb
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`traindb` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `traindb`;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE `admin` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE PNR (
    pnr_number VARCHAR(20) PRIMARY KEY,
    status VARCHAR(20),
    train_name VARCHAR(100),
    train_number VARCHAR(20),
    arrival_time VARCHAR(50),
    departure_time VARCHAR(50),
    source VARCHAR(100),
    destination VARCHAR(100),
    booking_time VARCHAR(50),
    quota VARCHAR(50),
    class VARCHAR(50),
    passengers VARCHAR(10),
    seat_numbers VARCHAR(100)
);

INSERT INTO PNR (pnr_number, status, train_name, train_number, arrival_time, departure_time, source, destination, booking_time, quota, class, passengers, seat_numbers) 
VALUES 
('1234567890', 'Confirmed', 'Chennai Express', '12345', '2024-06-01 08:00:00', '2024-06-01 08:30:00', 'Hyderabad', 'Chennai', '2024-05-25 05:00:00', 'General', 'AC First Class', 2, 'A1,A2'),
('8498021547', 'Confirmed', 'Rajdhani Express', '84980', '2024-06-10 12:00:00', '2024-06-10 12:10:00', 'Secunderabad', 'Delhi', '2024-06-02 04:00:00', 'Tatkal', 'Sleeper Class', 3, 'C3,C4,C5'),
('8885294294', 'Confirmed', 'Intercity Express', '88249', '2024-05-15 07:00:00', '2024-05-15 08:00:00', 'Gujarat', 'Kerela', '2024-05-07 05:00:00', 'Ladies', 'AC First Class', 4, 'A1,A2,A3,A4'),
('9346366718', 'Confirmed', 'Andhra Pradesh Sampark Kranti Express', '94361', '2024-05-05 09:30:00', '2024-05-05 09:45:00', 'Visakhapatnam Junction', 'New Delhi', '2024-04-28 05:00:00', 'Senior Citizen', 'AC Third Class', 1, 'A1'),
('7396159413', 'Confirmed', 'Dehradun Amritsar Express', '12345', '2024-06-02 11:00:00', '2024-06-02 11:30:00', 'Dehradun', 'Amritsar', '2024-05-21 04:00:00', 'General', 'Sleeper Class', 2, 'C1,C5'),
('6309318647', 'Confirmed', 'Howrah Ranchi Intercity Express', '76193', '2024-05-31 04:20:00', '2024-05-31 04:30:00', 'Howrah', 'Ranchi', '2024-05-21 04:00:00', 'General', 'AC Second Class', 3, 'B1,B5,B6'),
('6304138545', 'Confirmed', 'Hyderabad Jaipur Super Fast Express', '55343', '2024-05-18 05:00:00', '2024-05-18 05:20:00', 'Hyderabad', 'Jaipur', '2024-05-15 07:00:00', 'Tatkal', 'Executive Class', 4, 'C1,C5,C6,C7');

/*Data for the table `user` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
traindbpnr