// SubNav.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SubNav = ({ selectedTab, onSelectTab }) => {
  return (
    <div className="d-flex justify-content-center mt-4 mb-3">
      <div className="btn-group shadow-sm w-75" role="group" aria-label="Tab navigation">
        <button
          type="button"
          className={`btn ${selectedTab === 'Contact' ? 'btn-primary' : 'btn-outline-primary'} rounded-start`}
          onClick={() => onSelectTab('Contact')}
        >
          Contact
        </button>
        
        <button
          type="button"
          className={`btn ${selectedTab === 'QR Code' ? 'btn-primary' : 'btn-outline-primary'} rounded-end`}
          onClick={() => onSelectTab('QR Code')}
        >
          QR Code
        </button>
      </div>
    </div>
  );
};

export default SubNav;
