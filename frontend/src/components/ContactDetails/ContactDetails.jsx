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
  const [cropModal, setCropModal] = useState({
    show: false,
    imageSrc: '',
    type: '',
    aspect: 1,
  });

  const debouncedChange = useCallback(
    (newData) => {
      onChange({ ...formRef.current, ...newData });
    },
    [onChange]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedChange({ ...images, logoSize });
    }, 300);
    return () => clearTimeout(timer);
  }, [images, logoSize, debouncedChange]);

  useEffect(() => {
    formRef.current = initialData || {};
    setImages({
      logo: initialData?.logo || '/logo.png',
      profileImage: initialData?.profileImage || '/profile.png',
      bannerImage: initialData?.bannerImage || '/banner.png',
    });
    setLogoSize(initialData?.logoSize || 100);
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
    fieldElement.style.display = fieldElement.style.display === 'none' ? 'block' : 'none';
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
            min="50"
            max="150"
            value={logoSize}
            className="form-range"
            onChange={(e) => setLogoSize(parseInt(e.target.value, 10))}
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
