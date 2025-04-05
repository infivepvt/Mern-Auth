import React, { useRef, useEffect, useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ContactDetails.css";
import CroppedImage from "./CroppedImage";
import { Modal } from "react-bootstrap";
import ExpandableSection from "../ExpandableSection/ExpandableSection";
import {
  FaTextHeight,
  FaToggleOn,
  FaToggleOff,
  FaUpload,
  FaWhatsapp,
} from "react-icons/fa";

const ContactDetails = ({ initialData, onChange }) => {
  const formRef = useRef(initialData || {});
  const [images, setImages] = useState({
    logo: initialData?.logo || "/logo.png",
    profileImage: initialData?.profileImage || "/profile.png",
    bannerImage: initialData?.bannerImage || "/banner.png",
    gallery: initialData?.gallery || [],
    videos: initialData?.videos || [],
  });

  const [logoSize, setLogoSize] = useState(initialData?.logoSize || 100);
  const [logoOpacity, setLogoOpacity] = useState(
    initialData?.logoOpacity || 100
  );
  const [bannerSize, setBannerSize] = useState(initialData?.bannerSize || 100);
  const [dynamicFontSize, setDynamicFontSize] = useState(
    initialData?.dynamicFontSize || 30
  );

  const [subdynamicFontSize, setsubDynamicFontSize] = useState(
    initialData?.dynamicFontSize || 20
  );
  const [bannerOpacity, setBannerOpacity] = useState(
    initialData?.bannerOpacity || 100
  );
  const [cropModal, setCropModal] = useState({
    show: false,
    imageSrc: "",
    type: "",
    aspect: 1,
  });

  const [isQuickSendVisible, setIsQuickSendVisible] = useState(true);
  const [isQuickSendVisiblebot, setIsQuickSendVisiblebot] = useState(true);
  const [isGalaryVisible, setIsGalaryVisible] = useState(true);
  const [isVideoVisible, setIsVideoVisible] = useState(true);

  const [fieldValues, setFieldValues] = useState({});

  const debouncedChange = useCallback(
    (newData) => {
      onChange({ ...formRef.current, ...newData });
    },
    [onChange]
  );

  useEffect(() => {
    onChange({ ...formRef.current, isQuickSendVisible });
  }, [isQuickSendVisible, onChange]);

  useEffect(() => {
    onChange({ ...formRef.current, isQuickSendVisiblebot });
  }, [isQuickSendVisiblebot, onChange]);

  useEffect(() => {
    onChange({ ...formRef.current, isGalaryVisible });
  }, [isGalaryVisible, onChange]);

  useEffect(() => {
    onChange({ ...formRef.current, isVideoVisible });
  }, [isVideoVisible, onChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedChange({
        ...images,
        logoSize,
        logoOpacity,
        bannerSize,
        bannerOpacity,
        dynamicFontSize,
        subdynamicFontSize,
      }); // Include opacity here
    }, 300);
    return () => clearTimeout(timer);
  }, [
    images,
    logoSize,
    logoOpacity,
    bannerSize,
    bannerOpacity,
    dynamicFontSize,
    subdynamicFontSize,
    debouncedChange,
  ]);

  useEffect(() => {
    formRef.current = initialData || {};
    setImages({
      logo: initialData?.logo || "/logo.png",
      profileImage: initialData?.profileImage || "/profile.png",
      bannerImage: initialData?.bannerImage || "/banner.png",
      gallery: initialData?.gallery || [],
      videos: initialData?.videos || [],
    });
    setLogoSize(initialData?.logoSize || 100);
    setLogoOpacity(initialData?.logoOpacity || 100);
    setBannerSize(initialData?.bannerSize || 100);
    setDynamicFontSize(initialData?.dynamicFontSize || 30);
    setsubDynamicFontSize(initialData?.subdynamicFontSize || 20);
    setBannerOpacity(initialData?.bannerOpacity || 100);
  }, [initialData]);

  const handleMediaUpload = (event, type) => {
    const files = Array.from(event.target.files);
    const updatedMedia = [...images[type]];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        updatedMedia.push(reader.result);
        setImages((prev) => ({ ...prev, [type]: updatedMedia }));
        onChange({ [type]: updatedMedia });
      };
      reader.readAsDataURL(file);
    });
  };

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
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const maxWidth = 800;
      const scaleSize = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * scaleSize;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
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
        setCropModal({ show: false, imageSrc: "", type: "", aspect: 1 });
        handleInputChange(cropModal.type, compressedImage);
      });
    };

    reader.readAsDataURL(blob);
  };

  const toggleVisibility = (key) => {
    const fieldElement = document.getElementById(`field-${key}`);
    const currentValue = formRef.current[key] || "";

    // Save current value before toggling visibility
    if (fieldElement.style.display === "none") {
      formRef.current[key] = fieldValues[key] || "";
    } else {
      setFieldValues((prevValues) => ({
        ...prevValues,
        [key]: currentValue,
      }));
    }

    fieldElement.style.display =
      fieldElement.style.display === "none" ? "block" : "none";
    if (fieldElement.style.display === "none") {
      handleInputChange(key, ""); // Clear the value when hidden
    } else {
      handleInputChange(key, fieldValues[key] || ""); // Restore the value when shown
    }
  };

  const handleDeleteMedia = (type, index) => {
    const updatedMedia = [...images[type]];
    updatedMedia.splice(index, 1); // Remove the item at the specified index
    setImages((prev) => ({ ...prev, [type]: updatedMedia }));
    onChange({ [type]: updatedMedia }); // Notify parent component of the change
  };

  return (
    <div className="contact-details-section container">
      <div className="contact-details-form">
        <div className="form-group mb-3">
          <label className="form-label">
            <strong>Upload Profile Image:</strong>
          </label>
          <input
            type="file"
            className="form-control border-dark"
            onChange={(e) => handleImageUpload(e, "profileImage")}
          />
          <button
            className="btn btn-secondary mt-2"
            onClick={() => handleEditImage("profileImage", 1)}
          >
            Edit
          </button>
        </div>

        <div className="form-group mb-3">
          <label className="form-label">
            <strong>Upload Logo:</strong>
          </label>
          <input
            type="file"
            className="form-control border-dark"
            onChange={(e) => handleImageUpload(e, "logo")}
          />
          <label className="mt-2">
            <strong>Resize Logo:</strong>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={logoSize}
            className="form-range"
            onChange={(e) => setLogoSize(parseInt(e.target.value, 0))}
          />
          <label className="mt-2">
            <strong>Logo Opacity:</strong>
          </label>
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
          <label className="form-label">
            <strong>Upload Banner Image:</strong>
          </label>
          <input
            type="file"
            className="form-control border-dark"
            onChange={(e) => handleImageUpload(e, "bannerImage")}
          />
          <button
            className="btn btn-secondary mt-2"
            onClick={() => handleEditImage("bannerImage", 3)}
          >
            Edit
          </button>
          <br />
          <label className="mt-2">
            <strong>Resize Banner:</strong>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={bannerSize}
            className="form-range"
            onChange={(e) => setBannerSize(parseInt(e.target.value, 0))}
          />
          <label className="mt-2">
            <strong>Banner Opacity:</strong>
          </label>
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
          <label className="form-label">
            <strong>Banner Color:</strong>
          </label>
          <input
            type="color"
            className="form-control border-dark"
            value={formRef.current.bannerColour || "#FFFFFF"}
            onChange={(e) => handleInputChange("bannerColour", e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">
            <strong>Background Color:</strong>
          </label>
          <input
            type="color"
            className="form-control border-dark"
            value={formRef.current.backgroundColour || "#2BB744"}
            onChange={(e) =>
              handleInputChange("backgroundColour", e.target.value)
            }
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">
            <strong>Name Text Color:</strong>
          </label>
          <input
            type="color"
            className="form-control border-dark"
            value={formRef.current.backgroundTextColour || "#000000"}
            onChange={(e) =>
              handleInputChange("backgroundTextColour", e.target.value)
            }
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">
            <strong>Job Role/Position Text Color:</strong>
          </label>
          <input
            type="color"
            className="form-control border-dark"
            value={formRef.current.subTitelTextColour || "#000000"}
            onChange={(e) =>
              handleInputChange("subTitelTextColour", e.target.value)
            }
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">
            <strong>Tab Background Color:</strong>
          </label>
          <input
            type="color"
            className="form-control border-dark"
            value={formRef.current.backgroundBarColor || "#333333"}
            onChange={(e) =>
              handleInputChange("backgroundBarColor", e.target.value)
            }
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">
            <strong>Tab Icon Color:</strong>
          </label>
          <input
            type="color"
            className="form-control border-dark"
            value={formRef.current.backgroundBarIconColor || "#FFFFFF"}
            onChange={(e) =>
              handleInputChange("backgroundBarIconColor", e.target.value)
            }
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">
            <strong>Tab Text Color:</strong>
          </label>
          <input
            type="color"
            className="form-control border-dark"
            value={formRef.current.backgroundBarTextIconColor || "#FFFFFF"}
            onChange={(e) =>
              handleInputChange("backgroundBarTextIconColor", e.target.value)
            }
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">
            <strong>Name Font Size:</strong>
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Font Size Chooser Icon */}
            <span style={{ marginRight: "10px" }}>
              <FaTextHeight />{" "}
              {/* Use a font size icon from react-icons or any other library */}
            </span>

            {/* Numeric Input for Font Size */}
            <input
              type="number"
              min="0"
              max="100"
              value={dynamicFontSize}
              className="form-control"
              onChange={(e) => setDynamicFontSize(parseInt(e.target.value, 10))}
              style={{ width: "100px" }} // Adjust width as needed
            />
          </div>
        </div>

        <div className="form-group mb-3">
          <label className="form-label">
            <strong>Job Role/Position Font Size:</strong>
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Font Size Chooser Icon */}
            <span style={{ marginRight: "10px" }}>
              <FaTextHeight />{" "}
              {/* Use a font size icon from react-icons or any other library */}
            </span>

            {/* Numeric Input for Font Size */}
            <input
              type="number"
              min="0"
              max="100"
              value={subdynamicFontSize}
              className="form-control"
              onChange={(e) =>
                setsubDynamicFontSize(parseInt(e.target.value, 10))
              }
              style={{ width: "100px" }} // Adjust width as needed
            />
          </div>
        </div>

        {/*Galary Image */}
        <div className="form-group mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="field-label">
              <strong>Gallery Images:</strong>
            </label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={isGalaryVisible} // Bind the state to the checkbox
                onChange={() => setIsGalaryVisible(!isGalaryVisible)} // Toggle the state on change
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <input
              type="file"
              className="form-control border-dark"
              multiple
              onChange={(e) => handleMediaUpload(e, "gallery")}
            />
            <ul className="list-unstyled d-flex flex-wrap gap-2 mt-2">
              {images.gallery.map((image, index) => (
                <li key={index} className="position-relative">
                  <img
                    src={image}
                    alt={`Gallery ${index}`}
                    width="100"
                    className="rounded"
                  />
                  <button
                    onClick={() => handleDeleteMedia("gallery", index)}
                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle"
                    style={{
                      width: "24px",
                      height: "24px",
                      padding: "0",
                      fontSize: "12px",
                    }}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Galary Video */}
        <div className="form-group mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="field-label">
              <strong>Gallery Videos:</strong>
            </label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={isVideoVisible} // Bind the state to the checkbox
                onChange={() => setIsVideoVisible(!isVideoVisible)} // Toggle the state on change
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <input
              type="file"
              className="form-control border-dark"
              accept="video/*"
              multiple
              onChange={(e) => handleMediaUpload(e, "videos")}
            />
            <ul className="list-unstyled d-flex flex-wrap gap-2 mt-2">
              {images.videos.map((video, index) => (
                <li key={index} className="position-relative">
                  <video controls width="150" className="rounded">
                    <source src={video} type="video/mp4" />
                  </video>
                  <button
                    onClick={() => handleDeleteMedia("videos", index)}
                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle"
                    style={{
                      width: "24px",
                      height: "24px",
                      padding: "0",
                      fontSize: "12px",
                    }}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Send Documents */}
        <div className="form-group mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="field-label">
              <strong>Quick Send Documents</strong>
            </label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={isQuickSendVisible} // Bind the state to the checkbox
                onChange={() => setIsQuickSendVisible(!isQuickSendVisible)} // Toggle the state on change
              />
            </div>
          </div>
          <div
            id="quick-send-section"
            style={{ display: isQuickSendVisible ? "block" : "none" }}
          >
            <label
              htmlFor="fileInput"
              className="btn btn-primary d-flex align-items-center mb-3"
            >
              <FaUpload size={30} className="me-2" />
              <h8>Quick Send Documents</h8>
            </label>
          </div>
        </div>

        

        {[
          {
            label: "Name",
            key: "name",
          },
          { label: "Job Role/Position", key: "title" },
          { label: "Company Name", key: "companyName" },
          { label: "Mobile Number", key: "phoneWork" },
          { label: "Office Number", key: "phoneMobile" },
          { label: "Fax", key: "fax" },
          { label: "Email", key: "email" },
          { label: "Website", key: "website" },
          { label: "Address", key: "address" },
          { label: "About", key: "about" },
        ].map((field) => (
          <div className="form-group mb-3" key={field.key}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="field-label">
                <strong>{field.label}</strong>
              </label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked={true}
                  onChange={() => toggleVisibility(field.key)}
                />
              </div>
            </div>
            <div id={`field-${field.key}`} style={{ display: "block" }}>
              <input
                type="text"
                className="form-control border-dark"
                placeholder={field.label}
                value={formRef.current[field.key] || ""}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
              />
            </div>
          </div>
        ))}

        <ExpandableSection title="Aditinal Information ">
          <br />
          {[
            { label: "Mobile2 Number", key: "Mobile2" },
            { label: "Mobile3 Number", key: "Mobile3" },
            { label: "Email2", key: "email2" },
            { label: "Email3", key: "email3" },
            { label: "Website2", key: "website2" },
            { label: "Website3", key: "website3" },
            { label: "Address2", key: "address2" },
            { label: "Youtube URL", key: "youtube" },
          ].map((field) => (
            <div className="form-group mb-3" key={field.key}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="field-label">
                  <strong>{field.label}</strong>
                </label>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={true}
                    onChange={() => toggleVisibility(field.key)}
                  />
                </div>
              </div>
              <div id={`field-${field.key}`} style={{ display: "bloack" }}>
                <input
                  type="text"
                  className="form-control border-dark"
                  placeholder={field.label}
                  value={formRef.current[field.key] || ""}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                />
              </div>
            </div>
          ))}
        </ExpandableSection>

        <ExpandableSection title="Quick Chat">
        <div className="form-group mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="field-label">
              <strong>Quick Chat</strong>
            </label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={isQuickSendVisiblebot} // Bind the state to the checkbox
                onChange={() => setIsQuickSendVisiblebot(!isQuickSendVisiblebot)} // Toggle the state on change
              />
            </div>
          </div>
          <div
            id="quick-send-section"
            style={{ display: isQuickSendVisiblebot ? "block" : "none" }}
          >
            <label
              htmlFor="fileInput"
              className="btn btn-primary d-flex align-items-center mb-3"
            >
              <FaWhatsapp size={30} className="me-2" />
              <h8>Quick Chat</h8>
            </label>
          </div>
        </div>
        </ExpandableSection>

        {cropModal.show && (
          <CroppedImage
            imageSrc={cropModal.imageSrc}
            aspect={cropModal.aspect}
            onCropComplete={(croppedBlob) => handleCropSave(croppedBlob)}
            onClose={() =>
              setCropModal({ show: false, imageSrc: "", type: "", aspect: 1 })
            }
            onSave={handleCropSave}
          />
        )}
      </div>
    </div>
  );
};

export default ContactDetails;
