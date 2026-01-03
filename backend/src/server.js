const app = require("./app");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Sublet Morocco API running on http://localhost:${PORT}`);
});
