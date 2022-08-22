const crypto = require("crypto");

// 使用crypto内置模块的mds对密码进行加密
const md5password = (password) => {
  const md5 = crypto.createHash("md5");
  const result = md5.update(password).digest("hex");
  return result;
};

module.exports = md5password;
