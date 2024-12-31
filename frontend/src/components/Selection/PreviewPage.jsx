// PreviewPage.jsx
import React from 'react';
import MobilePreview from './MobilePreview';

const PreviewPage = ({ selectedTemplate, contactDetails, whatsAppDetails, socialMediaUrl, selectedSocialMedia, socialLinks }) => {
  return (
    <div className="container mt-4">
      <MobilePreview
        selectedTemplate={selectedTemplate}
        contactDetails={contactDetails}
        whatsAppDetails={whatsAppDetails}
        socialMediaUrl={socialMediaUrl}
        selectedSocialMedia={selectedSocialMedia}
        socialLinks={socialLinks}
      />
    </div>
  );
};

export default PreviewPage;