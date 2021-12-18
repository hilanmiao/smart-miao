/*
 Navicat Premium Data Transfer

 Source Server         : 腾讯云轻量服务器
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : 81.70.194.45:3306
 Source Schema         : smartmiao

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 18/12/2021 10:21:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for notification
-- ----------------------------
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `content` text COMMENT '内容',
  `type` enum('1','2') DEFAULT '1' COMMENT '发送类型：1单用户 2全体用户',
  `recipient_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '接受通知的用户Id',
  `manager_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '发布通知的管理员Id',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='消息通知表';

-- ----------------------------
-- Records of notification
-- ----------------------------
BEGIN;
INSERT INTO `notification` VALUES ('27d35bf6-0a92-4d50-87b5-2774ee0a1383', '999', '99', '1', '85dd811f-d50b-4083-8981-ae11b4694d32', '1', '999', '2021-12-13 17:18:42', '2021-12-13 17:18:42', NULL);
INSERT INTO `notification` VALUES ('281457d5-45e7-44e6-a6b4-b8ad3a5735a2', '1', '1', '2', '1', '1', '1', '2021-12-12 17:17:10', '2021-12-12 17:19:47', '2021-12-12 17:19:47');
INSERT INTO `notification` VALUES ('5d102c26-9460-4515-94e0-61b065af9125', '12', '2', '1', '1', '1', '2', '2021-12-12 17:20:07', '2021-12-12 17:20:20', NULL);
INSERT INTO `notification` VALUES ('74eb5754-1b32-4f51-b101-939c5179f97a', '333', '', '2', NULL, '1', '', '2021-12-14 17:31:15', '2021-12-14 17:31:15', NULL);
INSERT INTO `notification` VALUES ('ccd7fba5-de9b-4550-bf45-7040b53aa610', '1', '12', '1', '8e582792-7b56-4d43-83c3-a020941f3208', '1', '133', '2021-12-13 17:11:44', '2021-12-13 17:11:44', NULL);
INSERT INTO `notification` VALUES ('e0dd0ae1-0344-47a3-926d-458a904efcc6', '1', '12', '1', '85dd811f-d50b-4083-8981-ae11b4694d32', '1', '133', '2021-12-13 17:11:44', '2021-12-13 17:11:44', NULL);
INSERT INTO `notification` VALUES ('e98d3040-f696-45de-9cec-cd0ad94ee812', '1', '12', '1', '1', '1', '133', '2021-12-13 17:11:44', '2021-12-13 17:11:44', NULL);
INSERT INTO `notification` VALUES ('f32cf6c6-2d12-4e29-a066-f798da6af51a', '999', '99', '1', '8e582792-7b56-4d43-83c3-a020941f3208', '1', '999', '2021-12-13 17:18:42', '2021-12-13 17:18:42', NULL);
COMMIT;

-- ----------------------------
-- Table structure for notification_user
-- ----------------------------
DROP TABLE IF EXISTS `notification_user`;
CREATE TABLE `notification_user` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `notification_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '系统通知Id',
  `recipient_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '接受通知的用户Id',
  `is_read` tinyint(1) DEFAULT '0' COMMENT '是否已读',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='系统通知用户表';

-- ----------------------------
-- Records of notification_user
-- ----------------------------
BEGIN;
INSERT INTO `notification_user` VALUES ('1b42fbe4-39fd-4fad-9b2b-6604ce5b48cf', '5d102c26-9460-4515-94e0-61b065af9125', '1', 0, '2021-12-14 17:27:11', '2021-12-16 17:35:36', NULL);
INSERT INTO `notification_user` VALUES ('739c3c3b-a3e1-4cbd-9137-2995eacb4a76', '74eb5754-1b32-4f51-b101-939c5179f97a', '1', 0, '2021-12-14 17:31:18', '2021-12-16 19:53:42', NULL);
INSERT INTO `notification_user` VALUES ('ba8f8c08-9d5e-46e9-81e1-bcb627d0275d', 'e98d3040-f696-45de-9cec-cd0ad94ee812', '1', 1, '2021-12-14 17:27:11', '2021-12-16 19:53:48', NULL);
COMMIT;

-- ----------------------------
-- Table structure for system_element
-- ----------------------------
DROP TABLE IF EXISTS `system_element`;
CREATE TABLE `system_element` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='系统-页面元素表';

-- ----------------------------
-- Records of system_element
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for system_file
-- ----------------------------
DROP TABLE IF EXISTS `system_file`;
CREATE TABLE `system_file` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='系统-文件表';

-- ----------------------------
-- Records of system_file
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for system_login_log
-- ----------------------------
DROP TABLE IF EXISTS `system_login_log`;
CREATE TABLE `system_login_log` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) DEFAULT NULL COMMENT '登录名',
  `ip` varchar(255) DEFAULT NULL COMMENT '登录IP',
  `ua` varchar(255) DEFAULT NULL COMMENT '用户代理',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='系统-登录日志表';

-- ----------------------------
-- Records of system_login_log
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for system_menu
-- ----------------------------
DROP TABLE IF EXISTS `system_menu`;
CREATE TABLE `system_menu` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `parent_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '父菜单Id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '名称',
  `router` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '菜单地址',
  `type` enum('directory','menu') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '类型，directory：目录、menu：菜单',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '对应图标',
  `order_num` int DEFAULT NULL COMMENT '排序',
  `view_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '视图地址，对应vue文件',
  `keepalive` tinyint(1) DEFAULT NULL COMMENT '路由是否缓存',
  `is_hidden` tinyint(1) DEFAULT NULL COMMENT '是否显示在菜单栏',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='系统-菜单表';

-- ----------------------------
-- Records of system_menu
-- ----------------------------
BEGIN;
INSERT INTO `system_menu` VALUES ('1', NULL, '系统管理', '/system', 'directory', 'setting', 0, NULL, 0, 0, '2021-04-01 00:00:00', '2021-12-11 19:47:01', NULL);
INSERT INTO `system_menu` VALUES ('2', '1', '权限管理', '/system/power', 'directory', 'thunderbolt', 0, NULL, 0, 0, '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_menu` VALUES ('3', '2', '菜单管理', '/system/power/menu', 'menu', 'menu', 0, 'views/system/power/menu', 0, 0, '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_menu` VALUES ('4', '1', '角色管理', '/system/role', 'menu', 'apartment', 0, 'views/system/role', 0, 0, '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_menu` VALUES ('42dd5b0c-165a-4164-84c1-79c1b3c68a32', NULL, '222', '21312424', 'directory', 'clipboard', 0, NULL, 0, 0, '2021-09-07 22:26:18', '2021-09-07 22:28:49', '2021-09-07 22:29:25');
INSERT INTO `system_menu` VALUES ('4ee0fe72-02c8-4c82-a922-6e119fb19eee', '42dd5b0c-165a-4164-84c1-79c1b3c68a32', '123', '1', 'menu', 'bug', 0, NULL, 0, 0, '2021-09-07 22:29:13', '2021-09-07 22:29:13', '2021-09-07 22:29:20');
INSERT INTO `system_menu` VALUES ('5', '1', '用户管理', '/system/user', 'menu', 'team', 0, 'views/system/user', 0, 0, '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_menu` VALUES ('7f6ed357-1ccb-4770-b953-3ed6e4219f0f', 'c93f6951-6776-40ba-8a1f-2ded0cc93d03', '登录日志', '/system/monitor/login-log', 'menu', 'history', 0, 'views/system/monitor/login-log', 0, 0, '2021-08-30 21:17:49', '2021-08-30 21:17:49', NULL);
INSERT INTO `system_menu` VALUES ('9fc9d92c-28f0-43cb-8532-e5332fc808f0', 'c93f6951-6776-40ba-8a1f-2ded0cc93d03', '在线用户', '/system/monitor/online-user', 'menu', 'link', 0, 'views/system/monitor/online-user', 0, 0, '2021-12-02 15:09:18', '2021-12-02 15:09:49', NULL);
INSERT INTO `system_menu` VALUES ('c399ef1f-9ecf-40e6-a9c8-408d8ef11872', 'c93f6951-6776-40ba-8a1f-2ded0cc93d03', '服务监控', '/system/monitor/server', 'menu', 'cloud-server', 0, 'views/system/monitor/server', 0, 0, '2021-11-30 15:01:15', '2021-11-30 15:01:15', NULL);
INSERT INTO `system_menu` VALUES ('c93f6951-6776-40ba-8a1f-2ded0cc93d03', '1', '系统监控', '/system/monitor', 'directory', 'monitor', 0, NULL, 0, 0, '2021-08-30 21:15:21', '2021-08-30 21:15:21', NULL);
INSERT INTO `system_menu` VALUES ('f45a0cd2-f4c1-494c-afc4-27878751f492', NULL, '消息通知', '/notification', 'menu', 'notification', 0, 'views/notification', 0, 0, '2021-12-12 16:59:23', '2021-12-12 16:59:23', NULL);
COMMIT;

-- ----------------------------
-- Table structure for system_operation
-- ----------------------------
DROP TABLE IF EXISTS `system_operation`;
CREATE TABLE `system_operation` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='系统-操作表';

-- ----------------------------
-- Records of system_operation
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for system_operation_log
-- ----------------------------
DROP TABLE IF EXISTS `system_operation_log`;
CREATE TABLE `system_operation_log` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='系统-操作日志表';

-- ----------------------------
-- Records of system_operation_log
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for system_power
-- ----------------------------
DROP TABLE IF EXISTS `system_power`;
CREATE TABLE `system_power` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `ref_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '外表Id',
  `type` enum('menu','file','element','operation') DEFAULT NULL COMMENT '权限类型：menu:菜单的访问权限、file:文件的修改权限、element:页面元素的可见性控制、operation:功能模块的操作权限、',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='系统-权限表';

-- ----------------------------
-- Records of system_power
-- ----------------------------
BEGIN;
INSERT INTO `system_power` VALUES ('1', '1', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_power` VALUES ('1189ec2d-fa3b-493a-ba53-c592a7a39778', '7f6ed357-1ccb-4770-b953-3ed6e4219f0f', 'menu', '2021-08-30 21:17:49', '2021-08-30 21:17:49');
INSERT INTO `system_power` VALUES ('2', '2', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_power` VALUES ('23ae9ef1-fa2f-44ad-a666-2450e39fd396', 'c399ef1f-9ecf-40e6-a9c8-408d8ef11872', 'menu', '2021-11-30 15:01:15', '2021-11-30 15:01:15');
INSERT INTO `system_power` VALUES ('3', '3', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_power` VALUES ('3ea249eb-fb09-4c5a-a7ee-49ea08c1630d', 'f45a0cd2-f4c1-494c-afc4-27878751f492', 'menu', '2021-12-12 16:59:23', '2021-12-12 16:59:23');
INSERT INTO `system_power` VALUES ('4', '4', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_power` VALUES ('5', '5', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_power` VALUES ('71891c4d-04cd-4395-a047-ce829c4ae9f4', '9fc9d92c-28f0-43cb-8532-e5332fc808f0', 'menu', '2021-12-02 15:09:18', '2021-12-02 15:09:18');
INSERT INTO `system_power` VALUES ('d9bd7d4a-216d-4516-bf1b-982b2f53b18b', 'c93f6951-6776-40ba-8a1f-2ded0cc93d03', 'menu', '2021-08-30 21:15:22', '2021-08-30 21:15:22');
COMMIT;

-- ----------------------------
-- Table structure for system_role
-- ----------------------------
DROP TABLE IF EXISTS `system_role`;
CREATE TABLE `system_role` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='系统-角色表';

-- ----------------------------
-- Records of system_role
-- ----------------------------
BEGIN;
INSERT INTO `system_role` VALUES ('1', '超级管理员', '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_role` VALUES ('2', '游客', '2021-04-01 00:00:00', '2021-04-01 00:00:00', '');
COMMIT;

-- ----------------------------
-- Table structure for system_role_power
-- ----------------------------
DROP TABLE IF EXISTS `system_role_power`;
CREATE TABLE `system_role_power` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `role_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '角色Id',
  `power_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '权限Id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='系统-角色权限表';

-- ----------------------------
-- Records of system_role_power
-- ----------------------------
BEGIN;
INSERT INTO `system_role_power` VALUES ('052e0363-eb89-48d5-b89e-34bd620d6626', '1', '3', '2021-12-12 17:00:08', '2021-12-12 17:00:08');
INSERT INTO `system_role_power` VALUES ('0761ab20-9e71-42b1-82a7-4e8bb884bcfa', '1', '5', '2021-12-12 17:00:08', '2021-12-12 17:00:08');
INSERT INTO `system_role_power` VALUES ('4114f526-7760-4c73-b500-624fe502113e', '1', '71891c4d-04cd-4395-a047-ce829c4ae9f4', '2021-12-12 17:00:08', '2021-12-12 17:00:08');
INSERT INTO `system_role_power` VALUES ('7481b09e-dc2f-48f4-ac67-fe43cc471e29', '2', '3ea249eb-fb09-4c5a-a7ee-49ea08c1630d', '2021-12-12 17:04:08', '2021-12-12 17:04:08');
INSERT INTO `system_role_power` VALUES ('ae88fbb6-8765-46c1-85c6-7e86ed95571f', '1', '1189ec2d-fa3b-493a-ba53-c592a7a39778', '2021-12-12 17:00:08', '2021-12-12 17:00:08');
INSERT INTO `system_role_power` VALUES ('bec6f58e-4e0c-45ef-b0c9-7be70d9b7e02', '1', '4', '2021-12-12 17:00:08', '2021-12-12 17:00:08');
INSERT INTO `system_role_power` VALUES ('d40e3a9e-70d7-4b7f-8811-f0a1befea90a', '1', '3ea249eb-fb09-4c5a-a7ee-49ea08c1630d', '2021-12-12 17:00:08', '2021-12-12 17:00:08');
INSERT INTO `system_role_power` VALUES ('dfede356-e980-4c67-8ab0-db56389d22ad', '1', '23ae9ef1-fa2f-44ad-a666-2450e39fd396', '2021-12-12 17:00:08', '2021-12-12 17:00:08');
INSERT INTO `system_role_power` VALUES ('e87648cc-4729-447e-b679-854beee87021', '1', 'd9bd7d4a-216d-4516-bf1b-982b2f53b18b', '2021-12-12 17:00:08', '2021-12-12 17:00:08');
INSERT INTO `system_role_power` VALUES ('f73c4e30-83ee-4fa3-9899-f2ac8a53a4d1', '1', '1', '2021-12-12 17:00:08', '2021-12-12 17:00:08');
INSERT INTO `system_role_power` VALUES ('fdc870ba-86ae-4d71-aa90-adce2f4dbc8e', '1', '2', '2021-12-12 17:00:08', '2021-12-12 17:00:08');
COMMIT;

-- ----------------------------
-- Table structure for system_session
-- ----------------------------
DROP TABLE IF EXISTS `system_session`;
CREATE TABLE `system_session` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '用户Id',
  `key` varchar(255) NOT NULL COMMENT 'key',
  `password_hash` varchar(255) NOT NULL COMMENT '用户密码',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='系统-用户会话表';

-- ----------------------------
-- Records of system_session
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for system_user
-- ----------------------------
DROP TABLE IF EXISTS `system_user`;
CREATE TABLE `system_user` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `display_name` varchar(255) DEFAULT NULL COMMENT '显示名称',
  `real_name` varchar(255) DEFAULT NULL COMMENT '真实名称',
  `position` varchar(255) DEFAULT NULL COMMENT '职位',
  `company` varchar(255) DEFAULT NULL COMMENT '公司',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `mobile` varchar(255) DEFAULT NULL COMMENT '手机',
  `sex` enum('1','2') DEFAULT '1' COMMENT '性别：1:男 2：女',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `introduction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '简介',
  `github_id` varchar(255) DEFAULT NULL COMMENT 'githubId',
  `status` enum('1','2') DEFAULT '1' COMMENT '状态：1:启用 2：禁用',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='系统-用户表';

-- ----------------------------
-- Records of system_user
-- ----------------------------
BEGIN;
INSERT INTO `system_user` VALUES ('0cc320ca-a02d-4bc5-8fb7-57ae423a765b', '12', '$2a$10$QmALOAKIJMAChXJQlGDbUeXYONeu6S2T8JBF0WTXt2GQL9NrVr7Ey', '', '12', NULL, NULL, '', '12', '1', '', '', NULL, '1', '2021-09-07 22:11:48', '2021-09-07 22:12:12', '2021-09-07 22:12:12');
INSERT INTO `system_user` VALUES ('1', 'admin', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', 'smartmiao', '超级管理员', NULL, NULL, 'hilanmiao@126.com', '18353674768', '1', '/public/upload/avatars/2021/12/09/admin.jpg', '努力做一个不平凡的人，同时做好平凡的事！', NULL, '1', '2021-04-01 00:00:00', '2021-12-09 17:01:21', NULL);
INSERT INTO `system_user` VALUES ('85dd811f-d50b-4083-8981-ae11b4694d32', 'test2', '$2a$10$iajx6r8HFH5QXAVdo6rEHeqMZVcGI7NGy6Kd3GFNKJVosY4DvEfSu', '', '', NULL, NULL, '', '18353674768', '1', '', '', NULL, '1', '2021-12-06 19:57:34', '2021-12-06 19:57:34', NULL);
INSERT INTO `system_user` VALUES ('8e582792-7b56-4d43-83c3-a020941f3208', 'test', '$2a$10$5Cc867rYiXgHklz5vuND8uG.VP13bDnPPJ5sYG0Q9qMEgd/GQK05.', '', '', NULL, NULL, '', '18353674768', '1', '', '', NULL, '1', '2021-12-03 10:59:58', '2021-12-03 10:59:58', NULL);
COMMIT;

-- ----------------------------
-- Table structure for system_user_role
-- ----------------------------
DROP TABLE IF EXISTS `system_user_role`;
CREATE TABLE `system_user_role` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户Id',
  `role_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '角色Id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='系统-用户角色表';

-- ----------------------------
-- Records of system_user_role
-- ----------------------------
BEGIN;
INSERT INTO `system_user_role` VALUES ('1', '1', '1', '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_user_role` VALUES ('268e85de-d2f6-4b85-ab49-382efed9e733', '8e582792-7b56-4d43-83c3-a020941f3208', '1', '2021-12-03 10:59:58', '2021-12-03 10:59:58', NULL);
INSERT INTO `system_user_role` VALUES ('e1ea4913-379b-461b-8304-8ebc957ca507', '85dd811f-d50b-4083-8981-ae11b4694d32', '1', '2021-12-06 19:57:34', '2021-12-06 19:57:34', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
