import React from 'react';
import { render, screen } from '@testing-library/react';
import WhyChoose from '../components/shared/WhyChoose/WhyChoose';

describe('WhyChoose Component', () => {
  const defaultProps = {
    title: 'Why Choose Us',
    subtitle: 'Reasons to work with us'
  };

  test('renders why choose section with title and subtitle', () => {
    render(<WhyChoose {...defaultProps}><div>Child content</div></WhyChoose>);
    
    expect(screen.getByText('Why Choose Us')).toBeInTheDocument();
    expect(screen.getByText('Reasons to work with us')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  test('renders correct heading level for title', () => {
    render(<WhyChoose {...defaultProps}><div>Test</div></WhyChoose>);
    
    const title = screen.getByRole('heading', { name: 'Why Choose Us', level: 2 });
    expect(title).toBeInTheDocument();
  });

  test('has correct CSS classes', () => {
    const { container } = render(
      <WhyChoose {...defaultProps}><div>Test</div></WhyChoose>
    );
    
    expect(container.querySelector('.why-choose')).toBeInTheDocument();
    expect(container.querySelector('.why-choose__container')).toBeInTheDocument();
    expect(container.querySelector('.why-choose__header')).toBeInTheDocument();
    expect(container.querySelector('.why-choose__cards')).toBeInTheDocument();
  });

  test('title has correct CSS class', () => {
    render(<WhyChoose {...defaultProps}><div>Test</div></WhyChoose>);
    
    const title = screen.getByText('Why Choose Us');
    expect(title).toHaveClass('why-choose__title');
  });

  test('subtitle has correct CSS class', () => {
    render(<WhyChoose {...defaultProps}><div>Test</div></WhyChoose>);
    
    const subtitle = screen.getByText('Reasons to work with us');
    expect(subtitle).toHaveClass('why-choose__subtitle');
  });

  test('renders multiple children correctly', () => {
    render(
      <WhyChoose {...defaultProps}>
        <div data-testid="reason1">Reason 1</div>
        <div data-testid="reason2">Reason 2</div>
        <div data-testid="reason3">Reason 3</div>
        <div data-testid="reason4">Reason 4</div>
      </WhyChoose>
    );
    
    expect(screen.getByTestId('reason1')).toBeInTheDocument();
    expect(screen.getByTestId('reason2')).toBeInTheDocument();
    expect(screen.getByTestId('reason3')).toBeInTheDocument();
    expect(screen.getByTestId('reason4')).toBeInTheDocument();
  });

  test('maintains proper structure with children', () => {
    const { container } = render(
      <WhyChoose {...defaultProps}>
        <div className="why-choose__card">Card 1</div>
        <div className="why-choose__card">Card 2</div>
      </WhyChoose>
    );
    
    const cards = container.querySelectorAll('.why-choose__card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Card 1');
    expect(cards[1]).toHaveTextContent('Card 2');
  });
});