import React from 'react'

const Services = ({
  title, 
  subtitle,
  designTitle,
  designDesc,
  engineeringTitle,
  engineeringDesc,
  projectManagementTitle,
  projectManagementDesc,
  learnMore
}) => {
  return (
    <section className="services">
      <div className="services__container">
        <div className="services__header">
          <h2 className="services__title">{title}</h2>
          <p className="services__subtitle">{subtitle}</p>
        </div>

        <div className="services__cards">

          <div className="services__card">
            <div className="services__card-header">
              <div className="services__icon">
                <img src="/images/services/design.png" alt="Design" className="services__icon-image" />
              </div>
              <h3 className="services__card-title">{designTitle}</h3>
            </div>
            <p className="services__card-description">
              {designDesc}
            </p>
            <button className="services__button">{learnMore}</button>
          </div>

          <div className="services__line"></div>

          <div className="services__card">
            <div className="services__card-header">
              <div className="services__icon">
                <img src="/images/services/development.png" alt="Engineering" className="services__icon-image" />
              </div>
              <h3 className="services__card-title">{engineeringTitle}</h3>
            </div>
            <p className="services__card-description">
              {engineeringDesc}
            </p>
            <button className="services__button">{learnMore}</button>
          </div>

          <div className="services__line"></div>

          
          <div className="services__card">
            <div className="services__card-header">
              <div className="services__icon">
                <img src="/images/services/management.png" alt="Project Management" className="services__icon-image" />
              </div>
              <h3 className="services__card-title">{projectManagementTitle}</h3>
            </div>
            <p className="services__card-description">
              {projectManagementDesc}
            </p>
            <button className="services__button">{learnMore}</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services