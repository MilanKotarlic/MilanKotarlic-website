import React from 'react'
import Hero from '../../components/shared/Hero/Hero'
import Services from '../../components/shared/Services/Services'
import WhyChoose from '../../components/shared/WhyChoose/WhyChoose'
import Contact from '../../components/shared/Contact/Contact'

const Home = () => {
  return (
    <div className="home">
      <Hero 
        title="Milan Kotarlić" 
        subtitle="Digital Product Studio" 
      />
      
      <Services 
        title="My Services" 
        subtitle="Professional solutions for your business" 
      />
      
      <WhyChoose 
        title="Why Choose Me" 
        subtitle="Experience and quality you can trust" 
      />
      
      <Contact 
        title="Contact Me" 
        subtitle="Let's work together" 
      />
    </div>
  )
}

export default Home