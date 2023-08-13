import React from 'react';
import './App.css'
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} Clear Silat and Street Kung Fu. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
