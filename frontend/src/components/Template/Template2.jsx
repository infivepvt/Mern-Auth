import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Template2.css';
import { FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaSave, FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';

const Template2 = ({ contactDetails, selectedSocialMedia, socialLinks, selectedTemplate, whatsAppDetails, socialMediaUrl }) => {
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
    title = 'Infive',
    phoneWork = '0761231212',
    phoneMobile = '',
    fax = '',
    email = 'youremail@yourwebsite.com',
    website = 'www.yourwebsiteaddress.com',
    address = '919 Oaktree Crescent, Newmarket',
    about = '',
    logo = '/logo.png',
    logoSize = 100,
    bannerImage = '/banner.png',
    profileImage = '/profile.png',
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

  const SocialMediaIcon = currentSocialMedia ? socialMediaIcons[currentSocialMedia.name] : null;

  const socialMediaColors = {
    Facebook: '#3b5998',
    Instagram: '#E1306C',
    Twitter: '#1DA1F2',
    LinkedIn: '#0077b5',
    Snapchat: '#FFFC00',
    Pinterest: '#E60023',
    TikTok: '#000000',
    Youtube: '#FF0000',
    Whatsapp: '#25D366',
  };

  const backgroundColor = socialMediaColors[currentSocialMedia?.name] || '#2BB744';

  const generateWhatsAppLink = (countryCode, phoneNumber) => {
    return `https://wa.me/${countryCode.replace('+', '')}${phoneNumber}`;
  };

  const socialMediaLink = currentSocialMedia?.name === 'WhatsApp'
    ? generateWhatsAppLink(countryCode, phoneNumber)
    : socialMediaUrl;

  const handleSaveToContacts = () => {
    let vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTITLE:${title}\nTEL;TYPE=WORK,VOICE:${phoneWork}\n`;
    if (phoneMobile) vCardData += `TEL;TYPE=CELL:${phoneMobile}\n`;
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
    <div className={`container d-flex justify-content-center mt-5 template-${selectedTemplate}`}>
      <div className="card custom-card shadow-lg">
        <div
          className="card-header custom-header text-center"
          style={{ backgroundImage: `url(${bannerImage})` }}
        >
          <img
            src={logo}
            alt="Company Logo"
            className="custom-logo"
            style={{ width: `${logoSize}%` }}
          />
          <div className="profile-picture">
            <img src={profileImage} alt={name} className="rounded-circle" />
          </div>
          <div 
            style={{
              margin: '2px', // Adjust the margin as needed
              padding: '2px' // Adjust the padding as needed
            }}
          >
          </div>
        </div>
        <br /><br />
        <div className="card-body text-center">
          <h2 className="card-title">{name}</h2>
          <p className="text-muted">{title}</p>

          {SocialMediaIcon && (
            <a href={socialMediaLink} target="_blank" rel="noopener noreferrer">
              <button
                className="btn w-100 mb-3 custom-phone1"
                style={{
                  backgroundColor: backgroundColor,
                  color: 'white',
                  height: '60px',
                  border: '2px solid orange',  // Border color
                  borderRadius: '30px',  // Rounded corners
                }}
              >
                <SocialMediaIcon className="me-3" size={40} />
                CONNECT WITH {currentSocialMedia?.name?.toUpperCase()}
              </button>
            </a>
          )}

          <div className="list-group mb-3">
          <button
            type="button"
            className="list-group-item d-flex align-items-center justify-content-between"
            onClick={() => window.open(`tel:${phoneWork}`, '_self')}
          >
            <FaPhone 
              className="contact-icon me-2" 
              style={{ transform: 'rotate(90deg)', minWidth: '20px', fontSize: '1.5rem' }} 
            />
            <span 
              className="text-center flex-grow-1 text-truncate custom-phone"
            >
              {phoneWork}
            </span>
          </button>


            <button
              type="button"
              className="list-group-item d-flex align-items-center justify-content-between"
              onClick={() => window.open(`mailto:${email}`, '_self')}
            >
              <FaEnvelope className="contact-icon me-2" style={{ minWidth: '20px', fontSize: '1.5rem' }} />
              <span className="text-center flex-grow-1 text-truncate custom-phone">{email}</span>
            </button>

            <button
              type="button"
              className="list-group-item d-flex align-items-center justify-content-between"
              onClick={() => window.open(`https://${website}`, '_blank')}
            >
              <FaGlobe className="contact-icon me-2" style={{ minWidth: '20px', fontSize: '1.5rem' }} />
              <span className="text-center flex-grow-1 text-truncate custom-phone">{website}</span>
            </button>

            <button
              type="button"
              className="list-group-item d-flex align-items-center justify-content-between"
              onClick={() =>
                window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank')
              }
            >
              <FaMapMarkerAlt className="contact-icon me-2" style={{ minWidth: '20px', fontSize: '1.5rem' }} />
              <span className="text-center flex-grow-1 text-truncate custom-phone">{address}</span>
            </button>
          </div>
          <p className="fw">CONNECT WITH SOCIAL MEDIA</p>
          <div className="d-flex flex-wrap justify-content-center">
            {currentSocialLinks.map((link) => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="m-1">
                <SocialIcon url={link.url} network={link.platform.name.toLowerCase()} style={{ height: 55, width: 55 }} />
              </a>
            ))}
          </div>

          <button className="btn w-100 custom-save-button" onClick={handleSaveToContacts}>
            <FaSave className="me-2" />
            SAVE TO CONTACTS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Template2;
