import React from 'react';
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

const Contact = ({ title, subtitle, startProject }) => {
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
        </div>

        <div className="contact__info">
          <div className="contact__info-item">
            <h3>Email</h3>
            <p>milan.kotarlicsc21@gmail.com</p>
          </div>

          <div className="contact__info-item">
            <h3>Phone</h3>
            <p>+381 60 0118254</p>
          </div>

          <div className="contact__info-item">
            <h3>Social</h3>
            <div className="contact__social-links">
              <a href="#">
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a href="#">
                <FaTwitter />
                <span>Twitter</span>
              </a>
              <a href="#">
                <FaInstagram />
                <span>Instagram</span>
              </a>
              <a href="#">
                <FaFacebook />
                <span>Facebook</span>
              </a>
              <a href="#">
                <FaYoutube />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
