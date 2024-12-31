// Dashboard.jsx
import React, { useState } from 'react';
import Selection from '../components/Selection/Selection';
import QrCodeSelection from '../components/Selection/QrCodeSelection';
import NavigationBar from '../components/NavigationBar/NavigationBar'; 
import ExpandableSectionOpen from '../components/ExpandableSectionOpen/ExpandableSectionOpen'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import PageUrlComponent from '../components/Selection/PageUrlComponent';
import SubNav from '../components/SubNav/SubNav';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState({ src: "defaultTemplate.jpg" });
  const [selectedSubNavTab, setSelectedSubNavTab] = useState('Contact'); // State for SubNav selection

  const renderContent = () => {
    switch (selectedSubNavTab) {
      case 'Contact':
        return (
          <>

            <div className="mt-4">
              <ExpandableSectionOpen title="Contact Details">
                <div className="p-1 my-3" style={{ backgroundColor: '#C3C9CB', borderRadius: '8px' }}>
                  <Selection onTemplateSelect={setSelectedTemplate} />
                </div>
              </ExpandableSectionOpen>
            </div>
          </>
        );
      
      case 'QR Code':
        return (
          <>
            <h5 className="mt-4">QR Code</h5>
            <small>(Generate a QR code for your digital business card)</small>
            <div className="mt-4">
              <ExpandableSectionOpen title="QR Code">
                <div className="p-1 my-3" style={{ backgroundColor: '#C3C9CB', borderRadius: '8px' }}>
                  <QrCodeSelection onTemplateSelect={setSelectedTemplate} />
                </div>
              </ExpandableSectionOpen>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4 p-3" style={{ backgroundColor: '#E5EAF5', borderRadius: '8px' }}>
      <NavigationBar selectedTab={selectedTab} onSelectTab={setSelectedTab} />

      <div className="row">
        <div className="col-lg-10 col-md-12 col-sm-12 mx-auto" style={{ minHeight: '600px', width: '100%', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h2 className="mb-4">Digital Business Card</h2>
          
          <SubNav selectedTab={selectedSubNavTab} onSelectTab={setSelectedSubNavTab} />

          {renderContent()}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;