import React, { useState, useEffect } from 'react';
import { Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';

const ExpandableSectionOpen = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true); // Set initial state to open
  }, []);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`expandable-section mb-3 shadow-sm rounded ${isOpen ? 'bg-light' : ''}`}>
      <div
        className={`section-header d-flex justify-content-between align-items-center p-3 ${isOpen ? 'bg-dark text-white' : 'bg-dark text-white'} rounded-top`}
        onClick={toggleOpen}
        style={{ cursor: 'pointer', borderRadius: isOpen ? '0.375rem 0.375rem 0 0' : '0.375rem' }}
      >
        <span className="section-title fw-semibold">{title}</span>
        <span className="toggle-icon">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </div>
      <Collapse in={isOpen}>
        <div className="section-content p-3 bg-white rounded-bottom">
          {children}
        </div>
      </Collapse>
    </div>
  );
};

export default ExpandableSectionOpen;
