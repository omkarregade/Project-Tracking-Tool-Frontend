import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebook, faTwitter, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import './../CssFiles/Footer.css'; // Import the CSS file

export const Footer = () => {
  return (
    <>
      <footer className="footer-container" fluid>
        <p className="footer-copyright">&copy; 2023 SprintHub Inc. All rights reserved.</p>
        <p><a href="#" className="footer-copyright">Privacy & Legal Policies</a></p>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} className="footer-icon" />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className="footer-icon" />
        </a>
        <a href="https://github.com/FlashShri/backend-sprinthub" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} className="footer-icon" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} className="footer-icon" />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="footer-icon"  />
        </a>
      </footer>
    </>
  );
};
