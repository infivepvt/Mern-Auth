import React from 'react';
import { FaIdBadge, FaQrcode, FaFileAlt, FaAddressCard, FaPaw } from 'react-icons/fa';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavigationBar.css';

const NavigationBar = ({ selectedTab, onSelectTab }) => {
  const tabs = [
    { name: 'Digital Business Card', icon: <FaIdBadge /> },
    { name: 'Product QR Code', icon: <FaQrcode /> },
    { name: 'Form QR Code', icon: <FaFileAlt /> },
    { name: 'vCard Plus', icon: <FaAddressCard /> },
    { name: 'Pet ID Tag', icon: <FaPaw /> }
  ];

  return (
    <Nav style={{ backgroundColor: '#000D1f', padding: '0.5rem' }} className="d-flex justify-content-around rounded">
      {tabs.map((tab, index) => (
        <Nav.Item key={index} className="text-center">
          <Nav.Link
            className={`nav-button ${selectedTab === index ? 'active' : ''} d-flex flex-column align-items-center`}
            onClick={() => onSelectTab(index)}
            style={{ cursor: 'pointer', background: 'none', padding: '0.25rem' }} // Reduced padding for smaller appearance
            title={tab.name}
          >
            <div
              className={`icon-container d-flex justify-content-center align-items-center ${selectedTab === index ? 'icon-selected' : ''}`}
              style={{ color: 'white', fontSize: '1.5rem' }} // Reduced font size for smaller icon
            >
              {tab.icon}
            </div>
            <span className={`tab-name ${selectedTab === index ? 'fw-bold' : ''} small`} style={{ color: 'white', fontSize: '0.75rem' }}>
              {tab.name}
            </span>
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default NavigationBar;
