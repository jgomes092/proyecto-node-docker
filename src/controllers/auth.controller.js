const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db/mysql");

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ error: "MISSING_CREDENTIALS" });
    }

    const [rows] = await pool.execute(
      "SELECT id, username, password_hash, role, is_active FROM users WHERE username = ? LIMIT 1",
      [username]
    );

    if (!rows.length || !rows[0].is_active) {
      return res.status(401).json({ error: "INVALID_CREDENTIALS" });
    }

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: "INVALID_CREDENTIALS" });
    }

    const token = jwt.sign(
      { sub: String(user.id), role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "8h" }
    );

    return res.json({ token });
  } catch (err) {
    return next(err);
  }
};