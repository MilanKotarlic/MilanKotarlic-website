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
        primaryButton={t('hero.primaryButton')}
        secondaryButton={t('hero.secondaryButton')}
      />
      
      <Services 
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        designTitle={t('services.design.title')}
        designDesc={t('services.design.description')}
        engineeringTitle={t('services.engineering.title')}
        engineeringDesc={t('services.engineering.description')}
        projectManagementTitle={t('services.projectManagement.title')}
        projectManagementDesc={t('services.projectManagement.description')}
        learnMore={t('services.learnMore')}
      />
      
      <WhyChoose 
        title={t('whyChoose.title')}
        subtitle={t('whyChoose.subtitle')}
        expertiseTitle={t('whyChoose.expertise.title')}
        expertiseDesc={t('whyChoose.expertise.description')}
        clientCentricTitle={t('whyChoose.clientCentric.title')}
        clientCentricDesc={t('whyChoose.clientCentric.description')}
        resultsDrivenTitle={t('whyChoose.resultsDriven.title')}
        resultsDrivenDesc={t('whyChoose.resultsDriven.description')}
        collaborativeTitle={t('whyChoose.collaborative.title')}
        collaborativeDesc={t('whyChoose.collaborative.description')}
      />
      
      <Contact 
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
        startProject={t('contact.startProject')}
        fullName={t('contact.fullName')}
        email={t('contact.email')}
        contactReason={t('contact.contactReason')}
        webDesign={t('contact.webDesign')}
        collaboration={t('contact.collaboration')}
        mobileApp={t('contact.mobileApp')}
        others={t('contact.others')}
        budget={t('contact.budget')}
        budgetHint={t('contact.budgetHint')}
        minBudget={t('contact.minBudget')}
        maxBudget={t('contact.maxBudget')}
        message={t('contact.message')}
        submit={t('contact.submit')}
      />
    </div>
  )
}

export default Home