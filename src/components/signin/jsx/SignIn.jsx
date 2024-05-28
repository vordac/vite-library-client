import React, { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import '../css/signin.css';

function SignIn({setCurrentUser}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(email, password);

        try {
            const response = await axios.post('http://localhost:5000/signin', {
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // Here you should store the JWT token, for example in local storage
                localStorage.setItem('jwtToken', response.data.jwtToken);

                
                setCurrentUser(response.data.jwtToken);
                navigate('/');
                Swal.fire({
                    title: "Успішний вхід",
                    text: "Ласкаво просимо назад",
                    icon: "success"
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Swal.fire({
                    title: "Невірний email або пароль",
                    icon: "error"
                });
            } else {
                console.error(error);
                Swal.fire({
                    title: "Помилка сервера",
                    icon: "error"
                });
            }
        }
    };

    return (
        <div className='signin'>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />

                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default SignIn;
