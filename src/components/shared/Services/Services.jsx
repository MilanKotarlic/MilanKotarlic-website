import React from 'react'

const Services = ({ title, subtitle }) => {
  return (
    <section className="services">
      <h2 className="services__title">{title}</h2>
      <p className="services__subtitle">{subtitle}</p>
    </section>
  )
}

export default Services