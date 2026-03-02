import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore, setLanguage } from '../../../store';
import { useLanguage } from '../../../hooks/useLanguage';
import { FaBars } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { dispatch } = useStore();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

  const goToHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo" onClick={goToHome} style={{ cursor: 'pointer' }}>
          <div className="header__logo-outer">
            <div className="header__logo-container">
              <img src="/images/Milan.jpg" alt="Milan" className="header__logo-image" />
            </div>
            <span className="header__logo-text">Milan Kotarlic</span>
          </div>
        </div>

        <div className="header__language">
          <button onClick={() => dispatch(setLanguage('en'))}>EN</button>
          <button onClick={() => dispatch(setLanguage('sr'))}>SR</button>
        </div>

        <button className="header__hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars className="header__hamburger-icon" />
        </button>

        <nav className="header__nav header__nav--desktop">
          <Link to="/" className="header__nav-link">
            {t('navigation.home')}
          </Link>
          <Link to="/about" className="header__nav-link">
            {t('navigation.about')}
          </Link>
          <Link to="/gallery" className="header__nav-link">
            {t('navigation.gallery')}
          </Link>
          <Link to="/contact" className="header__nav-link">
            {t('navigation.contact')}
          </Link>
        </nav>

        <nav className={`header__nav header__nav--mobile ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <Link to="/" className="header__nav-link" onClick={closeMenu}>
            {t('navigation.home')}
          </Link>
          <Link to="/about" className="header__nav-link" onClick={closeMenu}>
            {t('navigation.about')}
          </Link>
          <Link to="/gallery" className="header__nav-link" onClick={closeMenu}>
            {t('navigation.gallery')}
          </Link>
          <Link to="/contact" className="header__nav-link" onClick={closeMenu}>
            {t('navigation.contact')}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;