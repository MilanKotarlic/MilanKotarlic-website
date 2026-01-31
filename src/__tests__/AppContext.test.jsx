import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { AppProvider, useApp } from '../context/AppContext';

// Mock YouTubeService
jest.mock('../api/YouTubeService', () => ({
  getChannelUploads: jest.fn()
}));

import YouTubeService from '../api/YouTubeService';


const TestComponent = () => {
  const app = useApp();
  return (
    <div>
      <div data-testid="videos-count">{app.videos.length}</div>
      <div data-testid="loading">{app.loading.toString()}</div>
      <div data-testid="error">{app.error || 'no-error'}</div>
      <div data-testid="current-video">
        {app.currentVideo ? app.currentVideo.id : 'no-video'}
      </div>
      <button 
        data-testid="set-video"
        onClick={() => app.setCurrentVideo({ id: 'test-123', title: 'Test Video' })}
      >
        Set Video
      </button>
      <button 
        data-testid="clear-video"
        onClick={app.clearCurrentVideo}
      >
        Clear Video
      </button>
    </div>
  );
};

describe('AppContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('provides initial state', async () => {
    YouTubeService.getChannelUploads.mockResolvedValue([]);
    
    await act(async () => {
      render(
        <AppProvider>
          <TestComponent />
        </AppProvider>
      );
    });

    // Fech to finish
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });

    expect(screen.getByTestId('videos-count')).toHaveTextContent('0');
    expect(screen.getByTestId('error')).toHaveTextContent('no-error');
    expect(screen.getByTestId('current-video')).toHaveTextContent('no-video');
  });

  test('fetches videos on mount', async () => {
    const mockVideos = [
      { id: '1', title: 'Video 1' },
      { id: '2', title: 'Video 2' }
    ];
    
    YouTubeService.getChannelUploads.mockResolvedValue(mockVideos);

    await act(async () => {
      render(
        <AppProvider>
          <TestComponent />
        </AppProvider>
      );
    });

    expect(YouTubeService.getChannelUploads).toHaveBeenCalledWith('TheMilanKotarlic');

    await waitFor(() => {
      expect(screen.getByTestId('videos-count')).toHaveTextContent('2');
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });
  });

  test('handles fetch error', async () => {
    YouTubeService.getChannelUploads.mockRejectedValue(new Error('API Error'));

    await act(async () => {
      render(
        <AppProvider>
          <TestComponent />
        </AppProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Failed to load videos from YouTube');
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });
  });

  test('setCurrentVideo updates current video', async () => {
    YouTubeService.getChannelUploads.mockResolvedValue([]);
    
    await act(async () => {
      render(
        <AppProvider>
          <TestComponent />
        </AppProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });

    const setVideoButton = screen.getByTestId('set-video');
    act(() => {
      setVideoButton.click();
    });

    expect(screen.getByTestId('current-video')).toHaveTextContent('test-123');
  });

  test('clearCurrentVideo clears current video', async () => {
    YouTubeService.getChannelUploads.mockResolvedValue([]);
    
    await act(async () => {
      render(
        <AppProvider>
          <TestComponent />
        </AppProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });

    
    const setVideoButton = screen.getByTestId('set-video');
    act(() => {
      setVideoButton.click();
    });

    expect(screen.getByTestId('current-video')).toHaveTextContent('test-123');

    
    const clearVideoButton = screen.getByTestId('clear-video');
    act(() => {
      clearVideoButton.click();
    });

    expect(screen.getByTestId('current-video')).toHaveTextContent('no-video');
  });

  test('useApp throws error when used outside AppProvider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useApp must be used within a AppProvider');
    
    consoleError.mockRestore();
  });

  test('appReducer handles all action types', () => {
    // Import reducer
    const module = require('../context/AppContext');
    const appReducer = module.appReducer || module.default?.appReducer;
    
    expect(appReducer).toBeDefined();
    
    const initialState = {
      videos: [],
      loading: false,
      error: null,
      currentVideo: null
    };

    // FETCH_START
    let state = appReducer(initialState, { type: 'FETCH_START' });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();

    // FETCH_SUCCESS
    const videos = [{ id: '1', title: 'Test' }];
    state = appReducer(initialState, { type: 'FETCH_SUCCESS', payload: videos });
    expect(state.videos).toEqual(videos);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();

    // FETCH_ERROR
    state = appReducer(initialState, { type: 'FETCH_ERROR', payload: 'Error message' });
    expect(state.error).toBe('Error message');
    expect(state.loading).toBe(false);

    // SET_CURRENT_VIDEO
    const video = { id: '123', title: 'Test Video' };
    state = appReducer(initialState, { type: 'SET_CURRENT_VIDEO', payload: video });
    expect(state.currentVideo).toEqual(video);

    // CLEAR_CURRENT_VIDEO
    state = appReducer({ ...initialState, currentVideo: video }, { type: 'CLEAR_CURRENT_VIDEO' });
    expect(state.currentVideo).toBeNull();

    // Default case
    state = appReducer(initialState, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });
});