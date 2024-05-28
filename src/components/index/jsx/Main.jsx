import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/main.css';
import libraLogo from '../../../assets/libra_logo.svg';
import imgMain from '../../../assets/img_main.svg';


const Main = ({ currentUser }) => {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    }

    const handleRegisterClick = () => {
        navigate('/register');
    }

    const handleSearchClick = () => {
        navigate('/search');
    }

    return (
        <div className='main'>
            <div className='main-manage'>
                <div className='main-manage-image'>
                    <img src={libraLogo} alt="Libra Logo" />
                </div>
                <div className='main-manage-search'>
                    <div className='main-manage-search-input'>
                        <input placeholder='Enter book title..'></input>
                    </div>
                    <div className='main-manage-search-button'>
                        <button onClick={handleSearchClick}>Search</button>
                    </div>
                </div>
                {currentUser ? (
                    <div> </div>
                ) : (
                    <div className='main-manage-auth'>
                        <div className='main-manage-register'>
                            <div className='main-manage-register-label'>
                                <p>Become a library member: </p>
                            </div>
                            <div className='main-manage-register-button'>
                                <button onClick={handleRegisterClick}>Register</button>
                            </div>
                        </div>
                        <div className='main-manage-login'>
                            <div className='main-manage-login-label'>
                                <p>Already have an account? </p>
                            </div>
                            <div className='main-manage-login-button'>
                                <button onClick={handleLoginClick}>Login</button>
                            </div>
                        </div>
                    </div>
                )}


            </div>
            <div className='main-image'>
                <img src={imgMain} alt="Img Main" />
            </div>
        </div>
    );
};

export default Main;
