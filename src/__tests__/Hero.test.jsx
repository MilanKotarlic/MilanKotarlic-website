import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../pages/Home/Hero/Hero';

jest.mock('../components/shared/Button/Button', () => {
  return function MockButton({ children, variant, size }) {
    return (
      <button className={`mock-btn mock-btn--${variant} mock-btn--${size}`}>
        {children}
      </button>
    );
  };
});

describe('Hero Component', () => {
  const defaultProps = {
    title: 'Welcome Title',
    subtitle: 'Welcome Subtitle',
    primaryButton: 'Primary Action',
    secondaryButton: 'Secondary Action'
  };

  test('renders hero section with all content', () => {
    render(<Hero {...defaultProps} />);
    
    expect(screen.getByText('Welcome Title')).toBeInTheDocument();
    expect(screen.getByText('Welcome Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Primary Action')).toBeInTheDocument();
    expect(screen.getByText('Secondary Action')).toBeInTheDocument();
  });

  test('renders correct heading level for title', () => {
    render(<Hero {...defaultProps} />);
    
    const title = screen.getByRole('heading', { name: 'Welcome Title', level: 1 });
    expect(title).toBeInTheDocument();
  });

  test('has correct CSS classes', () => {
    const { container } = render(<Hero {...defaultProps} />);
    
    expect(container.querySelector('.hero')).toBeInTheDocument();
    expect(container.querySelector('.hero__container')).toBeInTheDocument();
    expect(container.querySelector('.hero__content')).toBeInTheDocument();
    expect(container.querySelector('.hero__background-pattern')).toBeInTheDocument();
    expect(container.querySelector('.hero__blur-box')).toBeInTheDocument();
    expect(container.querySelector('.hero__buttons')).toBeInTheDocument();
  });

  test('title has correct CSS class', () => {
    render(<Hero {...defaultProps} />);
    
    const title = screen.getByText('Welcome Title');
    expect(title).toHaveClass('hero__title');
  });

  test('subtitle has correct CSS class', () => {
    render(<Hero {...defaultProps} />);
    
    const subtitle = screen.getByText('Welcome Subtitle');
    expect(subtitle).toHaveClass('hero__subtitle');
  });

  test('renders two buttons', () => {
    render(<Hero {...defaultProps} />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  test('primary button has correct props', () => {
    render(<Hero {...defaultProps} />);
    
    const primaryButton = screen.getByText('Primary Action');
    expect(primaryButton).toHaveClass('mock-btn--primary');
    expect(primaryButton).toHaveClass('mock-btn--medium');
  });

  test('secondary button has correct props', () => {
    render(<Hero {...defaultProps} />);
    
    const secondaryButton = screen.getByText('Secondary Action');
    expect(secondaryButton).toHaveClass('mock-btn--secondary');
    expect(secondaryButton).toHaveClass('mock-btn--medium');
  });

  test('buttons are in correct order', () => {
    render(<Hero {...defaultProps} />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveTextContent('Secondary Action');
    expect(buttons[1]).toHaveTextContent('Primary Action');
  });

  test('blur box contains subtitle', () => {
    const { container } = render(<Hero {...defaultProps} />);
    
    const blurBox = container.querySelector('.hero__blur-box');
    expect(blurBox).toBeInTheDocument();
    expect(blurBox).toHaveTextContent('Welcome Subtitle');
  });
});