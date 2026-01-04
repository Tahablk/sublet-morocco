import express from "express";

const router = express.Router();

/* TEMP LOGIN (no DB yet) */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "host@atlasstay.local" && password === "123456") {
    return res.json({
      token: "fake-jwt-token-for-now",
      role: "host"
    });
  }

  res.status(401).json({ error: "Invalid credentials" });
});

export default router;
