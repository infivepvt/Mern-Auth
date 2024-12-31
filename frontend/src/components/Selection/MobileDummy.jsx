import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MobileDummy.css'; 

function MobileDummy({ selectedTemplateComponent: SelectedTemplateComponent, contactDetails }) {
  return (
    <div 
      className="position-fixed d-none d-md-block iphone-container"
      style={{ 
        top: '80px', 
        left: '1200px', 
        zIndex: '10' 
      }}
    >
      <div className="iphone-notch"></div>
      <div className="iphone-screen">
        {SelectedTemplateComponent ? (
          <div className="iphone-content">
            <SelectedTemplateComponent contactDetails={contactDetails} />
          </div>
        ) : (
          <p className="text-center text-white">No template selected</p>
        )}
      </div>
    </div>
  );
}

export default MobileDummy;
