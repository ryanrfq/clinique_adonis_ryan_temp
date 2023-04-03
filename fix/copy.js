const fs = require("fs");

fs.copyFile(
  "fix/index.js",
  "node_modules/knex/lib/dialects/postgres/index.js",
  (err) => {
    if (err) console.log("Error Found:", err);
  }
);
