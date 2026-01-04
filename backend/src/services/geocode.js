import dotenv from "dotenv";
dotenv.config();

let lastCallAt = 0;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function geocodeAddress(query) {
  const enabled = (process.env.GEOCODE_ENABLED || "true") === "true";
  if (!enabled) return null;

  const ua = process.env.GEOCODE_USER_AGENT || "AtlasStay/1.0 (contact: you@example.com)";

  // Throttle: 1 request / second (basic)
  const now = Date.now();
  const elapsed = now - lastCallAt;
  if (elapsed < 1100) await sleep(1100 - elapsed);
  lastCallAt = Date.now();

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("q", query);

  const res = await fetch(url, {
    headers: {
      "User-Agent": ua,
      "Accept": "application/json"
    }
  });

  if (!res.ok) return null;

  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;

  const item = data[0];
  return {
    lat: Number(item.lat),
    lon: Number(item.lon)
  };
}
