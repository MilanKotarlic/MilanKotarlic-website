import React from 'react'
import './Header.scss'

const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">Milan Kotarlić</div>
        <nav className="header__nav">
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