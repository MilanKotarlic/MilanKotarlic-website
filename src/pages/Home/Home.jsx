import React from 'react';
import { useStore } from '../../store';
import { useLanguage } from '../../hooks/useLanguage';
import Hero from './Hero/Hero';
import Services from '../../components/shared/Services/Services';
import WhyChoose from '../../components/shared/WhyChoose/WhyChoose';
import Contact from '../../components/shared/Contact/Contact';

const Home = () => {
  const { state } = useStore();
  const { t } = useLanguage();

  console.log('Current state:', state);
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
      >
        {/* Card 1 */}
        <div className="services__card">
          <div className="services__card-header">
            <div className="services__icon">
              <img src="/images/design.png" alt="Design" />
            </div>
            <h3 className="services__card-title">{t('services.design.title')}</h3>
          </div>
          <p className="services__card-description">
            {t('services.design.description')}
          </p>
          <button className="services__button">
            {t('services.learnMore')}
          </button>
        </div>

        {/* Card 2 */}
        <div className="services__card">
          <div className="services__card-header">
            <div className="services__icon">
              <img src="/images/development.png" alt="Engineering" />
            </div>
            <h3 className="services__card-title">{t('services.engineering.title')}</h3>
          </div>
          <p className="services__card-description">
            {t('services.engineering.description')}
          </p>
          <button className="services__button">
            {t('services.learnMore')}
          </button>
        </div>

        {/* Card 3 */}
        <div className="services__card">
          <div className="services__card-header">
            <div className="services__icon">
              <img src="/images/management.png" alt="Project Management" />
            </div>
            <h3 className="services__card-title">{t('services.projectManagement.title')}</h3>
          </div>
          <p className="services__card-description">
            {t('services.projectManagement.description')}
          </p>
          <button className="services__button">
            {t('services.learnMore')}
          </button>
        </div>
      </Services>

      <WhyChoose
  title={t('whyChoose.title')}
  subtitle={t('whyChoose.subtitle')}
>
  {/* Card 1 */}
  <div className="why-choose__card">
    <div className="why-choose__card-header">
      <div className="why-choose__icon">
        <img
          src="/images/expertise.svg"
          alt="Expertise"
          className="why-choose__icon-image"
        />
      </div>
      <h3 className="why-choose__card-title">{t('whyChoose.expertise.title')}</h3>
    </div>
    <p className="why-choose__card-description">
      {t('whyChoose.expertise.description')}
    </p>
  </div>

  <div className="why-choose__line"></div>

  {/* Card 2 */}
  <div className="why-choose__card">
    <div className="why-choose__card-header">
      <div className="why-choose__icon">
        <img
          src="/images/client.svg"
          alt="Client-Centric"
          className="why-choose__icon-image"
        />
      </div>
      <h3 className="why-choose__card-title">{t('whyChoose.clientCentric.title')}</h3>
    </div>
    <p className="why-choose__card-description">
      {t('whyChoose.clientCentric.description')}
    </p>
  </div>

  <div className="why-choose__line"></div>

  {/* Card 3 */}
  <div className="why-choose__card">
    <div className="why-choose__card-header">
      <div className="why-choose__icon">
        <img
          src="/images/results.svg"
          alt="Results-Driven"
          className="why-choose__icon-image"
        />
      </div>
      <h3 className="why-choose__card-title">{t('whyChoose.resultsDriven.title')}</h3>
    </div>
    <p className="why-choose__card-description">
      {t('whyChoose.resultsDriven.description')}
    </p>
  </div>

  <div className="why-choose__line"></div>

  {/* Card 4 */}
  <div className="why-choose__card">
    <div className="why-choose__card-header">
      <div className="why-choose__icon">
        <img
          src="/images/collaboration.svg"
          alt="Collaborative"
          className="why-choose__icon-image"
        />
      </div>
      <h3 className="why-choose__card-title">{t('whyChoose.collaborative.title')}</h3>
    </div>
    <p className="why-choose__card-description">
      {t('whyChoose.collaborative.description')}
    </p>
  </div>
</WhyChoose>

      <Contact
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
        startProject={t('contact.startProject')}
      />
    </div>
  );
};

export default Home;