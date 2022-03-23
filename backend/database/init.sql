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

 Date: 21/03/2022 21:09:46
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
  `balance` decimal(10,0) DEFAULT '0' COMMENT '余额',
  `remark` text COMMENT '备注',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='账本表';

-- ----------------------------
-- Records of account_book
-- ----------------------------
BEGIN;
INSERT INTO `account_book` VALUES ('24e83124-c851-49f5-9c98-350bd38d6355', '老婆的账本', 0, '', '2022-03-21 21:05:30', '2022-03-21 21:05:30', NULL);
INSERT INTO `account_book` VALUES ('769a2d0e-5289-4310-a1d4-a9b38bb18fcd', '麦琪的账本', 0, '', '2022-03-21 21:05:37', '2022-03-21 21:05:37', NULL);
INSERT INTO `account_book` VALUES ('7aeb230b-5af6-438d-8678-c7350ece5265', '我的账本', 7760, '', '2022-03-21 21:05:22', '2022-03-21 21:06:45', NULL);
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
  `amount` decimal(10,0) DEFAULT NULL COMMENT '金额',
  `remark` text COMMENT '备注',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='收支明细表';

-- ----------------------------
-- Records of account_in_out
-- ----------------------------
BEGIN;
INSERT INTO `account_in_out` VALUES ('2c4362c9-fc6f-4cde-ae25-ddf3715a8329', '7aeb230b-5af6-438d-8678-c7350ece5265', '99a45644-0d0f-423c-860a-2d374240bcf3', 'in', 8300, '', '2022-03-21 21:05:58', '2022-03-21 21:05:58', NULL);
INSERT INTO `account_in_out` VALUES ('430466e3-fe3c-4611-8675-88d0e8b42093', '7aeb230b-5af6-438d-8678-c7350ece5265', '40cb38c1-d9fa-483d-ab91-f19d7ee95dc4', 'out', 290, '', '2022-03-21 21:06:33', '2022-03-21 21:06:33', NULL);
INSERT INTO `account_in_out` VALUES ('7910a0b1-553f-4d9d-94a2-e9513f6b52b0', '7aeb230b-5af6-438d-8678-c7350ece5265', '03ee2c49-d8bf-412d-8bde-9534d1fb54e0', 'out', 100, '', '2022-03-21 21:06:23', '2022-03-21 21:06:23', NULL);
INSERT INTO `account_in_out` VALUES ('bc8d33ac-d17a-4113-9cfc-da64a7a30d0d', '7aeb230b-5af6-438d-8678-c7350ece5265', 'e044664f-7497-431c-9776-118667aad0cf', 'out', 150, '', '2022-03-21 21:06:45', '2022-03-21 21:06:45', NULL);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='收支分类表';

-- ----------------------------
-- Records of account_in_out_category
-- ----------------------------
BEGIN;
INSERT INTO `account_in_out_category` VALUES ('03ee2c49-d8bf-412d-8bde-9534d1fb54e0', '水费', '2022-01-17 22:52:38', '2022-01-17 22:52:38', NULL);
INSERT INTO `account_in_out_category` VALUES ('40cb38c1-d9fa-483d-ab91-f19d7ee95dc4', '煤气费', '2022-01-17 22:52:48', '2022-01-17 22:52:48', NULL);
INSERT INTO `account_in_out_category` VALUES ('99a45644-0d0f-423c-860a-2d374240bcf3', '工资', '2022-03-21 21:05:11', '2022-03-21 21:05:11', NULL);
INSERT INTO `account_in_out_category` VALUES ('e044664f-7497-431c-9776-118667aad0cf', '电费', '2022-01-17 22:52:42', '2022-01-17 22:52:42', NULL);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='卡证照表';

-- ----------------------------
-- Records of bag
-- ----------------------------
BEGIN;
INSERT INTO `bag` VALUES ('07e45266-6a3a-4e84-9284-9b0717a96b3e', 'vehicleLicense', '{\"VIN\": \"123424\", \"vin\": \"123\", \"name\": \"张国栋\", \"model\": \"丰田威驰FS\", \"plateNo\": \"鲁G809CP\", \"engineNo\": \"123123\", \"issueDate\": \"2022-01-18\", \"testRecord\": \"到期2025年\", \"vehicleType\": \"小型客车\", \"registerDate\": \"2022-01-12\", \"vehicleLicensePhoto1\": \"/public/upload/others/2022/01/03/1641178898859339.jpg\", \"vehicleLicensePhoto2\": \"/public/upload/others/2022/01/03/1641178901082183.jpg\"}', '2022-01-03 11:01:42', '2022-01-03 11:04:58', NULL);
INSERT INTO `bag` VALUES ('2ceef458-d2a9-44e7-be75-35e324241c52', 'marriageRegistration', '{\"name\": \"张国栋\", \"issuingAuthority\": \"安丘\", \"registrationDate\": \"2022-01-18\", \"marriageRegistrationPhoto1\": \"/public/upload/others/2022/01/04/1641281197759118.jpg\"}', '2022-01-04 15:26:39', '2022-01-04 15:26:39', NULL);
INSERT INTO `bag` VALUES ('53de6814-becf-4c0a-98ba-08f32eabfa7a', 'drivingLicense', '{\"sex\": \"1\", \"name\": \"张国栋\", \"class\": \"D\", \"address\": \"12121212\", \"dateOfBirth\": \"2021-12-15\", \"nationality\": \"中国\", \"validPeriod\": [\"2022-01-02\", \"2022-01-05\"], \"identityNumber\": \"370784199206224510\", \"issuingAuthority\": \"131313\", \"drivingLicensePhoto1\": \"/public/upload/others/2021/12/23/1640234557461327.jpg\", \"drivingLicensePhoto2\": \"/public/upload/others/2021/12/23/1640234560230941.jpg\"}', '2021-12-23 12:42:42', '2021-12-23 12:51:56', '2021-12-23 12:51:56');
INSERT INTO `bag` VALUES ('66f3a90e-3a88-4eac-b634-918d2e233ae5', 'businessLicense', '{\"name\": \"营业执照1\", \"businessTerm\": [\"2022-01-20\", \"2029-06-08\"], \"businessLicensePhoto1\": \"/public/upload/others/2022/01/10/164178452121862.jpg\", \"unifiedSocialCreditCode\": \"23444444444444444444444\"}', '2022-01-10 11:16:00', '2022-01-10 11:16:00', NULL);
INSERT INTO `bag` VALUES ('77cb0a13-18b4-44b1-8c80-a1d3d999da6c', 'drivingLicense', '{\"sex\": \"1\", \"name\": \"12\", \"class\": \"12\", \"address\": \"1212\", \"dateOfBirth\": \"2021-12-15\", \"nationality\": \"中国\", \"validPeriod\": [\"2022-01-18\", \"2022-01-21\"], \"identityNumber\": \"12\", \"issuingAuthority\": \"12\", \"drivingLicensePhoto1\": \"/public/upload/others/2021/12/23/1640235105315460.jpg\", \"drivingLicensePhoto2\": \"/public/upload/others/2021/12/23/1640235108409630.jpg\"}', '2021-12-23 12:51:50', '2021-12-23 12:52:01', '2021-12-23 12:52:01');
INSERT INTO `bag` VALUES ('97a8235e-9a69-478f-aa61-30e7ad33fa3a', 'ownershipCertificate', '{\"name\": \"恒大名都35号楼1\", \"registrationDate\": \"2022-01-12\", \"ownershipCertificatePhoto1\": \"/public/upload/others/2022/01/04/1641286880764540.jpg\"}', '2022-01-04 17:01:22', '2022-01-04 17:01:59', NULL);
INSERT INTO `bag` VALUES ('ae66385f-f9c5-4967-a3db-c8277319e19d', 'birthCertificate', '{\"name\": \"1\", \"birthTime\": \"2022-02-02 00:00:00\", \"birthCertificatePhoto1\": \"/public/upload/others/2022/02/22/164549049673572.jpg\"}', '2022-02-22 08:41:38', '2022-02-22 08:41:38', NULL);
INSERT INTO `bag` VALUES ('b3f07b5d-ef88-4119-ba1d-e4e34cf91f31', 'identityCard', '{\"dob\": \"2021-12-08\", \"sex\": \"1\", \"name\": \"111\", \"address\": \"12312121313131\", \"validity\": [\"2021-12-09\", \"2022-01-05\"], \"nationality\": \"汉族\", \"identityNumber\": \"1213131313131313\", \"identityCardBack\": \"/public/upload/others/2021/12/22/1640185359176995.jpg\", \"issuingAuthority\": \"131313\", \"identityCardFront\": \"/public/upload/others/2021/12/22/1640185362137369.jpg\"}', '2021-12-22 23:02:58', '2021-12-22 23:04:59', '2021-12-22 23:04:59');
INSERT INTO `bag` VALUES ('b499e838-7e51-4d01-8b90-dc501a24f410', 'drivingLicense', '{\"sex\": \"1\", \"name\": \"张国栋\", \"class\": \"C1D\", \"address\": \"1212\", \"dateOfBirth\": \"2021-12-22\", \"nationality\": \"中国\", \"validPeriod\": [\"2022-02-23\", \"2022-02-26\"], \"identityNumber\": \"112\", \"issuingAuthority\": \"1\", \"drivingLicensePhoto1\": \"/public/upload/others/2021/12/23/1640235151266449.jpg\", \"drivingLicensePhoto2\": \"/public/upload/others/2021/12/23/1640235153800937.jpg\"}', '2021-12-23 12:52:35', '2021-12-23 12:52:35', NULL);
INSERT INTO `bag` VALUES ('be341482-3bd4-4a76-be97-1202ce298698', 'householdRegister', '{\"name\": \"娘家户口本\", \"householdNo\": \"333\", \"typeOfHousehold\": \"家庭户口\", \"householdRegisterPhoto1\": \"/public/upload/others/2022/01/10/1641786001802343.jpg\", \"householdRegisterPhotoList\": [{\"raw\": {\"uid\": 1641971923992}, \"uid\": 1641971923992, \"url\": \"/public/upload/others/2022/01/12/1641971924044692.jpg\", \"name\": \"27052900.jpg\", \"size\": 3918, \"status\": \"success\", \"response\": {\"data\": {\"code\": 200, \"data\": {\"url\": \"/public/upload/others/2022/01/12/1641971924044692.jpg\"}, \"message\": \"success\"}, \"config\": {\"url\": \"api/upload\", \"data\": {}, \"method\": \"post\", \"baseUrl\": \"http://localhost:7001\", \"headers\": {\"accept\": \"application/json, text/plain, */*\", \"authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJpZCI6IjEifSwiaWF0IjoxNjQxOTcxNjcyLCJleHAiOjE2NDE5NzIyNzJ9.U63WbcVT_zDjP6JXdbP7JHkzRTu2AAp8C1x1l6ixCFY\"}, \"timeout\": 0, \"transitional\": {\"forcedJsonParsing\": true, \"silentJsonParsing\": true, \"clarifyTimeoutError\": false}, \"maxBodyLength\": -1, \"xsrfCookieName\": \"XSRF-TOKEN\", \"xsrfHeaderName\": \"X-XSRF-TOKEN\", \"maxContentLength\": -1, \"transformRequest\": [null], \"transformResponse\": [null]}, \"status\": 200, \"headers\": {\"contentType\": \"application/json; charset=utf-8\", \"contentLength\": \"103\"}, \"request\": {}, \"statusText\": \"OK\"}, \"percentage\": 100}, {\"raw\": {\"uid\": 1641971932215}, \"uid\": 1641971932215, \"url\": \"/public/upload/others/2022/01/12/1641971932303864.jpg\", \"name\": \"微信图片_20210723092733.jpg\", \"size\": 86012, \"status\": \"success\", \"response\": {\"data\": {\"code\": 200, \"data\": {\"url\": \"/public/upload/others/2022/01/12/1641971932303864.jpg\"}, \"message\": \"success\"}, \"config\": {\"url\": \"api/upload\", \"data\": {}, \"method\": \"post\", \"baseUrl\": \"http://localhost:7001\", \"headers\": {\"accept\": \"application/json, text/plain, */*\", \"authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJpZCI6IjEifSwiaWF0IjoxNjQxOTcxNjcyLCJleHAiOjE2NDE5NzIyNzJ9.U63WbcVT_zDjP6JXdbP7JHkzRTu2AAp8C1x1l6ixCFY\"}, \"timeout\": 0, \"transitional\": {\"forcedJsonParsing\": true, \"silentJsonParsing\": true, \"clarifyTimeoutError\": false}, \"maxBodyLength\": -1, \"xsrfCookieName\": \"XSRF-TOKEN\", \"xsrfHeaderName\": \"X-XSRF-TOKEN\", \"maxContentLength\": -1, \"transformRequest\": [null], \"transformResponse\": [null]}, \"status\": 200, \"headers\": {\"contentType\": \"application/json; charset=utf-8\", \"contentLength\": \"103\"}, \"request\": {}, \"statusText\": \"OK\"}, \"percentage\": 100}, {\"raw\": {\"uid\": 1641972767255}, \"uid\": 1641972767255, \"url\": \"/public/upload/others/2022/01/12/164197276731194.jpg\", \"name\": \"27052900.jpg\", \"size\": 3918, \"status\": \"success\", \"response\": {\"data\": {\"code\": 200, \"data\": {\"url\": \"/public/upload/others/2022/01/12/164197276731194.jpg\"}, \"message\": \"success\"}, \"config\": {\"url\": \"api/upload\", \"data\": {}, \"method\": \"post\", \"baseURL\": \"http://localhost:7001\", \"headers\": {\"Accept\": \"application/json, text/plain, */*\", \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJpZCI6IjEifSwiaWF0IjoxNjQxOTcyNzY0LCJleHAiOjE2NDE5NzMzNjR9.7cqLkj7E4g1dKLZC4b6wTwbTKxcHFPSEftJcG3loi5Q\"}, \"timeout\": 0, \"transitional\": {\"forcedJSONParsing\": true, \"silentJSONParsing\": true, \"clarifyTimeoutError\": false}, \"maxBodyLength\": -1, \"xsrfCookieName\": \"XSRF-TOKEN\", \"xsrfHeaderName\": \"X-XSRF-TOKEN\", \"maxContentLength\": -1, \"transformRequest\": [null], \"transformResponse\": [null]}, \"status\": 200, \"headers\": {\"content-type\": \"application/json; charset=utf-8\", \"content-length\": \"102\"}, \"request\": {}, \"statusText\": \"OK\"}, \"percentage\": 100}, {\"raw\": {\"uid\": 1641972771232}, \"uid\": 1641972771232, \"url\": \"/public/upload/others/2022/01/12/1641972771267486.jpg\", \"name\": \"微信图片_20210723092733.jpg\", \"size\": 86012, \"status\": \"success\", \"response\": {\"data\": {\"code\": 200, \"data\": {\"url\": \"/public/upload/others/2022/01/12/1641972771267486.jpg\"}, \"message\": \"success\"}, \"config\": {\"url\": \"api/upload\", \"data\": {}, \"method\": \"post\", \"baseURL\": \"http://localhost:7001\", \"headers\": {\"Accept\": \"application/json, text/plain, */*\", \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJpZCI6IjEifSwiaWF0IjoxNjQxOTcyNzY0LCJleHAiOjE2NDE5NzMzNjR9.7cqLkj7E4g1dKLZC4b6wTwbTKxcHFPSEftJcG3loi5Q\"}, \"timeout\": 0, \"transitional\": {\"forcedJSONParsing\": true, \"silentJSONParsing\": true, \"clarifyTimeoutError\": false}, \"maxBodyLength\": -1, \"xsrfCookieName\": \"XSRF-TOKEN\", \"xsrfHeaderName\": \"X-XSRF-TOKEN\", \"maxContentLength\": -1, \"transformRequest\": [null], \"transformResponse\": [null]}, \"status\": 200, \"headers\": {\"content-type\": \"application/json; charset=utf-8\", \"content-length\": \"103\"}, \"request\": {}, \"statusText\": \"OK\"}, \"percentage\": 100}, {\"raw\": {\"uid\": 1641972775853}, \"uid\": 1641972775853, \"url\": \"/public/upload/others/2022/01/12/1641972775894672.jpg\", \"name\": \"IMG_0591.JPG\", \"size\": 136255, \"status\": \"success\", \"response\": {\"data\": {\"code\": 200, \"data\": {\"url\": \"/public/upload/others/2022/01/12/1641972775894672.jpg\"}, \"message\": \"success\"}, \"config\": {\"url\": \"api/upload\", \"data\": {}, \"method\": \"post\", \"baseURL\": \"http://localhost:7001\", \"headers\": {\"Accept\": \"application/json, text/plain, */*\", \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJpZCI6IjEifSwiaWF0IjoxNjQxOTcyNzY0LCJleHAiOjE2NDE5NzMzNjR9.7cqLkj7E4g1dKLZC4b6wTwbTKxcHFPSEftJcG3loi5Q\"}, \"timeout\": 0, \"transitional\": {\"forcedJSONParsing\": true, \"silentJSONParsing\": true, \"clarifyTimeoutError\": false}, \"maxBodyLength\": -1, \"xsrfCookieName\": \"XSRF-TOKEN\", \"xsrfHeaderName\": \"X-XSRF-TOKEN\", \"maxContentLength\": -1, \"transformRequest\": [null], \"transformResponse\": [null]}, \"status\": 200, \"headers\": {\"content-type\": \"application/json; charset=utf-8\", \"content-length\": \"103\"}, \"request\": {}, \"statusText\": \"OK\"}, \"percentage\": 100}, {\"raw\": {\"uid\": 1641972779533}, \"uid\": 1641972779533, \"url\": \"/public/upload/others/2022/01/12/1641972779577398.png\", \"name\": \"miaomiao.png\", \"size\": 19378, \"status\": \"success\", \"response\": {\"data\": {\"code\": 200, \"data\": {\"url\": \"/public/upload/others/2022/01/12/1641972779577398.png\"}, \"message\": \"success\"}, \"config\": {\"url\": \"api/upload\", \"data\": {}, \"method\": \"post\", \"baseURL\": \"http://localhost:7001\", \"headers\": {\"Accept\": \"application/json, text/plain, */*\", \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJpZCI6IjEifSwiaWF0IjoxNjQxOTcyNzY0LCJleHAiOjE2NDE5NzMzNjR9.7cqLkj7E4g1dKLZC4b6wTwbTKxcHFPSEftJcG3loi5Q\"}, \"timeout\": 0, \"transitional\": {\"forcedJSONParsing\": true, \"silentJSONParsing\": true, \"clarifyTimeoutError\": false}, \"maxBodyLength\": -1, \"xsrfCookieName\": \"XSRF-TOKEN\", \"xsrfHeaderName\": \"X-XSRF-TOKEN\", \"maxContentLength\": -1, \"transformRequest\": [null], \"transformResponse\": [null]}, \"status\": 200, \"headers\": {\"content-type\": \"application/json; charset=utf-8\", \"content-length\": \"103\"}, \"request\": {}, \"statusText\": \"OK\"}, \"percentage\": 100}]}', '2022-01-10 11:40:04', '2022-01-12 15:33:02', NULL);
INSERT INTO `bag` VALUES ('c3a0350a-2439-4821-a33f-0b63a4c01cec', 'IDCard', '{\"ID\": \"12\", \"dob\": \"2021-12-14 00:00:00\", \"sex\": \"1\", \"name\": \"12\", \"address\": \"12\", \"validity\": [\"2022-01-09\", \"2022-01-11\"], \"IDCardBack\": \"/public/upload/others/2021/12/22/1640184074963765.jpg\", \"IDCardFront\": \"/public/upload/others/2021/12/22/1640184072511926.jpg\", \"nationality\": \"汉族\", \"issuingAuthority\": \"12\"}', '2021-12-22 22:42:56', '2021-12-22 23:04:51', '2021-12-22 23:04:51');
INSERT INTO `bag` VALUES ('cc92753b-52e7-461f-b421-df0a8a8e0d9a', 'identityCard', '{\"dob\": \"2021-12-15\", \"sex\": \"1\", \"name\": \"张国栋\", \"address\": \"安丘市景芝镇院上村安丘市景芝镇院上村\", \"validity\": [\"2021-12-17\", \"2022-01-11\"], \"nationality\": \"壮族\", \"validPeriod\": [\"2021-12-16\", \"2021-12-17\"], \"identityNumber\": \"370784199206224510\", \"identityCardBack\": \"/public/upload/others/2021/12/22/1640185522268897.jpg\", \"issuingAuthority\": \"安丘市景芝镇派出所派出所派出所\", \"identityCardFront\": \"/public/upload/others/2021/12/22/1640185518000850.jpg\"}', '2021-12-22 23:05:24', '2021-12-23 12:51:28', NULL);
INSERT INTO `bag` VALUES ('defadb8c-9c1f-4584-8ac5-48a1a8aeb874', 'birthCertificate', '{\"name\": \"张麦琪\", \"birthTime\": \"2022-01-07 02:04:05\", \"birthCertificatePhoto1\": \"/public/upload/others/2022/01/07/1641540129924390.jpg\"}', '2022-01-07 15:22:11', '2022-01-07 15:22:11', NULL);
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
INSERT INTO `notification` VALUES ('27d35bf6-0a92-4d50-87b5-2774ee0a1383', '999', '99', '1', '85dd811f-d50b-4083-8981-ae11b4694d32', '1', '999', '2021-12-13 17:18:42', '2022-02-26 05:29:40', NULL);
INSERT INTO `notification` VALUES ('281457d5-45e7-44e6-a6b4-b8ad3a5735a2', '1', '1', '2', '1', '1', '1', '2021-12-12 17:17:10', '2021-12-12 17:19:47', NULL);
INSERT INTO `notification` VALUES ('5d102c26-9460-4515-94e0-61b065af9125', '12', '2', '1', '1', '1', '2', '2021-12-12 17:20:07', '2022-02-26 05:29:40', NULL);
INSERT INTO `notification` VALUES ('74eb5754-1b32-4f51-b101-939c5179f97a', '333', '', '2', NULL, '1', '', '2021-12-14 17:31:15', '2022-02-26 05:29:40', NULL);
INSERT INTO `notification` VALUES ('ccd7fba5-de9b-4550-bf45-7040b53aa610', '1', '12', '1', '8e582792-7b56-4d43-83c3-a020941f3208', '1', '133', '2021-12-13 17:11:44', '2022-02-26 05:29:40', NULL);
INSERT INTO `notification` VALUES ('e0dd0ae1-0344-47a3-926d-458a904efcc6', '1', '12', '1', '85dd811f-d50b-4083-8981-ae11b4694d32', '1', '133', '2021-12-13 17:11:44', '2022-02-26 05:29:40', NULL);
INSERT INTO `notification` VALUES ('e98d3040-f696-45de-9cec-cd0ad94ee812', '1', '12', '1', '1', '1', '133', '2021-12-13 17:11:44', '2022-02-26 05:29:40', NULL);
INSERT INTO `notification` VALUES ('f32cf6c6-2d12-4e29-a066-f798da6af51a', '999', '99', '1', '8e582792-7b56-4d43-83c3-a020941f3208', '1', '999', '2021-12-13 17:18:42', '2022-02-26 05:29:40', NULL);
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
INSERT INTO `notification_user` VALUES ('1b42fbe4-39fd-4fad-9b2b-6604ce5b48cf', '5d102c26-9460-4515-94e0-61b065af9125', '1', 1, '2021-12-14 17:27:11', '2022-02-18 11:32:05', '2022-02-26 05:29:40');
INSERT INTO `notification_user` VALUES ('5cc176e8-dbb4-4574-b5f8-74884129733a', '5d102c26-9460-4515-94e0-61b065af9125', '1', 0, '2022-03-21 21:02:47', '2022-03-21 21:02:47', NULL);
INSERT INTO `notification_user` VALUES ('739c3c3b-a3e1-4cbd-9137-2995eacb4a76', '74eb5754-1b32-4f51-b101-939c5179f97a', '1', 1, '2021-12-14 17:31:18', '2022-01-18 04:32:35', '2022-02-26 05:29:40');
INSERT INTO `notification_user` VALUES ('a65ba97d-cab6-4c68-9292-7c8d85d142c2', '281457d5-45e7-44e6-a6b4-b8ad3a5735a2', '1', 0, '2022-03-21 21:02:47', '2022-03-21 21:02:47', NULL);
INSERT INTO `notification_user` VALUES ('b678c718-e940-462b-94b6-22636e4573c3', '74eb5754-1b32-4f51-b101-939c5179f97a', '1', 0, '2022-03-21 21:02:47', '2022-03-21 21:02:47', NULL);
INSERT INTO `notification_user` VALUES ('ba8f8c08-9d5e-46e9-81e1-bcb627d0275d', 'e98d3040-f696-45de-9cec-cd0ad94ee812', '1', 1, '2021-12-14 17:27:11', '2021-12-16 19:53:48', '2022-02-26 05:29:40');
INSERT INTO `notification_user` VALUES ('ca63fa2b-a634-4ac1-89b7-ed50050c4fa2', '74eb5754-1b32-4f51-b101-939c5179f97a', 'b1040cd0-3ca8-4a35-80ae-ad8948499000', 0, '2022-02-22 15:10:32', '2022-02-22 15:10:32', '2022-02-26 05:29:40');
INSERT INTO `notification_user` VALUES ('cae22abc-01d4-4178-b9ad-fa6022ec1def', 'e98d3040-f696-45de-9cec-cd0ad94ee812', '1', 0, '2022-03-21 21:02:47', '2022-03-21 21:02:47', NULL);
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
INSERT INTO `system_login_log` VALUES ('44e3ed16-fdf4-4d3a-b83f-babab1aef092', 'admin', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36', '2022-03-21 21:02:47', '2022-03-21 21:02:47', NULL);
INSERT INTO `system_login_log` VALUES ('5ca2fece-3088-4a5a-8627-153898d61bef', 'admin', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36', '2022-03-21 20:52:09', '2022-03-21 20:52:09', NULL);
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
INSERT INTO `system_menu` VALUES ('1', NULL, '系统管理', '/system', 'directory', 'setting', 0, NULL, 0, 0, '2021-04-01 00:00:00', '2022-03-19 23:50:09', NULL);
INSERT INTO `system_menu` VALUES ('143b7df8-047c-4058-a338-1810e74d7a5a', NULL, '记账管理', '/account-manage', 'directory', 'bank', 0, NULL, 0, 0, '2022-01-17 22:22:03', '2022-01-17 22:24:11', NULL);
INSERT INTO `system_menu` VALUES ('18c33940-9bcf-49fb-a5d6-3dd5ad40250d', NULL, '卡证照管理', '/bag', 'menu', 'folder', 0, 'views/bag', 0, 0, '2021-12-21 21:55:20', '2022-03-19 23:49:39', NULL);
INSERT INTO `system_menu` VALUES ('2', '1', '权限管理', '/system/power', 'directory', 'thunderbolt', 0, NULL, 0, 0, '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_menu` VALUES ('3', '2', '菜单管理', '/system/power/menu', 'menu', 'menu', 0, 'views/system/power/menu', 0, 0, '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_menu` VALUES ('4', '1', '角色管理', '/system/role', 'menu', 'apartment', 0, 'views/system/role', 0, 0, '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_menu` VALUES ('5', '1', '用户管理', '/system/user', 'menu', 'team', 0, 'views/system/user', 0, 0, '2021-04-01 00:00:00', '2021-04-01 00:00:00', NULL);
INSERT INTO `system_menu` VALUES ('7c534ea9-77e6-4099-9ca0-6f53992486f9', '143b7df8-047c-4058-a338-1810e74d7a5a', '收支分类', '/account-manage/account-in-out-category', 'menu', 'appstore-add', 0, 'views/account-manage/account-in-out-category', 0, 0, '2022-01-17 22:24:54', '2022-01-17 22:28:29', NULL);
INSERT INTO `system_menu` VALUES ('7f6ed357-1ccb-4770-b953-3ed6e4219f0f', 'c93f6951-6776-40ba-8a1f-2ded0cc93d03', '登录日志', '/system/monitor/login-log', 'menu', 'history', 0, 'views/system/monitor/login-log', 0, 0, '2021-08-30 21:17:49', '2021-08-30 21:17:49', NULL);
INSERT INTO `system_menu` VALUES ('94ceb12d-b0eb-425a-97d5-eaffb7263a8b', '143b7df8-047c-4058-a338-1810e74d7a5a', '账本管理', '/account-book', 'menu', 'appstore-add', 0, 'views/account-manage/account-book', 0, 0, '2022-01-17 22:22:57', '2022-01-17 22:28:38', NULL);
INSERT INTO `system_menu` VALUES ('9fc9d92c-28f0-43cb-8532-e5332fc808f0', 'c93f6951-6776-40ba-8a1f-2ded0cc93d03', '在线用户', '/system/monitor/online-user', 'menu', 'link', 0, 'views/system/monitor/online-user', 0, 0, '2021-12-02 15:09:18', '2021-12-02 15:09:49', NULL);
INSERT INTO `system_menu` VALUES ('c399ef1f-9ecf-40e6-a9c8-408d8ef11872', 'c93f6951-6776-40ba-8a1f-2ded0cc93d03', '服务监控', '/system/monitor/server', 'menu', 'cloud-server', 0, 'views/system/monitor/server', 0, 0, '2021-11-30 15:01:15', '2021-11-30 15:01:15', NULL);
INSERT INTO `system_menu` VALUES ('c93f6951-6776-40ba-8a1f-2ded0cc93d03', '1', '系统监控', '/system/monitor', 'directory', 'monitor', 0, NULL, 0, 0, '2021-08-30 21:15:21', '2021-08-30 21:15:21', NULL);
INSERT INTO `system_menu` VALUES ('d966af2b-b199-44e9-9eae-3ec42a5aa4d7', '143b7df8-047c-4058-a338-1810e74d7a5a', '收支明细', '/account-manage/account-in-out', 'menu', 'appstore-add', 0, 'views/account-manage/account-in-out', 0, 0, '2022-01-17 22:25:27', '2022-01-17 22:28:45', NULL);
INSERT INTO `system_menu` VALUES ('f45a0cd2-f4c1-494c-afc4-27878751f492', NULL, '消息通知', '/notification', 'menu', 'notification', 0, 'views/notification', 0, 0, '2021-12-12 16:59:23', '2022-03-19 23:50:02', NULL);
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
INSERT INTO `system_power` VALUES ('0d2df267-290e-4dd2-aa66-1a73f8567cf5', '7c534ea9-77e6-4099-9ca0-6f53992486f9', 'menu', '2022-01-17 22:24:54', '2022-01-17 22:24:54');
INSERT INTO `system_power` VALUES ('1', '1', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_power` VALUES ('1189ec2d-fa3b-493a-ba53-c592a7a39778', '7f6ed357-1ccb-4770-b953-3ed6e4219f0f', 'menu', '2021-08-30 21:17:49', '2021-08-30 21:17:49');
INSERT INTO `system_power` VALUES ('2', '2', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_power` VALUES ('23ae9ef1-fa2f-44ad-a666-2450e39fd396', 'c399ef1f-9ecf-40e6-a9c8-408d8ef11872', 'menu', '2021-11-30 15:01:15', '2021-11-30 15:01:15');
INSERT INTO `system_power` VALUES ('3', '3', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_power` VALUES ('3ea249eb-fb09-4c5a-a7ee-49ea08c1630d', 'f45a0cd2-f4c1-494c-afc4-27878751f492', 'menu', '2021-12-12 16:59:23', '2021-12-12 16:59:23');
INSERT INTO `system_power` VALUES ('4', '4', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_power` VALUES ('5', '5', 'menu', '2021-04-01 00:00:00', '2021-04-01 00:00:00');
INSERT INTO `system_power` VALUES ('71891c4d-04cd-4395-a047-ce829c4ae9f4', '9fc9d92c-28f0-43cb-8532-e5332fc808f0', 'menu', '2021-12-02 15:09:18', '2021-12-02 15:09:18');
INSERT INTO `system_power` VALUES ('77d65785-ce62-4e14-a482-784f3e295925', '18c33940-9bcf-49fb-a5d6-3dd5ad40250d', 'menu', '2021-12-21 21:55:20', '2021-12-21 21:55:20');
INSERT INTO `system_power` VALUES ('aa0e5c5c-7052-436a-8b54-48e44ea94536', '94ceb12d-b0eb-425a-97d5-eaffb7263a8b', 'menu', '2022-01-17 22:22:57', '2022-01-17 22:22:57');
INSERT INTO `system_power` VALUES ('cb887751-0d68-4aea-84ea-11a63221f337', '143b7df8-047c-4058-a338-1810e74d7a5a', 'menu', '2022-01-17 22:22:03', '2022-01-17 22:22:03');
INSERT INTO `system_power` VALUES ('d9bd7d4a-216d-4516-bf1b-982b2f53b18b', 'c93f6951-6776-40ba-8a1f-2ded0cc93d03', 'menu', '2021-08-30 21:15:22', '2021-08-30 21:15:22');
INSERT INTO `system_power` VALUES ('e99bbeac-303a-49a2-91b3-19585e47af32', 'd966af2b-b199-44e9-9eae-3ec42a5aa4d7', 'menu', '2022-01-17 22:25:27', '2022-01-17 22:25:27');
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
INSERT INTO `system_role_power` VALUES ('0c2f35a2-4973-42ef-bad3-d14995ee9ab6', '1', '2', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` VALUES ('196f9547-a852-4892-9495-6e251b1876e8', '1', '4', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` VALUES ('47c7893a-1fed-47e3-b245-ee375b028ee9', '1', 'd9bd7d4a-216d-4516-bf1b-982b2f53b18b', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` VALUES ('4e9e34eb-57b6-4857-bd72-ed2b9538804a', '1', '0d2df267-290e-4dd2-aa66-1a73f8567cf5', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` VALUES ('52cbb892-f65b-42b4-b1d0-2c971461d89e', '1', '1189ec2d-fa3b-493a-ba53-c592a7a39778', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` VALUES ('648a6c3e-379f-4153-99e6-f39544fdcbfa', '1', 'e99bbeac-303a-49a2-91b3-19585e47af32', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` VALUES ('7481b09e-dc2f-48f4-ac67-fe43cc471e29', '2', '3ea249eb-fb09-4c5a-a7ee-49ea08c1630d', '2021-12-12 17:04:08', '2021-12-12 17:04:08');
INSERT INTO `system_role_power` VALUES ('9eef6e31-d9a0-4b61-bc5f-eac90a9a89b0', '1', '71891c4d-04cd-4395-a047-ce829c4ae9f4', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` VALUES ('b5b46e27-1e3a-4861-8bb7-166f63f6f403', '1', '3ea249eb-fb09-4c5a-a7ee-49ea08c1630d', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` VALUES ('bf2fd3f8-d0af-413b-a000-c1da03f68ff9', '1', 'aa0e5c5c-7052-436a-8b54-48e44ea94536', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` VALUES ('caa2671a-3544-4e72-95e0-fd418682ecde', '1', '23ae9ef1-fa2f-44ad-a666-2450e39fd396', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` VALUES ('daa5e46f-a237-45c8-ac2d-74960e6d575d', '1', '3', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` VALUES ('dc759559-c0af-4a5c-a203-593588fbc83b', '1', 'cb887751-0d68-4aea-84ea-11a63221f337', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` VALUES ('dcc5e4d8-2a0c-484b-8f57-8739b4ed0561', '1', '1', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` VALUES ('f52aa514-a463-4396-9d88-863a3957fe0c', '1', '5', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
INSERT INTO `system_role_power` VALUES ('f5490e1c-768f-40ed-8bcc-b8def606c34c', '1', '77d65785-ce62-4e14-a482-784f3e295925', '2022-01-17 22:29:03', '2022-01-17 22:29:03');
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
INSERT INTO `system_session` VALUES ('867e040e-f341-4fb1-9986-183773b155bc', '1', 'f35962a0-c1ac-4624-8969-3d66408b8350', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', '2022-03-21 21:02:47', '2022-03-21 21:02:47', NULL);
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
INSERT INTO `system_user` VALUES ('1', 'admin', '$2a$10$fEfkf66Q91Jyef27VFMBYeYJkX.6aJFcXig7SQtsoixvsdoS0aIOu', 'admin', '超级管理员', NULL, NULL, 'hilanmiao@126.com', '18353674768', '1', '/public/upload/avatars/2022/03/21/1647867779596430.jpg', '努力做一个不平凡的人，同时做好平凡的事！', NULL, '1', '2021-04-01 00:00:00', '2022-03-21 21:04:20', NULL);
INSERT INTO `system_user` VALUES ('7147ca09-0930-4d41-b3d1-3d684d9ee85e', 'hy', '$2a$10$0MBYfjPQJZgmKGEETMn7meTZji4XHvgT5C.c33ZvHkiw2SKtWAmPK', 'Kris', '桑鸿煜', NULL, NULL, 'sheepking@vip.qq.com', '15000903896', '1', '', '', NULL, '1', '2022-02-26 05:33:13', '2022-02-26 05:33:13', NULL);
INSERT INTO `system_user` VALUES ('85dd811f-d50b-4083-8981-ae11b4694d32', 'test2', '$2a$10$iajx6r8HFH5QXAVdo6rEHeqMZVcGI7NGy6Kd3GFNKJVosY4DvEfSu', '', '', NULL, NULL, '', '18353674768', '1', '', '', NULL, '1', '2021-12-06 19:57:34', '2022-02-26 05:30:18', '2022-02-26 05:30:18');
INSERT INTO `system_user` VALUES ('8e582792-7b56-4d43-83c3-a020941f3208', 'test', '$2a$10$5Cc867rYiXgHklz5vuND8uG.VP13bDnPPJ5sYG0Q9qMEgd/GQK05.', '', '', NULL, NULL, '', '18353674768', '1', '', '', NULL, '1', '2021-12-03 10:59:58', '2022-02-26 05:30:18', '2022-02-26 05:30:18');
INSERT INTO `system_user` VALUES ('b1040cd0-3ca8-4a35-80ae-ad8948499000', '147258', '$2a$10$Ndd6lTJFF0A81ThxRmzSZeRACWLATIpPdZ9XjD51i8BQRUMQVji8G', '', '', NULL, NULL, '', '13780725252', '1', '', '', NULL, '1', '2022-02-22 15:10:04', '2022-02-26 05:30:18', '2022-02-26 05:30:18');
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
INSERT INTO `system_user_role` VALUES ('82b69785-b9fc-4579-b1af-b2f8165b6164', '7147ca09-0930-4d41-b3d1-3d684d9ee85e', '2', '2022-02-26 05:33:14', '2022-02-26 05:33:14', NULL);
INSERT INTO `system_user_role` VALUES ('e953fff6-88d1-466c-8f75-2ef49d71b248', '1', '1', '2022-03-21 21:04:21', '2022-03-21 21:04:21', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
