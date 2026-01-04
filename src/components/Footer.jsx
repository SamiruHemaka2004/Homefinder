import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Footer.css';
import websiteLogo from '../assets/web-Logo.png'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <div>
                              <button 
                                onClick={() => navigate('/')}
                                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                              >
                                <img
                                  className="websiteLogo"
                                  src={websiteLogo}
                                  alt="App Logo"
                                  style={{ cursor: 'pointer' }}
                                />
                              </button>
                            </div>
                    <p>Find your perfect home with ease.</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/listings">Listings</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>Email: info@homefinder.com</p>
                    <p>Phone: (123) 456-7890</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Homefinder. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;