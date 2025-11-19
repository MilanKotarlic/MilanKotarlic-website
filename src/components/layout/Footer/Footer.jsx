import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../hooks/useLanguage';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__logo-section">
            <div className="footer__logo">
              <img src="/images/Logo.png" alt="SquareUp" className="footer__logo-image" />
              <span className="footer__logo-text">SquareUp</span>
            </div>
          </div>

          <nav className="footer__nav">
            <Link to="/" className="footer__nav-link">{t('navigation.home')}</Link>
            <Link to="/gallery" className="footer__nav-link">{t('navigation.gallery')}</Link>
            <Link to="/contact" className="footer__nav-link">{t('navigation.contact')}</Link>
            <a href="#why-choose" className="footer__nav-link">Why Choose</a>
            <a href="#services" className="footer__nav-link">Services</a>
          </nav>
        </div>

        <div className="footer__middle">
          <h3 className="footer__stay-connected">Stay Connected</h3>
          <div className="footer__social">
            <a href="#" className="footer__social-link">
              <FaFacebookF />
            </a>
            <a href="#" className="footer__social-link">
              <FaLinkedinIn />
            </a>
            <a href="#" className="footer__social-link">
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__contact-info">
            <div className="footer__contact-item">
              <FaEnvelope className="footer__contact-icon" />
              <span>email@squareup.com</span>
            </div>
            <div className="footer__contact-item">
              <FaPhone className="footer__contact-icon" />
              <span>+1 234 567 890</span>
            </div>
            <div className="footer__contact-item">
              <FaMapMarkerAlt className="footer__contact-icon" />
              <span>123 Business Street, City</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;