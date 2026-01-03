require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const listingRoutes = require("./routes/listing.routes");

const errorMiddleware = require("./middleware/error.middleware");

const app = express();

/* ---------- Global middleware ---------- */
app.use(cors({
  origin: "http://localhost:5500", // frontend later
  credentials: true
}));

app.use(express.json());

/* ---------- Routes ---------- */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Sublet Morocco API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);

/* ---------- Error handling ---------- */
app.use(errorMiddleware);

module.exports = app;
