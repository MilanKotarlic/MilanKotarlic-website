import React, { useState } from 'react'
import { useStore, setLanguage } from '../../../store'
import { useLanguage } from '../../../hooks/useLanguage'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { state, dispatch } = useStore()
  const { t } = useLanguage()

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">
          <div className="header__logo-outer">
            <div className="header__logo-container">
              <img src="/images/Logo.png" alt="SquareUp" className="header__logo-image" />
              </div>
              <span className="header__logo-text">SquareUp</span>
            </div>
          </div>

         <div className="header__language">
          <button onClick={() => dispatch(setLanguage('en'))}>EN</button>
          <button onClick={() => dispatch(setLanguage('sr'))}>SR</button>
        </div>
        
        {/* HAMBURGER BUTTON */}
        <button 
          className="header__hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img src="/images/Icon.png" alt="Menu" className="header__hamburger-icon" />
        </button>

        {/* Desktop Navigation */}
        <nav className="header__nav header__nav--desktop">
          <a href="/" className="header__nav-link">{t('navigation.home')}</a>
          <a href="/about" className="header__nav-link">{t('navigation.about')}</a>
          <a href="/gallery" className="header__nav-link">{t('navigation.gallery')}</a>
          <a href="/contact" className="header__nav-link">{t('navigation.contact')}</a>
        </nav>

        {/* Mobile Navigation */}
        <nav className={`header__nav header__nav--mobile ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <a href="/" className="header__nav-link">{t('navigation.home')}</a>
          <a href="/about" className="header__nav-link">{t('navigation.about')}</a>
          <a href="/gallery" className="header__nav-link">{t('navigation.gallery')}</a>
          <a href="/contact" className="header__nav-link">{t('navigation.contact')}</a>
        </nav>
      </div>
    </header>
  )
}

export default Header