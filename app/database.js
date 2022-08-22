const mysql = require("mysql2");
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_CONNECTIONLIMIT,
  MYSQL_DATABASE,
  MYSQL_QUEUELIMIT,
} = require("./config");

// 创建连接池
const connections = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  connectionLimit: MYSQL_CONNECTIONLIMIT,
  queueLimit: MYSQL_QUEUELIMIT,
});

connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log("连接失败：", err);
    } else {
      console.log("数据库连接成功~");
    }
  });
});

module.exports = connections.promise();
