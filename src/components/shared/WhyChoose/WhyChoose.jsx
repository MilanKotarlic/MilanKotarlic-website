import React from 'react'
import './WhyChoose.scss'

const WhyChoose = ({ title, subtitle }) => {
  return (
    <section className="why-choose">
      <h2 className="why-choose__title">{title}</h2>
      <p className="why-choose__subtitle">{subtitle}</p>
    </section>
  )
}

export default WhyChoose