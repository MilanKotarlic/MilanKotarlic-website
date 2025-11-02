import React, { useState, useRef, useEffect } from 'react'

const Contact = ({
  title,
  subtitle,
  startProject,
  fullName,
  email,
  contactReason,
  webDesign,
  collaboration,
  mobileApp,
  others,
  budget,
  budgetHint,
  message,
  submit
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  })

  const [selectedServices, setSelectedServices] = useState([])
  const [budgetRange, setBudgetRange] = useState([1000, 5000])
  const [dragging, setDragging] = useState(null)
  const sliderRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleServiceToggle = (service) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    )
  }

  const handleMouseDown = (index, e) => {
    e.preventDefault()
    setDragging(index)
  }

  const handleMouseMove = (e) => {
    if (dragging === null) return
    
    const slider = sliderRef.current
    const rect = slider.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const percentage = x / rect.width
    const value = Math.round(1000 + percentage * 9000)
    
    setBudgetRange(prev => {
      const newRange = [...prev]
      newRange[dragging] = value
      
      if (dragging === 0 && value >= prev[1]) return [prev[1] - 100, prev[1]]
      if (dragging === 1 && value <= prev[0]) return [prev[0], prev[0] + 100]
      
      return newRange.sort((a, b) => a - b)
    })
  }

  const handleMouseUp = () => {
    setDragging(null)
  }

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (dragging !== null) {
        handleMouseMove(e)
      }
    }
    
    const handleGlobalMouseUp = () => {
      if (dragging !== null) {
        handleMouseUp()
      }
    }

    if (dragging !== null) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [dragging])

  const getThumbPosition = (value) => {
    return ((value - 1000) / 9000) * 100
  }

  return (
    <section className="contact">
      <div className="contact__container">
        <div className="contact__header">
          <div className="contact__logo">
            <img src="/images/Logo.png" alt="Logo" className="contact__logo-image" />
          </div>
          
          <div className="contact__text-container">
            <h2 className="contact__title">{title}</h2>
            <p className="contact__subtitle">{subtitle}</p>
          </div>
          
          <button className="contact__header-button">{startProject}</button>
        </div>

        <div className="contact__form">
          <div className="contact__input-group">
            <label className="contact__label">{fullName}</label>
            <div className="contact__input-container">
              <input 
                type="text" 
                name="fullName"
                className="contact__input" 
                placeholder="Type here"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              <div className="contact__input-line"></div>
            </div>
          </div>

          <div className="contact__input-group">
            <label className="contact__label">{email}</label>
            <div className="contact__input-container">
              <input 
                type="email" 
                name="email"
                className="contact__input" 
                placeholder="Type here"
                value={formData.email}
                onChange={handleInputChange}
              />
              <div className="contact__input-line"></div>
            </div>
          </div>

          <div className="contact__checkbox-group">
            <h3 className="contact__checkbox-title">{contactReason}</h3>
            <div className="contact__checkboxes">
              {[webDesign, collaboration, mobileApp, others].map((service, index) => (
                <div 
                  key={index}
                  className={`contact__checkbox ${selectedServices.includes(service) ? 'contact__checkbox--checked' : ''}`}
                  onClick={() => handleServiceToggle(service)}
                >
                  <div className="contact__checkbox-box">
                    <div className="contact__checkbox-icon"></div>
                  </div>
                  <span className="contact__checkbox-text">{service}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="contact__budget-group">
            <div className="contact__budget-text">
              <h3 className="contact__budget-title">{budget}</h3>
              <p className="contact__budget-hint">{budgetHint}</p>
            </div>
            <div 
              className="contact__slider-container" 
              ref={sliderRef}
              style={{ touchAction: 'none' }}
            >
              <div className="contact__slider-track">
                <div 
                  className="contact__slider-connector"
                  style={{
                    left: `${getThumbPosition(budgetRange[0])}%`,
                    width: `${getThumbPosition(budgetRange[1]) - getThumbPosition(budgetRange[0])}%`
                  }}
                ></div>
              </div>
              <div className="contact__slider-thumbs">
                <div 
                  className="contact__slider-thumb"
                  style={{ left: `${getThumbPosition(budgetRange[0])}%` }}
                  onMouseDown={(e) => handleMouseDown(0, e)}
                >
                  <div className="contact__thumb-circle">
                    <div className="contact__thumb-dot"></div>
                  </div>
                  <span className="contact__thumb-value">${budgetRange[0]}</span>
                </div>
                <div 
                  className="contact__slider-thumb"
                  style={{ left: `${getThumbPosition(budgetRange[1])}%` }}
                  onMouseDown={(e) => handleMouseDown(1, e)}
                >
                  <div className="contact__thumb-circle">
                    <div className="contact__thumb-dot"></div>
                  </div>
                  <span className="contact__thumb-value">${budgetRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact__input-group">
            <label className="contact__label">{message}</label>
            <div className="contact__input-container">
              <textarea 
                name="message"
                className="contact__textarea" 
                placeholder="Type here"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
              <div className="contact__input-line"></div>
            </div>
          </div>

          <button className="contact__submit-button">{submit}</button>
        </div>
      </div>
    </section>
  )
}

export default Contact