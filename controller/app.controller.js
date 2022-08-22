const { addUser } = require("../service/app.service");
const md5 = require("../utils/md5");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRETKEY } = require("../app/config");

class appController {
  // 处理注册的业务逻辑
  async handleRegister(req, res) {
    // 0、获取到前端传过来的数据
    // 1、校验注册信息是否存在，不存在的话，就不往下进行了
    // 2、校验该用户是否注册过，如果没有注册，则注册
    // 3、将用户信息保存到数据库里面
    const { username, password, tel } = req.body;

    try {
      await addUser(username, md5(password), tel);
      res.json({
        code: 0,
        msg: "注册成功",
      });
    } catch (error) {
      res.status(500);
    }
  }

  // 处理登录的业务逻辑
  handleLogin(req, res) {
    const { id, username, tel, gender, avatar, nickname } = req.userInfo;

    // 生成token，返回给前端
    res.send({
      code: 0,
      msg: "请求成功",
      data: {
        id,
        username,
        tel,
        gender,
        avatar,
        nickname,
        token: jwt.sign(
          { id, username, tel, gender, avatar, nickname },
          TOKEN_SECRETKEY,
          { expiresIn: 60 * 60 * 24 }
        ),
      },
    });
  }
}

module.exports = new appController();
