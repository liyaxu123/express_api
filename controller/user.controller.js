const {
  getUserInfoById,
  uploadAvatarByUserId,
} = require("../service/user.service");
const { APP_PORT } = require("../app/config");

class userController {
  async handleGetUserInfoById(req, res) {
    const { id } = req.query;
    const dbRes = await getUserInfoById(id);

    res.send({
      code: 0,
      msg: "请求成功",
      data: dbRes,
    });
  }

  async handleUploadAvatart(req, res) {
    const { filename } = req.file;
    const { id } = req.userInfo;
    const avatarUrl = `http://localhost:${APP_PORT}/${filename}`;
    await uploadAvatarByUserId(id, avatarUrl);

    res.send({
      code: 0,
      msg: "头像上传成功",
    });
  }
}

module.exports = new userController();
