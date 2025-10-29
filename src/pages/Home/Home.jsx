import React from 'react'
import { useStore } from '../../store'
import { useLanguage } from '../../hooks/useLanguage'
import Hero from '../../components/shared/Hero/Hero'
import Services from '../../components/shared/Services/Services'
import WhyChoose from '../../components/shared/WhyChoose/WhyChoose'
import Contact from '../../components/shared/Contact/Contact'

const Home = () => {
  const { state } = useStore()
  const { t } = useLanguage()

  console.log('Current state:', state)
  return (
    <div className="home">
      <Hero 
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />
      
      <Services 
        title={t('services.title')}
        subtitle={t('services.subtitle')}
      />
      
      <WhyChoose 
        title={t('whyChoose.title')}
        subtitle={t('whyChoose.subtitle')}
      />
      
      <Contact 
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
      />
    </div>
  )
}

export default Home