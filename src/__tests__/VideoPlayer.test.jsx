import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';

describe('VideoPlayer Component', () => {
  const defaultProps = {
    videoId: 'abc123',
    title: 'Test Video Title',
    onClose: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders video player with iframe', () => {
    render(<VideoPlayer {...defaultProps} />);
    
    expect(screen.getByText('Test Video Title')).toBeInTheDocument();
    
    const iframe = screen.getByTitle('Test Video Title');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/abc123?autoplay=1');
  });

  test('renders close button with aria label', () => {
    render(<VideoPlayer {...defaultProps} />);
    
    const closeButton = screen.getByRole('button', { name: 'Close video player' });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveClass('video-player__close');
    expect(closeButton).toHaveTextContent('×');
  });

  test('calls onClose when close button is clicked', () => {
    render(<VideoPlayer {...defaultProps} />);
    
    const closeButton = screen.getByRole('button', { name: 'Close video player' });
    fireEvent.click(closeButton);
    
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  test('iframe has correct security attributes', () => {
    render(<VideoPlayer {...defaultProps} />);
    
    const iframe = screen.getByTitle('Test Video Title');
    expect(iframe).toHaveAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    expect(iframe).toHaveAttribute('allowFullScreen');
    expect(iframe).toHaveAttribute('frameBorder', '0');
  });

  test('has correct CSS classes', () => {
    const { container } = render(<VideoPlayer {...defaultProps} />);
    
    expect(container.querySelector('.video-player__overlay')).toBeInTheDocument();
    expect(container.querySelector('.video-player__container')).toBeInTheDocument();
    expect(container.querySelector('.video-player__header')).toBeInTheDocument();
    expect(container.querySelector('.video-player__title')).toBeInTheDocument();
    expect(container.querySelector('.video-player__close')).toBeInTheDocument();
    expect(container.querySelector('.video-player__embed')).toBeInTheDocument();
  });

  test('title has correct CSS class', () => {
    render(<VideoPlayer {...defaultProps} />);
    
    const title = screen.getByText('Test Video Title');
    expect(title).toHaveClass('video-player__title');
  });

  test('renders correct heading level for title', () => {
    render(<VideoPlayer {...defaultProps} />);
    
    const title = screen.getByRole('heading', { name: 'Test Video Title', level: 3 });
    expect(title).toBeInTheDocument();
  });

  test('iframe has autoplay enabled', () => {
    render(<VideoPlayer {...defaultProps} />);
    
    const iframe = screen.getByTitle('Test Video Title');
    expect(iframe).toHaveAttribute('src', expect.stringContaining('autoplay=1'));
  });

  test('works with different video IDs', () => {
    const props = {
      videoId: 'xyz789',
      title: 'Another Video',
      onClose: jest.fn()
    };
    
    render(<VideoPlayer {...props} />);
    
    const iframe = screen.getByTitle('Another Video');
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/xyz789?autoplay=1');
  });
});