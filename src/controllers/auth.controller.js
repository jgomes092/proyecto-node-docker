const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const DEMO_USER = {
  id: "1",
  username: "admin",
  // password: Admin123!
  passwordHash: bcrypt.hashSync("Admin123!", 10),
  role: "admin",
};

exports.login = async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: "MISSING_CREDENTIALS" });
  }

  if (username !== DEMO_USER.username) {
    return res.status(401).json({ error: "INVALID_CREDENTIALS" });
  }

  const ok = await bcrypt.compare(password, DEMO_USER.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: "INVALID_CREDENTIALS" });
  }

  const token = jwt.sign(
    { sub: DEMO_USER.id, role: DEMO_USER.role, username: DEMO_USER.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "8h" }
  );

  return res.json({ token });
};