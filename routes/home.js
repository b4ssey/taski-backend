const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welome to Taski by Ekemini!!");
});

module.exports = router;
