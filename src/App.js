import React, { useState } from 'react';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';

function App() {
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
        setRefresh(!refresh);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/books/${id}`, { method: 'DELETE' });
            handleRefresh();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div className="App">
            <BookList onDelete={handleDelete} />
            <AddBook onAdd={handleRefresh} />
            <UpdateBook onUpdate={handleRefresh} />
        </div>
    );
}

export default App;
