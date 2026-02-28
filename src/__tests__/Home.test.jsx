import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
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
        'hero.subtitle': 'Singer & Performer',
        'hero.primaryButton': 'Listen Now',
        'hero.secondaryButton': 'Book Me',

        'services.title': 'My Music Services',
        'services.subtitle': 'What I offer',
        'services.design.title': 'Live Performances',
        'services.design.description': 'Professional performances for all events',
        'services.engineering.title': 'Private Events',
        'services.engineering.description': 'Weddings, birthdays, and corporate events',
        'services.projectManagement.title': 'Studio Sessions',
        'services.projectManagement.description': 'High-quality vocal recordings',
        'services.learnMore': 'Learn More',

        'whyChoose.title': 'Why Follow My Music',
        'whyChoose.subtitle': 'What makes my music special',
        'whyChoose.expertise.title': 'Experience',
        'whyChoose.expertise.description': 'Years of performing live',
        'whyChoose.clientCentric.title': 'Authenticity',
        'whyChoose.clientCentric.description': 'Music from the heart',
        'whyChoose.resultsDriven.title': 'Energy',
        'whyChoose.resultsDriven.description': 'Unforgettable atmosphere',
        'whyChoose.collaborative.title': 'Connection',
        'whyChoose.collaborative.description': 'Building memories together',

        'contact.title': "Let's Work Together",
        'contact.subtitle': 'Book your event today',
        'contact.startProject': 'Book Now'
      };

      return translations[key];
    }
  })
}));

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

const renderHome = () =>
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all main sections', () => {
    renderHome();

    expect(screen.getByTestId('services')).toBeInTheDocument();
    expect(screen.getByTestId('why-choose')).toBeInTheDocument();
    expect(screen.getByTestId('contact')).toBeInTheDocument();
  });

  test('passes correct props to Hero component', () => {
    renderHome();

    expect(screen.getByText('Welcome to Milan Kotarlić')).toBeInTheDocument();
    expect(screen.getByText('Singer & Performer')).toBeInTheDocument();
    expect(screen.getByText('Listen Now')).toBeInTheDocument();
    expect(screen.getByText('Book Me')).toBeInTheDocument();
  });

  test('passes correct props to Services component', () => {
    renderHome();

    const services = screen.getByTestId('services');
    expect(services).toHaveTextContent('My Music Services');
    expect(services).toHaveTextContent('What I offer');
  });

  test('renders service cards with correct content', () => {
    renderHome();

    expect(screen.getByText('Live Performances')).toBeInTheDocument();
    expect(screen.getByText('Professional performances for all events')).toBeInTheDocument();

    expect(screen.getByText('Private Events')).toBeInTheDocument();
    expect(screen.getByText('Weddings, birthdays, and corporate events')).toBeInTheDocument();

    expect(screen.getByText('Studio Sessions')).toBeInTheDocument();
    expect(screen.getByText('High-quality vocal recordings')).toBeInTheDocument();
  });

  test('passes correct props to WhyChoose component', () => {
    renderHome();

    const whyChoose = screen.getByTestId('why-choose');
    expect(whyChoose).toHaveTextContent('Why Follow My Music');
    expect(whyChoose).toHaveTextContent('What makes my music special');
  });

  test('renders Why Follow My Music cards with correct content', () => {
    renderHome();

    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Years of performing live')).toBeInTheDocument();

    expect(screen.getByText('Authenticity')).toBeInTheDocument();
    expect(screen.getByText('Music from the heart')).toBeInTheDocument();

    expect(screen.getByText('Energy')).toBeInTheDocument();
    expect(screen.getByText('Unforgettable atmosphere')).toBeInTheDocument();

    expect(screen.getByText('Connection')).toBeInTheDocument();
    expect(screen.getByText('Building memories together')).toBeInTheDocument();
  });

  test('passes correct props to Contact component', () => {
    renderHome();

    const contact = screen.getByTestId('contact');
    expect(contact).toHaveTextContent("Let's Work Together");
    expect(contact).toHaveTextContent('Book your event today');
    expect(contact).toHaveTextContent('Book Now');
  });

  test('has correct CSS classes', () => {
    const { container } = renderHome();
    expect(container.querySelector('.home')).toBeInTheDocument();
  });

  test('service cards have buttons', () => {
    renderHome();

    const learnMoreButtons = screen.getAllByText('Learn More');
    expect(learnMoreButtons).toHaveLength(3);

    learnMoreButtons.forEach(button => {
      expect(button).toHaveClass('services__button');
    });
  });
});