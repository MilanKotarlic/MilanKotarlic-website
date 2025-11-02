import React from 'react'

const Hero = ({ title, subtitle, primaryButton, secondaryButton }) => {
  return (
    <section className="hero">
      <div className="hero__background-pattern"></div>
      
      <div className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">{title}</h1>
          
          <div className="hero__blur-box">
            <p className="hero__subtitle">{subtitle}</p>
          </div>

          <div className="hero__buttons">
            <button className="hero__btn hero__btn--secondary">{secondaryButton}</button>
            <button className="hero__btn hero__btn--primary">{primaryButton}</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero