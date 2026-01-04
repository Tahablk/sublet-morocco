import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import listingsRoutes from "./routes/listings.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

// CORS allowlist (local + future domains)
const origins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // allow server-to-server / curl (no origin)
      if (!origin) return cb(null, true);
      if (origins.length === 0) return cb(null, true);
      if (origins.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true
  })
);

app.get("/", (req, res) => {
  res.json({ status: "Atlas Stay API OK" });
});

app.use("/api/listings", listingsRoutes);

const PORT = Number(process.env.PORT || 4000);

app.listen(PORT, () => {
  console.log(`🚀 Atlas Stay API running on http://localhost:${PORT}`);
});
