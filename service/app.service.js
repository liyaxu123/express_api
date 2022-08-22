const connections = require("../app/database");

class appService {
  // 通过用户名和密码来获取用户信息
  async getUserByUsername(username, password) {
    const statement = "select * from user where username = ? and password = ?";
    const dbRes = await connections.execute(statement, [username, password]);
    return dbRes[0];
  }

  // 插入数据
  async addUser(username, password, tel) {
    const statement =
      "insert into user (username, password, tel) values (?, ?, ?)";
    const dbRes = await connections.execute(statement, [
      username,
      password,
      tel,
    ]);
    return dbRes[0];
  }
}

module.exports = new appService();
