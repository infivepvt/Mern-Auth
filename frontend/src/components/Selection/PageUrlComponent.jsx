import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import SignupModal from '../SignUsers/SignupModal';
import SigninModal from '../SignUsers/SigninModal';
import './PageUrlComponent.css'; // Import custom CSS for placeholder

const PageUrlComponent = ({ initialPageUrl, onPageUrlSave, userEmail }) => {
  const [pageUrl, setPageUrl] = useState(initialPageUrl || '');
  const [isUrlLocked, setIsUrlLocked] = useState(initialPageUrl !== '');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);
  const isInitialFetch = useRef(true);

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

  const handleRequestUrl = () => {
    setShowSignupModal(true);
  };

  const handleSignupSuccess = (userData) => {
    setShowSignupModal(false);
    setShowSigninModal(true);
  };

  const handleSigninSuccess = (userData) => {
    setShowSigninModal(false);
    handleSaveUrl();
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

  return (
    <div className="container mt-4">
      <label htmlFor="pageUrl" className="form-label">
        <h5 className="mb-1">Set URL</h5>
      </label>
      <div className="input-group">
        <span className="input-group-text" id="basic-addon1">
          linko.page/template/
        </span>
        <input
          readOnly
          type="text"
          className="form-control placeholder-red"
          id="pageUrl"
          placeholder="If You Don't Have a URL, Please Request or Wait"
          aria-label="Page URL"
          aria-describedby="basic-addon1"
          value={pageUrl}
          onChange={(e) => setPageUrl(e.target.value)}
          disabled={isUrlLocked}
        />
        {!isUrlLocked && (
          <button className="btn btn-primary" onClick={handleRequestUrl}>
            Request URL
          </button>
        )}
      </div>
      {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
      <br />

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
      <SigninModal
        show={showSigninModal}
        onHide={() => setShowSigninModal(false)}
        onSigninSuccess={handleSigninSuccess}
      />
    </div>
  );
};

export default PageUrlComponent;
