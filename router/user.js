const express = require("express");
const router = express.Router();
const {
  handleGetUserInfoById,
  handleUploadAvatart,
} = require("../controller/user.controller");
const { verifyToken } = require("../middleware/app.middleware");
const upload = require("../utils/upload");

router
  .get("/user", verifyToken, handleGetUserInfoById)
  .post(
    "/uploadAvatar",
    verifyToken,
    upload.single("avatar"),
    handleUploadAvatart
  );

module.exports = router;
