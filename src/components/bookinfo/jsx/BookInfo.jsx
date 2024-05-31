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
          employee_personal_id: 10,
          book_isbn: book.isbn,
          reader_id: currentUser.userId,
          employee_name: book.librarian, // send the librarian value as employee_name
          address: book.fund_address, // send the fund_address value as address
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

  const { book_id, isbn, title, category_name, publisher_name, language_name, author_name, quantity, status, fund_address, librarian } = book;
  console.log(quantity, status);
  return (
    <div className='book-info'>

      <div className='book-info-container'>
        <div className='book-info-container-left'>
          <div className='book-info-container-left-title'><b>{title}</b> </div>
          <div className='book-info-container-left-subtitle'><b>ISBN:</b> {isbn}</div>
          <div className='book-info-container-left-category'><b>Category:</b> {category_name}</div>
          <div className='book-info-container-left-publisher'><b>Publisher:</b> {publisher_name}</div>
          <div className='book-info-container-left-language'><b>Language:</b> {language_name}</div>
          <div className='book-info-container-left-author'><b>Author:</b> {author_name}</div>
          <div className='book-info-container-left-author'><b>Lend Address:</b> {fund_address}</div>
          <div className='book-info-container-left-librarian'><b>Librarian:</b> {librarian}</div>
        </div>
        <div className='book-info-container-right'>
          <div className='book-info-container-right-status'>{status.toLowerCase()}</div>
          <div className='book-info-container-right-control'>
            <div className='book-info-container-right-control-order'>
              {currentUser ? (
                <button onClick={handleLendBookClick}>Lend</button>
              ) : (
                <button onClick={handleAuthorizeClick}>Authorize</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
