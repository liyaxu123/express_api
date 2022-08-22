const express = require("express");
const router = express.Router();
const https = require("https");
const { WX_APPID, WX_APPSECRET } = require("../app/config");

// 控制器
const { handleRegister, handleLogin } = require("../controller/app.controller");
// 中间件
const { verifyRegister, verifyLogin } = require("../middleware/app.middleware");

// 用户注册
router.post("/register", verifyRegister, handleRegister);

// 用户登录
router.post("/login", verifyLogin, handleLogin);

// 微信登录
router.get("/wxLogin", (req, res) => {
  console.log(req.query);
  // 向微信服务器发送网络请求
  https.get(
    `https://api.weixin.qq.com/sns/jscode2session?appid=${WX_APPID}&secret=${WX_APPSECRET}&js_code=${req.query.code}&grant_type=authorization_code`,
    (res) => {
      let data = "";
      res.on("data", (chunk) => {
        console.log("请求回来的数据：", chunk);
        data += chunk;
      });
      // 接收数据完毕
      res.on("end", () => {
        console.log(JSON.parse(data));
        /* 
            openid：微信用户的唯一标识
            session_key：
          */
        const { openid, session_key } = JSON.parse(data);
        // 生成token，返回给前端
      });
    }
  );

  res.send({
    code: 0,
    msg: "wx登录成功",
  });
});

module.exports = router;
