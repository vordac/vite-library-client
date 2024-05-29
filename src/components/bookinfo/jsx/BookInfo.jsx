import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/bookinfo.css';
import Swal from 'sweetalert2';

const BookInfo = ({ currentUser }) => {
    const [book, setBook] = useState(null);
    const { bookId } = useParams();
    const navigate = useNavigate();

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

    const handleLendBookClick = async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/lend-book",
            {
              employee_personal_id: 2,
              book_isbn: book.isbn,
              reader_id: currentUser.userId,
            },
            { withCredentials: true }
          );
      
          if (response.data.success) {
            // Show success message using sweetalert2
            Swal.fire("Success!", "Book has been lent.", "success");
          } else {
            // Show error message using sweetalert2
            Swal.fire("Error!", "Failed to lend the book.", "error");
          }
        } catch (error) {
          console.error("Error lending book:", error);
          // Show error message using sweetalert2
          Swal.fire("Error!", "Failed to lend the book.", "error");
        }
      };
      

    const handleAuthorizeClick = () => {
        navigate('/signin');
    }

    const { book_id, isbn, title, category_name, publisher_name, language_name, author_name, quantity, status } = book;
    console.log(quantity, status);
    return (
        <div className='book-info'>
            <div className='book-title'><b>Title:</b> {title}</div>
            <div className='book-title'><b>ISBN:</b> {isbn}</div>
            <div className='book-category'><b>Category:</b> {category_name}</div>
            <div className='book-publisher'><b>Publisher:</b> {publisher_name}</div>
            <div className='book-language'><b>Language:</b> {language_name}</div>
            <div className='book-author'><b>Author:</b> {author_name}</div>
            <div className='book-quantity'><b>Quantity:</b> {quantity}</div>
            <div className='book-status'><b>Status:</b> {status}</div>

            <div className='book-order'>
                {currentUser ? (
                    <button onClick={handleLendBookClick}>Lend Book</button>
                ) : (
                    <button onClick={handleAuthorizeClick}>Authorize</button>
                )}
            </div>
        </div>
    );
};

export default BookInfo;
