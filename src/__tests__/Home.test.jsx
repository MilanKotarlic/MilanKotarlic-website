import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home/Home';


jest.mock('../store', () => ({
  useStore: () => ({
    state: {
      language: 'en',
      theme: 'light'
    }
  })
}));

jest.mock('../hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (key) => {
      const translations = {
        'hero.title': 'Welcome to Milan Kotarlić',
        'hero.subtitle': 'Digital Creator & Software Engineer',
        'hero.primaryButton': 'View My Work',
        'hero.secondaryButton': 'Contact Me',
        'services.title': 'My Services',
        'services.subtitle': 'What I can do for you',
        'services.design.title': 'UI/UX Design',
        'services.design.description': 'Beautiful and functional designs',
        'services.engineering.title': 'Software Engineering',
        'services.engineering.description': 'Robust and scalable solutions',
        'services.projectManagement.title': 'Project Management',
        'services.projectManagement.description': 'End-to-end project delivery',
        'services.learnMore': 'Learn More',
        'whyChoose.title': 'Why Choose Me',
        'whyChoose.subtitle': 'What sets me apart',
        'whyChoose.expertise.title': 'Expertise',
        'whyChoose.expertise.description': 'Years of experience',
        'whyChoose.clientCentric.title': 'Client-Centric',
        'whyChoose.clientCentric.description': 'Focus on your needs',
        'whyChoose.resultsDriven.title': 'Results-Driven',
        'whyChoose.resultsDriven.description': 'Delivering value',
        'whyChoose.collaborative.title': 'Collaborative',
        'whyChoose.collaborative.description': 'Working together',
        'contact.title': 'Let\'s Work Together',
        'contact.subtitle': 'Start your project today',
        'contact.startProject': 'Start Project'
      };
      return translations[key];
    }
  })
}));

jest.mock('../pages/Home/Hero/Hero', () => {
  return function MockHero({ title, subtitle, primaryButton, secondaryButton }) {
    return (
      <div data-testid="hero">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <button>{primaryButton}</button>
        <button>{secondaryButton}</button>
      </div>
    );
  };
});

jest.mock('../components/shared/Services/Services', () => {
  return function MockServices({ title, subtitle, children }) {
    return (
      <div data-testid="services">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        {children}
      </div>
    );
  };
});

jest.mock('../components/shared/WhyChoose/WhyChoose', () => {
  return function MockWhyChoose({ title, subtitle, children }) {
    return (
      <div data-testid="why-choose">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        {children}
      </div>
    );
  };
});

jest.mock('../components/shared/Contact/Contact', () => {
  return function MockContact({ title, subtitle, startProject }) {
    return (
      <div data-testid="contact">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <button>{startProject}</button>
      </div>
    );
  };
});

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all main sections', () => {
    render(<Home />);
    
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('services')).toBeInTheDocument();
    expect(screen.getByTestId('why-choose')).toBeInTheDocument();
    expect(screen.getByTestId('contact')).toBeInTheDocument();
  });

  test('passes correct props to Hero component', () => {
    render(<Home />);
    
    const hero = screen.getByTestId('hero');
    expect(hero).toHaveTextContent('Welcome to Milan Kotarlić');
    expect(hero).toHaveTextContent('Digital Creator & Software Engineer');
    expect(hero).toHaveTextContent('View My Work');
    expect(hero).toHaveTextContent('Contact Me');
  });

  test('passes correct props to Services component', () => {
    render(<Home />);
    
    const services = screen.getByTestId('services');
    expect(services).toHaveTextContent('My Services');
    expect(services).toHaveTextContent('What I can do for you');
  });

  test('renders service cards with correct content', () => {
    render(<Home />);
    
    expect(screen.getByText('UI/UX Design')).toBeInTheDocument();
    expect(screen.getByText('Beautiful and functional designs')).toBeInTheDocument();
    
    expect(screen.getByText('Software Engineering')).toBeInTheDocument();
    expect(screen.getByText('Robust and scalable solutions')).toBeInTheDocument();
    
    expect(screen.getByText('Project Management')).toBeInTheDocument();
    expect(screen.getByText('End-to-end project delivery')).toBeInTheDocument();
  });

  test('passes correct props to WhyChoose component', () => {
    render(<Home />);
    
    const whyChoose = screen.getByTestId('why-choose');
    expect(whyChoose).toHaveTextContent('Why Choose Me');
    expect(whyChoose).toHaveTextContent('What sets me apart');
  });

  test('renders why choose cards with correct content', () => {
    render(<Home />);
    
    expect(screen.getByText('Expertise')).toBeInTheDocument();
    expect(screen.getByText('Years of experience')).toBeInTheDocument();
    
    expect(screen.getByText('Client-Centric')).toBeInTheDocument();
    expect(screen.getByText('Focus on your needs')).toBeInTheDocument();
    
    expect(screen.getByText('Results-Driven')).toBeInTheDocument();
    expect(screen.getByText('Delivering value')).toBeInTheDocument();
    
    expect(screen.getByText('Collaborative')).toBeInTheDocument();
    expect(screen.getByText('Working together')).toBeInTheDocument();
  });

  test('passes correct props to Contact component', () => {
    render(<Home />);
    
    const contact = screen.getByTestId('contact');
    expect(contact).toHaveTextContent("Let's Work Together");
    expect(contact).toHaveTextContent('Start your project today');
    expect(contact).toHaveTextContent('Start Project');
  });

  test('has correct CSS classes', () => {
    const { container } = render(<Home />);
    
    expect(container.querySelector('.home')).toBeInTheDocument();
  });

  test('service cards have buttons', () => {
    render(<Home />);
    
    const learnMoreButtons = screen.getAllByText('Learn More');
    expect(learnMoreButtons).toHaveLength(3);
    
    learnMoreButtons.forEach(button => {
      expect(button).toHaveClass('services__button');
    });
  });
});