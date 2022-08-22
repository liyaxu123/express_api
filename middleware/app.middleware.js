const { getUserByUsername } = require("../service/app.service");
const md5 = require("../utils/md5");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRETKEY } = require("../app/config");

// 校验注册的中间件
const verifyRegister = async (req, res, next) => {
  const { username, password, tel } = req.body;

  if (!username || !password || !tel) {
    res.status(401).json({
      code: "-1",
      msg: "用户名和密码和手机号必填",
    });
    return;
  }

  try {
    // 查询数据库，查询用户在数据库中是否存在
    const dbRes = await getUserByUsername(username, password);
    if (dbRes.length !== 0) {
      res.send({
        code: -1,
        msg: "该用户已注册，请登录",
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("服务器出问题了~~");
    return;
  }

  next();
};

// 登录中间件
const verifyLogin = async (req, res, next) => {
  // 1、获取到前端传过来的数据
  // 2、判断数据是否存在
  // 3、判断该用户是否存在
  // 4、判断用户名和密码是否匹配
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).json({
      code: -1,
      msg: "用户名和密码不能不空",
    });
    return;
  }

  const dbRes = await getUserByUsername(username, md5(password));
  if (dbRes.length === 0) {
    res.status(401).json({
      code: -1,
      msg: "用户名不存在，请注册",
    });

    return;
  }

  if (md5(password) !== dbRes[0].password) {
    res.status(401).json({
      code: -1,
      msg: "密码不正确，请重新登录",
    });
    return;
  }

  req.userInfo = dbRes[0];
  next();
};

// 校验Token
const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({
      code: -1,
      msg: "Token不存在",
    });

    return;
  }

  const token = authorization.replace("Bearer ", "");
  try {
    // 解析Token
    const decoded = jwt.verify(token, TOKEN_SECRETKEY);
    req.userInfo = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      code: -1,
      msg: "无效的token",
    });
    return;
  }
};

module.exports = {
  verifyRegister,
  verifyLogin,
  verifyToken,
};
