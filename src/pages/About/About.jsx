import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import '../../styles/components/about.scss';

const About = () => {
  const { t } = useLanguage();

  const links = [
    { icon: <FaLinkedin />, label: t('about.linkedin'), url: 'https://linkedin.com' },
    { icon: <FaGithub />, label: t('about.github'), url: 'https://github.com/MilanKotarlic' },
    { icon: <FaFacebook />, label: t('about.facebook'), url: 'https://www.facebook.com/KotarlicMilan' },
    { icon: <FaInstagram />, label: t('about.instagram'), url: 'https://instagram.com' },
  ];

  return (
    <section className="about">
      <div className="about__container">
        <div className="about__text-container">
          <h1 className="about__heading">{t('about.greeting')}</h1>
          <p className="about__paragraph">
            {t('about.description')}
          </p>
        </div>

        <div className="about__content">
          <div className="about__image-container">
            <img 
              src="/images/Milan.jpg" 
              alt="Milan"
              className="about__image"
              onError={(e) => {
                e.target.src = '/images/design.png';
              }}
            />
          </div>

          <div className="about__links-container">
            <h3 className="about__subheading">{t('about.links')}</h3>
            <div className="about__links">
              {links.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  className="about__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="about__link-icon">{link.icon}</span>
                  <span className="about__link-label">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="about__products-container">
            <h3 className="about__subheading">{t('about.products')}</h3>
            <div className="about__products">
              <a 
                href="https://youtube.com"
                className="about__youtube-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="about__youtube-icon" />
                <span>{t('about.youtubeChannel')}</span>
              </a>
              <p className="about__products-description">
                {t('about.youtubeDescription')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;