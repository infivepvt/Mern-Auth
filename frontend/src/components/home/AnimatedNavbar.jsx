import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import SigninHome from './SigninHome'; // Import the SigninHome component

function AnimatedNavbar() {
  const [showSigninModal, setShowSigninModal] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleShowSignin = (event) => {
    event.preventDefault();
    setShowSigninModal(true);
  };

  const handleSigninSuccess = () => {
    // This callback is called after a successful sign-in in SigninHome.
    setShowSigninModal(false);
    // Navigate to the dashboard after successful login
    navigate('/dashboard');
  };

  const handleHideSignin = () => {
    setShowSigninModal(false);
  };

  const handleShowSignup = (event) => {
    // If you have a separate signup modal or page, you can show it here
    event.preventDefault();
    // Hide the sign-in modal first if needed
    setShowSigninModal(false);
    // Code to show signup modal goes here if you have it
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black py-1 shadow fixed-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center fw-bold">
            <img
              src="/logo.png"
              alt="Logo"
              className="navbar-logo"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <Link to="/shop" className="nav-link text-white">
                  Use Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link text-white">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/help" className="nav-link text-white">
                  Help
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/how-it-works" className="nav-link text-white">
                  How It Works
                </Link>
              </li>
              <li className="nav-item">
                <a
                  href="#"
                  className="nav-link btn btn-primary text-white px-4"
                  onClick={handleShowSignin}
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Render the SigninHome modal */}
      <SigninHome
        show={showSigninModal}
        onHide={handleHideSignin}
        onSigninSuccess={handleSigninSuccess}
        onShowSignup={handleShowSignup}
      />
    </>
  );
}

export default AnimatedNavbar;
