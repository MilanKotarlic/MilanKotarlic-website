import React from 'react';

const VideoPlayer = ({ videoId, title, onClose }) => {
  return (
    <div className="video-player__overlay">
      <div className="video-player__container">
        <div className="video-player__header">
          <h3 className="video-player__title">{title}</h3>
          <button 
            className="video-player__close"
            onClick={onClose}
            aria-label="Close video player"
          >
            ×
          </button>
        </div>
        <div className="video-player__embed">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="video-player__notice">
          <p>Note: If videos don't play, try disabling Grammarly extension</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;