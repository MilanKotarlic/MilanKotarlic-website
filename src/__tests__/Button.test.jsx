import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/shared/Button/Button';

describe('Button Component', () => {
  test('renders button with default variant and size', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn');
    expect(button).toHaveClass('btn--primary');
    expect(button).toHaveClass('btn--medium');
  });

  test('renders button with secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Secondary Button' });
    expect(button).toHaveClass('btn--secondary');
  });

  test('renders button with small size', () => {
    render(<Button size="small">Small Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Small Button' });
    expect(button).toHaveClass('btn--small');
  });

  test('renders button with large size', () => {
    render(<Button size="large">Large Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Large Button' });
    expect(button).toHaveClass('btn--large');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    
    const button = screen.getByRole('button', { name: 'Clickable' });
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders disabled button', () => {
    render(<Button disabled>Disabled Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('disabled');
  });

  test('renders button with custom type', () => {
    render(<Button type="submit">Submit Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Submit Button' });
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('renders button with default type when not specified', () => {
    render(<Button>Default Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Default Button' });
    expect(button).toHaveAttribute('type', 'button');
  });

  test('button has correct CSS classes combination', () => {
    render(
      <Button variant="secondary" size="large">
        Custom Button
      </Button>
    );
    
    const button = screen.getByRole('button', { name: 'Custom Button' });
    expect(button).toHaveClass('btn');
    expect(button).toHaveClass('btn--secondary');
    expect(button).toHaveClass('btn--large');
  });
});