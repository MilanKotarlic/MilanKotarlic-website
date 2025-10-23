import React from 'react'

const Contact = ({ title, subtitle }) => {
  return (
    <section className="contact">
      <h2 className="contact__title">{title}</h2>
      <p className="contact__subtitle">{subtitle}</p>
    </section>
  )
}

export default Contact