const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'server/db.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.each("SELECT count(*) as count FROM products", (err, row) => {
        console.log('Product Count:', row.count);
    });
    db.each("SELECT username, role, password FROM users", (err, row) => {
        console.log('User:', row.username, 'Role:', row.role, 'Pass:', row.password);
    });
});
db.close();
