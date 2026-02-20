import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock hooks
jest.mock('../hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (key) => {
      const translations = {
        'gallery.title': 'My Music',
        'gallery.subtitle': 'Here you can find all my latest music videos and performances'
      };
      return translations[key] || key;
    }
  })
}));


const mockWindowOpen = jest.fn();
window.open = mockWindowOpen;


const createMockAppContext = (overrides = {}) => ({
  videos: [
    {
      id: '1',
      videoId: 'abc123',
      title: 'Milan Kotarlić - Song 1',
      thumbnail: 'thumbnail1.jpg',
      description: 'Test video 1 description',
      publishedAt: '2024-01-01'
    },
    {
      id: '2',
      videoId: 'def456',
      title: 'Milan Kotarlić - Song 2',
      thumbnail: 'thumbnail2.jpg',
      description: 'Test video 2 description',
      publishedAt: '2024-01-02'
    },
    {
      id: '3',
      videoId: 'ghi789',
      title: 'Milan Kotarlić - Song 3',
      thumbnail: 'thumbnail3.jpg',
      description: 'Test video 3 description',
      publishedAt: '2024-01-03'
    }
  ],
  loading: false,
  error: null,
  currentVideo: null,
  setCurrentVideo: jest.fn(),
  clearCurrentVideo: jest.fn(),
  ...overrides
});

describe('Gallery Page - Complete Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders gallery title and subtitle', () => {
    // Mock AppContext
    jest.doMock('../context/AppContext', () => ({
      useApp: () => createMockAppContext()
    }));
    
  
    jest.isolateModules(() => {
      const Gallery = require('../pages/Gallery/Gallery').default;
      render(<Gallery />);
      
      expect(screen.getByRole('heading', { 
        name: 'My Music', 
        level: 1 
      })).toBeInTheDocument();
      
      expect(screen.getByText('Here you can find all my latest music videos and performances')).toBeInTheDocument();
    });
  });

  test('renders all video cards with correct content', () => {
    jest.doMock('../context/AppContext', () => ({
      useApp: () => createMockAppContext()
    }));
    
    jest.isolateModules(() => {
      const Gallery = require('../pages/Gallery/Gallery').default;
      render(<Gallery />);
      
      // Check all video titles are rendered
      expect(screen.getByText('Milan Kotarlić - Song 1')).toBeInTheDocument();
      expect(screen.getByText('Milan Kotarlić - Song 2')).toBeInTheDocument();
      expect(screen.getByText('Milan Kotarlić - Song 3')).toBeInTheDocument();
      
      // Check video cards have correct classes
      const videoCards = screen.getAllByText(/Milan Kotarlić - Song/);
      expect(videoCards).toHaveLength(3);
      
      videoCards.forEach(card => {
        expect(card.closest('.video-card')).toBeInTheDocument();
      });
    });
  });

  test('renders video thumbnails with correct attributes', () => {
    jest.doMock('../context/AppContext', () => ({
      useApp: () => createMockAppContext()
    }));
    
    jest.isolateModules(() => {
      const Gallery = require('../pages/Gallery/Gallery').default;
      render(<Gallery />);
      
      const images = screen.getAllByRole('img');
    
      const thumbnails = images.filter(img => 
        img.getAttribute('alt')?.includes('Milan Kotarlić')
      );
      
      expect(thumbnails[0]).toHaveAttribute('src', 'thumbnail1.jpg');
      expect(thumbnails[0]).toHaveAttribute('alt', 'Milan Kotarlić - Song 1');
      
      expect(thumbnails[1]).toHaveAttribute('src', 'thumbnail2.jpg');
      expect(thumbnails[1]).toHaveAttribute('alt', 'Milan Kotarlić - Song 2');
    });
  });

  test('calls setCurrentVideo when video card is clicked', async () => {
    const mockSetCurrentVideo = jest.fn();
    
    jest.doMock('../context/AppContext', () => ({
      useApp: () => createMockAppContext({ setCurrentVideo: mockSetCurrentVideo })
    }));
    
    jest.isolateModules(async () => {
      const Gallery = require('../pages/Gallery/Gallery').default;
      const user = userEvent.setup();
      
      render(<Gallery />);
      
      const firstVideoCard = screen.getByText('Milan Kotarlić - Song 1').closest('.video-card');
      await user.click(firstVideoCard);
      
      expect(mockSetCurrentVideo).toHaveBeenCalledTimes(1);
      expect(mockSetCurrentVideo).toHaveBeenCalledWith({
        id: '1',
        videoId: 'abc123',
        title: 'Milan Kotarlić - Song 1',
        thumbnail: 'thumbnail1.jpg',
        description: 'Test video 1 description',
        publishedAt: '2024-01-01'
      });
    });
  });

  test('displays loading state when loading is true', () => {
    jest.doMock('../context/AppContext', () => ({
      useApp: () => createMockAppContext({ 
        loading: true,
        videos: [] 
      })
    }));
    
    jest.isolateModules(() => {
      const Gallery = require('../pages/Gallery/Gallery').default;
      render(<Gallery />);
      
      expect(screen.getByText('Loading videos from YouTube...')).toBeInTheDocument();
      expect(screen.getByText('Loading Milan\'s videos...')).toBeInTheDocument();
    });
  });

  test('displays error state when error exists', () => {
    jest.doMock('../context/AppContext', () => ({
      useApp: () => createMockAppContext({ 
        error: 'Failed to load videos from YouTube',
        videos: [] 
      })
    }));
    
    jest.isolateModules(() => {
      const Gallery = require('../pages/Gallery/Gallery').default;
      render(<Gallery />);
      
      expect(screen.getByText('Failed to load videos from YouTube')).toBeInTheDocument();
      expect(screen.getByText('Unable to load videos at the moment.')).toBeInTheDocument();
    });
  });

  test('displays empty state when no videos', () => {
    jest.doMock('../context/AppContext', () => ({
      useApp: () => createMockAppContext({ videos: [] })
    }));
    
    jest.isolateModules(() => {
      const Gallery = require('../pages/Gallery/Gallery').default;
      render(<Gallery />);
      
      expect(screen.getByText('No videos found on the channel.')).toBeInTheDocument();
    });
  });

  test('video card has play overlay indicator', () => {
    jest.doMock('../context/AppContext', () => ({
      useApp: () => createMockAppContext()
    }));
    
    jest.isolateModules(() => {
      const Gallery = require('../pages/Gallery/Gallery').default;
      render(<Gallery />);
      
      const videoCard = screen.getByText('Milan Kotarlić - Song 1').closest('.video-card');
      const playOverlay = videoCard.querySelector('.video-card__play-overlay');
      
      expect(playOverlay).toBeInTheDocument();
      expect(playOverlay).toHaveTextContent('▶');
    });
  });

  test('handles thumbnail image error by setting fallback image', () => {
    jest.doMock('../context/AppContext', () => ({
      useApp: () => createMockAppContext()
    }));
    
    jest.isolateModules(() => {
      const Gallery = require('../pages/Gallery/Gallery').default;
      render(<Gallery />);
      
      const images = screen.getAllByRole('img');
      const thumbnails = images.filter(img => 
        img.getAttribute('alt')?.includes('Milan Kotarlić')
      );
      const thumbnail = thumbnails[0];
      
      // Simulate image error
      fireEvent.error(thumbnail);
      
      expect(thumbnail).toHaveAttribute('src', '/images/design.png');
    });
  });

  test('renders correct CSS structure', () => {
    jest.doMock('../context/AppContext', () => ({
      useApp: () => createMockAppContext()
    }));
    
    jest.isolateModules(() => {
      const Gallery = require('../pages/Gallery/Gallery').default;
      const { container } = render(<Gallery />);
      
      // Check main structure
      expect(container.querySelector('.gallery')).toBeInTheDocument();
      expect(container.querySelector('.gallery__container')).toBeInTheDocument();
      expect(container.querySelector('.gallery__header')).toBeInTheDocument();
      expect(container.querySelector('.gallery__videos')).toBeInTheDocument();
      
      // Check video card structure
      const videoCard = container.querySelector('.video-card');
      expect(videoCard).toBeInTheDocument();
      expect(videoCard.querySelector('.video-card__thumbnail')).toBeInTheDocument();
      expect(videoCard.querySelector('.video-card__content')).toBeInTheDocument();
      expect(videoCard.querySelector('.video-card__title')).toBeInTheDocument();
    });
  });
});