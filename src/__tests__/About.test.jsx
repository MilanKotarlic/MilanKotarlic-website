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
        'about.github': 'GitHub',
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
    const heading = screen.getByRole('heading', { name: 'Hello I am Milan', level: 1 });
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
    
    // "My Links" heading
    const linksHeading = screen.getByRole('heading', { name: 'My Links', level: 3 });
    expect(linksHeading).toBeInTheDocument();
    expect(linksHeading).toHaveClass('about__subheading');
    
    // "My Products" heading
    const productsHeading = screen.getByRole('heading', { name: 'My Products', level: 3 });
    expect(productsHeading).toBeInTheDocument();
    expect(productsHeading).toHaveClass('about__subheading');
  });

  test('renders all social links with correct labels and URLs', () => {
    render(<About />);
    
    // LinkedIn
    const linkedinLink = screen.getByText('LinkedIn').closest('a');
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com');
    expect(linkedinLink).toHaveClass('about__link');
    
    // GitHub
    const githubLink = screen.getByText('GitHub').closest('a');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/MilanKotarlic');
    
    // Facebook
    const facebookLink = screen.getByText('Facebook').closest('a');
    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/KotarlicMilan');
    
    // Instagram
    const instagramLink = screen.getByText('Instagram').closest('a');
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com');
  });

  test('renders YouTube section with link and description', () => {
    render(<About />);
    
    // YouTube link
    const youtubeLink = screen.getByText('YouTube Channel').closest('a');
    expect(youtubeLink).toHaveAttribute('href', 'https://youtube.com');
    expect(youtubeLink).toHaveClass('about__youtube-link');
    
    // YouTube description
    const youtubeDesc = screen.getByText('Check out my latest videos...');
    expect(youtubeDesc).toBeInTheDocument();
    expect(youtubeDesc).toHaveClass('about__products-description');
  });

  test('renders correct CSS classes for containers', () => {
    const { container } = render(<About />);
    
    // container
    const aboutSection = container.querySelector('.about');
    expect(aboutSection).toBeInTheDocument();
    
    // Text container
    const textContainer = container.querySelector('.about__text-container');
    expect(textContainer).toBeInTheDocument();
    
    // Image container
    const imageContainer = container.querySelector('.about__image-container');
    expect(imageContainer).toBeInTheDocument();
    
    // Links container
    const linksContainer = container.querySelector('.about__links-container');
    expect(linksContainer).toBeInTheDocument();
    
    // Products container
    const productsContainer = container.querySelector('.about__products-container');
    expect(productsContainer).toBeInTheDocument();
  });

    test('profile image shows fallback image on error', () => {
    render(<About />);
    const image = screen.getByAltText('Milan');
    
    // Error load image
    fireEvent.error(image);
    
    expect(image).toHaveAttribute('src', '/images/design.png');
  });

  test('social links open in new tab with security attributes', () => {
    render(<About />);
    
    const allLinks = screen.getAllByRole('link');
    
    // Check links
    allLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

    test('renders all social media icons', () => {
    render(<About />);
    
    // Icons in links
    const links = screen.getAllByRole('link');
    const socialLinks = links.slice(0, 4); // Prva 4 su social linkovi
    
    socialLinks.forEach(link => {
      expect(link.querySelector('.about__link-icon')).toBeInTheDocument();
    });
    
    // YouTube icon
    const youtubeLink = screen.getByText('YouTube Channel').closest('a');
    expect(youtubeLink.querySelector('.about__youtube-icon')).toBeInTheDocument();
  });

  test('has correct structure with all containers', () => {
    const { container } = render(<About />);
    
    // Basic structure
    expect(container.querySelector('.about__content')).toBeInTheDocument();
    expect(container.querySelector('.about__links')).toBeInTheDocument();
    expect(container.querySelector('.about__products')).toBeInTheDocument();
    
    // 4 social links
    const socialLinks = container.querySelectorAll('.about__link');
    expect(socialLinks).toHaveLength(4);
  });

  test('YouTube section has correct structure', () => {
    render(<About />);
    
    const youtubeLink = screen.getByText('YouTube Channel').closest('a');
    expect(youtubeLink).toBeInTheDocument();
    expect(youtubeLink).toHaveClass('about__youtube-link');
    
    // You tube links and icons
    expect(youtubeLink.querySelector('svg, .about__youtube-icon')).toBeTruthy();
    expect(youtubeLink).toHaveTextContent('YouTube Channel');
    
    // YouTube description
    const youtubeDesc = screen.getByText('Check out my latest videos...');
    expect(youtubeDesc).toBeInTheDocument();
    expect(youtubeDesc).toHaveClass('about__products-description');
  });
});
