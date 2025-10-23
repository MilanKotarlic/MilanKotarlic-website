import React, { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">Milan Kotarlić</div>
        
        {/* HAMBURGER BUTTON */}
        <button 
          className="header__hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Desktop Navigation */}
        <nav className="header__nav header__nav--desktop">
          <a href="/" className="header__nav-link">Home</a>
          <a href="/about" className="header__nav-link">About</a>
          <a href="/gallery" className="header__nav-link">Gallery</a>
          <a href="/contact" className="header__nav-link">Contact</a>
        </nav>

        {/* Mobile Navigation */}
        <nav className={`header__nav header__nav--mobile ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <a href="/" className="header__nav-link">Home</a>
          <a href="/about" className="header__nav-link">About</a>
          <a href="/gallery" className="header__nav-link">Gallery</a>
          <a href="/contact" className="header__nav-link">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header