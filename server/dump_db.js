const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const db = new sqlite3.Database('./server/db.sqlite');

db.serialize(() => {
    db.all("SELECT * FROM products", (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            fs.writeFileSync('db_dump.json', JSON.stringify(rows));
        }
    });
});

db.close();
