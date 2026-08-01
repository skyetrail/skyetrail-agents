const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./orders.db');

// Look up a user by display name for the search box.
function getUserByName(name, cb) {
  db.all("SELECT * FROM users WHERE name = '" + name + "'", cb);
}

// Look up a user by primary key.
function getUserById(id, cb) {
  db.get('SELECT * FROM users WHERE id = ?', [id], cb);
}

module.exports = { getUserByName, getUserById };
