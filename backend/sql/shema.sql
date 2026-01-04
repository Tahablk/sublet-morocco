CREATE TABLE IF NOT EXISTS listings (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT,
  description TEXT,
  price_per_night INTEGER NOT NULL,
  max_nights INTEGER,
  lat DOUBLE PRECISION,
  lon DOUBLE PRECISION,
  images TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);
