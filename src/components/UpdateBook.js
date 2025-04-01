import React, { useState } from 'react';
import axios from 'axios';

const UpdateBook = ({ onUpdate }) => {
    const [bookId, setBookId] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
        
            console.log('Submitting book update:', { title, author, year, bookId }); // Log the submitted data
        
            if (!title || !author || !year) {
                console.error('Validation failed: Missing fields');
                return;
            }
        
            try {
                const response = await axios.put(`http://localhost:5000/books/${bookId}`, {
                    title,
                    author,
                    year,
                });
                console.log('Book updated successfully:', response.data);
            } catch (error) {
                console.error('Error updating book:', error.response?.data || error.message);
            }
        };
        

    return (
        <form onSubmit={handleSubmit}>
            <h2>Update Book</h2>
            <input
                type="number"
                placeholder="Book ID"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <input
                type="number"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />
            <button type="submit">Update Book</button>
        </form>
    );
};

export default UpdateBook;
