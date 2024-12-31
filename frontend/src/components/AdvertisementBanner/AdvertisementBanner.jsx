import React from "react";
import adImage from "./imageAdver.webp";
import "bootstrap/dist/css/bootstrap.min.css";

const AdvertisementBanner = () => {
  return (
    <div className="advertisement-banner container p-4 bg-light rounded shadow-lg text-center">
      <img 
        src={adImage} 
        alt="Revolutionize Your Digital Presence!" 
        className="advertisement-image img-fluid mb-3 rounded"
      />
      <div className="advertisement-content">
        <h2 className="mb-3">Revolutionize Your Digital Presence!</h2>
        <p className="mb-4">Edit your profile with ease using a smart business card.</p>
      </div>
    </div>
  );
};

export default AdvertisementBanner;