const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      city: "Marrakech",
      price: 65,
      duration: "night",
    },
  ]);
});

module.exports = router;
