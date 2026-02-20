import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/layout/Footer/Footer';

jest.mock('../hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (key) => {
      const translations = {
        'navigation.home': 'Home',
        'navigation.gallery': 'Gallery',
        'navigation.contact': 'Contact'
      };
      return translations[key];
    }
  })
}));

jest.mock('react-icons/fa', () => ({
  FaFacebookF: () => <span data-testid="facebook-icon">FacebookIcon</span>,
  FaLinkedinIn: () => <span data-testid="linkedin-icon">LinkedInIcon</span>,
  FaYoutube: () => <span data-testid="youtube-icon">YouTubeIcon</span>,
  FaEnvelope: () => <span data-testid="email-icon">EmailIcon</span>,
  FaPhone: () => <span data-testid="phone-icon">PhoneIcon</span>,
  FaMapMarkerAlt: () => <span data-testid="location-icon">LocationIcon</span>
}));

describe('Footer Component', () => {
  const renderFooter = () => {
    return render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  };

  test('renders footer with logo', () => {
    renderFooter();
    
    const logo = screen.getByAltText('SquareUp');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/Logo.png');
    expect(screen.getByText('SquareUp')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    renderFooter();
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Gallery')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Why Choose')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
  });

  test('navigation links have correct URLs', () => {
    renderFooter();
    
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
    
    const galleryLink = screen.getByText('Gallery').closest('a');
    expect(galleryLink).toHaveAttribute('href', '/gallery');
    
    const contactLink = screen.getByText('Contact').closest('a');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  test('renders social media links with icons', () => {
    renderFooter();
    
    expect(screen.getByTestId('facebook-icon')).toBeInTheDocument();
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
    expect(screen.getByTestId('youtube-icon')).toBeInTheDocument();
    
    const socialLinks = screen.getAllByRole('link').filter(link => 
      link.querySelector('[data-testid*="icon"]')
    );
    expect(socialLinks).toHaveLength(3);
  });

  test('renders contact information', () => {
    renderFooter();
    
    expect(screen.getByText('email@squareup.com')).toBeInTheDocument();
    expect(screen.getByText('+1 234 567 890')).toBeInTheDocument();
    expect(screen.getByText('123 Business Street, City')).toBeInTheDocument();
  });

  test('renders contact icons', () => {
    renderFooter();
    
    expect(screen.getByTestId('email-icon')).toBeInTheDocument();
    expect(screen.getByTestId('phone-icon')).toBeInTheDocument();
    expect(screen.getByTestId('location-icon')).toBeInTheDocument();
  });

  test('has correct CSS classes', () => {
    const { container } = renderFooter();
    
    expect(container.querySelector('.footer')).toBeInTheDocument();
    expect(container.querySelector('.footer__container')).toBeInTheDocument();
    expect(container.querySelector('.footer__top')).toBeInTheDocument();
    expect(container.querySelector('.footer__middle')).toBeInTheDocument();
    expect(container.querySelector('.footer__bottom')).toBeInTheDocument();
    expect(container.querySelector('.footer__nav')).toBeInTheDocument();
    expect(container.querySelector('.footer__social')).toBeInTheDocument();
  });

  test('renders "Stay Connected" heading', () => {
    renderFooter();
    
    expect(screen.getByText('Stay Connected')).toBeInTheDocument();
    expect(screen.getByText('Stay Connected')).toHaveClass('footer__stay-connected');
  });

  test('contact items have icons', () => {
    const { container } = renderFooter();
    
    const contactItems = container.querySelectorAll('.footer__contact-item');
    expect(contactItems).toHaveLength(3);
    
    contactItems.forEach(item => {
      const icon = item.querySelector('[data-testid]');
      expect(icon).toBeInTheDocument();
    });
  });
});