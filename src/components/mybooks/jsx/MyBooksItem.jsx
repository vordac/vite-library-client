import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../css/book.css';

const MyBooksItem = ({ mybook }) => {
    const { formulary_number, employee_full_name, book_isbn, loan_date, loan_days, return_date, reader_full_name, address } = mybook;

    const navigate = useNavigate();

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('en-GB', options); // en-GB for dd-mm-YYYY format
    }

    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/formulars/${formulary_number}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {

                Swal.fire({
                    title: "Formular was deleted",
                    icon: "success"
                });

                navigate('/');
            } else {
                console.log('Failed to delete formular');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Card className="book">
            <Card.Text className='book-address'><b>Reader:</b> {reader_full_name}</Card.Text>
            <Card.Text className='book-subtitle'><b>ISBN:</b> {book_isbn}</Card.Text>
            <Card.Text className='book-publisher'><b>Loan Days:</b> {loan_days}</Card.Text>
            <Card.Text className='book-category'><b>Loan Date:</b> {formatDate(loan_date)}</Card.Text>
            <Card.Text className='book-language'><b>Return Date:</b> {formatDate(return_date)}</Card.Text>
            <Card.Text className='book-address'><b>Lend Address:</b> {address}</Card.Text>
            <Card.Text className='book-author'><b>Librarian: </b>{employee_full_name}</Card.Text>
            <button onClick={handleDeleteClick}>DELETE</button>
        </Card>
    );
};

export default MyBooksItem;