import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/main.css";
import libraLogo from "../../../assets/libra_logo.svg";
import imgMain from "../../../assets/img_main.svg";

const Main = ({ currentUser, setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/signin");
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  const handleSearchClick = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/search?title=${searchTerm}`);
      setSearchResults(response.data);
      navigate("/search");
    } catch (error) {
      console.error("Error fetching article: ", error);
    }
  };

  return (
    <div className="main">
      <div className="main-manage">
        <div className="main-manage-image">
          <img src={libraLogo} alt="Libra Logo" />
        </div>
        <div className="main-manage-search">
          <div className="main-manage-search-input">
            <input
              type="text"
              placeholder="Search by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="main-manage-search-button">
            <button onClick={handleSearchClick}>Search</button>
          </div>
        </div>
        {currentUser ? (
          <div></div>
        ) : (
          <div className="main-manage-auth">
            <div className="main-manage-register">
              <div className="main-manage-register-label">
                <p>Become a library member: </p>
              </div>
              <div className="main-manage-register-button">
                <button onClick={handleRegisterClick}>Register</button>
              </div>
            </div>
            <div className="main-manage-login">
              <div className="main-manage-login-label">
                <p>Already have an account? </p>
              </div>
              <div className="main-manage-login-button">
                <button onClick={handleLoginClick}>Login</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="main-image">
        <img src={imgMain} alt="Img Main" />
      </div>
    </div>
  );
};

export default Main;
