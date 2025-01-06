import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaSave,
} from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';
import './Template3.css';

const Template3 = ({ contactDetails, selectedSocialMedia, socialLinks, selectedTemplate, whatsAppDetails, socialMediaUrl }) => {
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
    name = 'Saliya',
    title = 'Full stack Software Developer',
    phoneWork = '0761231212',
    email = 'youremail@yourwebsite.com',
    profileImage = '',
    countryCode = whatsAppDetails?.countryCode || '',
    phoneNumber = whatsAppDetails?.phoneNumber || '',
    phoneMobile = '',  // Added phoneMobile with default empty value
    fax = '',
    website = '',
    address = '',
    about = '',
  } = currentContactDetails;

  const socialMediaIcons = {
    WhatsApp: FaWhatsapp,
    Facebook: FaFacebook,
    Instagram: FaInstagram,
    Twitter: FaTwitter,
    LinkedIn: FaLinkedin,
  };

  const generateWhatsAppLink = (countryCode, phoneNumber) => {
    return `https://wa.me/${countryCode.replace('+', '')}${phoneNumber}`;
  };

  const handleSaveToContacts = () => {
    let vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTITLE:${title}\nTEL;TYPE=WORK,VOICE:${phoneWork}\n`;

    // Check if phoneMobile exists before using it
    if (phoneMobile) {
      vCardData += `TEL;TYPE=CELL:${phoneMobile}\n`;
    }

    if (fax) vCardData += `TEL;TYPE=FAX:${fax}\n`;
    vCardData += `EMAIL:${email}\nURL:${website}\nADR;TYPE=WORK:;;${address}\nNOTE:${about}\n`;

    if (profileImage) vCardData += `PHOTO;VALUE=URL:${profileImage}\n`;

    currentSocialLinks.forEach(link => {
      vCardData += `X-SOCIALPROFILE;TYPE=${link.platform.name}:${link.url}\n`;
    });

    vCardData += `END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`profile-card template-${selectedTemplate}`}>
      <div className="profile-banner">
        <div className="imagepro">
          <img className="profile-photo" src={profileImage} alt={name}/>
        </div>
        
        <div className="profile-info">
          <h2>{name}</h2>
          <p>{title}</p>
        </div>
      </div>

      <div className="profile-contact-icons">
        <button className="icon-button" onClick={() => window.open(`mailto:${email}`, '_self')}>
          <FaEnvelope />
        </button>
        <button className="icon-button" onClick={() => window.open(`tel:${phoneWork}`, '_self')}>
          <FaPhone />
        </button>
        <button
          className="icon-button"
          onClick={() => window.open(generateWhatsAppLink(countryCode, phoneNumber), '_blank')}
        >
          <FaWhatsapp />
        </button>
      </div>

      <div className="social-media-links-column">
        <div>
          {currentSocialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-media-button ${link.platform.name.toLowerCase()}`} // Apply platform-specific class
            >
              <SocialIcon
                url={link.url}
                network={link.platform.name.toLowerCase()}  // Dynamically set the platform
                style={{ height: 50, width: 50 }}  // Set icon size
              />
              <div className="text-wrapper">
                <span className="platform-name">{link.platform.name}</span>
                <br />
                <span className="user-name">
                  {link.platform.name === 'Instagram' ? `@${name}` : name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <button className="btn h-100 custom-save-button social-media-button" onClick={handleSaveToContacts}>
        <FaSave className="me-2" />
        SAVE TO CONTACTS
      </button>

      <br />

      <div className="footer">
        <p>All rights reserved</p>
      </div>
    </div>
  );
};

export default Template3;
