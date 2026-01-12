const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Proyecto Node.js ejecutándose con Docker");
});

app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});