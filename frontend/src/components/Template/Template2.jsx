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
    Mobile2 = '',
    Mobile3 = '',
    fax = '',
    email = 'youremail@yourwebsite.com',
    email2 = '',
    email3 = '',
    website = 'www.yourwebsiteaddress.com',
    website2 = '',
    website3 = '',
    address = '919 Oaktree Crescent, Newmarket',
    address2 = '',
    about = '',
    logo = '/logo.png',
    logoSize = 100,
    logoOpacity = 100,
    bannerSize = 100,
    bannerOpacity = 100,
    profileSize = 100,
    profileOpacity = 100,
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
  if (Mobile2) vCardData += `TEL;TYPE=CELL:${Mobile2}\n`;
  if (Mobile3) vCardData += `TEL;TYPE=CELL:${Mobile3}\n`;
  if (fax) vCardData += `TEL;TYPE=FAX:${fax}\n`;

  vCardData += `EMAIL:${email}\n`;
  if (email2) vCardData += `EMAIL:${email2}\n`;
  if (email3) vCardData += `EMAIL:${email3}\n`;

  vCardData += `URL:${website}\n`;
  if (website2) vCardData += `URL:${website2}\n`;
  if (website3) vCardData += `URL:${website3}\n`;

  vCardData += `ADR;TYPE=WORK:;;${address}\n`;
  if (address2) vCardData += `ADR;TYPE=HOME:;;${address2}\n`;

  if (about) vCardData += `NOTE:${about}\n`;

  if (profileImage) vCardData += `PHOTO;VALUE=URL:${profileImage}\n`;
  if (logo) vCardData += `LOGO;VALUE=URL:${logo}\n`;

  // Add social media links to vCard if available
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
          style={{ backgroundImage: `url(${bannerImage})` , 
        
          height: `${bannerSize}%`,  
          opacity: bannerOpacity / 100, 
        
        }}
        >
          <img
            src={logo}
            alt="Company Logo"
            className="custom-logo"
            style={{
              width: `${logoSize}%`,   // Adjust the width based on the logoSize
              opacity: logoOpacity / 100, // Set the opacity using the logoOpacity value
            }}
          />
          <div className="profile-picture">
            <img src={profileImage} alt={name} className="rounded-circle"
            style={{
              opacity: profileOpacity / 100, // Set the opacity using the logoOpacity value
            }}
            />
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
                <SocialMediaIcon className="me-2" size={40} />
                CONNECT WITH {currentSocialMedia?.name?.toUpperCase()}
              </button>
            </a>
          )}

          <div className="list-group mb-3">
            {phoneWork && (
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
            )}

              {phoneMobile && (
                <button
                  type="button"
                  className="list-group-item d-flex align-items-center justify-content-between"
                  onClick={() => window.open(`tel:${phoneMobile}`, '_self')}
                >
                  <img
                    src="/icons8-ringing-phone-64.png"  // Make sure to replace this path if needed
                    alt="Phone"
                    className="contact-icon me-2"
                    style={{ transform: 'rotate(0deg)', minWidth: '20px', width: '1.8rem' }}  // Adjust width as needed
                  />
                  <span 
                    className="text-center flex-grow-1 text-truncate custom-phone"
                  >
                    {phoneMobile}
                  </span>
                </button>
              )}


            {Mobile2 && (
              <button
              type="button"
              className="list-group-item d-flex align-items-center justify-content-between"
              onClick={() => window.open(`tel:${Mobile2}`, '_self')}
            >
              <img
                    src="/icons8-phonelink-ring-50.png"  // Make sure to replace this path if needed
                    alt="Phone"
                    className="contact-icon me-2"
                    style={{ transform: 'rotate(0deg)', minWidth: '20px', width: '1.8rem' }}  // Adjust width as needed
                  />
              <span 
                className="text-center flex-grow-1 text-truncate custom-phone"
              >
                {Mobile2}
              </span>
            </button>
            )}

            {Mobile3 && (
              <button
              type="button"
              className="list-group-item d-flex align-items-center justify-content-between"
              onClick={() => window.open(`tel:${Mobile3}`, '_self')}
            >
              <img
                    src="/icons8-phonelink-ring-50.png"  // Make sure to replace this path if needed
                    alt="Phone"
                    className="contact-icon me-2"
                    style={{ transform: 'rotate(0deg)', minWidth: '20px', width: '1.8rem' }}  // Adjust width as needed
                  />
              <span 
                className="text-center flex-grow-1 text-truncate custom-phone"
              >
                {Mobile3}
              </span>
            </button>
            )}

            {email && (
              <button
                type="button"
                className="list-group-item d-flex align-items-center justify-content-between"
                onClick={() => window.open(`mailto:${email}`, '_self')}
              >
                <FaEnvelope className="contact-icon me-2" style={{ minWidth: '20px', fontSize: '1.5rem' }} />
                <span className="text-center flex-grow-1 text-truncate custom-phone">{email}</span>
              </button>
            )}

            {email2 && (
              <button
                type="button"
                className="list-group-item d-flex align-items-center justify-content-between"
                onClick={() => window.open(`mailto:${email2}`, '_self')}
              >
                <FaEnvelope className="contact-icon me-2" style={{ minWidth: '20px', fontSize: '1.5rem' }} />
                <span className="text-center flex-grow-1 text-truncate custom-phone">{email2}</span>
              </button>
            )}

            {email3 && (
              <button
                type="button"
                className="list-group-item d-flex align-items-center justify-content-between"
                onClick={() => window.open(`mailto:${email3}`, '_self')}
              >
                <FaEnvelope className="contact-icon me-2" style={{ minWidth: '20px', fontSize: '1.5rem' }} />
                <span className="text-center flex-grow-1 text-truncate custom-phone">{email3}</span>
              </button>
            )}

            {website && (
              <button
                type="button"
                className="list-group-item d-flex align-items-center justify-content-between"
                onClick={() => window.open(`https://${website}`, '_blank')}
              >
                <FaGlobe className="contact-icon me-2" style={{ minWidth: '20px', fontSize: '1.5rem' }} />
                <span className="text-center flex-grow-1 text-truncate custom-phone">{website}</span>
              </button>
            )}

            {website2 && (
              <button
                type="button"
                className="list-group-item d-flex align-items-center justify-content-between"
                onClick={() => window.open(`https://${website2}`, '_blank')}
              >
                <FaGlobe className="contact-icon me-2" style={{ minWidth: '20px', fontSize: '1.5rem' }} />
                <span className="text-center flex-grow-1 text-truncate custom-phone">{website2}</span>
              </button>
            )}

            {website3 && (
              <button
                type="button"
                className="list-group-item d-flex align-items-center justify-content-between"
                onClick={() => window.open(`https://${website3}`, '_blank')}
              >
                <FaGlobe className="contact-icon me-2" style={{ minWidth: '20px', fontSize: '1.5rem' }} />
                <span className="text-center flex-grow-1 text-truncate custom-phone">{website3}</span>
              </button>
            )}

            {address && (
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
            )}

            {address2 && (
              <button
                type="button"
                className="list-group-item d-flex align-items-center justify-content-between"
                onClick={() =>
                  window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address2)}`, '_blank')
                }
              >
                <FaMapMarkerAlt className="contact-icon me-2" style={{ minWidth: '20px', fontSize: '1.5rem' }} />
                <span className="text-center flex-grow-1 text-truncate custom-phone">{address2}</span>
              </button>
            )}
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
