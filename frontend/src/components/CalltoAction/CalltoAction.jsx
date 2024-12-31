// CalltoAction.jsx
import React, { useState, useEffect } from 'react';
import { SocialIcon } from 'react-social-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const socialMediaOptions = [
  { name: 'WhatsApp', subtitle: 'Message us on WhatsApp' },
  { name: 'Facebook', subtitle: 'Follow us on Facebook' },
  { name: 'Instagram', subtitle: 'Follow us on Instagram' },
  { name: 'Twitter', subtitle: 'Follow us on Twitter' },
  { name: 'LinkedIn', subtitle: 'Connect with us on LinkedIn' },
];

const countryCodes = [
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
  { country: 'Malaysia', code: '+60' },
];

const CalltoAction = ({ onSocialMediaChange = () => {}, onWhatsAppChange = () => {}, onUrlChange = () => {} }) => {
  const [links, setLinks] = useState([{
    id: Date.now(),
    platform: socialMediaOptions[0],
    url: '',
    title: socialMediaOptions[0].name,
    subtitle: socialMediaOptions[0].subtitle,
    showSubtitle: true,
    countryCode: countryCodes[0].code,
    phoneNumber: '',
  }]);

  useEffect(() => {
    if (links.length > 0) {
      const link = links[0];
      if (link.platform.name === 'WhatsApp') {
        onWhatsAppChange({ countryCode: link.countryCode, phoneNumber: link.phoneNumber });
      } else {
        onUrlChange(link.url);
      }
    }
  }, [links, onWhatsAppChange, onUrlChange]);

  const handlePlatformChange = (id, e) => {
    const newPlatform = socialMediaOptions.find(option => option.name === e.target.value);
    setLinks((prevLinks) => {
      const updatedLinks = prevLinks.map(link => link.id === id ? { ...link, platform: newPlatform, title: newPlatform.name, subtitle: newPlatform.subtitle } : link);
      onSocialMediaChange(newPlatform);
      return updatedLinks;
    });
  };

  const handleInputChange = (id, field, value) => {
    setLinks(links.map(link => link.id === id ? { ...link, [field]: value } : link));
    if (field === 'countryCode' || field === 'phoneNumber' || field === 'url') {
      const link = links.find(link => link.id === id);
      if (link.platform.name === 'WhatsApp') {
        onWhatsAppChange({ countryCode: link.countryCode, phoneNumber: link.phoneNumber });
      } else {
        onUrlChange(link.url);
      }
    }
  };

  const generateWhatsAppLink = (countryCode, phoneNumber) => {
    return `https://wa.me/${countryCode.replace('+', '')}${phoneNumber}`;
  };

  return (
    <div className="container mt-3">
      {links.map(link => (
        <div key={link.id} className="card mb-2 p-2">
          <div className="card-header d-flex align-items-center justify-content-between p-1">
            <select className="form-select form-select-sm me-2" value={link.platform.name} onChange={(e) => handlePlatformChange(link.id, e)}>
              {socialMediaOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            {link.platform.name === 'WhatsApp' ? (
              <>
                <select className="form-select form-select-sm me-2" value={link.countryCode} onChange={(e) => handleInputChange(link.id, 'countryCode', e.target.value)}>
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.country} ({country.code})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="form-control form-control-sm me-2"
                  placeholder="Enter phone number"
                  value={link.phoneNumber}
                  onChange={(e) => handleInputChange(link.id, 'phoneNumber', e.target.value)}
                />
              </>
            ) : (
              <input
                type="text"
                className="form-control form-control-sm me-2"
                placeholder="URL"
                value={link.url}
                onChange={(e) => handleInputChange(link.id, 'url', e.target.value)}
              />
            )}
          </div>

          <div className="card-body d-flex align-items-center p-2">
            {link.platform.name === 'WhatsApp' ? (
              <a href={generateWhatsAppLink(link.countryCode, link.phoneNumber)} target="_blank" rel="noopener noreferrer">
                <SocialIcon network="whatsapp" style={{ height: 50, width: 50 }} />
              </a>
            ) : (
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <SocialIcon url={link.url} network={link.platform.name.toLowerCase()} style={{ height: 50, width: 50 }} />
              </a>
            )}
            

            <div className="ms-2 flex-grow-1">
              <div className="mb-1">
                <label className="form-label small mb-0">Title</label>
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
    </div>
  );
};

export default CalltoAction;
