import React from 'react';
import { render, screen } from '@testing-library/react';
import Services from '../components/shared/Services/Services';

describe('Services Component', () => {
  const defaultProps = {
    title: 'Our Services',
    subtitle: 'We offer the best services'
  };

  test('renders services section with title and subtitle', () => {
    render(<Services {...defaultProps}><div>Child content</div></Services>);
    
    expect(screen.getByText('Our Services')).toBeInTheDocument();
    expect(screen.getByText('We offer the best services')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  test('renders correct heading level for title', () => {
    render(<Services {...defaultProps}><div>Test</div></Services>);
    
    const title = screen.getByRole('heading', { name: 'Our Services', level: 2 });
    expect(title).toBeInTheDocument();
  });

  test('has correct CSS classes', () => {
    const { container } = render(
      <Services {...defaultProps}><div>Test</div></Services>
    );
    
    expect(container.querySelector('.services')).toBeInTheDocument();
    expect(container.querySelector('.services__container')).toBeInTheDocument();
    expect(container.querySelector('.services__header')).toBeInTheDocument();
    expect(container.querySelector('.services__cards')).toBeInTheDocument();
  });

  test('title has correct CSS class', () => {
    render(<Services {...defaultProps}><div>Test</div></Services>);
    
    const title = screen.getByText('Our Services');
    expect(title).toHaveClass('services__title');
  });

  test('subtitle has correct CSS class', () => {
    render(<Services {...defaultProps}><div>Test</div></Services>);
    
    const subtitle = screen.getByText('We offer the best services');
    expect(subtitle).toHaveClass('services__subtitle');
  });

  test('renders multiple children correctly', () => {
    render(
      <Services {...defaultProps}>
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
        <div data-testid="child3">Child 3</div>
      </Services>
    );
    
    expect(screen.getByTestId('child1')).toBeInTheDocument();
    expect(screen.getByTestId('child2')).toBeInTheDocument();
    expect(screen.getByTestId('child3')).toBeInTheDocument();
  });
});