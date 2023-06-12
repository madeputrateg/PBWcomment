-- Adminer 4.8.1 MySQL 8.0.31 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `comment` text NOT NULL,
  `time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comment` (`id`, `user_id`, `comment`, `time`) VALUES
(1,	1,	'mau gak ini ',	'2023-06-12 11:20:00'),
(2,	1,	'ini mau',	'2023-06-12 11:20:31'),
(3,	2,	'halo aku juga disini',	'2023-06-12 11:41:45'),
(4,	1,	'test bisa kah ini',	'2023-06-12 12:19:48'),
(5,	2,	'balikan ini',	'2023-06-12 12:24:33'),
(6,	2,	'halo kalean',	'2023-06-12 12:34:34'),
(7,	2,	'testini',	'2023-06-12 12:40:32'),
(8,	2,	'testssini',	'2023-06-12 12:40:47'),
(9,	2,	'halo kamu',	'2023-06-12 13:05:55'),
(10,	2,	'halo kamu',	'2023-06-12 13:06:48'),
(11,	2,	'halo kamu',	'2023-06-12 13:07:28'),
(12,	2,	'halo sskamu',	'2023-06-12 13:08:11'),
(13,	2,	'haloss sskamu',	'2023-06-12 13:08:51'),
(14,	2,	'ini comment di dalem comment',	'2023-06-12 15:55:00'),
(15,	2,	'dalem lageeee',	'2023-06-12 15:56:19');

DROP TABLE IF EXISTS `commented`;
CREATE TABLE `commented` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `comment_head` bigint NOT NULL,
  `commentor` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comment_head` (`comment_head`),
  KEY `commentor` (`commentor`),
  CONSTRAINT `commented_ibfk_1` FOREIGN KEY (`comment_head`) REFERENCES `comment` (`id`),
  CONSTRAINT `commented_ibfk_2` FOREIGN KEY (`commentor`) REFERENCES `comment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `commented` (`id`, `comment_head`, `commentor`) VALUES
(1,	1,	2),
(2,	1,	3),
(3,	4,	13),
(4,	2,	14),
(5,	2,	15);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` char(255) NOT NULL,
  `password` char(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` (`id`, `username`, `email`, `password`) VALUES
(1,	'test',	'email@email.com',	'password'),
(2,	'carol',	'carol@email.com',	'password');

-- 2023-06-12 22:55:30
