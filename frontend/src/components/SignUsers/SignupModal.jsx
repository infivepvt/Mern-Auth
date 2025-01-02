// SignupModal.jsx
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './SigninSignupAnimation.css';
import axios from 'axios';

const SignupModal = ({ show, onHide, onSignupSuccess, onShowSignin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async () => {
    try {
      console.log('Attempting to sign up with email:', email);
      // Format the birthday to match the expected format (YYYY-MM-DD)
      const formattedBirthday = new Date(birthday).toISOString().split('T')[0];
      const response = await axios.post('https://tapilinq.com/api/login/signup', {
        email,
        name,
        password,
        birthday: formattedBirthday,
      });
      
      if (response.data && response.data.success) {
        onSignupSuccess(response.data);
        alert('Signup successful. Please sign in.');
        onShowSignin();
      } else {
        setErrorMessage(response.data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign up:', error.response?.data || error.message);
      setErrorMessage(error.response?.data.message || 'An error occurred. Please try again.');
    }
  };
  
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Modal show={show} onHide={onHide} centered className="signin-signup-modal">
        <div className="business-card-animation">
          <div className="card-front">
            <Modal.Header closeButton>
              <Modal.Title>Create Your Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="You Like Template URL Name / UserName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <input
                type="date"
                className="form-control mb-3"
                placeholder="Birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
              {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
              <Button variant="primary" className="w-100 mb-3" onClick={handleSignup}>
                Sign Up
              </Button>
              <div className="text-center">
                Already have an account?{' '}
                <a href="#" onClick={onShowSignin}>
                  Sign In
                </a>
              </div>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </GoogleOAuthProvider>
  );
};

export default SignupModal;