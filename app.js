const path = require("path");
const express = require("express");
const app = express();
// 导入配置文件
const { APP_PORT } = require("./app/config");
// 链接MySQL数据库
require("./app/database");

// 解析POST请求参数
app.use(express.json()); // 解析JSON格式
app.use(express.urlencoded()); // 解析form表单格
// 处理静态资源
app.use(express.static(path.join(__dirname, "uploads")));

// 注册路由
const router = require("./router");
app.use("/api/v1", router);

app.listen(APP_PORT, () => {
  console.log(`服务器启动成功：http://localhost:${APP_PORT}`);
});
