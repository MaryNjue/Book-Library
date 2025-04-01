const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// PostgreSQL Pool Configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'my_library',
    password: 5152,
    port: 5432,
});


// Test Endpoint
app.get('/books', (req, res) => {
    res.send('Welcome to the Book Library API!');
});

// CRUD Operations

// 1. Add a Book
app.post('/books', async (req, res) => {
    const { title, author, year } = req.body;

    // Validate input
    if (!title || !author || !year) {
        return res.status(400).json({ error: 'All fields (title, author, year) are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO books (title, author, year) VALUES ($1, $2, $3) RETURNING *',
            [title, author, year]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. List All Books
app.get('/books', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books'); // Ensure the `books` table exists
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching books:', error.message); // Log detailed error message
        res.status(500).json({ error: error.message });
    }
});


// 3. Update a Book
app.put('/books/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the URL
    const { title, author, year } = req.body; // Get the data from the request body

    // Validate input
    if (!title || !author || !year) {
        return res.status(400).json({ error: 'All fields (title, author, year) are required' });
    }

    try {
        const result = await pool.query(
            'UPDATE books SET title = $1, author = $2, year = $3 WHERE id = $4 RETURNING *',
            [title, author, year, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating book:', error.message);
        res.status(500).json({ error: error.message });
    }
});



// 4. Delete a Book
app.delete('/books/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



