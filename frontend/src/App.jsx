import React, { useState, useEffect } from "react";
import "./App.css";
import TopNav from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Support from "./pages/Support";
import Notififation from "./pages/Notififation";
import Analytics from "./pages/Analytics";
import Solution from "./pages/Solution";
import MyDigitalCards from "./pages/MyDigitalCards";
import Setting from "./pages/Setting";
import Selection from "./components/Selection/Selection";
import TemplatePage from "./components/Selection/TemplatePage";
import { Player } from "@lottiefiles/react-lottie-player";
import notFoundAnimation from "../src/components/Selection/Notfound.json";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AdvertisementBanner from "../src/components/AdvertisementBanner/AdvertisementBanner";

function App() {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    const isAdShown = sessionStorage.getItem("adShown");
    const isMainPage = window.location.pathname === "/";
    if (isMainPage && !isAdShown) {
      setShowAd(true);
      sessionStorage.setItem("adShown", "true");
    }
  }, []);

  const handleCloseAd = () => {
    setShowAd(false);
  };

  return (
    <div className="app-container bg-dark">
      <div className="container-fluid px-0">
        <Router>
          <Routes>
            <Route path="/template/:userId" element={<TemplatePage />} />
            <Route path="/" element={<MyDigitalCards />} />
            <Route path="/dashboard" element={<TopNav><Dashboard /></TopNav>} />
            <Route path="/users" element={<TopNav><Users /></TopNav>} />
            <Route path="/support" element={<TopNav><Support /></TopNav>} />
            <Route path="/analytics" element={<TopNav><Analytics /></TopNav>} />
            <Route path="/notififation" element={<TopNav><Notififation /></TopNav>} />
            <Route path="/solution" element={<TopNav><Solution /></TopNav>} />
            <Route path="/settings" element={<TopNav><Setting /></TopNav>} />
            <Route path="/selection" element={<TopNav><Selection /></TopNav>} />
            <Route
              path="*"
              element={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: '#282c34',
                  }}
                >
                  <div style={{ textAlign: 'center', color: 'white' }}>
                    <Player
                      autoplay
                      loop
                      src={notFoundAnimation}
                      style={{ height: '300px', width: '300px' }}
                    />
                    <p style={{ marginTop: '20px' }}>Page not found</p>
                  </div>
                </div>
              }
            />
          </Routes>
        </Router>

        {/* Advertisement Modal */}
        <Modal show={showAd} onHide={handleCloseAd} centered>
          <Modal.Header closeButton>
            <Modal.Title>Revolutionize Your Digital Presence!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AdvertisementBanner />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAd}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default App;