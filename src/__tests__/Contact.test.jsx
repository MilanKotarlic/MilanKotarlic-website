import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactPage from '../pages/Contact/Contact';

jest.mock('../hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (key) => {
      const translations = {
        'contactPage.title': 'Contact',
        'contactPage.subtitle': 'Get in touch with me for collaborations, projects, or just to say hello!',
        'contactPage.letsWork': 'Let\'s Work Together',
        'contactPage.projectDescription': 'Have a project in mind? Let\'s discuss how we can bring your ideas to life.',
        'contactPage.startProject': 'Start a Project',
        'contactPage.email': 'Email',
        'contactPage.phone': 'Phone',
        'contactPage.location': 'Location',
        'contactPage.connect': 'Connect With Me',
        'contactPage.sendMessage': 'Send me a message',
        'contactPage.namePlaceholder': 'Your Name',
        'contactPage.emailPlaceholder': 'Your Email',
        'contactPage.messagePlaceholder': 'Your Message',
        'contactPage.sendButton': 'Send Message',
        'about.linkedin': 'LinkedIn',
        'about.instagram': 'Instagram',
        'about.facebook': 'Facebook',
        'about.youtubeChannel': 'YouTube Channel'
      };
      return translations[key];
    }
  })
}));

describe('Contact Page', () => {
  test('renders contact page title and subtitle', () => {
    render(<ContactPage />);
    expect(screen.getByRole('heading', { name: 'Contact', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Get in touch with me for collaborations, projects, or just to say hello!')).toBeInTheDocument();
  });

  test('renders "Let\'s Work Together" section', () => {
    render(<ContactPage />);
    expect(screen.getByRole('heading', { name: 'Let\'s Work Together', level: 2 })).toBeInTheDocument();
    expect(screen.getByText('Have a project in mind? Let\'s discuss how we can bring your ideas to life.')).toBeInTheDocument();
  });

  test('renders contact information with icons', () => {
    render(<ContactPage />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('milan.kotarlicsc21@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('+381 60 0118254')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Serbia')).toBeInTheDocument();
  });

  test('renders social links with correct labels', () => {
    render(<ContactPage />);
    expect(screen.getByText('Connect With Me')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.getByText('YouTube Channel')).toBeInTheDocument();
  });

  test('renders logo image with correct attributes', () => {
    render(<ContactPage />);
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/Logo.png');
    expect(logo).toHaveClass('contact__logo-image');
  });

  test('social links have correct structure', () => {
    const { container } = render(<ContactPage />);
    const socialLinks = container.querySelectorAll('.contact__social-link');
    expect(socialLinks.length).toBe(4);
    const linkedinLink = screen.getByText('LinkedIn').closest('a');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/milan-kotarlic-a723a396/');
    const youtubeLink = screen.getByText('YouTube Channel').closest('a');
    expect(youtubeLink).toHaveAttribute('href', 'https://www.youtube.com/@TheMilanKotarlic');
  });

  test('contact info items have correct icons', () => {
    const { container } = render(<ContactPage />);
    const infoItems = container.querySelectorAll('.contact__info-item');
    expect(infoItems).toHaveLength(4);
    for (let i = 0; i < 3; i++) {
      const icon = infoItems[i].querySelector('.contact__info-icon');
      expect(icon).toBeInTheDocument();
    }
  });

  test('social links have icons and text', () => {
    render(<ContactPage />);
    const socialLinks = screen.getAllByRole('link').filter(link => 
      link.classList.contains('contact__social-link')
    );
    expect(socialLinks).toHaveLength(4);
    socialLinks.forEach(link => {
      const icon = link.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(link.textContent).toBeTruthy();
    });
  });

  test('contact page has correct CSS structure', () => {
    const { container } = render(<ContactPage />);
    expect(container.querySelector('.contact-page')).toBeInTheDocument();
    expect(container.querySelector('.contact-page__container')).toBeInTheDocument();
    expect(container.querySelector('.contact')).toBeInTheDocument();
    expect(container.querySelector('.contact__container')).toBeInTheDocument();
    const socialLinksContainer = container.querySelector('.contact__social-links');
    expect(socialLinksContainer).toBeInTheDocument();
    expect(socialLinksContainer.children).toHaveLength(4);
  });

  test('logo image has fallback on error', () => {
    render(<ContactPage />);
    const logo = screen.getByAltText('Logo');
    fireEvent.error(logo);
    expect(logo).toBeInTheDocument();
  });
});