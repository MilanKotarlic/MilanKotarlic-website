import React from 'react'

const Services = ({ title, subtitle, children }) => {
  return (
    <section className="services">
      <div className="services__container">
        <div className="services__header">
          <h2 className="services__title">{title}</h2>
          <p className="services__subtitle">{subtitle}</p>
        </div>

        <div className="services__cards">
          {children}
        </div>
      </div>
    </section>
  )
}

export default Services