import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/layout/Header/Header';

jest.mock('../store', () => {
  const mockDispatch = jest.fn();
  return {
    useStore: () => ({
      state: { language: 'en' },
      dispatch: mockDispatch
    }),
    setLanguage: (lang) => ({ type: 'SET_LANGUAGE', payload: lang })
  };
});

jest.mock('../hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (key) => {
      const translations = {
        'navigation.home': 'Home',
        'navigation.about': 'About',
        'navigation.gallery': 'Gallery',
        'navigation.contact': 'Contact'
      };
      return translations[key] || key;
    }
  })
}));

describe('Header Component', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Header />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders header with logo', () => {
    renderHeader();
    const logo = screen.getByAltText('Milan');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/Milan.jpg');
    expect(screen.getByText('Milan Kotarlic')).toBeInTheDocument();
  });

  test('renders language switcher buttons', () => {
    renderHeader();
    const enButton = screen.getByText('EN');
    const srButton = screen.getByText('SR');
    expect(enButton).toBeInTheDocument();
    expect(srButton).toBeInTheDocument();
    expect(enButton.tagName).toBe('BUTTON');
    expect(srButton.tagName).toBe('BUTTON');
  });

  test('renders hamburger menu button', () => {
    renderHeader();
    const hamburgerButton = screen.getByRole('button', { name: '' });
    expect(hamburgerButton).toBeInTheDocument();
    expect(hamburgerButton).toHaveClass('header__hamburger');
    const hamburgerIcon = document.querySelector('.header__hamburger-icon');
    expect(hamburgerIcon).toBeInTheDocument();
    expect(hamburgerIcon.tagName).toBe('svg');
  });

  test('renders desktop navigation links', () => {
    renderHeader();
    const homeLinks = screen.getAllByText('Home');
    const aboutLinks = screen.getAllByText('About');
    const galleryLinks = screen.getAllByText('Gallery');
    const contactLinks = screen.getAllByText('Contact');
    expect(homeLinks.length).toBeGreaterThan(0);
    expect(aboutLinks.length).toBeGreaterThan(0);
    expect(galleryLinks.length).toBeGreaterThan(0);
    expect(contactLinks.length).toBeGreaterThan(0);
  });

  test('navigation links have correct URLs', () => {
    renderHeader();
    const homeLinks = screen.getAllByText('Home');
    const homeLink = homeLinks[0].closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
    const aboutLinks = screen.getAllByText('About');
    const aboutLink = aboutLinks[0].closest('a');
    expect(aboutLink).toHaveAttribute('href', '/about');
    const galleryLinks = screen.getAllByText('Gallery');
    const galleryLink = galleryLinks[0].closest('a');
    expect(galleryLink).toHaveAttribute('href', '/gallery');
    const contactLinks = screen.getAllByText('Contact');
    const contactLink = contactLinks[0].closest('a');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  test('toggles mobile menu when hamburger is clicked', () => {
    renderHeader();
    const hamburgerButton = screen.getByRole('button', { name: '' });
    const mobileNav = document.querySelector('.header__nav--mobile');
    expect(mobileNav).not.toHaveClass('header__nav--open');
    fireEvent.click(hamburgerButton);
    expect(mobileNav).toHaveClass('header__nav--open');
    fireEvent.click(hamburgerButton);
    expect(mobileNav).not.toHaveClass('header__nav--open');
  });

  test('closes mobile menu when link is clicked', () => {
    renderHeader();
    const hamburgerButton = screen.getByRole('button', { name: '' });
    const mobileNav = document.querySelector('.header__nav--mobile');
    fireEvent.click(hamburgerButton);
    expect(mobileNav).toHaveClass('header__nav--open');
    const homeLinks = screen.getAllByText('Home');
    const mobileHomeLink = homeLinks[homeLinks.length - 1].closest('a');
    fireEvent.click(mobileHomeLink);
    expect(mobileNav).not.toHaveClass('header__nav--open');
  });

  test('has correct CSS classes structure', () => {
    const { container } = renderHeader();
    expect(container.querySelector('.header')).toBeInTheDocument();
    expect(container.querySelector('.header__content')).toBeInTheDocument();
    expect(container.querySelector('.header__logo')).toBeInTheDocument();
    expect(container.querySelector('.header__language')).toBeInTheDocument();
    expect(container.querySelector('.header__nav--desktop')).toBeInTheDocument();
    expect(container.querySelector('.header__nav--mobile')).toBeInTheDocument();
  });

  test('desktop and mobile navigation both exist', () => {
    renderHeader();
    const desktopNav = document.querySelector('.header__nav--desktop');
    const mobileNav = document.querySelector('.header__nav--mobile');
    expect(desktopNav).toBeInTheDocument();
    expect(mobileNav).toBeInTheDocument();
    const desktopLinks = desktopNav.querySelectorAll('.header__nav-link');
    const mobileLinks = mobileNav.querySelectorAll('.header__nav-link');
    expect(desktopLinks).toHaveLength(4);
    expect(mobileLinks).toHaveLength(4);
  });

  test('logo has correct structure', () => {
    const { container } = renderHeader();
    const logoContainer = container.querySelector('.header__logo');
    expect(logoContainer).toBeInTheDocument();
    const logoOuter = container.querySelector('.header__logo-outer');
    expect(logoOuter).toBeInTheDocument();
    const logoText = container.querySelector('.header__logo-text');
    expect(logoText).toBeInTheDocument();
    expect(logoText).toHaveTextContent('Milan Kotarlic');
  });

  test('mobile nav is hidden by default', () => {
    renderHeader();
    const mobileNav = document.querySelector('.header__nav--mobile');
    expect(mobileNav).not.toHaveClass('header__nav--open');
  });
});