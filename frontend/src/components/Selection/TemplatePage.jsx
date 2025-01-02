// TemplatePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import templates from './templatesData';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import babyLoadingAnimation from './babyLoading.json'; // Replace with your own Lottie animation file
import notFoundAnimation from './Notfound.json'; // Replace with your own Lottie animation file

function TemplatePage() {
  const { userId } = useParams();
  const [savedTemplate, setSavedTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplateData = async () => {
      if (!userId) {
        console.error('userId is undefined');
        setLoading(false);
        return;
      }
      try {
        console.log(`Fetching template data for userId: ${userId}`);
        const response = await axios.get(`https://backend-api.tapilinq.com/api/templates/${userId}`);
        if (response.data) {
          console.log('Template data fetched successfully:', response.data);
          setSavedTemplate(response.data);
        } else {
          console.warn('Template data is empty');
        }
      } catch (error) {
        console.error('Error fetching template data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplateData();
  }, [userId]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#282c34'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <Player
            autoplay
            loop
            src={babyLoadingAnimation}
            style={{ height: '300px', width: '300px' }}
          />
          <p style={{ marginTop: '20px' }}></p>
        </div>
      </div>
    );
  }

  if (!savedTemplate) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#282c34'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <Player
            autoplay
            loop
            src={notFoundAnimation}
            style={{ height: '300px', width: '300px' }}
          />
          <p style={{ marginTop: '20px' }}>Template not found</p>
        </div>
      </div>
    );
  }

  const { selectedTemplate, contactDetails, selectedSocialMedia, whatsAppDetails, socialMediaUrl, socialLinks } = savedTemplate;
  const template = templates.find((t) => t.id === selectedTemplate?.id);

  if (!template) {
    console.error('Template not found in templatesData for id:', selectedTemplate?.id);
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#282c34'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <Player
            autoplay
            loop
            src={notFoundAnimation}
            style={{ height: '300px', width: '300px' }}
          />
          <p style={{ marginTop: '20px' }}>Template not found</p>
        </div>
      </div>
    );
  }

  const TemplateComponent = template.component;

  if (!TemplateComponent) {
    console.error('Template component is undefined for template:', template);
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#282c34'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <Player
            autoplay
            loop
            src={notFoundAnimation}
            style={{ height: '300px', width: '300px' }}
          />
          <p style={{ marginTop: '20px' }}>Template component not found</p>
        </div>
      </div>
    );
  }

  console.log('Rendering TemplateComponent with data:', {
    contactDetails,
    whatsAppDetails,
    socialMediaUrl,
    selectedSocialMedia,
    socialLinks,
  });

  return (
    <div style={{
      margin: '0 auto',
      padding: '0',
      overflow: 'hidden',
      maxWidth: '600px',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <TemplateComponent
        contactDetails={contactDetails}
        whatsAppDetails={whatsAppDetails}
        socialMediaUrl={socialMediaUrl}
        selectedSocialMedia={selectedSocialMedia}
        socialLinks={socialLinks}
      />
    </div>
  );
}

export default TemplatePage;
