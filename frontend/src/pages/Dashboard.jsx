// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import Selection from '../components/Selection/Selection';
import QrCodeSelection from '../components/Selection/QrCodeSelection';
import NavigationBar from '../components/NavigationBar/NavigationBar'; 
import ExpandableSectionOpen from '../components/ExpandableSectionOpen/ExpandableSectionOpen'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import PageUrlComponent from '../components/Selection/PageUrlComponent';
import SubNav from '../components/SubNav/SubNav';
import axios from 'axios';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState({ src: "defaultTemplate.jpg" });
  const [selectedSubNavTab, setSelectedSubNavTab] = useState('Contact'); // State for SubNav selection
  const [createdAt, setCreatedAt] = useState(null); // Store the createdAt timestamp
  const [remainingTime, setRemainingTime] = useState(null); // Store the remaining time
  const [isExpired, setIsExpired] = useState(false); // Track if the page has expired
  const [email, setEmail] = useState(''); // State for user-entered email
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  // Function to fetch createdAt based on user-entered email
  const fetchCreatedAt = async (email) => {
    try {
      const response = await axios.post('https://backend-api.tapilinq.com/api/admin/urlChecker', { email });
      const { createdAt } = response.data;

      if (createdAt) {
        setCreatedAt(new Date(createdAt));
        setErrorMessage(''); // Clear any previous error message
      } else {
        setErrorMessage('Invalid email or no data found.');
      }
    } catch (error) {
      console.error('Error fetching createdAt:', error);
      setErrorMessage('An error occurred while fetching data.');
    }
  };

  useEffect(() => {
    if (createdAt) {
      const calculateRemainingTime = () => {
        const now = new Date();
        const expirationDate = new Date(createdAt);
        expirationDate.setFullYear(expirationDate.getFullYear() + 1); // Add one year to createdAt

        const diff = expirationDate - now;

        if (diff <= 0) {
          setIsExpired(true); // Mark the page as expired
          setRemainingTime(null);
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
      };

      const intervalId = setInterval(calculateRemainingTime, 1000); // Update every second
      calculateRemainingTime(); // Initial calculation

      return () => clearInterval(intervalId); // Clean up the interval on unmount
    }
  }, [createdAt]);

  const renderContent = () => {
    if (isExpired) {
      return (
        <div className="alert alert-danger" role="alert">
          This page has expired. Please contact the administrator for further assistance.
        </div>
      );
    }

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

          {/* Email Input Section */}
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              Enter Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <button className="btn btn-primary mt-2" onClick={() => fetchCreatedAt(email)}>
              Submit
            </button>
            {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
          </div>

          {/* Countdown Timer */}
          {remainingTime && (
            <div className="alert alert-info" role="alert">
              This page will expire in: {remainingTime}
            </div>
          )}

          <SubNav selectedTab={selectedSubNavTab} onSelectTab={setSelectedSubNavTab} />

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;