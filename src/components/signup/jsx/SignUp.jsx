import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import '../css/signup.css';

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const phoneNumberRegex = /^\+38\((050|063|067|093)\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/;
            if (!phoneNumberRegex.test(phoneNumber)) {
                Swal.fire({
                    title: "Номер телефону у неправильному форматі",
                    text: "Будь ласка, введіть у форматі: +38(XXX)XXX-XX-XX",
                    icon: "error"
                });
                return; // exit the function early if the phone number is invalid
            }

            const response = await axios.post(
                "http://localhost:5000/signup",
                {
                    full_name: fullName,
                    birth_date: birthDate,
                    phone_number: phoneNumber,
                    email,
                    password,
                }
            );
            Swal.fire({
                title: "Реєстрація успішна",
                text: "Будь ласка, увійдіть у акаунт",
                icon: "success"
            });
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="signup">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <label htmlFor="fullName">Full Name:</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />

                <label htmlFor="birthDate">Birth Date:</label>
                <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                />

                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
