import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import About from '../pages/About/About';

// Mock useLanguage hook
jest.mock('../hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (key) => {
      const translations = {
        'about.greeting': 'Hello I am Milan',
        'about.description': 'A passionate digital creator...',
        'about.links': 'My Links',
        'about.products': 'My Products',
        'about.youtubeChannel': 'YouTube Channel',
        'about.youtubeDescription': 'Check out my latest videos...',
        'about.linkedin': 'LinkedIn',
        'about.facebook': 'Facebook',
        'about.instagram': 'Instagram'
      };
      return translations[key];
    }
  })
}));

describe('About Page', () => {

  test('renders main heading with correct text', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { 
      name: 'Hello I am Milan', 
      level: 1 
    });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('about__heading');
  });

  test('renders description paragraph', () => {
    render(<About />);
    const paragraph = screen.getByText('A passionate digital creator...');

    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass('about__paragraph');
  });

  test('renders profile image with alt text', () => {
    render(<About />);
    const image = screen.getByAltText('Milan');

    expect(image).toBeInTheDocument();
    expect(image).toHaveClass('about__image');
    expect(image).toHaveAttribute('src', '/images/Milan.jpg');
  });

  test('renders social links section with correct headings', () => {
    render(<About />);
    
    const linksHeading = screen.getByRole('heading', { 
      name: 'My Links', 
      level: 3 
    });
    expect(linksHeading).toBeInTheDocument();
    expect(linksHeading).toHaveClass('about__subheading');
    
    const productsHeading = screen.getByRole('heading', { 
      name: 'My Products', 
      level: 3 
    });
    expect(productsHeading).toBeInTheDocument();
    expect(productsHeading).toHaveClass('about__subheading');
  });

  test('renders all social links with correct labels and URLs', () => {
    render(<About />);
    
    const linkedinLink = screen.getByText('LinkedIn').closest('a');
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/milan-kotarlic-a723a396/'
    );
    expect(linkedinLink).toHaveClass('about__link');
    
    const facebookLink = screen.getByText('Facebook').closest('a');
    expect(facebookLink).toHaveAttribute(
      'href',
      'https://www.facebook.com/KotarlicMilan'
    );
    
    const instagramLink = screen.getByText('Instagram').closest('a');
    expect(instagramLink).toHaveAttribute(
      'href',
      'https://www.instagram.com/milan_kotarlic/'
    );
  });

  test('renders YouTube section with link and description', () => {
    render(<About />);
    
    const youtubeLink = screen.getByText('YouTube Channel').closest('a');
    expect(youtubeLink).toHaveAttribute(
      'href',
      'https://www.youtube.com/@TheMilanKotarlic'
    );
    expect(youtubeLink).toHaveClass('about__youtube-link');
    
    const youtubeDesc = screen.getByText('Check out my latest videos...');
    expect(youtubeDesc).toBeInTheDocument();
    expect(youtubeDesc).toHaveClass('about__products-description');
  });

  test('renders correct CSS classes for containers', () => {
    const { container } = render(<About />);
    
    expect(container.querySelector('.about')).toBeInTheDocument();
    expect(container.querySelector('.about__text-container')).toBeInTheDocument();
    expect(container.querySelector('.about__image-container')).toBeInTheDocument();
    expect(container.querySelector('.about__links-container')).toBeInTheDocument();
    expect(container.querySelector('.about__products-container')).toBeInTheDocument();
  });

  test('profile image shows fallback image on error', () => {
    render(<About />);
    const image = screen.getByAltText('Milan');
    
    fireEvent.error(image);
    
    expect(image).toHaveAttribute('src', '/images/design.png');
  });

  test('social links open in new tab with security attributes', () => {
    render(<About />);
    
    const allLinks = screen.getAllByRole('link');
    
    allLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  test('renders all social media icons', () => {
    render(<About />);
    
    const links = screen.getAllByRole('link');
    const socialLinks = links.slice(0, 4);
    
    socialLinks.forEach(link => {
      expect(link.querySelector('.about__link-icon')).toBeInTheDocument();
    });
    
    const youtubeLink = screen.getByText('YouTube Channel').closest('a');
    expect(
      youtubeLink.querySelector('svg, .about__youtube-icon')
    ).toBeTruthy();
  });

  test('has correct structure with all containers', () => {
    const { container } = render(<About />);
    
    expect(container.querySelector('.about__content')).toBeInTheDocument();
    expect(container.querySelector('.about__links')).toBeInTheDocument();
    expect(container.querySelector('.about__products')).toBeInTheDocument();
    
    const socialLinks = container.querySelectorAll('.about__link');
    expect(socialLinks).toHaveLength(4);
  });

  test('YouTube section has correct structure', () => {
    render(<About />);
    
    const youtubeLink = screen.getByText('YouTube Channel').closest('a');
    expect(youtubeLink).toBeInTheDocument();
    expect(youtubeLink).toHaveClass('about__youtube-link');
    expect(youtubeLink).toHaveTextContent('YouTube Channel');
    
    const youtubeDesc = screen.getByText('Check out my latest videos...');
    expect(youtubeDesc).toBeInTheDocument();
    expect(youtubeDesc).toHaveClass('about__products-description');
  });

});