import React from 'react';
import Button from '../../../components/shared/Button/Button';

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
            <Button variant="secondary" size="medium">
              {secondaryButton}
            </Button>
            <Button variant="primary" size="medium">
              {primaryButton}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;