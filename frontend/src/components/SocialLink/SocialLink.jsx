// SocialLink.jsx
import React, { useState, useEffect } from 'react';
import { SocialIcon } from 'react-social-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const socialMediaOptions = [
    { name: 'Facebook', subtitle: 'Follow us on Facebook' },
    { name: 'Instagram', subtitle: 'Follow us on Instagram' },
    { name: 'Twitter', subtitle: 'Follow us on Twitter' },
    { name: 'LinkedIn', subtitle: 'Connect with us on LinkedIn' },
    { name: 'Snapchat', subtitle: 'Follow us on Snapchat' },
    { name: 'Pinterest', subtitle: 'Pin with us on Pinterest' },
    { name: 'TikTok', subtitle: 'Follow us on TikTok' },
    { name: 'Reddit', subtitle: 'Join us on Reddit' },
    { name: 'Tumblr', subtitle: 'Follow our blog on Tumblr' },
    { name: 'Flickr', subtitle: 'View our photos on Flickr' },
    { name: 'YouTube', subtitle: 'Subscribe to our channel on YouTube' },
    { name: 'WeChat', subtitle: 'Connect with us on WeChat' },
    { name: 'Telegram', subtitle: 'Chat with us on Telegram' },
    { name: 'Twitch', subtitle: 'Watch us on Twitch' },
];

const SocialLink = ({ onLinksChange = () => {} }) => {
  const [links, setLinks] = useState([{
    id: Date.now(),
    platform: socialMediaOptions[0],
    url: '',
    title: socialMediaOptions[0].name,
    subtitle: socialMediaOptions[0].subtitle,
    showSubtitle: true
  }]);

  useEffect(() => {
    onLinksChange(links);
  }, [links]);

  const handlePlatformChange = (id, e) => {
    const newPlatform = socialMediaOptions.find(option => option.name === e.target.value);
    setLinks(links.map(link => link.id === id ? { ...link, platform: newPlatform, title: newPlatform.name, subtitle: newPlatform.subtitle } : link));
  };

  const handleAddLink = () => {
    setLinks([...links, {
      id: Date.now(),
      platform: socialMediaOptions[0],
      url: '',
      title: socialMediaOptions[0].name,
      subtitle: socialMediaOptions[0].subtitle,
      showSubtitle: true
    }]);
  };

  const handleDeleteLink = (id) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setLinks(links.map(link => link.id === id ? { ...link, [field]: value } : link));
  };

  return (
    <div className="container mt-3">
      {links.map(link => (
        <div key={link.id} className="card mb-2">
          <div className="card-header d-flex align-items-center py-2">
            <select className="form-select form-select-sm" value={link.platform.name} onChange={(e) => handlePlatformChange(link.id, e)}>
              {socialMediaOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="form-control form-control-sm ms-2"
              placeholder="URL"
              value={link.url}
              onChange={(e) => handleInputChange(link.id, 'url', e.target.value)}
            />
            <button className="btn btn-outline-danger btn-sm ms-2" onClick={() => handleDeleteLink(link.id)}>🗑️</button>
          </div>

          <div className="card-body d-flex align-items-center py-2">
            <SocialIcon url={link.url} network={link.platform.name.toLowerCase()} style={{ height: 50, width: 50 }} />
            <div className="ms-2 flex-grow-1">
              <div className="mb-1">
                <label className="form-label small">Title</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={link.title}
                  onChange={(e) => handleInputChange(link.id, 'title', e.target.value)}
                />
              </div>

              
            </div>
          </div>
        </div>
      ))}
      <button className="btn btn-primary btn-sm mt-2" onClick={handleAddLink}>+ Add Social Media Link</button>
    </div>
  );
};

export default SocialLink;
