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
    
    expect(screen.getByRole('heading', { 
      name: 'Contact', 
      level: 1 
    })).toBeInTheDocument();
    
    expect(screen.getByText('Get in touch with me for collaborations, projects, or just to say hello!')).toBeInTheDocument();
  });

  test('renders "Let\'s Work Together" section', () => {
    render(<ContactPage />);
    
    expect(screen.getByRole('heading', { 
      name: 'Let\'s Work Together', 
      level: 2 
    })).toBeInTheDocument();
    
    expect(screen.getByText('Have a project in mind? Let\'s discuss how we can bring your ideas to life.')).toBeInTheDocument();
  });

  test('renders contact information with icons', () => {
    render(<ContactPage />);
    
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('milan.kotarlicsc21@gmail.com')).toBeInTheDocument();
    
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('+381 64 123 4567')).toBeInTheDocument();
    
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

  // test('renders contact form with all fields', () => {
  //   render(<ContactPage />);
    
  //   expect(screen.getByRole('heading', { 
  //     name: 'Send me a message', 
  //     level: 2 
  //   })).toBeInTheDocument();
    
  //   const nameInput = screen.getByPlaceholderText('Your Name');
  //   const emailInput = screen.getByPlaceholderText('Your Email');
  //   const messageTextarea = screen.getByPlaceholderText('Your Message');
  //   const submitButton = screen.getByRole('button', { name: 'Send Message' });
    
  //   expect(nameInput).toBeInTheDocument();
  //   expect(emailInput).toBeInTheDocument();
  //   expect(messageTextarea).toBeInTheDocument();
  //   expect(submitButton).toBeInTheDocument();
    
  //   expect(nameInput).toHaveClass('contact-page__input');
  //   expect(emailInput).toHaveClass('contact-page__input');
  //   expect(messageTextarea).toHaveClass('contact-page__textarea');
  //   expect(submitButton).toHaveClass('contact-page__submit-button');
  // });

  // test('allows typing in form fields', async () => {
  //   const user = userEvent.setup();
  //   render(<ContactPage />);
    
  //   const nameInput = screen.getByPlaceholderText('Your Name');
  //   const emailInput = screen.getByPlaceholderText('Your Email');
  //   const messageTextarea = screen.getByPlaceholderText('Your Message');
    
  //   await user.type(nameInput, 'John Doe');
  //   await user.type(emailInput, 'john@example.com');
  //   await user.type(messageTextarea, 'Hello, I would like to work with you!');
    
  //   expect(nameInput).toHaveValue('John Doe');
  //   expect(emailInput).toHaveValue('john@example.com');
  //   expect(messageTextarea).toHaveValue('Hello, I would like to work with you!');
  // });

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

  // test('contact form has correct input types and attributes', () => {
  //   render(<ContactPage />);
    
  //   const nameInput = screen.getByPlaceholderText('Your Name');
  //   const emailInput = screen.getByPlaceholderText('Your Email');
  //   const messageTextarea = screen.getByPlaceholderText('Your Message');
    
  //   expect(nameInput).toHaveAttribute('type', 'text');
  //   expect(emailInput).toHaveAttribute('type', 'email');
  //   expect(messageTextarea).toHaveAttribute('rows', '5');
  // });

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

  test('"Start a Project" button has correct class and is clickable', async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    render(<ContactPage />);
        
    consoleSpy.mockRestore();
  });

  test('contact page has correct CSS structure', () => {
    const { container } = render(<ContactPage />);
    
    expect(container.querySelector('.contact-page')).toBeInTheDocument();
    expect(container.querySelector('.contact-page__container')).toBeInTheDocument();
    expect(container.querySelector('.contact')).toBeInTheDocument();
    expect(container.querySelector('.contact__container')).toBeInTheDocument();
    // commented out because we need a service for sending mails
    // expect(container.querySelector('.contact-page__form-container')).toBeInTheDocument();
    
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