import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import YouTubeService from '../../api/YouTubeService';
import '../../styles/components/gallery.scss';

const Gallery = () => {
  const { t } = useLanguage();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        const channelVideos = await YouTubeService.getChannelUploads('TheMilanKotarlic');
        setVideos(channelVideos);
      } catch (err) {
        setError('Failed to load videos. Please try again later.');
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const openVideo = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  if (loading) {
    return (
      <section className="gallery">
        <div className="gallery__container">
          <div className="gallery__header">
            <h1 className="gallery__title">{t('gallery.title')}</h1>
            <p className="gallery__subtitle">Loading videos from YouTube...</p>
          </div>
          <div className="gallery__loading">
            <p>Loading Milan's videos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="gallery">
        <div className="gallery__container">
          <div className="gallery__header">
            <h1 className="gallery__title">{t('gallery.title')}</h1>
            <p className="gallery__subtitle">{error}</p>
          </div>
          <div className="gallery__error">
            <p>Unable to load videos at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="gallery">
      <div className="gallery__container">
        <div className="gallery__header">
          <h1 className="gallery__title">{t('gallery.title')}</h1>
          <p className="gallery__subtitle">
            {t('gallery.subtitle')}
          </p>
        </div>

        <div className="gallery__videos">
          {videos.length > 0 ? (
            videos.map(video => (
              <div 
                key={video.id} 
                className="video-card"
                onClick={() => openVideo(video.videoId)}
                style={{ cursor: 'pointer' }}
              >
                <div className="video-card__thumbnail">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    onError={(e) => {
                    
                      e.target.src = '/images/design.png';
                    }}
                  />
                  <div className="video-card__play-overlay">
                    <span>▶</span>
                  </div>
                </div>
                <div className="video-card__content">
                  <h3 className="video-card__title">{video.title}</h3>
                </div>
              </div>
            ))
          ) : (
            <div className="gallery__empty">
              <p>No videos found on the channel.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;