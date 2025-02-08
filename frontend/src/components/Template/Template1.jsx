// Template1.jsx
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Template1.css';
import { FaPhone, FaEnvelope, FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';

const Template1 = ({ contactDetails, selectedSocialMedia, socialLinks, selectedTemplate, whatsAppDetails, socialMediaUrl }) => {
  const [currentContactDetails, setCurrentContactDetails] = useState(contactDetails);
  const [currentSocialMedia, setCurrentSocialMedia] = useState(selectedSocialMedia);
  const [currentSocialLinks, setCurrentSocialLinks] = useState(socialLinks);

  useEffect(() => {
    setCurrentContactDetails(contactDetails);
  }, [contactDetails]);

  useEffect(() => {
    setCurrentSocialMedia(selectedSocialMedia);
  }, [selectedSocialMedia]);

  useEffect(() => {
    setCurrentSocialLinks(socialLinks);
  }, [socialLinks]);

  const {
    name = 'Saliya Pathum',
    title = 'Software Engineer',
    companyName = 'Infive',
    about = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    profileImage = '/temp1Profile.png',
    bannerColour = '#ff1a1a',
    customFields = [],
    phoneWork = '',
    email = '',
    countryCode = whatsAppDetails?.countryCode || '',
    phoneNumber = whatsAppDetails?.phoneNumber || '',
  } = currentContactDetails;

  const socialMediaIcons = {
    WhatsApp: FaWhatsapp,
    Facebook: FaFacebook,
    Instagram: FaInstagram,
    Twitter: FaTwitter,
    LinkedIn: FaLinkedin,
  };

  const socialMediaColors = {
    Facebook: '#3b5998',
    Instagram: '#E1306C',
    Twitter: '#1DA1F2',
    LinkedIn: '#0077b5',
    Whatsapp: '#25D366',
    Youtube: '#FF0000',
  };

  const generateWhatsAppLink = (countryCode, phoneNumber) => {
    return `https://wa.me/${countryCode.replace('+', '')}${phoneNumber}`;
  };

  const socialMediaLink = currentSocialMedia?.name === 'WhatsApp'
    ? generateWhatsAppLink(countryCode, phoneNumber)
    : socialMediaUrl;

  return (
    <div className={`card-container text-center template-${selectedTemplate}`}>
      <div className="profile-header" style={{ backgroundColor: bannerColour }}>
      <img
  src={profileImage}
  alt={name}
  className="rounded-circle"
  style={{
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Adding shadow for depth
    transform: 'rotateY(10deg) rotateX(10deg)',  // Slight rotation for 3D effect
    transition: 'transform 0.3s ease-in-out', // Smooth transition
  }}
 
/>

        <p className="company-title">{companyName}</p>
        <h2 className="profile-name">{name}</h2>
        <p className="job-title">{title}</p>
      </div>

      <div className="contact-icons py-3 bg-white d-flex justify-content-center">
        {phoneWork && (
          <a href={`tel:${phoneWork}`} className="icon mx-2" style={{ color: '#FF0000' }}><FaPhone /></a>
        )}
        {email && (
          <a href={`mailto:${email}`} className="icon mx-2" style={{ color: '#FF0000' }}><FaEnvelope /></a>
        )}
        {currentSocialMedia && socialMediaIcons[currentSocialMedia.name] && (
          <a href={socialMediaLink} target="_blank" rel="noopener noreferrer" className="icon mx-2" >
            {React.createElement(socialMediaIcons[currentSocialMedia.name], { size: 30 })}
          </a>
        )}
      </div>

      {customFields.length > 0 && (
        <div className="custom-fields mt-3">
          <h5 className="text-center mb-4">Additional Information</h5>
          {customFields.map((field, index) => (
            <div key={index} className="custom-field mb-3">
              <div className="text-center py-2" style={{ backgroundColor: '#FF0000', color: '#FFFFFF' }}>
                <strong>{field.title}</strong>
              </div>
              <div className="bg-white text-dark p-3 border border-danger rounded-bottom">
                {field.content}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="about-section">
        <h5>About Us</h5>
        <p>{about}</p>
      </div>

      <div className="social-links py-3 d-flex justify-content-center">
        {currentSocialLinks.map((link, index) => (
          (link.platform.name === 'Facebook' || link.platform.name === 'Twitter' || link.platform.name === 'Instagram' || link.platform.name === 'WhatsApp' || link.platform.name === 'LinkedIn') && (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="icon mx-2" >
              {React.createElement(socialMediaIcons[link.platform.name], { size: 30 })}
            </a>
          )
        ))}
      </div>

      <div className="footer">
        <p>All rights reserved</p>
      </div>
    </div>
  );
};

export default Template1;
