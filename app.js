// 引入 mysql2 库
const mysql = require('mysql2'); 

// 创建数据库连接（填自己的 host、user、password、database ）
const connection = mysql.createConnection({
  host: 'localhost',    // 一般是 localhost，如果你改了 MySQL 绑定地址要对应改
  user: 'root',         // 你的 MySQL 用户名，比如默认常是 root
  password: 'n3u3da!',   // 你的 MySQL 密码
  database: 'hotel_db'  // 要连接的数据库名，就是你创建的 hotel_db
});

// 连接数据库
connection.connect((err) => {
  if (err) {
    console.error('连接数据库失败: ', err);
    return;
  }
  console.log('成功连接到 MySQL 数据库！');

  // 示例：查询 hotel 表数据
  const querySql = 'SELECT * FROM hotel';
  connection.query(querySql, (err, results) => {
    if (err) {
      console.error('查询失败: ', err);
      return;
    }
    console.log('查询结果: ', results);

    // 记得关闭连接（或根据业务保持长连接）
    connection.end();
  });
});