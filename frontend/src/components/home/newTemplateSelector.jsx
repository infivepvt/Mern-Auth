import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import templates from '../Selection/templatesData';
import './newTemplateSelector.css';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import SignupModal from '../SignUsers/SignupModal';
import SigninModal from '../SignUsers/SigninModal';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function NewTemplateSelector({ selectedTemplate, onSelectTemplate, initialPageUrl, onPageUrlSave, userEmail }) {
  const [showModal, setShowModal] = useState(false);
  const [showAllModal, setShowAllModal] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [pageUrl, setPageUrl] = useState(initialPageUrl || '');
  const [isUrlLocked, setIsUrlLocked] = useState(initialPageUrl !== '');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);
  const isInitialFetch = useRef(true);
  const navigate = useNavigate();

  const centerSlideRef = useRef(null);

  useEffect(() => {
    if (initialPageUrl) {
      setPageUrl(initialPageUrl);
      setIsUrlLocked(true);
    }
  }, [initialPageUrl]);

  useEffect(() => {
    if (userEmail && isInitialFetch.current) {
      const fetchUserId = async () => {
        try {
          const response = await axios.post('https://vpro-w5om.vercel.app/api/admin/urlChecker', { email: userEmail });
          if (response.data && response.data.userId) {
            setPageUrl(response.data.userId);
            setIsUrlLocked(true);
            onPageUrlSave(response.data.userId);
            setErrorMessage('');
          }
        } catch (error) {
          setErrorMessage('');
        }
      };
      fetchUserId();
      isInitialFetch.current = false;
    }
  }, [userEmail, onPageUrlSave]);

  const handleTemplateClick = (template) => {
    setCurrentTemplate(template);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentTemplate(null);
  };

  const handleRequestUrl = () => {
    setShowSignupModal(true);
  };

  const handleSignupSuccess = () => {
    setShowSignupModal(false);
    setShowSigninModal(true);
  };

  const handleSigninSuccess = () => {
    setShowSigninModal(false);
    handleSaveUrl();
    navigate('/dashboard');
  };

  const handleSaveUrl = async () => {
    if (pageUrl.trim()) {
      try {
        const response = await axios.get(`https://vpro-w5om.vercel.app/api/templates/${pageUrl}`);
        if (response.data) {
          onPageUrlSave(pageUrl);
          setIsUrlLocked(true);
          setErrorMessage('');
        } else {
          setErrorMessage('URL does not exist in the database. Try another URL.');
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('Error checking URL:', error);
          setErrorMessage('An error occurred. Please try again.');
        } else {
          onPageUrlSave(pageUrl);
          setIsUrlLocked(true);
          setErrorMessage('');
        }
      }
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: '0px',
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          centerPadding: '0px',
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '0px',
        },
      },
    ],
    afterChange: () => {
      // Reset rotation after slide change
      if (centerSlideRef.current) {
        centerSlideRef.current.style.setProperty('--centerXRot', '0deg');
        centerSlideRef.current.style.setProperty('--centerYRot', '0deg');
      }
    }
  };

  const handleViewAllTemplates = () => {
    window.open('https://vcode.pro/all/', '_blank');
  };

  const handleMouseMove = useCallback((e) => {
    const card = centerSlideRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top; 

    // Calculate rotation values
    const rotateY = ((x / rect.width) - 0.5) * 20; // Tilt left/right
    const rotateX = ((y / rect.height) - 0.5) * -20; // Tilt up/down

    card.style.setProperty('--centerYRot', `${rotateY}deg`);
    card.style.setProperty('--centerXRot', `${rotateX}deg`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = centerSlideRef.current;
    if (card) {
      card.style.setProperty('--centerYRot', '0deg');
      card.style.setProperty('--centerXRot', '0deg');
    }
  }, []);

  return (
    <div className="containerNew mt-5">
      <h2 className="text-center mb-5 text-primary">Choose Your Template</h2>
      
      {/* Carousel showing only the first 4 templates */}
      <Slider {...sliderSettings}>
        {templates.slice(0,4).map((template, index) => (
          <div key={template.id} className="p-3">
            <div
              className="template-card h-100 d-flex flex-column align-items-center"
              data-tilt={index === 1 || index === 2 ? "true" : "false"}
              ref={index === 1 || index === 2 ? centerSlideRef : null}
              onMouseMove={index === 1 || index === 2 ? handleMouseMove : null}
              onMouseLeave={index === 1 || index === 2 ? handleMouseLeave : null}
            >
              <p className="text-dark fw-bold mb-2">{template.name}</p>
              <img
                src={template.src}
                alt={template.name}
                className="img-fluid mb-3 template-image"
                style={{ width: '50%', height: '50%', borderRadius: '12px' }}
              />
            </div>
          </div>
        ))}
      </Slider>

      {/* Horizontal Buttons */}
      <div className="d-flex justify-content-center gap-4">
        <div className="view-all-button">
          <Button variant="outline-dark" size="lg" onClick={handleViewAllTemplates}>
            View All Templates
          </Button>
        </div>

        {/* Request Templates Button with Heartbeat Animation */}
        <div className="view-all-button">
          <Button 
            variant="outline-danger" 
            size="lg" 
            onClick={handleRequestUrl} 
            className="heartbeat-btn"
          >
            Request Templates
          </Button>
        </div>
      </div>

      {/* Signup and Signin Modals */}
      <SignupModal
        show={showSignupModal}
        onHide={() => setShowSignupModal(false)}
        onSignupSuccess={handleSignupSuccess}
        onShowSignin={() => {
          setShowSignupModal(false);
          setShowSigninModal(true);
        }}
      />
      <SigninModal show={showSigninModal} onHide={() => setShowSigninModal(false)} onSigninSuccess={handleSigninSuccess} />
    </div>
  );
}

export default NewTemplateSelector;
