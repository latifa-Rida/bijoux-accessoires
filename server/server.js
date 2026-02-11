const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// === AUTH ROUTES ===

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    // Special handling for legacy/mock usernames from prompt
    // user/user2026, admin/admin2026
    // We check if input matches username OR email
    const sql = "SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?";
    db.get(sql, [email, email, password], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (row) {
            res.json({
                success: true,
                user: {
                    id: row.id,
                    username: row.username,
                    email: row.email,
                    role: row.role
                },
                token: 'fake-jwt-token-' + row.id // Mock token
            });
        } else {
            res.status(401).json({ success: false, message: 'Identifiants incorrects' });
        }
    });
});

// === PRODUCT ROUTES ===

// Get All Products
app.get('/api/products', (req, res) => {
    const sql = "SELECT * FROM products";
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rows.length > 0) {
            console.log(`Product 0 sample keys: ${Object.keys(rows[0]).join(', ')}`);
            console.log(`Product 0 category value: '${rows[0].category}'`);
        }
        // Parse JSON fields
        const products = rows.map(p => ({
            ...p,
            colors: p.colors ? JSON.parse(p.colors) : [],
            sizes: p.sizes ? JSON.parse(p.sizes) : [],
            inStock: !!p.inStock
        }));
        res.json(products);
    });
});

// Get Single Product
app.get('/api/products/:id', (req, res) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    db.get(sql, [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (row) {
            row.colors = row.colors ? JSON.parse(row.colors) : [];
            row.sizes = row.sizes ? JSON.parse(row.sizes) : [];
            row.inStock = !!row.inStock;
            res.json(row);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    });
});

// Add Product
app.post('/api/products', (req, res) => {
    const { name, description, price, oldPrice, category, image, colors, sizes, inStock } = req.body;
    const sql = `INSERT INTO products (name, description, price, oldPrice, category, image, colors, sizes, inStock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
        name,
        description,
        price,
        oldPrice,
        category,
        image,
        JSON.stringify(colors || []),
        JSON.stringify(sizes || []),
        inStock ? 1 : 0
    ];
    db.run(sql, params, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
            id: this.lastID,
            ...req.body
        });
    });
});

// Update Product
app.put('/api/products/:id', (req, res) => {
    const { name, description, price, oldPrice, category, image, colors, sizes, inStock } = req.body;
    const sql = `UPDATE products SET name = ?, description = ?, price = ?, oldPrice = ?, category = ?, image = ?, colors = ?, sizes = ?, inStock = ? WHERE id = ?`;
    const params = [
        name,
        description,
        price,
        oldPrice,
        category,
        image,
        JSON.stringify(colors || []),
        JSON.stringify(sizes || []),
        inStock ? 1 : 0,
        req.params.id
    ];
    db.run(sql, params, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product updated', changes: this.changes });
    });
});

// Delete Product
app.delete('/api/products/:id', (req, res) => {
    const sql = "DELETE FROM products WHERE id = ?";
    db.run(sql, [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product deleted', changes: this.changes });
    });
});


// === USER ROUTES ===
app.get('/api/users', (req, res) => {
    const sql = "SELECT id, username, email, role FROM users";
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
// Delete User
app.delete('/api/users/:id', (req, res) => {
    const sql = "DELETE FROM users WHERE id = ?";
    db.run(sql, [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted', changes: this.changes });
    });
});

// Get Orders (All for admin, or filter by user usually)
// Get Orders with items
app.get('/api/orders', (req, res) => {
    const ordersSql = `
        SELECT o.*, u.username as user_name 
        FROM orders o 
        LEFT JOIN users u ON o.user_id = u.id
        ORDER BY o.date DESC
    `;

    db.all(ordersSql, [], (err, orders) => {
        if (err) return res.status(500).json({ error: err.message });

        const itemsSql = `
            SELECT oi.*, p.name, p.image 
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
        `;

        db.all(itemsSql, [], (err, allItems) => {
            if (err) return res.status(500).json({ error: err.message });

            // Group items by order_id
            const ordersWithItems = orders.map(order => {
                return {
                    ...order,
                    items: allItems.filter(item => item.order_id === order.id)
                };
            });

            res.json(ordersWithItems);
        });
    });
});

// Create Order
app.post('/api/orders', (req, res) => {
    const { user_id, total, items, customerName, customerEmail, customerPhone, address } = req.body;
    const date = new Date().toISOString();
    const status = 'en attente';

    const sql = `INSERT INTO orders (user_id, customer_name, customer_email, customer_phone, address, total, date, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [user_id, customerName, customerEmail, customerPhone, address, total, date, status];

    db.run(sql, params, function (err) {
        if (err) return res.status(500).json({ error: err.message });

        const orderId = this.lastID;

        // Insert items
        const itemStmt = db.prepare("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");
        items.forEach(item => {
            itemStmt.run(orderId, item.product_id, item.quantity, item.price);
        });
        itemStmt.finalize();

        res.json({ success: true, orderId });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
