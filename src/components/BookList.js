import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = ({ onDelete }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/books');
                setBooks(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching books:', error);
                setLoading(false);
            }
        };
        fetchBooks();
    }, [onDelete]);

    if (loading) return <p>Loading books...</p>;

    return (
        <div>
            <h1>Book Library</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        {book.title} by {book.author} ({book.year})
                        <button onClick={() => onDelete(book.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
