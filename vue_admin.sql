CREATE DATABASE  IF NOT EXISTS `school` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `school`;
/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : localhost:3306
 Source Schema         : school

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : 65001

 Date: 07/05/2021 07:26:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '活动id',
  `creator` int(11) NULL DEFAULT NULL COMMENT '活动创建人',
  `club_id` int(11) NULL DEFAULT NULL COMMENT '活动所属社团id',
  `name` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '活动名称',
  `info` varchar(300) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '活动介绍',
  `create_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '活动发布时间',
  `start_time` timestamp(0) NULL DEFAULT NULL COMMENT '活动结束时间',
  `end_time` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '活动' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activity
-- ----------------------------
INSERT INTO `activity` VALUES (4, 7, 0, '13', '123', '2021-05-07 07:08:27', '2021-05-07 07:08:22', '2021-05-07 07:08:24');

-- ----------------------------
-- Table structure for club
-- ----------------------------
DROP TABLE IF EXISTS `club`;
CREATE TABLE `club`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '社团id',
  `name` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '社团名称',
  `info` varchar(300) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '社团介绍',
  `status` int(2) NULL DEFAULT NULL COMMENT '状态，0表示审核中，1表示审核通过，2表示审核失败',
  `count` int(11) NULL DEFAULT NULL COMMENT '社团人数',
  `create_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `creator` int(11) NULL DEFAULT NULL COMMENT '社团创建人id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '社团' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of club
-- ----------------------------
INSERT INTO `club` VALUES (7, '1', '12', 0, 10, '2021-05-07 06:41:37', 6);

-- ----------------------------
-- Table structure for club_user
-- ----------------------------
DROP TABLE IF EXISTS `club_user`;
CREATE TABLE `club_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `club_id` int(11) NULL DEFAULT NULL COMMENT '社团id',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '社团成员id',
  `status` int(2) NULL DEFAULT NULL COMMENT '状态，0表示审核中，1表示审核通过，2表示审核失败',
  `create_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '加入社团时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '社团参与人员信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of club_user
-- ----------------------------
INSERT INTO `club_user` VALUES (2, 7, 8, 0, '2021-05-07 06:44:05');
INSERT INTO `club_user` VALUES (3, 7, 10, 0, '2021-05-07 07:09:39');
INSERT INTO `club_user` VALUES (5, 7, 11, 0, '2021-05-07 07:22:26');

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '课程名称',
  `user_id` int(11) NOT NULL COMMENT '老师id',
  `course_time` datetime(0) NOT NULL COMMENT '上课时间',
  `year` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '年份',
  `week_no` int(11) NOT NULL COMMENT '第几周',
  `week` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '星期几',
  `create_time` datetime(0) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------

-- ----------------------------
-- Table structure for leave
-- ----------------------------
DROP TABLE IF EXISTS `leave`;
CREATE TABLE `leave`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '学生id',
  `status` int(11) NOT NULL COMMENT '状态，状态，0表示审核中，1表示审核通过，2表示审核失败',
  `reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '请假原因',
  `create_time` datetime(0) NOT NULL COMMENT '请假时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of leave
-- ----------------------------

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_name` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '账号',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '密码',
  `type` int(2) NULL DEFAULT NULL COMMENT '类型，0表示管理员，1表示教师，2表示会员',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '图片',
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '联系方式',
  `create_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_name_UNIQUE`(`user_name`) USING BTREE,
  UNIQUE INDEX `user_id_UNIQUE`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '用户信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES (6, '2', '$2a$10$HKF4jj/Miu/86KH8cu73n./ElD0yQis1fFd82/4VsvBIAWzdo09Cm', 1, NULL, NULL, '2021-05-07 05:21:04', '2021-05-07 06:27:51');
INSERT INTO `user_info` VALUES (7, '3', '$2a$10$9BjP5DhoUcblYLubf2MOne3l/MxH.oZYXg9S9oVV8Kd.54Waa/UsK', 0, NULL, NULL, '2021-05-07 05:21:09', '2021-05-07 05:21:09');
INSERT INTO `user_info` VALUES (8, '1', '$2a$10$k4gx4R7GOutDlc5wiOo2R.hWIuY6LlgC.kFmn8cE99Li7xAqeHzOq', 2, NULL, NULL, '2021-05-07 06:31:44', '2021-05-07 06:31:44');
INSERT INTO `user_info` VALUES (9, '4', '$2a$10$4bbJo9mEnUwgh3BO15KDpevvEJAFWbjw8x.rtDD56O7hH0mNUqw2e', 2, NULL, NULL, '2021-05-07 06:51:38', '2021-05-07 06:51:38');
INSERT INTO `user_info` VALUES (10, '5', '$2a$10$n2NHtNWkS3xnjezWqoV/oO9W1wpuZw9.XaX6rOzB1m12ITpf6tkbO', 2, NULL, NULL, '2021-05-07 07:09:23', '2021-05-07 07:09:23');
INSERT INTO `user_info` VALUES (11, '6', '$2a$10$.WK3RTF7DG5Sf8xU6qNOw.MiU4pK.vhAjn8RbS0RqandIEfx.o0Za', 2, NULL, NULL, '2021-05-07 07:20:41', '2021-05-07 07:20:41');

-- ----------------------------
-- Table structure for word
-- ----------------------------
DROP TABLE IF EXISTS `word`;
CREATE TABLE `word`  (
  `word_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '留言id',
  `context` varchar(300) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '留言内容',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '留言用户id',
  `create_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '留言发布时间',
  PRIMARY KEY (`word_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '留言板' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of word
-- ----------------------------
INSERT INTO `word` VALUES (3, '1', 7, '2021-05-07 05:25:21');
INSERT INTO `word` VALUES (4, '1231', 8, '2021-05-07 07:01:21');
INSERT INTO `word` VALUES (5, '5675', 10, '2021-05-07 07:10:09');
INSERT INTO `word` VALUES (6, '131', 6, '2021-05-07 07:12:22');
INSERT INTO `word` VALUES (10, '456', 6, '2021-05-07 07:12:33');
INSERT INTO `word` VALUES (11, '213', 6, '2021-05-07 07:13:35');
INSERT INTO `word` VALUES (12, '777', 6, '2021-05-07 07:13:56');

SET FOREIGN_KEY_CHECKS = 1;
