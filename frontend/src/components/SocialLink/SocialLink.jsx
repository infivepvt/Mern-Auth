import React, { useState, useEffect } from 'react';
import { SocialIcon } from 'react-social-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const socialMediaOptions = [
    { name: 'Facebook', subtitle: 'Follow us on Facebook' },
    { name: 'Whatsapp', subtitle: 'Follow us on WhatsApp' },
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

const countryCodes = [
  { country: 'Malaysia', code: '+60' },
  { country: 'Sri Lanka', code: '+94' },
  { country: 'United Kingdom', code: '+44' },
  { country: 'India', code: '+91' },
  { country: 'Australia', code: '+61' },
  { country: 'Germany', code: '+49' },
  { country: 'France', code: '+33' },
  { country: 'Italy', code: '+39' },
  { country: 'Spain', code: '+34' },
  { country: 'Brazil', code: '+55' },
  { country: 'Mexico', code: '+52' },
  { country: 'Japan', code: '+81' },
  { country: 'South Korea', code: '+82' },
  { country: 'China', code: '+86' },
  { country: 'Russia', code: '+7' },
  { country: 'South Africa', code: '+27' },
  { country: 'New Zealand', code: '+64' },
  { country: 'Netherlands', code: '+31' },
  { country: 'Sweden', code: '+46' },
  { country: 'Norway', code: '+47' },
  { country: 'Denmark', code: '+45' },
  { country: 'Switzerland', code: '+41' },
  { country: 'Ireland', code: '+353' },
  { country: 'Singapore', code: '+65' },
  
];

const SocialLink = ({ onLinksChange = () => {} }) => {
  const [links, setLinks] = useState([{
    id: Date.now(),
    platform: socialMediaOptions[0],
    url: '',
    title: socialMediaOptions[0].name,
    subtitle: socialMediaOptions[0].subtitle,
    showSubtitle: true,
    countryCode: '',
    phoneNumber: ''
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
      showSubtitle: true,
      countryCode: '',
      phoneNumber: ''
    }]);
  };

  const handleDeleteLink = (id) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setLinks(links.map(link => link.id === id ? { ...link, [field]: value } : link));
  };

  const handleWhatsAppInputChange = (id, field, value) => {
    const updatedLink = links.find(link => link.id === id);
    const newUrl = `https://wa.me/${updatedLink.countryCode}${value}`;
    setLinks(links.map(link => link.id === id ? { ...link, [field]: value, url: newUrl } : link));
  };

  const handleCountryCodeChange = (id, value) => {
    const newUrl = `https://wa.me/${value}${links.find(link => link.id === id).phoneNumber}`;
    setLinks(links.map(link => link.id === id ? { ...link, countryCode: value, url: newUrl } : link));
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
            {link.platform.name === 'Whatsapp' ? (
              <div className="ms-2">
                <select
                  className="form-select form-select-sm"
                  value={link.countryCode}
                  onChange={(e) => handleCountryCodeChange(link.id, e.target.value)}
                >
                  {countryCodes.map(code => (
                    <option key={code.code} value={code.code}>
                      {code.name} (+{code.code})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="form-control form-control-sm mt-2"
                  placeholder="Phone Number"
                  value={link.phoneNumber}
                  onChange={(e) => handleWhatsAppInputChange(link.id, 'phoneNumber', e.target.value)}
                />
              </div>
            ) : (
              <input
                type="text"
                className="form-control form-control-sm ms-2"
                placeholder="URL"
                value={link.url}
                onChange={(e) => handleInputChange(link.id, 'url', e.target.value)}
              />
            )}
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