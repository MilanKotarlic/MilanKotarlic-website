import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../hooks/useLanguage';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__logo-section">
            <div className="footer__logo" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
              <img src="/images/Milan.jpg" alt="Milan" className="footer__logo-image" />
              <span className="footer__logo-text">Milan Kotarlic</span>
            </div>
          </div>

          <nav className="footer__nav">
            <Link to="/" className="footer__nav-link">
              {t('navigation.home')}
            </Link>
            <Link to="/gallery" className="footer__nav-link">
              {t('navigation.gallery')}
            </Link>
            <Link to="/contact" className="footer__nav-link">
              {t('navigation.contact')}
            </Link>
            <Link to="/about" className="footer__nav-link">
              {t('navigation.about')}
            </Link>
          </nav>
        </div>

        <div className="footer__middle">
          <h3 className="footer__stay-connected">
            Follow My Music
          </h3>
          <div className="footer__social">
            <a
              href="https://www.facebook.com/KotarlicMilan"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.linkedin.com/in/milan-kotarlic-a723a396/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://www.youtube.com/@TheMilanKotarlic"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__contact-info">
            <div className="footer__contact-item">
              <FaEnvelope className="footer__contact-icon" />
              <a href="mailto:milan.kotarlicsc21@gmail.com" className="footer__contact-link">
                milan.kotarlicsc21@gmail.com
              </a>
            </div>

            <div className="footer__contact-item">
              <FaPhone className="footer__contact-icon" />
              <a href="tel:+381600118254" className="footer__contact-link">
                +381 60 0118254
              </a>
            </div>

            <div className="footer__contact-item">
              <FaMapMarkerAlt className="footer__contact-icon" />
              <span>Backa Palanka</span>
            </div>
          </div>
        </div>

      
        <button 
          className="footer__back-to-top"
          onClick={scrollToTop}
          aria-label="Povratak na vrh"
        >
          ↑
        </button>
      </div>
    </footer>
  );
};

export default Footer;