import React from "react";
import MobileDummy from "./MobileDummy";

function MobilePreview({
  selectedTemplate,
  contactDetails,
  whatsAppDetails,
  socialMediaUrl,
  selectedSocialMedia,
  socialLinks,
  isCallToActionVisible,
}) {
  return (
    <MobileDummy
      selectedTemplateComponent={() => {
        if (!selectedTemplate) return null;
        const SelectedTemplate = selectedTemplate.component;

        // Pass isQuickSendVisible from contactDetails to Template1
        return SelectedTemplate ? (
          <SelectedTemplate
            contactDetails={{
              ...contactDetails,
              ...whatsAppDetails,
              socialMediaUrl,
            }}
            selectedSocialMedia={selectedSocialMedia}
            socialLinks={socialLinks}
            isCallToActionVisible={isCallToActionVisible}
            isQuickSendVisible={contactDetails.isQuickSendVisible} // Pass the toggle state
            isQuickSendVisiblebot={contactDetails.isQuickSendVisiblebot} 
            isGalaryVisible={contactDetails.isGalaryVisible} // Pass the toggle state
            isVideoVisible={contactDetails.isVideoVisible} // Pass the toggle state
          />
        ) : null;
      }}
      contactDetails={contactDetails}
    />
  );
}

export default MobilePreview;
