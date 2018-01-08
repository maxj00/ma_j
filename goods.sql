/*
Navicat MySQL Data Transfer

Source Server         : ma_x
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : ma_x

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-01-08 20:23:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imgurl` varchar(255) DEFAULT NULL,
  `sale` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `category` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `color` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `add_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '商品添加时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '十月妈咪 双肩带防下垂聚拢软钢圈哺乳胸罩45130701米咖', '89.00', '../images/560635_01_01.jpg', '加9.9元可换购', '奶罩', null, '2018-01-06 10:57:30');
INSERT INTO `goods` VALUES ('2', '十月妈咪 无钢圈背心式纯棉前开扣文胸44332702杏色 ', '129.00', '../images/54b46b97f343fb8d_160X160.JPG', '犬印满99减30', '奶罩', null, '2018-01-06 10:57:36');
INSERT INTO `goods` VALUES ('3', '十月妈咪 双肩带防下垂聚拢软钢圈哺乳胸罩45130701米咖', '89.00', '../images/560635_01_01.jpg', '', '奶罩', null, '2018-01-06 12:08:00');
INSERT INTO `goods` VALUES ('4', '十月妈咪 双肩带防下垂聚拢软钢圈哺乳胸罩45130701米咖', '89.00', '../images/560635_01_01.jpg', '加9.9元可换购', '奶罩', null, '2018-01-06 10:57:30');
INSERT INTO `goods` VALUES ('5', '十月妈咪 双肩带防下垂聚拢软钢圈哺乳胸罩45130701米咖', '89.00', '../images/560635_01_01.jpg', '加9.9元可换购', '奶罩', null, '2018-01-06 10:57:30');
INSERT INTO `goods` VALUES ('6', '十月妈咪 双肩带防下垂聚拢软钢圈哺乳胸罩45130701米咖', '89.00', '../images/560635_01_01.jpg', '加9.9元可换购', '奶罩', null, '2018-01-06 10:57:30');
INSERT INTO `goods` VALUES ('7', '十月妈咪 双肩带防下垂聚拢软钢圈哺乳胸罩45130701米咖', '89.00', '../images/560635_01_01.jpg', '加9.9元可换购', '奶罩', null, '2018-01-06 10:57:30');
INSERT INTO `goods` VALUES ('8', '十月妈咪 双肩带防下垂聚拢软钢圈哺乳胸罩45130701米咖', '89.00', '../images/560635_01_01.jpg', '加9.9元可换购', '奶罩', null, '2018-01-06 10:57:30');
INSERT INTO `goods` VALUES ('9', '贝贝怡 妈咪上开扣孕哺文胸 浅粉 ', '49.00', '../images/49.jpg', '加9.9元可换购', '奶罩', null, '2018-01-08 09:32:17');
INSERT INTO `goods` VALUES ('10', '十月妈咪 双肩带防下垂聚拢软钢圈哺乳胸罩45130701米咖', '89.00', '../images/560635_01_01.jpg', '加9.9元可换购', '奶罩', null, '2018-01-06 10:57:30');
INSERT INTO `goods` VALUES ('11', '美德乐16Bravado哺乐多运动YOGA哺乳文胸500-15I3深麻灰', '299.00', '../images/299.jpg', '加9.9元可换购', '奶罩', null, '2018-01-08 09:30:43');
INSERT INTO `goods` VALUES ('12', '十月妈咪 双肩带防下垂聚拢软钢圈哺乳胸罩45130701米咖', '89.00', '../images/560635_01_01.jpg', '加9.9元可换购', '奶罩', null, '2018-01-06 10:57:30');
INSERT INTO `goods` VALUES ('13', '十月妈咪 双肩带防下垂聚拢软钢圈哺乳胸罩45130701米咖', '89.00', '../images/560635_01_01.jpg', '加9.9元可换购', '奶罩', null, '2018-01-06 10:57:30');
INSERT INTO `goods` VALUES ('14', '2018新年大促', '23.00', './images/hong.jpg', '2018新年大促', 'index', null, '2018-01-08 16:03:58');
INSERT INTO `goods` VALUES ('20', 'comotomo全硅胶奶瓶', '46.00', './images/naiping.jpg', '小奶瓶 大萌神', 'index', null, '2018-01-08 16:31:21');
INSERT INTO `goods` VALUES ('15', 'moose安全防丢绳妈妈不用担心孩子走丢 防...', '150.00', './images/sheng.jpg', '安全防丢绳妈妈不用担心孩子走丢', 'index', null, '2018-01-08 15:57:47');
INSERT INTO `goods` VALUES ('16', '2018新年大促', '23.00', './images/hong.jpg', '2018新年大促', 'index', null, '2018-01-08 16:03:58');
INSERT INTO `goods` VALUES ('17', '纳斐哺乳内衣月子服特惠专场', '59.00', './images/lolo.jpg', '纳斐哺乳内衣月子服特惠专场', 'index', null, '2018-01-08 16:13:26');
INSERT INTO `goods` VALUES ('18', '米菲用品专场', '29.00', './images/mifei.jpg', '给宝宝贴心呵护', 'index', null, '2018-01-08 16:25:09');
INSERT INTO `goods` VALUES ('19', '耐克毛毛虫童鞋2双立减15元', '269.00', './images/tongxie01.jpg', ' 耐克毛毛虫童鞋2双立减15元', 'index', null, '2018-01-08 15:48:49');
SET FOREIGN_KEY_CHECKS=1;
