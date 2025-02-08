import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Template4.css';
import { FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaSave, FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';

const Template4 = ({ contactDetails, selectedSocialMedia, socialLinks, selectedTemplate, whatsAppDetails, socialMediaUrl }) => {
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
      <div className="card custom-card shadow-lg ba">
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
          
        </div>
        <br /><br />
        <div className="card-body text-center">

          
<br />
          <div className="top">
            <img src={profileImage} alt={name} className="rounded-circle"/>
          </div>

          <h2 className="card-title1">{name}</h2>
          <p className="text-muted1">{title}</p>

         <br />
       
          <div class="horizontal-line"></div>


                  
          <div className="list-group1 mb-4 row g-3">
            {phoneWork && (
              <div className="col-12 col-md-6 col-lg-4">
                <a href={`tel:${phoneWork}`} className="icon d-flex align-items-center">
                  <FaPhone className="contact-icon me-2" style={{ transform: 'rotate(90deg)', minWidth: '20px', fontSize: '1.5rem' }} />
                  
                </a>
                <span style={{ fontSize: '1.2rem' }}>Call</span>
              </div>
            )}

            {phoneMobile && (
              <div className="col-12 col-md-6 col-lg-4">
                <a href={`tel:${phoneMobile}`} className="icon d-flex align-items-center">
                  <img src="/icons8-ringing-phone-64.png" alt="Phone" className="contact-icon me-2" style={{ transform: 'rotate(0deg)', minWidth: '20px', width: '1.8rem' }} />
                  
                </a>
                <span style={{ fontSize: '1.2rem' }}>Mobile</span>
              </div>
            )}

            {Mobile2 && (
              <div className="col-12 col-md-6 col-lg-4">
                <a href={`tel:${Mobile2}`} className="icon d-flex align-items-center">
                  <img src="/icons8-phonelink-ring-50.png" alt="Phone" className="contact-icon me-2" style={{ transform: 'rotate(0deg)', minWidth: '20px', width: '1.8rem' }} />
                  
                </a>
                <span style={{ fontSize: '1.2rem' }}>Mobile2</span>
              </div>
            )}

            {Mobile3 && (
              <div className="col-12 col-md-6 col-lg-4">
                <a href={`tel:${Mobile3}`} className="icon d-flex align-items-center">
                  <img src="/icons8-phonelink-ring-50.png" alt="Phone" className="contact-icon me-2" style={{ transform: 'rotate(0deg)', minWidth: '20px', width: '1.8rem' }} />
                  
                </a>
                <span style={{ fontSize: '1.2rem' }}>Mobile3</span>
              </div>
            )}

            {email && (
              <div className="col-12 col-md-6 col-lg-4">
                <a href={`mailto:${email}`} className="icon d-flex align-items-center">
                  <FaEnvelope className="contact-icon me-2" style={{ minWidth: '20px', fontSize: '1.5rem' }} />
                
                </a>
                <span style={{ fontSize: '1.2rem' }}>Email</span>
              </div>
            )}

            {email2 && (
              <div className="col-12 col-md-6 col-lg-4">
                <a href={`mailto:${email2}`} className="icon d-flex align-items-center">
                  <FaEnvelope className="contact-icon me-2" style={{ minWidth: '20px', fontSize: '1.5rem' }} />
                  
                </a>
                <span style={{ fontSize: '1.2rem' }}>Email2</span>
              </div>
            )}

            {email3 && (
              <div className="col-12 col-md-6 col-lg-4">
                <a href={`mailto:${email3}`} className="icon d-flex align-items-center">
                  <FaEnvelope className="contact-icon me-2" style={{ minWidth: '20px', fontSize: '1.5rem' }} />
                  
                </a>
                <span style={{ fontSize: '1.2rem' }}>Email3</span>
              </div>
            )}

            {website && (
              <div className="col-12 col-md-6 col-lg-4">
                <a href={`http://${website}`} className="icon d-flex align-items-center">
                  <FaGlobe className="contact-icon me-2" style={{ minWidth: '20px', fontSize: '1.5rem' }} />
                  
                </a>
                <span style={{ fontSize: '1.2rem' }}>Website</span>
              </div>
            )}

            {website2 && (
              <div className="col-12 col-md-6 col-lg-4">
                <a href={`http://${website2}`} className="icon d-flex align-items-center">
                  <FaGlobe className="contact-icon me-2" style={{ minWidth: '20px', fontSize: '1.5rem' }} />
                  
                </a>
                <span style={{ fontSize: '1.2rem' }}>Website2</span>
              </div>
            )}

            {website3 && (
              <div className="col-12 col-md-6 col-lg-4">
                <a href={`http://${website3}`} className="icon d-flex align-items-center">
                  <FaGlobe className="contact-icon me-2" style={{ minWidth: '20px', fontSize: '1.5rem' }} />
                  
                </a>
                <span style={{ fontSize: '1.2rem' }}>Website3</span>
              </div>
            )}

            {address && (
              <div className="col-12 col-md-6 col-lg-4">
                <a href={`#`} className="icon d-flex align-items-center">
                  <FaMapMarkerAlt className="contact-icon me-2" style={{ minWidth: '20px', fontSize: '1.5rem' }} />
                
                </a>
                <span style={{ fontSize: '1.2rem' }}>Address</span>
              </div>
            )}

            {address2 && (
              <div className="col-12 col-md-6 col-lg-4">
                <a href={`#`} className="icon d-flex align-items-center">
                  <FaMapMarkerAlt className="contact-icon me-2" style={{ minWidth: '20px', fontSize: '1.5rem' }} />
                  
                </a>
                <span style={{ fontSize: '1.2rem' }}>Address2</span>
              </div>
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

export default Template4;
