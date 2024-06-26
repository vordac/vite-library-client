import React from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate hook
// import '../css/news-item.css';
import { Card } from 'react-bootstrap';
import '../css/book.css';

const Book = ({ book }) => {
    const { book_id, isbn, title, category_name, publisher_name, language_name, author_name } = book;
    const navigate = useNavigate();

    const handleBookClick = () => {
        navigate(`/book/${book.book_id}`);
    }

    return (
        <Card className="book" onClick={handleBookClick}>
            <Card.Title className='book-title'><b>Title:</b> {title}</Card.Title>
            <Card.Text className='book-title'><b>ISBN:</b> {isbn}</Card.Text>
            <Card.Text className='book-category'><b>Category:</b> {category_name}</Card.Text>
            <Card.Text className='book-publisher'><b>Publisher:</b> {publisher_name}</Card.Text>
            <Card.Text className='book-language'><b>Language:</b> {language_name}</Card.Text>
            <Card.Text className='book-author'><b>Author:</b> {author_name}</Card.Text>
        </Card>
    );
};

export default Book;