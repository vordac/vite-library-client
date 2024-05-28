import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from './Book';
import '../css/all.css'

const All = () => {
    const [error, setError] = useState(null);
    const [books, setBooks] = useState(null);

    useEffect(() => {
        async function fetchArticle() {
            try {
                const response = await axios.get('http://localhost:5000/all');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching article:', error);
                setError('Error fetching article');
            }
        }

        fetchArticle();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!books) {
        return <div>Loading...</div>;
    }

    return (
        <div className='all'>
            {
                Array.isArray(books) && books.map((books) => (
                    <Book
                        book={{ ...books}}
                    />
                ))
            }
        </div>
    );
};

export default All;
