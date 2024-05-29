import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookInfo = () => {
    const [book, setBook] = useState(null);
    const { bookId } = useParams();

    useEffect(() => {
        async function fetchBook() {
            try {
                const response = await axios.get(`http://localhost:5000/book/${bookId}`);
                setBook(response.data[0]);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        }

        fetchBook();
    }, [bookId]);

    if (!book) {
        return <div>Loading...</div>;
    }

    const { book_id, isbn, title, category_name, publisher_name, language_name, author_name, quantity, status } = book;
    console.log(quantity, status);
    return (
        <div className='book'>
            <div className='book-title'><b>Title:</b> {title}</div>
            <div className='book-title'><b>ISBN:</b> {isbn}</div>
            <div className='book-category'><b>Category:</b> {category_name}</div>
            <div className='book-publisher'><b>Publisher:</b> {publisher_name}</div>
            <div className='book-language'><b>Language:</b> {language_name}</div>
            <div className='book-author'><b>Author:</b> {author_name}</div>
            <div className='book-quantity'><b>Quantity:</b> {quantity}</div>
            <div className='book-status'><b>Status:</b> {status}</div>
        </div>
    );
};

export default BookInfo;
