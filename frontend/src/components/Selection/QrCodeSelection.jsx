import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Selection.css';
import PageUrlComponent from './PageUrlComponent';
import { SketchPicker } from 'react-color';
import QRCodeStyling from 'qr-code-styling';

function QrCodeSelection({ children }) {
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [userId, setUserId] = useState('');
  const [qrCodeColor, setQrCodeColor] = useState('#7EA7D8');
  const [qrCodeShape, setQrCodeShape] = useState('extra-rounded');
  const [qrCodeFrameColor, setQrCodeFrameColor] = useState('#5172FF');
  const [logoImage, setLogoImage] = useState('/logo.png');
  const [qrCode3DStyle, setQrCode3DStyle] = useState(false);
  const [qrCodeEyeFrameShape, setQrCodeEyeFrameShape] = useState('rounded');
  const [qrCodeEyeBallShape, setQrCodeEyeBallShape] = useState('rounded');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  useEffect(() => {
    const fetchTemplateData = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/templates/${userId}`);
        if (response.data) {
          const { selectedTemplate, contactDetails, selectedSocialMedia, whatsAppDetails, socialMediaUrl, socialLinks } = response.data;
          setSelectedTemplate(selectedTemplate);
          setContactDetails(contactDetails);
          setSelectedSocialMedia(selectedSocialMedia);
          setWhatsAppDetails(whatsAppDetails);
          setSocialMediaUrl(socialMediaUrl);
          setSocialLinks(socialLinks);
        }
      } catch (error) {
        console.error('Error fetching template data:', error);
      }
    };

    fetchTemplateData();
  }, [userId]);

  const handlePageUrlSave = (url) => {
    setUserId(url);
  };

  const downloadQrCode = () => {
    qrCodeStyling.download({ name: `QRCode_${userId}`, extension: 'png' });
  };

  const handleOpenTemplate = () => {
    setIsLoading(true);
    const newWindow = window.open(`/template/${userId}`, '_blank');
    const interval = setInterval(() => {
      if (newWindow.closed) {
        setIsLoading(false);
        clearInterval(interval);
      }
    }, 500);
  };

  const qrCodeStyling = new QRCodeStyling({
    width: 300,
    height: 300,
    data: `${window.location.origin}/template/${userId}`,
    image: logoImage,
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 10,
    },
    dotsOptions: {
      color: qrCodeColor,
      type: qrCodeShape,
    },
    backgroundOptions: {
      color: 'transparent',
    },
    cornersSquareOptions: {
      type: qrCodeEyeFrameShape,
      color: qrCodeFrameColor,
    },
    cornersDotOptions: {
      type: qrCodeEyeBallShape,
      color: qrCodeColor,
    },
    // Adding a 3D effect style
    gradientOptions: qrCode3DStyle ? {
      type: 'radial',
      color1: '#054080',
      color2: '#00aaff',
    } : null,
    shadowOptions: qrCode3DStyle ? {
      enable: true,
      blur: 5,
      color: '#000000',
      offsetX: 3,
      offsetY: 3,
    } : null,
  });

  useEffect(() => {
    const qrCodeElement = document.getElementById('qrCode');
    if (qrCodeElement) {
      qrCodeElement.innerHTML = '';
      qrCodeStyling.update({
        imageOptions: {
          
        },
      });
      qrCodeStyling.append(qrCodeElement);
    }
  }, [qrCodeColor, qrCodeShape, userId, qrCodeFrameColor, logoImage, qrCode3DStyle, qrCodeEyeFrameShape, qrCodeEyeBallShape]);

  return (
    <main className="content d-flex" style={{ width: '730px' }}>
      <div className="edit-tools container mt-4" style={{ flex: 1 }}>
        <div className="mt-2 d-flex align-items-center">
          <span className="me-3 fw-bold text-primary">TRY YOUR URL</span>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleOpenTemplate}
            style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {`/template/${userId}`}
          </button>
        </div>

        <PageUrlComponent initialPageUrl={userId} onPageUrlSave={handlePageUrlSave} userEmail={userInfo.email} />

        <div className="color-picker mt-3">
          <SketchPicker color={qrCodeColor} onChangeComplete={(color) => setQrCodeColor(color.hex)} />
        </div>

        <div className="shape-selector mt-3">
          <label htmlFor="qrShape" className="form-label">Select QR Code Shape:</label>
          <select
            id="qrShape"
            className="form-select"
            value={qrCodeShape}
            onChange={(e) => setQrCodeShape(e.target.value)}
          >
            <option value="square">Square</option>
            <option value="dots">Dots</option>
            <option value="rounded">Rounded</option>
            <option value="extra-rounded">Extra Rounded</option>
            <option value="classy">Classy</option>
            <option value="classy-rounded">Classy Rounded</option>
            <option value="star">Star</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>
        <div className="eye-frame-shape-selector mt-3">
          <label htmlFor="qrEyeFrameShape" className="form-label">Select QR Code Eye Frame Shape:</label>
          <select
            id="qrEyeFrameShape"
            className="form-select"
            value={qrCodeEyeFrameShape}
            onChange={(e) => setQrCodeEyeFrameShape(e.target.value)}
          >
            <option value="square">Square</option>
            <option value="circle">Circle</option>
            <option value="rounded">Rounded</option>
          </select>
        </div>
        <div className="eye-frame-color-picker mt-3">
          <label htmlFor="qrEyeFrameColor" className="form-label">Select QR Code Eye Frame Color:</label>
          <SketchPicker color={qrCodeFrameColor} onChangeComplete={(color) => setQrCodeFrameColor(color.hex)} />
        </div>
        <div className="eye-ball-shape-selector mt-3">
          <label htmlFor="qrEyeBallShape" className="form-label">Select QR Code Eye Ball Shape:</label>
          <select
            id="qrEyeBallShape"
            className="form-select"
            value={qrCodeEyeBallShape}
            onChange={(e) => setQrCodeEyeBallShape(e.target.value)}
          >
            <option value="square">Square</option>
            <option value="circle">Circle</option>
            <option value="rounded">Rounded</option>
          </select>
        </div>
        <div className="logo-upload mt-3">
          <label htmlFor="logoImage" className="form-label">Upload Logo:</label>
          <input
            id="logoImage"
            type="file"
            className="form-control"
            onChange={(e) => setLogoImage(URL.createObjectURL(e.target.files[0]))}
          />
        </div>
        <div className="3d-style-toggle mt-3">
          <label htmlFor="qr3DStyle" className="form-label">Enable 3D Style:</label>
          <input
            type="checkbox"
            id="qr3DStyle"
            className="form-check-input"
            checked={qrCode3DStyle}
            onChange={(e) => setQrCode3DStyle(e.target.checked)}
          />
        </div>

        <button className="btn btn-primary mt-3" onClick={downloadQrCode}>Download QR Code</button>
      </div>
      <div className="qr-code-container mt-4" id="qrCode" style={{ flex: 1, position: 'relative', top: '-200px', left: '72%', overflow: 'hidden'}}></div>
      {isLoading && (
        <div className="loading-spinner d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {children}
    </main>
  );
}

export default QrCodeSelection;
