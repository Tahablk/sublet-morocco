import express from "express";
import db from "../db.js";
import { geocodeAddress } from "../services/geocode.js";

const router = express.Router();

/**
 * GET /api/listings
 * Optional filters:
 * - city
 * - nights
 * - maxPrice (total)
 */
router.get("/", async (req, res) => {
  try {
    const { city, nights, maxPrice } = req.query;

    let sql = `SELECT * FROM listings WHERE 1=1`;
    const values = [];

    if (city && city.trim()) {
      values.push(`%${city.trim()}%`);
      sql += ` AND city ILIKE $${values.length}`;
    }

    // Total max = price_per_night * nights
    if (nights && maxPrice) {
      const n = Number(nights);
      const m = Number(maxPrice);
      if (!Number.isNaN(n) && !Number.isNaN(m) && n > 0 && m > 0) {
        values.push(n);
        values.push(m);
        sql += ` AND (price_per_night * $${values.length - 1}) <= $${values.length}`;
      }
    }

    sql += ` ORDER BY id DESC`;

    const result = await db.query(sql, values);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/listings failed:", err);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});

/**
 * GET /api/listings/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await db.query(`SELECT * FROM listings WHERE id = $1`, [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET /api/listings/:id failed:", err);
    res.status(500).json({ error: "Failed to fetch listing" });
  }
});

/**
 * POST /api/listings
 * Body:
 * - title, city, price_per_night (required)
 * - address, description, max_nights, images (optional)
 * - lat, lon optional (if missing, geocode with address+city)
 */
router.post("/", async (req, res) => {
  try {
    const {
      title,
      city,
      address = "",
      description = "",
      price_per_night,
      max_nights = null,
      lat = null,
      lon = null,
      images = []
    } = req.body;

    if (!title || !city || !price_per_night) {
      return res.status(400).json({ error: "Missing required fields: title, city, price_per_night" });
    }

    let finalLat = lat;
    let finalLon = lon;

    // If not provided, try geocoding
    if ((!finalLat || !finalLon) && address && city) {
      const geo = await geocodeAddress(`${address}, ${city}, Morocco`);
      if (geo) {
        finalLat = geo.lat;
        finalLon = geo.lon;
      }
    }

    const result = await db.query(
      `
      INSERT INTO listings
      (title, city, address, description, price_per_night, max_nights, lat, lon, images)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *
      `,
      [
        title,
        city,
        address,
        description,
        Number(price_per_night),
        max_nights === null ? null : Number(max_nights),
        finalLat === null ? null : Number(finalLat),
        finalLon === null ? null : Number(finalLon),
        Array.isArray(images) ? images : []
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /api/listings failed:", err);
    res.status(500).json({ error: "Failed to create listing" });
  }
});

export default router;
