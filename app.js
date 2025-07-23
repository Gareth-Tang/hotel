const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");
const app = express();

// 解析 JSON 请求体
app.use(express.json());
// 提供静态文件（网页）
app.use(express.static(path.join(__dirname, "public")));

// 数据库连接配置
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "n3u3da!", // 你的密码
  database: "hotel_db", // 你的酒店数据库
  connectionLimit: 10,
});

// 测试数据库连接
async function testDbConnection() {
  try {
    const conn = await pool.getConnection();
    console.log("✅ 数据库连接成功（hotel_db）");
    conn.release();
  } catch (err) {
    console.error("❌ 数据库连接失败:", err.message);
  }
}
testDbConnection();

// 1. 获取所有酒店（GET /hotels）
app.get("/hotels", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM hotel");
    res.json(rows); // 返回 JSON 格式，方便网页解析
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. 添加酒店（POST /add-hotel）
app.post("/add-hotel", async (req, res) => {
  const { name, location, star_rating, has_pool } = req.body;

  // 验证必填字段
  if (!name || !location) {
    return res.status(400).json({ error: "酒店名称和地址为必填项" });
  }
  // 验证星级（1-5）
  if (star_rating < 1 || star_rating > 5) {
    return res.status(400).json({ error: "星级必须为 1-5 之间的整数" });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO hotel (name, location, star_rating, has_pool) VALUES (?, ?, ?, ?)",
      [name, location, star_rating, has_pool]
    );
    res.json({ message: "酒店添加成功", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. 更新酒店（PUT /update-hotel/:id）
app.put("/update-hotel/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, location, star_rating, has_pool } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID 必须是数字" });
  }

  try {
    const [result] = await pool.execute(
      "UPDATE hotel SET name=?, location=?, star_rating=?, has_pool=? WHERE id=?",
      [name, location, star_rating, has_pool, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "未找到该酒店" });
    }
    res.json({ message: `ID ${id} 酒店更新成功` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. 删除酒店（DELETE /delete-hotel/:id）
app.delete("/delete-hotel/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID 必须是数字" });
  }

  try {
    const [result] = await pool.execute("DELETE FROM hotel WHERE id=?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "未找到该酒店" });
    }
    res.json({ message: `ID ${id} 酒店删除成功` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 启动服务
app.listen(3000, () => {
  console.log("酒店管理系统运行在 http://localhost:3000");
});