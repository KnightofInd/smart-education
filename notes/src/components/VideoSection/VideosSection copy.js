import React, { useState } from 'react';
import './VideosSection.css';  // Changed from '../styles/VideosSection.css'// Changed from '../styles/VideosSection.css'

function VideosSection({ videos, onAddVideo, onDeleteVideo }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && url) {
      onAddVideo({ title, url });
      setTitle('');
      setUrl('');
    }
  };

  return (
    <div className="videos-section">
      <h2>Add Video Link</h2>
      
      <form onSubmit={handleSubmit} className="videos-form">
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
        <input
          type="url"
          placeholder="YouTube Video URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-button">
          Add Video
        </button>
      </form>

      <div className="videos-list">
        <h3>Added Videos</h3>
        {videos.map(video => (
          <div key={video.id} className="video-item">
            <div className="video-header">
              <h4>{video.title}</h4>
              <button
                onClick={() => onDeleteVideo(video.id)}
                className="delete-button"
              >
                ✕
              </button>
            </div>
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              {video.url}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideosSection;