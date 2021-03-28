const sqlite = require("sqlite3").verbose();

let db = new sqlite.Database("../../database/database.db", sqlite.OPEN_READONLY, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Connected to database.");
});

const query = "SELECT * from guild where guildID=767813503368691712";
db.all(query, [], (err, rows) => {
  console.log("REQUESTING : SELECT * from guild where guildID=767813503368691712");
  console.log("RESULT", rows);
});
