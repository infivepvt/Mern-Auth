import React, { useRef, useEffect, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactDetails.css';
import CroppedImage from './CroppedImage';
import { Modal } from 'react-bootstrap';

const ContactDetails = ({ initialData, onChange }) => {
  const formRef = useRef(initialData || {});
  const [images, setImages] = useState({
    logo: initialData?.logo || '/logo.png',
    profileImage: initialData?.profileImage || '/profile.png',
    bannerImage: initialData?.bannerImage || '/banner.png',
  });
  const [logoSize, setLogoSize] = useState(initialData?.logoSize || 100);
  const [logoOpacity, setLogoOpacity] = useState(initialData?.logoOpacity || 100);
  const [profileSize, setProfileSize] = useState(initialData?.profileSize || 100);
  const [profileOpacity, setProfileOpacity] = useState(initialData?.profileOpacity || 100);
  const [bannerSize, setBannerSize] = useState(initialData?.bannerSize || 100);
  const [bannerOpacity, setBannerOpacity] = useState(initialData?.bannerOpacity || 100);
  const [cropModal, setCropModal] = useState({
    show: false,
    imageSrc: '',
    type: '',
    aspect: 1,
  });

  const [fieldValues, setFieldValues] = useState({});

  const debouncedChange = useCallback(
    (newData) => {
      onChange({ ...formRef.current, ...newData });
    },
    [onChange]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedChange({ ...images, logoSize, logoOpacity, profileSize, profileOpacity, bannerSize, bannerOpacity}); // Include opacity here
    }, 300);
    return () => clearTimeout(timer);
  }, [images, logoSize, logoOpacity, profileSize, profileOpacity, bannerSize, bannerOpacity, debouncedChange]);

  useEffect(() => {
    formRef.current = initialData || {};
    setImages({
      logo: initialData?.logo || '/logo.png',
      profileImage: initialData?.profileImage || '/profile.png',
      bannerImage: initialData?.bannerImage || '/banner.png',
    });
    setLogoSize(initialData?.logoSize || 100);
    setLogoOpacity(initialData?.logoOpacity || 100);
    setProfileSize(initialData?.profileSize || 100);
    setProfileOpacity(initialData?.profileOpacity || 100);
    setBannerSize(initialData?.bannerSize || 100);
    setBannerOpacity(initialData?.bannerOpacity || 100);
  }, [initialData]);

  const handleInputChange = useCallback(
    (key, value) => {
      formRef.current[key] = value;
      onChange({ [key]: value });
    },
    [onChange]
  );

  const handleImageUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => ({ ...prev, [type]: reader.result }));
        handleInputChange(type, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = (dataUrl, callback) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const maxWidth = 800;
      const scaleSize = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * scaleSize;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
      callback(compressedDataUrl);
    };
  };

  const handleEditImage = (type, aspect) => {
    setCropModal({
      show: true,
      imageSrc: images[type],
      type,
      aspect,
    });
  };

  const handleCropSave = async (croppedImageUrl) => {
    if (!croppedImageUrl) return;

    const response = await fetch(croppedImageUrl);
    const blob = await response.blob();
    const reader = new FileReader();

    reader.onloadend = () => {
      compressImage(reader.result, (compressedImage) => {
        setImages((prev) => ({ ...prev, [cropModal.type]: compressedImage }));
        setCropModal({ show: false, imageSrc: '', type: '', aspect: 1 });
        handleInputChange(cropModal.type, compressedImage);
      });
    };

    reader.readAsDataURL(blob);
  };

  const toggleVisibility = (key) => {
    const fieldElement = document.getElementById(`field-${key}`);
    const currentValue = formRef.current[key] || '';

    // Save current value before toggling visibility
    if (fieldElement.style.display === 'none') {
      formRef.current[key] = fieldValues[key] || '';
    } else {
      setFieldValues((prevValues) => ({
        ...prevValues,
        [key]: currentValue,
      }));
    }

    fieldElement.style.display = fieldElement.style.display === 'none' ? 'block' : 'none';
    if (fieldElement.style.display === 'none') {
      handleInputChange(key, ''); // Clear the value when hidden
    } else {
      handleInputChange(key, fieldValues[key] || ''); // Restore the value when shown
    }
  };
  

  return (
    <div className="contact-details-section container">
      <div className="contact-details-form">
        <div className="form-group mb-3">
          <label className="form-label"><strong>Upload Profile Image:</strong></label>
          <input
            type="file"
            className="form-control border-dark"
            onChange={(e) => handleImageUpload(e, 'profileImage')}
          />
          <button
            className="btn btn-secondary mt-2"
            onClick={() => handleEditImage('profileImage', 1)}
          >
            Edit
          </button>
          <br />
          <label className="mt-2"><strong>Resize Profile:</strong></label>
          <input
            type="range"
            min="0"
            max="100"
            value={profileSize}
            className="form-range"
            onChange={(e) => setProfileSize(parseInt(e.target.value, 0))}
          />
          <label className="mt-2"><strong>Profile Opacity:</strong></label>
          <input
            type="range"
            min="0"
            max="100"
            value={profileOpacity}
            className="form-range"
            onChange={(e) => setProfileOpacity(parseInt(e.target.value, 10))}
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label"><strong>Upload Logo:</strong></label>
          <input
            type="file"
            className="form-control border-dark"
            onChange={(e) => handleImageUpload(e, 'logo')}
          />
          <label className="mt-2"><strong>Resize Logo:</strong></label>
          <input
            type="range"
            min="0"
            max="100"
            value={logoSize}
            className="form-range"
            onChange={(e) => setLogoSize(parseInt(e.target.value, 0))}
          />
          <label className="mt-2"><strong>Logo Opacity:</strong></label>
          <input
            type="range"
            min="0"
            max="100"
            value={logoOpacity}
            className="form-range"
            onChange={(e) => setLogoOpacity(parseInt(e.target.value, 10))}
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label"><strong>Upload Banner Image:</strong></label>
          <input
            type="file"
            className="form-control border-dark"
            onChange={(e) => handleImageUpload(e, 'bannerImage')}
          />
          <button
            className="btn btn-secondary mt-2"
            onClick={() => handleEditImage('bannerImage', 3)}
          >
            Edit
          </button>
          <br />
          <label className="mt-2"><strong>Resize Banner:</strong></label>
          <input
            type="range"
            min="0"
            max="100"
            value={bannerSize}
            className="form-range"
            onChange={(e) => setBannerSize(parseInt(e.target.value, 0))}
          />
          <label className="mt-2"><strong>Banner Opacity:</strong></label>
          <input
            type="range"
            min="0"
            max="100"
            value={bannerOpacity}
            className="form-range"
            onChange={(e) => setBannerOpacity(parseInt(e.target.value, 10))}
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label"><strong>Banner Color:</strong></label>
          <input
            type="color"
            className="form-control border-dark"
            value={formRef.current.bannerColour || '#ff1a1a'}
            onChange={(e) => handleInputChange('bannerColour', e.target.value)}
          />
        </div>

        {[{
          label: 'Name', key: 'name' },
          { label: 'Job Role/Position', key: 'title' },
          { label: 'Company Name', key: 'companyName' },
          { label: 'Mobile Number', key: 'phoneWork' },
          { label: 'Office Number', key: 'phoneMobile' },
          { label: 'Fax', key: 'fax' },
          { label: 'Email', key: 'email' },
          { label: 'Website', key: 'website' },
          { label: 'Address', key: 'address' },
          { label: 'About', key: 'about' },
        ].map((field) => (
          <div className="form-group mb-3" key={field.key}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="field-label"><strong>{field.label}</strong></label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked={true}
                  onChange={() => toggleVisibility(field.key)}
                />
              </div>
            </div>
            <div id={`field-${field.key}`} style={{ display: 'block' }}>
              <input
                type="text"
                className="form-control border-dark"
                placeholder={field.label}
                value={formRef.current[field.key] || ''}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
              />
            </div>
          </div>
        ))}

      {[
          { label: 'Mobile2 Number', key: 'Mobile2' },
          { label: 'Mobile3 Number', key: 'Mobile3' },
          { label: 'Email2', key: 'email2' },
          { label: 'Email3', key: 'email3' },
          { label: 'Website2', key: 'website2' },
          { label: 'Website3', key: 'website3' },
          { label: 'Address2', key: 'address2' },
        ].map((field) => (
          <div className="form-group mb-3" key={field.key}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="field-label"><strong>{field.label}</strong></label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked={false}
                  onChange={() => toggleVisibility(field.key)}
                />
              </div>
            </div>
            <div id={`field-${field.key}`} style={{ display: 'none' }}>
              <input
                type="text"
                className="form-control border-dark"
                placeholder={field.label}
                value={formRef.current[field.key] || ''}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
              />
            </div>
          </div>
        ))}

        {cropModal.show && (
          <CroppedImage
            imageSrc={cropModal.imageSrc}
            aspect={cropModal.aspect}
            onCropComplete={(croppedBlob) => handleCropSave(croppedBlob)}
            onClose={() => setCropModal({ show: false, imageSrc: '', type: '', aspect: 1 })}
            onSave={handleCropSave}
          />
        )}
      </div>
    </div>
  );
};

export default ContactDetails;
