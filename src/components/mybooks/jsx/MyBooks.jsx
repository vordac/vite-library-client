import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyBookItem from './MyBooksItem';
import '../css/my-books.css';

const MyBooks = ({ currentUser }) => {
    const [error, setError] = useState(null);
    const [books, setBooks] = useState(null);
    const [userId, setUserId] = useState(currentUser.userId);

    useEffect(() => {
        if (currentUser) {
            async function fetchArticle() {
                try {
                    const response = await axios.get('http://localhost:5000/my-books/', {
                        params: {
                            userId: currentUser.userId
                        }
                    });
                    setBooks(response.data);
                } catch (error) {
                    console.error('Error fetching article:', error);
                    setError('Error fetching article');
                }
            }

            fetchArticle();
        }
    }, [currentUser]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!books) {
        return <div>Loading...</div>;
    }

    return (
        <div className='my-books'>
            {
                Array.isArray(books) && books.map((books) => (
                    <MyBookItem
                        mybook={{ ...books }}
                    />
                ))
            }
        </div>
    );
};

export default MyBooks;
