import React from 'react';

const WhyChoose = ({ title, subtitle, children }) => {
  return (
    <section className="why-choose">
      <div className="why-choose__container">
        <div className="why-choose__header">
          <h2 className="why-choose__title">{title}</h2>
          <p className="why-choose__subtitle">{subtitle}</p>
        </div>

        <div className="why-choose__cards">
          {children}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;