const connections = require("../app/database");

class userService {
  async getUserInfoById(id) {
    const statement = "select id,username,tel from user where id = ?";
    const dbRes = await connections.execute(statement, [id]);
    return dbRes[0];
  }

  async uploadAvatarByUserId(id, avatarUrl) {
    const statement = "update user set avatar = ? where id = ?;";
    const dbRes = await connections.execute(statement, [avatarUrl, id]);
    return dbRes[0];
  }
}

module.exports = new userService();
