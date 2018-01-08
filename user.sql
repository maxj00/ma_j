/*
Navicat MySQL Data Transfer

Source Server         : ma_x
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : ma_x

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-01-08 20:22:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `now_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '用户创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '13660874311', '123456', '2018-01-08 19:37:49');
SET FOREIGN_KEY_CHECKS=1;
