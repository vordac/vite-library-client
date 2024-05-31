import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Card } from 'react-bootstrap';
import '../css/book.css';

const Book = ({ book }) => {
    const { book_id, isbn, title, category_name, publisher_name, language_name, author_name, fund_address } = book;

    const navigate = useNavigate();

    const handleBookClick = () => {
        navigate(`/book/${book.book_id}`);
    }

    return (
        <Card className="book" onClick={handleBookClick}>
            <Card.Title className='book-title'><b>{title}</b> </Card.Title>
            <Card.Text className='book-author'><b>Author: </b>{author_name}</Card.Text>
            <Card.Text className='book-subtitle'><b>ISBN:</b> {isbn}</Card.Text>
            <Card.Text className='book-category'><b>Category:</b> {category_name}</Card.Text>
            <Card.Text className='book-publisher'><b>Publisher:</b> {publisher_name}</Card.Text>
            <Card.Text className='book-language'><b>Language:</b> {language_name}</Card.Text>
            <Card.Text className='book-address'><b>Lend Address:</b> {fund_address}</Card.Text>
        </Card>
    );
};

export default Book;