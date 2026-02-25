import React from 'react';
import './newsComponent.css'

const NewsComponent = ({article}) => {
  return (
      <div className="card">
        <div className="header">
          <div className="image">
            <img className='imageURL' src={article.image_url} alt={article.title || 'news image'} />
          </div>
          <div className="date">
            <span>{article.pub_date}</span>
          </div>
        </div>
        <div className="info">
          <a rel="noopener noreferrer" href="#" className="block">
            <span className="title">{article.title} </span>
          </a>
          <p className="description">{article.description}</p>
        </div>
      </div>
  );
}

export default NewsComponent;
