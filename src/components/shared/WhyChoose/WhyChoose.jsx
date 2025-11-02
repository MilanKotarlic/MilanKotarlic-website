import React from 'react'

const WhyChoose = ({
  title,
  subtitle,
  expertiseTitle,
  expertiseDesc,
  clientCentricTitle, 
  clientCentricDesc,
  resultsDrivenTitle,
  resultsDrivenDesc,
  collaborativeTitle,
  collaborativeDesc
}) => {
  return (
    <section className="why-choose">
      <div className="why-choose__container">
        <div className="why-choose__header">
          <h2 className="why-choose__title">{title}</h2>
          <p className="why-choose__subtitle">{subtitle}</p>
        </div>

        <div className="why-choose__cards">

          <div className="why-choose__card">
            <div className="why-choose__card-header">
              <div className="why-choose__icon">
                <img src="/images/whychoose/expertise.svg" alt="Expertise" className="why-choose__icon-image" />
              </div>
              <h3 className="why-choose__card-title">{expertiseTitle}</h3>
            </div>
            <p className="why-choose__card-description">
              {expertiseDesc}
            </p>
          </div>

          <div className="why-choose__line"></div>

          <div className="why-choose__card">
            <div className="why-choose__card-header">
              <div className="why-choose__icon">
                <img src="/images/whychoose/client.svg" alt="Client-Centric" className="why-choose__icon-image" />
              </div>
              <h3 className="why-choose__card-title">{clientCentricTitle}</h3>
            </div>
            <p className="why-choose__card-description">
              {clientCentricDesc}
            </p>
          </div>

          <div className="why-choose__line"></div>

          <div className="why-choose__card">
            <div className="why-choose__card-header">
              <div className="why-choose__icon">
                <img src="/images/whychoose/results.svg" alt="Results-Driven" className="why-choose__icon-image" />
              </div>
              <h3 className="why-choose__card-title">{resultsDrivenTitle}</h3>
            </div>
            <p className="why-choose__card-description">
              {resultsDrivenDesc}
            </p>
          </div>

          <div className="why-choose__line"></div>

          <div className="why-choose__card">
            <div className="why-choose__card-header">
              <div className="why-choose__icon">
                <img src="/images/whychoose/collaboration.svg" alt="Collaborative" className="why-choose__icon-image" />
              </div>
              <h3 className="why-choose__card-title">{collaborativeTitle}</h3>
            </div>
            <p className="why-choose__card-description">
              {collaborativeDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChoose