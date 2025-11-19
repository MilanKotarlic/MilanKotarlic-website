import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import '../../styles/components/gallery.scss';

const Gallery = () => {
  const { t } = useLanguage();

  const mockVideos = [
    {
      id: 1,
      title: t('gallery.videos.video1.title'),
      thumbnail: "/images/design.png",
      youtubeId: "dQw4w9WgXcQ"
    },
    {
      id: 2,
      title: t('gallery.videos.video2.title'),
      thumbnail: "/images/development.png",
      youtubeId: "dQw4w9WgXcQ"
    },
    {
      id: 3,
      title: t('gallery.videos.video3.title'),
      thumbnail: "/images/management.png",
      youtubeId: "dQw4w9WgXcQ"
    }
  ];

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
          {mockVideos.map(video => (
            <div key={video.id} className="video-card">
              <div className="video-card__thumbnail">
                <img src={video.thumbnail} alt={video.title} />
                <div className="video-card__play-overlay">
                  <span>▶</span>
                </div>
              </div>
              <div className="video-card__content">
                <h3 className="video-card__title">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;