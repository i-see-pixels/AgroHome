import "./Footer.css";
import logo1 from "../../resources/Logo/agro-logo-full.png";
import logo2 from "../../resources/Logo/agro-logo-short.png";

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="logo-left">
                <img src={logo1} alt="Logo" />
            </div>
            <div className="footer-details">
                <div className="footer-links">
                    <ul className="list-group">
                        <Link to="/contactus" className="footer-list-item">
                            Contact Us
                        </Link>
                        <Link to="/about" className="footer-list-item">
                            About
                        </Link>
                        <Link to="/search" className="footer-list-item">
                            Search
                        </Link>
                        <a
                            href="https://github.com/i-see-pixels/AgroHome"
                            className="footer-list-item"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Source Code
                        </a>
                    </ul>
                </div>
                <div className="social-media-container">
                    <p>Follow us on:</p>
                    <a
                        href="/"
                        className="social"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a
                        href="/"
                        className="social"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a
                        href="/"
                        className="social"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="fab fa-google"></i>
                    </a>
                </div>
            </div>
            <div className="logo-right">
                <div className="img-crop">
                    <img src={logo2} alt="Logo" />
                </div>
            </div>
        </div>
    );
};

export default Footer;
