const router = require("express").Router();
const auth = require("../middlewares/auth");
const requireRole = require("../middlewares/requireRole");

router.get("/admin/ping", auth, requireRole("admin"), (req, res) => {
  res.json({ ok: true, user: req.user });
});

module.exports = router;