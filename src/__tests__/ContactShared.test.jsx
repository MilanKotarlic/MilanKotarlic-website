import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../components/shared/Contact/Contact';

jest.mock('react-icons/fa', () => ({
  FaLinkedin: () => <span data-testid="linkedin-icon">LinkedInIcon</span>,
  FaInstagram: () => <span data-testid="instagram-icon">InstagramIcon</span>,
  FaFacebook: () => <span data-testid="facebook-icon">FacebookIcon</span>,
  FaYoutube: () => <span data-testid="youtube-icon">YouTubeIcon</span>
}));

describe('Contact Component (Shared)', () => {
  const defaultProps = {
    title: 'Contact Title',
    subtitle: 'Contact Subtitle',
    startProject: 'Start Project'
  };

  test('renders contact section with all content', () => {
    render(<Contact {...defaultProps} />);
    
    expect(screen.getByText('Contact Title')).toBeInTheDocument();
    expect(screen.getByText('Contact Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Social')).toBeInTheDocument();
  });

  test('renders correct heading level for title', () => {
    render(<Contact {...defaultProps} />);
    
    const title = screen.getByRole('heading', { name: 'Contact Title', level: 2 });
    expect(title).toBeInTheDocument();
  });

  test('has correct CSS classes', () => {
    const { container } = render(<Contact {...defaultProps} />);
    
    expect(container.querySelector('.contact')).toBeInTheDocument();
    expect(container.querySelector('.contact__container')).toBeInTheDocument();
    expect(container.querySelector('.contact__header')).toBeInTheDocument();
    expect(container.querySelector('.contact__info')).toBeInTheDocument();
  });

  test('renders logo image', () => {
    render(<Contact {...defaultProps} />);
    
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/Logo.png');
    expect(logo).toHaveClass('contact__logo-image');
  });

  test('renders contact information items', () => {
    const { container } = render(<Contact {...defaultProps} />);
    
    const infoItems = container.querySelectorAll('.contact__info-item');
    expect(infoItems).toHaveLength(3);
  });

  test('renders email information correctly', () => {
    render(<Contact {...defaultProps} />);
    
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('milan.kotarlicsc21@gmail.com')).toBeInTheDocument();
  });

  test('renders phone information correctly', () => {
    render(<Contact {...defaultProps} />);
    
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('+381 60 0118254')).toBeInTheDocument();
  });

  test('renders social links with icons', () => {
    render(<Contact {...defaultProps} />);
    
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
    expect(screen.getByTestId('instagram-icon')).toBeInTheDocument();
    expect(screen.getByTestId('facebook-icon')).toBeInTheDocument();
    expect(screen.getByTestId('youtube-icon')).toBeInTheDocument();
  });

  test('renders social link labels', () => {
    render(<Contact {...defaultProps} />);
    
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.getByText('YouTube')).toBeInTheDocument();
  });
});