/*
 Navicat Premium Data Transfer

 Source Server         : 腾讯云轻量服务器
 Source Server Type    : MySQL
 Source Server Version : 80026 (8.0.26)
 Source Host           : 81.70.194.45:3306
 Source Schema         : smartmiao

 Target Server Type    : MySQL
 Target Server Version : 80026 (8.0.26)
 File Encoding         : 65001

 Date: 21/01/2024 15:41:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account_book
-- ----------------------------
DROP TABLE IF EXISTS `account_book`;
CREATE TABLE `account_book` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `balance` decimal(19,2) DEFAULT '0.00' COMMENT '余额',
  `is_default` tinyint(1) DEFAULT '0' COMMENT '是否是默认',
  `remark` text COMMENT '备注',
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户Id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='账本表';

-- ----------------------------
-- Records of account_book
-- ----------------------------
BEGIN;
INSERT INTO `account_book` (`id`, `name`, `balance`, `is_default`, `remark`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES ('fedc6f9e-1a1f-4cb2-ab70-3a624d5c0d30', '我的账本', 6000.00, 1, '', '1', '2024-01-21 15:33:41', '2024-01-21 15:41:13', NULL);
COMMIT;

-- ----------------------------
-- Table structure for account_in_out
-- ----------------------------
DROP TABLE IF EXISTS `account_in_out`;
CREATE TABLE `account_in_out` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `account_book_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '账本Id',
  `account_in_out_category_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '收支分类Id',
  `type` enum('in','out') DEFAULT 'out' COMMENT '收/支：out:支 in：收',
  `amount` decimal(19,2) DEFAULT NULL COMMENT '金额',
  `remark` text COMMENT '备注',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `in_out_date` datetime DEFAULT NULL COMMENT '收支日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='收支明细表';

-- ----------------------------
-- Records of account_in_out
-- ----------------------------
BEGIN;
INSERT INTO `account_in_out` (`id`, `account_book_id`, `account_in_out_category_id`, `type`, `amount`, `remark`, `created_at`, `updated_at`, `deleted_at`, `in_out_date`) VALUES ('c704e714-c619-4e13-9232-42c354aef41f', 'fedc6f9e-1a1f-4cb2-ab70-3a624d5c0d30', 'f8cea054-cc68-442a-9785-42f0a189dc17', 'in', 6500.00, '', '2024-01-21 15:41:03', '2024-01-21 15:41:03', NULL, '2024-01-21 15:40:51');
INSERT INTO `account_in_out` (`id`, `account_book_id`, `account_in_out_category_id`, `type`, `amount`, `remark`, `created_at`, `updated_at`, `deleted_at`, `in_out_date`) VALUES ('ec893cbf-c91f-4df9-b7bc-5912d0c87806', 'fedc6f9e-1a1f-4cb2-ab70-3a624d5c0d30', '667b454b-f3dc-4694-ad23-75eec693894b', 'out', 500.00, '', '2024-01-21 15:41:13', '2024-01-21 15:41:13', NULL, '2024-01-21 15:41:04');
COMMIT;

-- ----------------------------
-- Table structure for account_in_out_category
-- ----------------------------
DROP TABLE IF EXISTS `account_in_out_category`;
CREATE TABLE `account_in_out_category` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL COMMENT '对应图标',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='收支分类表';

-- ----------------------------
-- Records of account_in_out_category
-- ----------------------------
BEGIN;
INSERT INTO `account_in_out_category` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`, `icon`) VALUES ('667b454b-f3dc-4694-ad23-75eec693894b', '生活费', '2024-01-21 15:40:45', '2024-01-21 15:40:45', NULL, 'YUAN-circle-fill');
INSERT INTO `account_in_out_category` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`, `icon`) VALUES ('f8cea054-cc68-442a-9785-42f0a189dc17', '工资', '2024-01-21 15:40:29', '2024-01-21 15:40:29', NULL, 'account-book');
COMMIT;

-- ----------------------------
-- Table structure for bag
-- ----------------------------
DROP TABLE IF EXISTS `bag`;
CREATE TABLE `bag` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` varchar(255) DEFAULT NULL COMMENT '类型',
  `content` json DEFAULT NULL COMMENT '内容',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户Id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='卡证照表';

-- ----------------------------
-- Records of bag
-- ----------------------------
BEGIN;
COMMIT;

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
INSERT INTO `notification` (`id`, `title`, `content`, `type`, `recipient_id`, `manager_id`, `remark`, `created_at`, `updated_at`, `deleted_at`) VALUES ('8757131d-a5f4-4b55-be1f-548d9ce7927e', '消息通知1', '测试', '2', NULL, '1', '测试', '2024-01-21 15:33:03', '2024-01-21 15:33:03', NULL);
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
INSERT INTO `notification_user` (`id`, `notification_id`, `recipient_id`, `is_read`, `created_at`, `updated_at`, `deleted_at`) VALUES ('da7c33fe-de50-4ccb-b782-754ee1c370ef', '8757131d-a5f4-4b55-be1f-548d9ce7927e', '1', 0, '2024-01-21 15:38:51', '2024-01-21 15:38:51', NULL);
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
INSERT INTO `system_login_log` (`id`, `username`, `ip`, `ua`, `created_at`, `updated_at`, `deleted_at`) VALUES ('e55a8687-c4eb-43ac-982f-c56a303dcc3a', 'test', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36', '2024-01-21 15:31:59', '2024-01-21 15:31:59', NULL);
INSERT INTO `system_login_log` (`id`, `username`, `ip`, `ua`, `created_at`, `updated_at`, `deleted_at`) VALUES ('f8723a57-1f4f-4329-a44b-5ec936f7fc10', 'admin', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36', '2024-01-21 15:32:18', '2024-01-21 15:32:18', NULL);
COMMIT;

-- ----------------------------
-- Table structure for system_menu
-- ----------------------------
DROP TABLE IF EXISTS `system_menu`;
CREATE TABLE `system_menu` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `parent_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '父菜单Id',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `router` varchar(255) DEFAULT NULL COMMENT '菜单地址',
  `type` enum('directory','menu') DEFAULT NULL COMMENT '类型，directory：目录、menu：菜单',
  `icon` varchar(255) DEFAULT NULL COMMENT '对应图标',
  `order_num` int DEFAULT NULL COMMENT '排序',
  `view_path` varchar(255) DEFAULT NULL COMMENT '视图地址，对应vue文件',
  `keepalive` tinyint(1) DEFAULT NULL COMMENT '路由是否缓存',
  `is_hidden` tinyint(1) DEFAULT '0' COMMENT '是否隐藏',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='系统-菜单表';

-- ----------------------------
-- Records of system_menu
-- ----------------------------
BEGIN;
INSERT INTO `system_menu` (`id`, `parent_id`, `name`, `router`, `type`, `icon`, `order_num`, `view_path`, `keepalive`, `is_hidden`, `created_at`, `updated_at`, `deleted_at`) VALUES ('1', NULL, '系统管理', '/system', 'directory', 'setting', 0, NULL, 0, 0, '2021-04-01 00:00:00', '2022-03-19 23:50:09', NULL);
INSERT INTO `system_menu` (`id`, `parent_id`, `name`, `router`, `type`, `icon`, `order_num`, `view_path`, `keepalive`, `is_hidden`, `created_at`, `updated_at`, `deleted_at`) VALUES ('143b7df8-047c-4058-a338-1810e74d7a5a', NULL, '记账管理', '/account-manage', 'directory', 'bank', 0, NULL, 0, 0, '2022-01-17 22:22:03', '2022-01-17 22:24:11', NULL);
INSERT INTO `system_menu` (`id`, `parent_id`, `name`, `router`, `type`, `icon`, `order_num`, `view_path`, `keepalive`, `is_hidden`, `created_at`, `updated_at`, `deleted_at`) VALUES ('18c33940-9bcf-49fb-a5d6-3dd5ad40250d', NULL, '卡证照管理', '/bag', 'menu', 'folder', 0, 'views/bag', 0, 0, '2021-12-21 21:55:20', '2022-03-19 23:49:39', NULL);
INSERT INTO `system_menu` (`id`, `parent_id`, `name`, `router`, `type`, `icon`, `order_num`, `view_path`, `keepalive`, `is_hidden`, `created_at`, `updated_at`, `deleted_at`) VALUES ('2', '1', '权限管理', '/system/power', 'directory', 'thunderbolt', 0, NULL, 0, 0, '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_menu` (`id`, `parent_id`, `name`, `router`, `type`, `icon`, `order_num`, `view_path`, `keepalive`, `is_hidden`, `created_at`, `updated_at`, `deleted_at`) VALUES ('3', '2', '菜单管理', '/system/power/menu', 'menu', 'menu', 0, 'views/system/power/menu', 0, 0, '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_menu` (`id`, `parent_id`, `name`, `router`, `type`, `icon`, `order_num`, `view_path`, `keepalive`, `is_hidden`, `created_at`, `updated_at`, `deleted_at`) VALUES ('4', '1', '角色管理', '/system/role', 'menu', 'apartment', 0, 'views/system/role', 0, 0, '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_menu` (`id`, `parent_id`, `name`, `router`, `type`, `icon`, `order_num`, `view_path`, `keepalive`, `is_hidden`, `created_at`, `updated_at`, `deleted_at`) VALUES ('5', '1', '用户管理', '/system/user', 'menu', 'team', 0, 'views/system/user', 0, 0, '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_menu` (`id`, `parent_id`, `name`, `router`, `type`, `icon`, `order_num`, `view_path`, `keepalive`, `is_hidden`, `created_at`, `updated_at`, `deleted_at`) VALUES ('7c534ea9-77e6-4099-9ca0-6f53992486f9', '143b7df8-047c-4058-a338-1810e74d7a5a', '收支分类', '/account-manage/account-in-out-category', 'menu', 'appstore-add', 0, 'views/account-manage/account-in-out-category', 0, 0, '2022-01-17 22:24:54', '2022-01-17 22:28:29', NULL);
INSERT INTO `system_menu` (`id`, `parent_id`, `name`, `router`, `type`, `icon`, `order_num`, `view_path`, `keepalive`, `is_hidden`, `created_at`, `updated_at`, `deleted_at`) VALUES ('7f6ed357-1ccb-4770-b953-3ed6e4219f0f', 'c93f6951-6776-40ba-8a1f-2ded0cc93d03', '登录日志', '/system/monitor/login-log', 'menu', 'history', 0, 'views/system/monitor/login-log', 0, 0, '2021-08-30 21:17:49', '2021-08-30 21:17:49', NULL);
INSERT INTO `system_menu` (`id`, `parent_id`, `name`, `router`, `type`, `icon`, `order_num`, `view_path`, `keepalive`, `is_hidden`, `created_at`, `updated_at`, `deleted_at`) VALUES ('94ceb12d-b0eb-425a-97d5-eaffb7263a8b', '143b7df8-047c-4058-a338-1810e74d7a5a', '账本管理', '/account-book', 'menu', 'appstore-add', 0, 'views/account-manage/account-book', 0, 0, '2022-01-17 22:22:57', '2022-01-17 22:28:38', NULL);
INSERT INTO `system_menu` (`id`, `parent_id`, `name`, `router`, `type`, `icon`, `order_num`, `view_path`, `keepalive`, `is_hidden`, `created_at`, `updated_at`, `deleted_at`) VALUES ('9fc9d92c-28f0-43cb-8532-e5332fc808f0', 'c93f6951-6776-40ba-8a1f-2ded0cc93d03', '在线用户', '/system/monitor/online-user', 'menu', 'link', 0, 'views/system/monitor/online-user', 0, 0, '2021-12-02 15:09:18', '2021-12-02 15:09:49', NULL);
INSERT INTO `system_menu` (`id`, `parent_id`, `name`, `router`, `type`, `icon`, `order_num`, `view_path`, `keepalive`, `is_hidden`, `created_at`, `updated_at`, `deleted_at`) VALUES ('c399ef1f-9ecf-40e6-a9c8-408d8ef11872', 'c93f6951-6776-40ba-8a1f-2ded0cc93d03', '服务监控', '/system/monitor/server', 'menu', 'cloud-server', 0, 'views/system/monitor/server', 0, 0, '2021-11-30 15:01:15', '2021-11-30 15:01:15', NULL);
INSERT INTO `system_menu` (`id`, `parent_id`, `name`, `router`, `type`, `icon`, `order_num`, `view_path`, `keepalive`, `is_hidden`, `created_at`, `updated_at`, `deleted_at`) VALUES ('c93f6951-6776-40ba-8a1f-2ded0cc93d03', '1', '系统监控', '/system/monitor', 'directory', 'monitor', 0, NULL, 0, 0, '2021-08-30 21:15:21', '2021-08-30 21:15:21', NULL);
INSERT INTO `system_menu` (`id`, `parent_id`, `name`, `router`, `type`, `icon`, `order_num`, `view_path`, `keepalive`, `is_hidden`, `created_at`, `updated_at`, `deleted_at`) VALUES ('d966af2b-b199-44e9-9eae-3ec42a5aa4d7', '143b7df8-047c-4058-a338-1810e74d7a5a', '收支明细', '/account-manage/account-in-out', 'menu', 'appstore-add', 0, 'views/account-manage/account-in-out', 0, 0, '2022-01-17 22:25:27', '2022-01-17 22:28:45', NULL);
INSERT INTO `system_menu` (`id`, `parent_id`, `name`, `router`, `type`, `icon`, `order_num`, `view_path`, `keepalive`, `is_hidden`, `created_at`, `updated_at`, `deleted_at`) VALUES ('f45a0cd2-f4c1-494c-afc4-27878751f492', NULL, '消息通知', '/notification', 'menu', 'notification', 0, 'views/notification', 0, 0, '2021-12-12 16:59:23', '2022-03-19 23:50:02', NULL);
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
INSERT INTO `system_power` (`id`, `ref_id`, `type`, `created_at`, `updated_at`) VALUES ('0d2df267-290e-4dd2-aa66-1a73f8567cf5', '7c534ea9-77e6-4099-9ca0-6f53992486f9', 'menu', '2022-01-17 22:24:54', '2022-01-17 22:24:54');
INSERT INTO `system_power` (`id`, `ref_id`, `type`, `created_at`, `updated_at`) VALUES ('1', '1', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_power` (`id`, `ref_id`, `type`, `created_at`, `updated_at`) VALUES ('1189ec2d-fa3b-493a-ba53-c592a7a39778', '7f6ed357-1ccb-4770-b953-3ed6e4219f0f', 'menu', '2021-08-30 21:17:49', '2021-08-30 21:17:49');
INSERT INTO `system_power` (`id`, `ref_id`, `type`, `created_at`, `updated_at`) VALUES ('2', '2', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_power` (`id`, `ref_id`, `type`, `created_at`, `updated_at`) VALUES ('23ae9ef1-fa2f-44ad-a666-2450e39fd396', 'c399ef1f-9ecf-40e6-a9c8-408d8ef11872', 'menu', '2021-11-30 15:01:15', '2021-11-30 15:01:15');
INSERT INTO `system_power` (`id`, `ref_id`, `type`, `created_at`, `updated_at`) VALUES ('3', '3', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_power` (`id`, `ref_id`, `type`, `created_at`, `updated_at`) VALUES ('3ea249eb-fb09-4c5a-a7ee-49ea08c1630d', 'f45a0cd2-f4c1-494c-afc4-27878751f492', 'menu', '2021-12-12 16:59:23', '2021-12-12 16:59:23');
INSERT INTO `system_power` (`id`, `ref_id`, `type`, `created_at`, `updated_at`) VALUES ('4', '4', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_power` (`id`, `ref_id`, `type`, `created_at`, `updated_at`) VALUES ('5', '5', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_power` (`id`, `ref_id`, `type`, `created_at`, `updated_at`) VALUES ('71891c4d-04cd-4395-a047-ce829c4ae9f4', '9fc9d92c-28f0-43cb-8532-e5332fc808f0', 'menu', '2021-12-02 15:09:18', '2021-12-02 15:09:18');
INSERT INTO `system_power` (`id`, `ref_id`, `type`, `created_at`, `updated_at`) VALUES ('77d65785-ce62-4e14-a482-784f3e295925', '18c33940-9bcf-49fb-a5d6-3dd5ad40250d', 'menu', '2021-12-21 21:55:20', '2021-12-21 21:55:20');
INSERT INTO `system_power` (`id`, `ref_id`, `type`, `created_at`, `updated_at`) VALUES ('aa0e5c5c-7052-436a-8b54-48e44ea94536', '94ceb12d-b0eb-425a-97d5-eaffb7263a8b', 'menu', '2022-01-17 22:22:57', '2022-01-17 22:22:57');
INSERT INTO `system_power` (`id`, `ref_id`, `type`, `created_at`, `updated_at`) VALUES ('cb887751-0d68-4aea-84ea-11a63221f337', '143b7df8-047c-4058-a338-1810e74d7a5a', 'menu', '2022-01-17 22:22:03', '2022-01-17 22:22:03');
INSERT INTO `system_power` (`id`, `ref_id`, `type`, `created_at`, `updated_at`) VALUES ('d9bd7d4a-216d-4516-bf1b-982b2f53b18b', 'c93f6951-6776-40ba-8a1f-2ded0cc93d03', 'menu', '2021-08-30 21:15:22', '2021-08-30 21:15:22');
INSERT INTO `system_power` (`id`, `ref_id`, `type`, `created_at`, `updated_at`) VALUES ('e99bbeac-303a-49a2-91b3-19585e47af32', 'd966af2b-b199-44e9-9eae-3ec42a5aa4d7', 'menu', '2022-01-17 22:25:27', '2022-01-17 22:25:27');
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
INSERT INTO `system_role` (`id`, `name`, `created_at`, `updated_at`, `remark`) VALUES ('1', '超级管理员', '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_role` (`id`, `name`, `created_at`, `updated_at`, `remark`) VALUES ('2', '游客', '2021-04-01 00:00:00', '2021-04-01 00:00:00', '');
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
INSERT INTO `system_role_power` (`id`, `role_id`, `power_id`, `created_at`, `updated_at`) VALUES ('0c2f35a2-4973-42ef-bad3-d14995ee9ab6', '1', '2', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` (`id`, `role_id`, `power_id`, `created_at`, `updated_at`) VALUES ('196f9547-a852-4892-9495-6e251b1876e8', '1', '4', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` (`id`, `role_id`, `power_id`, `created_at`, `updated_at`) VALUES ('47c7893a-1fed-47e3-b245-ee375b028ee9', '1', 'd9bd7d4a-216d-4516-bf1b-982b2f53b18b', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` (`id`, `role_id`, `power_id`, `created_at`, `updated_at`) VALUES ('4e9e34eb-57b6-4857-bd72-ed2b9538804a', '1', '0d2df267-290e-4dd2-aa66-1a73f8567cf5', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` (`id`, `role_id`, `power_id`, `created_at`, `updated_at`) VALUES ('52cbb892-f65b-42b4-b1d0-2c971461d89e', '1', '1189ec2d-fa3b-493a-ba53-c592a7a39778', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` (`id`, `role_id`, `power_id`, `created_at`, `updated_at`) VALUES ('648a6c3e-379f-4153-99e6-f39544fdcbfa', '1', 'e99bbeac-303a-49a2-91b3-19585e47af32', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` (`id`, `role_id`, `power_id`, `created_at`, `updated_at`) VALUES ('7481b09e-dc2f-48f4-ac67-fe43cc471e29', '2', '3ea249eb-fb09-4c5a-a7ee-49ea08c1630d', '2021-12-12 17:04:08', '2021-12-12 17:04:08');
INSERT INTO `system_role_power` (`id`, `role_id`, `power_id`, `created_at`, `updated_at`) VALUES ('9eef6e31-d9a0-4b61-bc5f-eac90a9a89b0', '1', '71891c4d-04cd-4395-a047-ce829c4ae9f4', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` (`id`, `role_id`, `power_id`, `created_at`, `updated_at`) VALUES ('b5b46e27-1e3a-4861-8bb7-166f63f6f403', '1', '3ea249eb-fb09-4c5a-a7ee-49ea08c1630d', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` (`id`, `role_id`, `power_id`, `created_at`, `updated_at`) VALUES ('bf2fd3f8-d0af-413b-a000-c1da03f68ff9', '1', 'aa0e5c5c-7052-436a-8b54-48e44ea94536', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` (`id`, `role_id`, `power_id`, `created_at`, `updated_at`) VALUES ('caa2671a-3544-4e72-95e0-fd418682ecde', '1', '23ae9ef1-fa2f-44ad-a666-2450e39fd396', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` (`id`, `role_id`, `power_id`, `created_at`, `updated_at`) VALUES ('daa5e46f-a237-45c8-ac2d-74960e6d575d', '1', '3', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` (`id`, `role_id`, `power_id`, `created_at`, `updated_at`) VALUES ('dc759559-c0af-4a5c-a203-593588fbc83b', '1', 'cb887751-0d68-4aea-84ea-11a63221f337', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` (`id`, `role_id`, `power_id`, `created_at`, `updated_at`) VALUES ('dcc5e4d8-2a0c-484b-8f57-8739b4ed0561', '1', '1', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` (`id`, `role_id`, `power_id`, `created_at`, `updated_at`) VALUES ('f52aa514-a463-4396-9d88-863a3957fe0c', '1', '5', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` (`id`, `role_id`, `power_id`, `created_at`, `updated_at`) VALUES ('f5490e1c-768f-40ed-8bcc-b8def606c34c', '1', '77d65785-ce62-4e14-a482-784f3e295925', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
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
INSERT INTO `system_session` (`id`, `user_id`, `key`, `password_hash`, `created_at`, `updated_at`, `deleted_at`) VALUES ('303d4754-45b9-4efe-a7d7-732ce41c69a7', '1', '4db60af1-dde2-4705-b7d6-dd8cfcf97bd1', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', '2024-01-21 15:32:18', '2024-01-21 15:32:18', NULL);
INSERT INTO `system_session` (`id`, `user_id`, `key`, `password_hash`, `created_at`, `updated_at`, `deleted_at`) VALUES ('b350f1d4-f584-4f61-adfa-a3a9b0b8d70f', '8e582792-7b56-4d43-83c3-a020941f3208', '6bd2f7f7-3778-48e2-9aed-1e9e7d7a51dc', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', '2024-01-21 15:31:59', '2024-01-21 15:32:10', '2024-01-21 15:32:10');
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
  `introduction` varchar(255) DEFAULT NULL COMMENT '简介',
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
INSERT INTO `system_user` (`id`, `username`, `password`, `display_name`, `real_name`, `position`, `company`, `email`, `mobile`, `sex`, `avatar`, `introduction`, `github_id`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ('1', 'admin', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', 'admin', '超级管理员', NULL, NULL, 'hilanmiao@126.com', '18353674768', '1', '/public/upload/avatars/2022/03/21/1647867779596430.jpg', '努力做一个不平凡的人，同时做好平凡的事！', NULL, '1', '2021-04-01 00:00:00', '2022-03-21 21:04:20', NULL);
INSERT INTO `system_user` (`id`, `username`, `password`, `display_name`, `real_name`, `position`, `company`, `email`, `mobile`, `sex`, `avatar`, `introduction`, `github_id`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES ('8e582792-7b56-4d43-83c3-a020941f3208', 'test', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', '', '', NULL, NULL, '', '18353674768', '1', '', '', NULL, '1', '2021-12-03 10:59:58', '2022-02-26 05:30:18', NULL);
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
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='系统-用户角色表';

-- ----------------------------
-- Records of system_user_role
-- ----------------------------
BEGIN;
INSERT INTO `system_user_role` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES ('82b69785-b9fc-4579-b1af-b2f8165b6164', '8e582792-7b56-4d43-83c3-a020941f3208', '2', '2022-02-26 05:33:14', '2022-02-26 05:33:14');
INSERT INTO `system_user_role` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES ('e953fff6-88d1-466c-8f75-2ef49d71b248', '1', '1', '2022-03-21 21:04:21', '2022-03-21 21:04:21');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
