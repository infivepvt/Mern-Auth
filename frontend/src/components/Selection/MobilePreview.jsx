// MobilePreview.jsx
import React from 'react';
import MobileDummy from './MobileDummy';

function MobilePreview({ selectedTemplate, contactDetails, whatsAppDetails, socialMediaUrl, selectedSocialMedia, socialLinks }) {
  return (
    <MobileDummy
      selectedTemplateComponent={() => {
        if (!selectedTemplate) return null;
        const SelectedTemplate = selectedTemplate.component;
        return SelectedTemplate ? (
          <SelectedTemplate
            contactDetails={{ ...contactDetails, ...whatsAppDetails, socialMediaUrl }}
            selectedSocialMedia={selectedSocialMedia}
            socialLinks={socialLinks}
          />
        ) : null;
      }}
      contactDetails={contactDetails}
    />
  );
}

export default MobilePreview;
