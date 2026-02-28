import React from 'react';
import { useStore } from '../../store';
import { useLanguage } from '../../hooks/useLanguage';
import Services from '../../components/shared/Services/Services';
import WhyChoose from '../../components/shared/WhyChoose/WhyChoose';
import Contact from '../../components/shared/Contact/Contact';
import Button from '../../components/shared/Button/Button';
import { Link } from 'react-router-dom';

const Home = () => {
  const { state } = useStore();
  const { t } = useLanguage();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__background-pattern"></div>

        <div className="hero__container">
          <div className="hero__content">
            <h1 className="hero__title">{t('hero.title')}</h1>

            <div className="hero__blur-box">
              <p className="hero__subtitle">{t('hero.subtitle')}</p>
            </div>

            <div className="hero__buttons">
              <Link to="/contact" >
              <Button variant="secondary" size="medium">
                {t('hero.secondaryButton')}
              </Button>
              </Link>
              <Link to="/gallery">
              <Button variant="primary" size="medium">
                {t('hero.primaryButton')}
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Services
        title={t('services.title')}
        subtitle={t('services.subtitle')}
      >
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