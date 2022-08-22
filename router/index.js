const express = require("express");
const router = express.Router();

// 系统登录注册模块
router.use("/sys", require("./app"));
// 用户管理模块
router.use("/user", require("./user"));

module.exports = router;
