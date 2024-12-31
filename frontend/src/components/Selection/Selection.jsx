import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Selection.css';
import templates from './templatesData';
import TemplateSelector from './TemplateSelector';
import MobilePreview from './MobilePreview';
import ContactDetails from '../ContactDetails/ContactDetails';
import CalltoAction from '../CalltoAction/CalltoAction';
import ExpandableSection from '../ExpandableSection/ExpandableSection';
import SocialLink from '../SocialLink/SocialLink';
import PageUrlComponent from './PageUrlComponent';

function Selection({ children, onLogout }) {
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [userId, setUserId] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0] || null);
  const [contactDetails, setContactDetails] = useState({});
  const [selectedSocialMedia, setSelectedSocialMedia] = useState({ name: 'WhatsApp', icon: FaWhatsapp });
  const [whatsAppDetails, setWhatsAppDetails] = useState({ countryCode: '', phoneNumber: '' });
  const [socialMediaUrl, setSocialMediaUrl] = useState('');
  const [socialLinks, setSocialLinks] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const navigate = useNavigate();
  const isInitialFetch = useRef(true);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  useEffect(() => {
    if (!userId || !isInitialFetch.current) return;
    const fetchTemplateData = async () => {
      try {
        const response = await axios.get(`https://vpro-w5om.vercel.app/api/templates/${userId}`);
        if (response.data) {
          const { selectedTemplate, contactDetails, selectedSocialMedia, whatsAppDetails, socialMediaUrl, socialLinks } = response.data;
          setSelectedTemplate(selectedTemplate);
          setContactDetails(contactDetails);
          setSelectedSocialMedia(selectedSocialMedia);
          setWhatsAppDetails(whatsAppDetails);
          setSocialMediaUrl(socialMediaUrl);
          setSocialLinks(socialLinks);
        }
      } catch (error) {
        console.error('Error fetching template data:', error);
      } finally {
        isInitialFetch.current = false;
      }
    };

    fetchTemplateData();
  }, [userId]);

  const selectTemplate = useCallback((template) => {
    setSelectedTemplate(template);
  }, []);

  const handleContactDetailsChange = useCallback((newData) => {
    setContactDetails((prevDetails) => ({ ...prevDetails, ...newData }));
  }, []);

  const handleSocialMediaChange = useCallback((newSocialMedia) => {
    const iconMapping = {
      Facebook: FaFacebook,
      Instagram: FaInstagram,
      Twitter: FaTwitter,
      LinkedIn: FaLinkedin,
      WhatsApp: FaWhatsapp,
    };
    setSelectedSocialMedia({ name: newSocialMedia.name, icon: iconMapping[newSocialMedia.name] });
  }, []);

  const handleWhatsAppChange = useCallback((details) => {
    setWhatsAppDetails(details);
  }, []);

  const handleUrlChange = useCallback((url) => {
    setSocialMediaUrl(url);
  }, []);

  const handleSocialLinksChange = useCallback((links) => {
    setSocialLinks(links);
  }, []);

  const handleSaveTemplate = async () => {
    const savedData = {
      userId,
      selectedTemplate,
      contactDetails,
      selectedSocialMedia,
      whatsAppDetails,
      socialMediaUrl,
      socialLinks,
    };

    try {
      await axios.post(`https://vpro-w5om.vercel.app/api/templates/${userId}`, savedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        maxContentLength: 10 * 1024 * 1024,
      });
      console.log('Template saved successfully');
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);
    } catch (error) {
      console.error('Error saving template data:', error);
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 3000);
    }
  };

  const handleNavigateToTemplate = () => {
    navigate(`/template/${userId}`);
  };

  const handlePageUrlSave = (url) => {
    if (url && url !== userId) {
      setUserId(url);
      isInitialFetch.current = true; // Trigger re-fetch of template data
    }
  };

  return (
    <main className="content" style={{ width: '730px' }}>
      <div className="app container mt-4">
        <div className="mt-2 d-flex align-items-center">
          <span className="me-3 fw-bold text-primary">TRY YOUR URL</span>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => window.open(`/template/${userId}`, '_blank')}
            style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {`/template/${userId}`}
          </button>
        </div>

        <PageUrlComponent initialPageUrl={userId} onPageUrlSave={handlePageUrlSave} userEmail={userInfo.email} />

        <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={selectTemplate} />

        <MobilePreview
          selectedTemplate={selectedTemplate}
          contactDetails={contactDetails}
          whatsAppDetails={whatsAppDetails}
          socialMediaUrl={socialMediaUrl}
          selectedSocialMedia={selectedSocialMedia}
          socialLinks={socialLinks}
        />

        <ContactDetails initialData={contactDetails} onChange={handleContactDetailsChange} />
        <br />

        <ExpandableSection title="Call to Action">
          <CalltoAction
            onSocialMediaChange={handleSocialMediaChange}
            onWhatsAppChange={handleWhatsAppChange}
            onUrlChange={handleUrlChange}
          />
        </ExpandableSection>

        <ExpandableSection title="Social Media Links">
          <SocialLink onLinksChange={handleSocialLinksChange} />
        </ExpandableSection>

        <button className="btn btn-primary mt-3" onClick={handleSaveTemplate}>Save Template</button>

        {showSuccessPopup && (
          <div className="success-popup">
            <div className="popup-content">
              <h5>Template Saved Successfully!</h5>
              <p>Your template has been saved with all the details. 🎉</p>
            </div>
          </div>
        )}

        {showErrorPopup && (
          <div className="error-popup">
            <div className="popup-content">
              <h5>Please request your URL and save the template again.</h5>
              <p>Error Saving Template!.</p>
            </div>
          </div>
        )}
      </div>
      {children}
    </main>
  );
}

export default Selection;
