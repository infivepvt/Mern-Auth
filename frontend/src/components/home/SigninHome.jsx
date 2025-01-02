// Updated SigninModal.jsx
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';


const SigninHome = ({ show, onHide, onSigninSuccess, onShowSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignin = async () => {
    try {
      console.log('Attempting to sign in with email:', email);
      const response = await axios.post('https://backend-api.tapilinq.com.com/api/login/signin', {
        email,
        password,
      });
      if (response.data && response.data.isValid) {
        const { name } = response.data.user;
        setUserName(name);
        setIsSignedIn(true);

        // Save user details to localStorage to persist session
        localStorage.setItem('userInfo', JSON.stringify(response.data.user));

        onSigninSuccess();
        alert(`Welcome ${name}`);
      } else {
        setErrorMessage('Invalid email or password. Try again.');
      }
    } catch (error) {
      console.error('Error during sign in:', error.response?.data || error.message);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    if (isSignedIn) {
        window.location.reload(false);
    }
  }, [isSignedIn, userName, email]);

  if (isSignedIn) {
    
  }

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Modal show={show} onHide={onHide} centered className="signin-signup-modal">
        <div className="business-card-animation">
          <div className="card-front">
            <Modal.Header closeButton>
              <Modal.Title>Welcome Back</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
              <Button variant="primary" className="w-100 mb-3" onClick={handleSignin}>
                Log in
              </Button>
             
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </GoogleOAuthProvider>
  );
};

export default SigninHome;