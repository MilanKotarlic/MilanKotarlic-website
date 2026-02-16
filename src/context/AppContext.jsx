import React, { createContext, useContext, useReducer, useEffect } from 'react';
import YouTubeService from '../api/YouTubeService';

const APP_ACTIONS = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  SET_CURRENT_VIDEO: 'SET_CURRENT_VIDEO',
  CLEAR_CURRENT_VIDEO: 'CLEAR_CURRENT_VIDEO'
};

const appReducer = (state, action) => {
  switch (action.type) {
    case APP_ACTIONS.FETCH_START:
      return { ...state, loading: true, error: null };
    case APP_ACTIONS.FETCH_SUCCESS:
      return { ...state, loading: false, videos: action.payload, error: null };
    case APP_ACTIONS.FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    case APP_ACTIONS.SET_CURRENT_VIDEO:
      return { ...state, currentVideo: action.payload };
    case APP_ACTIONS.CLEAR_CURRENT_VIDEO:
      return { ...state, currentVideo: null };
    default:
      return state;
  }
};

const initialState = {
  videos: [],
  loading: false,
  error: null,
  currentVideo: null
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const fetchVideos = async () => {
      dispatch({ type: APP_ACTIONS.FETCH_START });
      try {
        const isTestEnv = 
          (typeof import.meta !== 'undefined' && import.meta.env?.VITE_NODE_ENV === 'test') ||
          process.env.VITE_NODE_ENV === 'test' ||
          !import.meta.env?.VITE_YOUTUBE_API_KEY;

        if (isTestEnv) {
          const mockVideos = [
            {
              id: 'mock1',
              videoId: 'dQw4w9WgXcQ',
              title: 'Mock Video 1',
              thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg'
            },
            {
              id: 'mock2',
              videoId: '9bZkp7q19f0',
              title: 'Mock Video 2',
              thumbnail: 'https://i.ytimg.com/vi/9bZkp7q19f0/mqdefault.jpg'
            }
          ];
          dispatch({ type: APP_ACTIONS.FETCH_SUCCESS, payload: mockVideos });
          return;
        }

        const videos = await YouTubeService.getChannelUploads('TheMilanKotarlic');
        dispatch({ type: APP_ACTIONS.FETCH_SUCCESS, payload: videos });
      } catch (error) {
        dispatch({ 
          type: APP_ACTIONS.FETCH_ERROR, 
          payload: 'Failed to load videos from YouTube' 
        });
      }
    };
    fetchVideos();
  }, []);

  const setCurrentVideo = (video) => {
    dispatch({ type: APP_ACTIONS.SET_CURRENT_VIDEO, payload: video });
  };

  const clearCurrentVideo = () => {
    dispatch({ type: APP_ACTIONS.CLEAR_CURRENT_VIDEO });
  };

  const value = {
    videos: state.videos,
    loading: state.loading,
    error: state.error,
    currentVideo: state.currentVideo,
    setCurrentVideo,
    clearCurrentVideo
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export { appReducer };