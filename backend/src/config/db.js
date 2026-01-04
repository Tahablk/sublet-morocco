const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "atlas_stay",
  password: "",
  port: 5432,
});

pool.on("connect", () => {
  console.log("🟢 PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("🔴 PostgreSQL error", err);
});

module.exports = pool;
