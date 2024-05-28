import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import miniLogo from '../../../assets/mini_logo.svg';

const Header = ({currentUser, setCurrentUser}) => {

    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    }

    const handleAllClick = () => {
        navigate('/all');
    }

    const handlePopularClick = () => {
        navigate('/popular');
    }

    const handlePublisherClick = () => {
        navigate('/publisher');
    }

    const handleAdvancedSearchClick = () => {
        navigate('/search-advanced');
    }

    const handleLoginClick = () => {
        navigate('/signin');
    }

    const handleRegisterClick = () => {
        navigate('/signup');
    }

    const handleLogoutClick = () => {
        localStorage.removeItem('jwtToken');
        setCurrentUser(null);
        navigate('/');
    }

    return (
        <div className='header'>
            <div className='header-icon'>
                <img src={miniLogo} alt="Libra Logo" onClick={handleHomeClick} />
            </div>
            <div className='header-nav'>
                <a onClick={handleAllClick}>All</a>
                <a onClick={handlePopularClick}>Popular</a>
                <a onClick={handlePublisherClick}>Publisher</a>
                <a onClick={handleAdvancedSearchClick}>Advanced search</a>
            </div>
            {currentUser ? (
                <div className='header-logout'>
                    <button className='header-logout-button' onClick={handleLogoutClick}>Logout</button>
                </div>
            ) : (
                <div className='header-buttons'>
                    <button className='header-buttons-login' onClick={handleLoginClick}>Login</button>
                    <button className='header-buttons-register' onClick={handleRegisterClick}>Register</button>
                </div>
            )}
        </div>
    );
};

export default Header;
