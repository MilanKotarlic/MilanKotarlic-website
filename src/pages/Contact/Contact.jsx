import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import "../../styles/components/contactpage.scss";

const ContactPage = () => {
  const { t } = useLanguage();

  return (
    <section className="contact-page">
      <div className="contact-page__container">
        <div className="contact-page__header">
          <h1 className="contact-page__title">{t('contactPage.title')}</h1>
          <p className="contact-page__subtitle">
            {t('contactPage.subtitle')}
          </p>
        </div>

        <div className="contact">
          <div className="contact__container">
            <div className="contact__header">
              <div className="contact__logo">
                <img src="/images/Logo.png" alt="Logo" className="contact__logo-image" />
              </div>

              <div className="contact__text-container">
                <h2 className="contact__title">{t('contactPage.letsWork')}</h2>
                <p className="contact__subtitle">
                  {t('contactPage.projectDescription')}
                </p>
              </div>
            </div>

            <div className="contact__info">
              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <FaEnvelope />
                </div>
                <h3>{t('contactPage.email')}</h3>
                <a href="mailto:milan.kotarlicsc21@gmail.com" className="contact__link">
                  milan.kotarlicsc21@gmail.com
                </a>
              </div>

              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <FaPhone />
                </div>
                <h3>{t('contactPage.phone')}</h3>
                <a href="tel:+381600118254" className="contact__link">
                  +381 60 0118254
                </a>
              </div>

              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <FaMapMarkerAlt />
                </div>
                <h3>{t('contactPage.location')}</h3>
                <p>Serbia</p>
              </div>

              <div className="contact__info-item contact__info-item--social">
                <h3>{t('contactPage.connect')}</h3>
                <div className="contact__social-links">
                  <a href="https://www.linkedin.com/in/milan-kotarlic-a723a396/" target="_blank" rel="noopener noreferrer" className="contact__social-link">
                    <FaLinkedin />
                    <span>{t('about.linkedin')}</span>
                  </a>
                  <a href="https://www.instagram.com/milan_kotarlic/" target="_blank" rel="noopener noreferrer" className="contact__social-link">
                    <FaInstagram />
                    <span>{t('about.instagram')}</span>
                  </a>
                  <a href="https://www.facebook.com/KotarlicMilan" target="_blank" rel="noopener noreferrer" className="contact__social-link">
                    <FaFacebook />
                    <span>{t('about.facebook')}</span>
                  </a>
                  <a href="https://www.youtube.com/@TheMilanKotarlic" target="_blank" rel="noopener noreferrer" className="contact__social-link">
                    <FaYoutube />
                    <span>{t('about.youtubeChannel')}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* There is no sevice for sending messages, lets comment it out for now */}
        {/* <div className="contact-page__form-container">
          <h2 className="contact-page__form-title">{t('contactPage.sendMessage')}</h2>
          <form className="contact-page__form">
            <div className="contact-page__form-group">
              <input type="text" placeholder={t('contactPage.namePlaceholder')} className="contact-page__input" />
            </div>
            <div className="contact-page__form-group">
              <input type="email" placeholder={t('contactPage.emailPlaceholder')} className="contact-page__input" />
            </div>
            <div className="contact-page__form-group">
              <textarea placeholder={t('contactPage.messagePlaceholder')} rows="5" className="contact-page__textarea"></textarea>
            </div>
            <button type="submit" className="contact-page__submit-button">{t('contactPage.sendButton')}</button>
          </form>
        </div> */}
      </div>
    </section>
  );
};

export default ContactPage;