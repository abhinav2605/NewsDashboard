import React, { useMemo } from 'react';
import './newsComponent.css';

const fallbackImg =
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=60';

const formatDate = value => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const NewsComponent = ({ article, variant = 'standard', showNav = false, onPrev, onNext }) => {
  const published = article?.pubDate || article?.pub_date || '';
  const source = article?.source_id || article?.source || 'News';
  const link = article?.link || '#';
  const description = article?.description || article?.content || '';

  const imageUrl = useMemo(() => {
    if (article?.image_url) return article.image_url;
    if (article?.image) return article.image;
    return fallbackImg;
  }, [article]);

  const displayDate = useMemo(() => formatDate(published), [published]);

  return (
    <article className={`news-card ${variant}`}>
      <a className="card-link" rel="noreferrer" href={link} target="_blank">
        <div className="card-media">
          <img
            src={imageUrl}
            alt={article?.title || 'news image'}
            onError={e => {
              e.target.src = fallbackImg;
            }}
          />
          <div className="media-overlay">
            <div className="source-chip">
              <span className="source-dot" />
              {source}
            </div>
            {displayDate && <span className="timestamp">{displayDate}</span>}
          </div>
        </div>

        <div className="card-body">
          <h3 className="headline">{article?.title}</h3>
          {description && <p className="summary">{description}</p>}
        </div>
      </a>

      {variant === 'feature' && showNav && (
        <div className="feature-nav" aria-label="Feature navigation">
          <button
            type="button"
            className="nav-btn prev"
            onClick={onPrev}
            aria-label="Previous story"
          >
            <span aria-hidden="true">&#8592;</span>
          </button>
          <button
            type="button"
            className="nav-btn next"
            onClick={onNext}
            aria-label="Next story"
          >
            <span aria-hidden="true">&#8594;</span>
          </button>
        </div>
      )}
    </article>
  );
};

export default NewsComponent;
