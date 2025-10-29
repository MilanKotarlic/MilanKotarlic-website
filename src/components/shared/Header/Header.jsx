import React, { useState } from 'react'
import { useStore, setLanguage } from '../../../store'
import { useLanguage } from '../../../hooks/useLanguage'
import './Header.scss'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { state, dispatch } = useStore()
  const { t } = useLanguage()

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">Milan Kotarlić</div>
        
        
        <div className="header__language">
          <button onClick={() => dispatch(setLanguage('en'))}>EN</button>
          <button onClick={() => dispatch(setLanguage('sr'))}>SR</button>
        </div>

        <button 
          className="header__hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className="header__nav header__nav--desktop">
          <a href="/" className="header__nav-link">{t('navigation.home')}</a>
          <a href="/about" className="header__nav-link">{t('navigation.about')}</a>
          <a href="/gallery" className="header__nav-link">{t('navigation.gallery')}</a>
          <a href="/contact" className="header__nav-link">{t('navigation.contact')}</a>
        </nav>

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