import React, { createContext, useContext, useReducer, useEffect } from 'react';
import YouTubeService from '../api/YouTubeService';

const VIDEO_ACTIONS = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  SET_CURRENT_VIDEO: 'SET_CURRENT_VIDEO',
  CLEAR_CURRENT_VIDEO: 'CLEAR_CURRENT_VIDEO'
};

const videoReducer = (state, action) => {
  switch (action.type) {
    case VIDEO_ACTIONS.FETCH_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case VIDEO_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: action.payload,
        error: null
      };
    case VIDEO_ACTIONS.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case VIDEO_ACTIONS.SET_CURRENT_VIDEO:
      return {
        ...state,
        currentVideo: action.payload
      };
    case VIDEO_ACTIONS.CLEAR_CURRENT_VIDEO:
      return {
        ...state,
        currentVideo: null
      };
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


const VideoContext = createContext();


export const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);

  useEffect(() => {
    const fetchVideos = async () => {
      dispatch({ type: VIDEO_ACTIONS.FETCH_START });
      
      try {
        const videos = await YouTubeService.getChannelUploads('TheMilanKotarlic');
        dispatch({ type: VIDEO_ACTIONS.FETCH_SUCCESS, payload: videos });
      } catch (error) {
        dispatch({ 
          type: VIDEO_ACTIONS.FETCH_ERROR, 
          payload: 'Failed to load videos from YouTube' 
        });
      }
    };

    fetchVideos();
  }, []);

  const setCurrentVideo = (video) => {
    dispatch({ type: VIDEO_ACTIONS.SET_CURRENT_VIDEO, payload: video });
  };

  const clearCurrentVideo = () => {
    dispatch({ type: VIDEO_ACTIONS.CLEAR_CURRENT_VIDEO });
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
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};