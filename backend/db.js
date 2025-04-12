const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./sqlite3.db", sqlite3.OPEN_READONLY, err => {
  if (err) {
    console.log(err.message);
  }
  console.log("connected to database!");
});

module.exports = function(sql) {
  return new Promise(function(resolve, reject) {
    db.serialize(function() {
      db.all(sql, (params = []), function(err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
};
