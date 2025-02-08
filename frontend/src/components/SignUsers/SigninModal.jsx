import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import './SigninSignupAnimation.css';

const SigninModal = ({ show, onHide, onSigninSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignin = async () => {
    try {
      console.log('Attempting to sign in with email:', email);
      const response = await axios.post('https://vpro-w5om.vercel.app/api/login/signin', {
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
      // Automatically open WhatsApp in a new tab after successful sign-in
      const whatsappUrl = `https://wa.me/+94761341023?text=${encodeURIComponent(
        `I'm ${userName} and my Email address is ${email}. I want to get URL.`
      )}`;
      
      // Open the WhatsApp link in a new tab
      window.open(whatsappUrl, '_blank');
    }
  }, [isSignedIn, userName, email]);

  return (
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
  );
};

export default SigninModal;
