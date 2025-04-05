import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Template33.css";
import {
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaSave,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
  FaUpload,
  FaFax,
  FaMobile,
} from "react-icons/fa";
import { SocialIcon } from "react-social-icons";
import { Modal } from "react-bootstrap";

const Template33 = ({
  contactDetails,
  selectedSocialMedia,
  socialLinks,
  selectedTemplate,
  whatsAppDetails,
  socialMediaUrl,
  isCallToActionVisible,
  isQuickSendVisible,
  isGalaryVisible,
  isVideoVisible,
}) => {
  const [currentContactDetails, setCurrentContactDetails] =
    useState(contactDetails);
  const [currentSocialMedia, setCurrentSocialMedia] =
    useState(selectedSocialMedia);
  const [currentSocialLinks, setCurrentSocialLinks] = useState(socialLinks);
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image
  const [currentIndex, setCurrentIndex] = useState(0); // State for current image index
  const [selectedVideo, setSelectedVideo] = useState(null); // State for selected video
  const [videoIndex, setVideoIndex] = useState(0); // State for current video index
  const [senderEmail, setSenderEmail] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    setCurrentContactDetails(contactDetails);
    // Autofill senderEmail with the email from contactDetails
    setSenderEmail(contactDetails.email || "");
  }, [contactDetails]);

  useEffect(() => {
    setCurrentContactDetails(contactDetails);
  }, [contactDetails]);

  useEffect(() => {
    setCurrentSocialMedia(selectedSocialMedia);
  }, [selectedSocialMedia]);

  useEffect(() => {
    setCurrentSocialLinks(socialLinks);
  }, [socialLinks]);

  const {
    name = "Saliya Pathum",
    title = "Infive",
    phoneWork = "0761231212",
    phoneMobile = "",
    Mobile2 = "",
    Mobile3 = "",
    fax = "",
    email = "youremail@yourwebsite.com",
    email2 = "",
    email3 = "",
    website = "www.yourwebsiteaddress.com",
    website2 = "",
    website3 = "",
    address = "919 Oaktree Crescent, Newmarket",
    address2 = "",
    about = "",
    logo = "/logo.png",
    logoSize = 100,
    logoOpacity = 100,
    bannerSize = 100,
    dynamicFontSize = 30,
    subdynamicFontSize = 20,
    bannerOpacity = 100,
    bannerImage = "/banner.png",
    profileImage = "/profile.png",
    countryCode = whatsAppDetails?.countryCode || "",
    phoneNumber = whatsAppDetails?.phoneNumber || "",
    videos = [],
    gallery = [],
    youtube = "", // New state for YouTube URL
    backgroundColour = "#FFFFFF",
    backgroundTextColour = "#000000",
    backgroundBarColor = "#333333",
    backgroundBarIconColor = "#FFFFFF",
    backgroundBarTextIconColor = "#FFFFFF",
    subTitelTextColour = "#000000",
  } = currentContactDetails;

  const socialMediaIcons = {
    WhatsApp: FaWhatsapp,
    Facebook: FaFacebook,
    Instagram: FaInstagram,
    Twitter: FaTwitter,
    LinkedIn: FaLinkedin,
  };

  const SocialMediaIcon = currentSocialMedia
    ? socialMediaIcons[currentSocialMedia.name]
    : null;

  const socialMediaColors = {
    Facebook: "#3b5998",
    Instagram: "#E1306C",
    Twitter: "#1DA1F2",
    LinkedIn: "#0077b5",
    Snapchat: "#FFFC00",
    Pinterest: "#E60023",
    TikTok: "#000000",
    Youtube: "#FF0000",
    Whatsapp: "#25D366",
  };

  // Handle image click to open modal
  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedImage(null);
    setCurrentIndex(0);
    setSelectedVideo(null);
    setVideoIndex(0);
  };

  // Handle next image
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % gallery.length;
    setSelectedImage(gallery[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  // Handle previous image
  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    setSelectedImage(gallery[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  // Handle video click to open modal
  const handleVideoClick = (video, index) => {
    setSelectedVideo(video);
    setVideoIndex(index);
  };

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  // Handle file selection
  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });
    formData.append("to", senderEmail);
    formData.append("subject", "Your Uploaded Documents");
    formData.append("text", "Attached are the documents you uploaded.");

    try {
      setUploadStatus("uploading");
      const response = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("success");
        setSelectedFiles([]);
      } else {
        setUploadStatus("error");
      }
    } catch (error) {
      setUploadStatus("error");
    }
  };

  // Handle form submission
  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!senderEmail || selectedFiles.length === 0) {
      alert("Please provide an email and select files.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("to", senderEmail); // Send to the user-provided email
    formData.append("subject", "Your Uploaded Documents");
    formData.append("text", "Attached are the documents you uploaded.");

    try {
      setUploadStatus("uploading");
      const response = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("success");
        setSelectedFiles([]);
      } else {
        setUploadStatus("error");
      }
    } catch (error) {
      setUploadStatus("error");
    }
  };

  const backgroundColor =
    socialMediaColors[currentSocialMedia?.name] || "#2BB744";

  const generateWhatsAppLink = (countryCode, phoneNumber) => {
    return `https://wa.me/${countryCode.replace("+", "")}${phoneNumber}`;
  };

  const socialMediaLink =
    currentSocialMedia?.name === "WhatsApp"
      ? generateWhatsAppLink(countryCode, phoneNumber)
      : socialMediaUrl;

  const handleSaveToContacts = () => {
    let vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTITLE:${title}\nTEL;TYPE=WORK,VOICE:${phoneWork}\n`;

    if (phoneMobile) vCardData += `TEL;TYPE=CELL:${phoneMobile}\n`;
    if (Mobile2) vCardData += `TEL;TYPE=CELL:${Mobile2}\n`;
    if (Mobile3) vCardData += `TEL;TYPE=CELL:${Mobile3}\n`;
    if (fax) vCardData += `TEL;TYPE=FAX:${fax}\n`;

    vCardData += `EMAIL:${email}\n`;
    if (email2) vCardData += `EMAIL:${email2}\n`;
    if (email3) vCardData += `EMAIL:${email3}\n`;

    vCardData += `URL:${website}\n`;
    if (website2) vCardData += `URL:${website2}\n`;
    if (website3) vCardData += `URL:${website3}\n`;

    vCardData += `ADR;TYPE=WORK:;;${address}\n`;
    if (address2) vCardData += `ADR;TYPE=HOME:;;${address2}\n`;

    if (about) vCardData += `NOTE:${about}\n`;

    if (profileImage) vCardData += `PHOTO;VALUE=URL:${profileImage}\n`;
    if (logo) vCardData += `LOGO;VALUE=URL:${logo}\n`;

    // Add social media links to vCard if available
    currentSocialLinks.forEach((link) => {
      vCardData += `X-SOCIALPROFILE;TYPE=${link.platform.name}:${link.url}\n`;
    });

    vCardData += `END:VCARD`;

    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={` d-flex justify-content-center mt-5 template-${selectedTemplate}`}
    >
      <div
        className="card custom-card33 shadow-lg"
        style={{
          backgroundColor: backgroundColour, // Background color----##################################################################################################
        }}
      >
        <div
          className="card-header custom-header text-center"
          style={{
            backgroundImage: `url(${bannerImage})`,

            height: "200px",
            opacity: bannerOpacity / 100,
          }}
        >
         
          <div className="profile-picture">
            <img src={profileImage} alt={name} className="rounded-circle" />
          </div>
        </div>
        <br />
        <br />
        <div
          className="card-body text-center "
          style={{
            backgroundColor: backgroundColour, // Background color----##################################################################################################
            color: backgroundTextColour, //  Background Text color----##################################################################################################
          }}
        >
          <h2
            className="card-title"
            style={{ fontSize: `${dynamicFontSize}px` }} // Use a variable for font size
          >
            {name}
          </h2>
          <p
            style={{
              color: subTitelTextColour,
              fontSize: `${subdynamicFontSize}px`,
            }}
          >
            {title}
          </p>

          {SocialMediaIcon && (
            <a href={socialMediaLink} target="_blank" rel="noopener noreferrer">
              <button
                className="btn w-100 mb-3 custom-phone1"
                style={{
                  backgroundColor: backgroundColor,
                  color: "white",
                  height: "60px",
                  border: "2px solid orange", // Border color
                  borderRadius: "30px", // Rounded corners
                }}
              >
                <SocialMediaIcon className="me-2" size={40} />
                CONNECT WITH {currentSocialMedia?.name?.toUpperCase()}
              </button>
            </a>
          )}

          <div className="list-group mb-3">
            {phoneWork && (
              <button
                type="button"
                className="list-group-item d-flex align-items-center justify-content-between"
                onClick={() => window.open(`tel:${phoneWork}`, "_self")}
                style={{
                  backgroundColor: backgroundBarColor, // Bar Background color----##################################################################################################
                }}
              >
                <FaPhone
                  className="contact-icon me-2"
                  style={{
                    transform: "rotate(90deg)",
                    minWidth: "20px",
                    fontSize: "1.5rem",
                    color: backgroundBarIconColor, // Bar icon Text color----##################################################################################################
                  }}
                />
                <span
                  className="text-center flex-grow-1 text-truncate custom-phone"
                  style={{
                    color: backgroundBarTextIconColor, // Bar Text color----##################################################################################################
                  }}
                >
                  {phoneWork}
                </span>
              </button>
            )}

            {phoneMobile && (
              <button
                type="button"
                className="list-group-item d-flex align-items-center justify-content-between"
                onClick={() => window.open(`tel:${phoneMobile}`, "_self")}
                style={{
                  backgroundColor: backgroundBarColor, // Bar Background color----##################################################################################################
                }}
              >
                <FaFax
                  className="contact-icon me-2"
                  style={{
                    transform: "rotate(90deg)",
                    minWidth: "20px",
                    fontSize: "1.5rem",
                    color: backgroundBarIconColor, // Bar icon Text color----##################################################################################################
                  }}
                />
                <span
                  className="text-center flex-grow-1 text-truncate custom-phone"
                  style={{
                    color: backgroundBarTextIconColor, // Bar Text color----##################################################################################################
                  }}
                >
                  {phoneMobile}
                </span>
              </button>
            )}

            {Mobile2 && (
              <button
                type="button"
                className="list-group-item d-flex align-items-center justify-content-between"
                onClick={() => window.open(`tel:${Mobile2}`, "_self")}
                style={{
                  backgroundColor: backgroundBarColor, // Bar Background color----##################################################################################################
                }}
              >
                <FaMobile
                  className="contact-icon me-2"
                  style={{
                    transform: "rotate(0deg)",
                    minWidth: "20px",
                    fontSize: "1.5rem",
                    color: backgroundBarIconColor, // Bar icon Text color----##################################################################################################
                  }}
                />
                <span
                  className="text-center flex-grow-1 text-truncate custom-phone"
                  style={{
                    color: backgroundBarTextIconColor, // Bar Text color----##################################################################################################
                  }}
                >
                  {Mobile2}
                </span>
              </button>
            )}

            {Mobile3 && (
              <button
                type="button"
                className="list-group-item d-flex align-items-center justify-content-between"
                onClick={() => window.open(`tel:${Mobile3}`, "_self")}
                style={{
                  backgroundColor: backgroundBarColor, // Bar Background color----##################################################################################################
                }}
              >
                <FaMobile
                  className="contact-icon me-2"
                  style={{
                    transform: "rotate(0deg)",
                    minWidth: "20px",
                    fontSize: "1.5rem",
                    color: backgroundBarIconColor, // Bar icon Text color----##################################################################################################
                  }}
                />
                <span
                  className="text-center flex-grow-1 text-truncate custom-phone"
                  style={{
                    color: backgroundBarTextIconColor, // Bar Text color----##################################################################################################
                  }}
                >
                  {Mobile3}
                </span>
              </button>
            )}

            {email && (
              <button
                type="button"
                className="list-group-item d-flex align-items-center justify-content-between"
                onClick={() => window.open(`mailto:${email}`, "_self")}
                style={{
                  backgroundColor: backgroundBarColor, // Bar Background color----##################################################################################################
                }}
              >
                <FaEnvelope
                  className="contact-icon me-2"
                  style={{
                    minWidth: "20px",
                    fontSize: "1.5rem",
                    color: backgroundBarIconColor,
                  }}
                />
                <span
                  className="text-center flex-grow-1 text-truncate custom-phone"
                  style={{
                    color: backgroundBarTextIconColor, // Bar Text color----##################################################################################################
                  }}
                >
                  {email}
                </span>
              </button>
            )}

            {email2 && (
              <button
                type="button"
                className="list-group-item d-flex align-items-center justify-content-between"
                onClick={() => window.open(`mailto:${email2}`, "_self")}
                style={{
                  backgroundColor: backgroundBarColor, // Bar Background color----##################################################################################################
                }}
              >
                <FaEnvelope
                  className="contact-icon me-2"
                  style={{
                    minWidth: "20px",
                    fontSize: "1.5rem",
                    color: backgroundBarIconColor,
                  }}
                />
                <span
                  className="text-center flex-grow-1 text-truncate custom-phone"
                  style={{
                    color: backgroundBarTextIconColor, // Bar Text color----##################################################################################################
                  }}
                >
                  {email2}
                </span>
              </button>
            )}

            {email3 && (
              <button
                type="button"
                className="list-group-item d-flex align-items-center justify-content-between"
                onClick={() => window.open(`mailto:${email3}`, "_self")}
                style={{
                  backgroundColor: backgroundBarColor, // Bar Background color----##################################################################################################
                }}
              >
                <FaEnvelope
                  className="contact-icon me-2"
                  style={{
                    minWidth: "20px",
                    fontSize: "1.5rem",
                    color: backgroundBarIconColor,
                  }}
                />
                <span
                  className="text-center flex-grow-1 text-truncate custom-phone"
                  style={{
                    color: backgroundBarTextIconColor, // Bar Text color----##################################################################################################
                  }}
                >
                  {email3}
                </span>
              </button>
            )}

            {website && (
              <button
                type="button"
                className="list-group-item d-flex align-items-center justify-content-between"
                onClick={() => window.open(`https://${website}`, "_blank")}
                style={{
                  backgroundColor: backgroundBarColor, // Bar Background color----##################################################################################################
                }}
              >
                <FaGlobe
                  className="contact-icon me-2"
                  style={{
                    minWidth: "20px",
                    fontSize: "1.5rem",
                    color: backgroundBarIconColor,
                  }}
                />
                <span
                  className="text-center flex-grow-1 text-truncate custom-phone"
                  style={{
                    color: backgroundBarTextIconColor, // Bar Text color----##################################################################################################
                  }}
                >
                  {website}
                </span>
              </button>
            )}

            {website2 && (
              <button
                type="button"
                className="list-group-item d-flex align-items-center justify-content-between"
                onClick={() => window.open(`https://${website2}`, "_blank")}
                style={{
                  backgroundColor: backgroundBarColor, // Bar Background color----##################################################################################################
                }}
              >
                <FaGlobe
                  className="contact-icon me-2"
                  style={{
                    minWidth: "20px",
                    fontSize: "1.5rem",
                    color: backgroundBarIconColor,
                  }}
                />
                <span
                  className="text-center flex-grow-1 text-truncate custom-phone"
                  style={{
                    color: backgroundBarTextIconColor, // Bar Text color----##################################################################################################
                  }}
                >
                  {website2}
                </span>
              </button>
            )}

            {website3 && (
              <button
                type="button"
                className="list-group-item d-flex align-items-center justify-content-between"
                onClick={() => window.open(`https://${website3}`, "_blank")}
                style={{
                  backgroundColor: backgroundBarColor, // Bar Background color----##################################################################################################
                }}
              >
                <FaGlobe
                  className="contact-icon me-2"
                  style={{
                    minWidth: "20px",
                    fontSize: "1.5rem",
                    color: backgroundBarIconColor,
                  }}
                />
                <span
                  className="text-center flex-grow-1 text-truncate custom-phone"
                  style={{
                    color: backgroundBarTextIconColor, // Bar Text color----##################################################################################################
                  }}
                >
                  {website3}
                </span>
              </button>
            )}

            {address && (
              <button
                type="button"
                className="list-group-item d-flex align-items-center justify-content-between"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      address
                    )}`,
                    "_blank"
                  )
                }
                style={{
                  backgroundColor: backgroundBarColor, // Bar Background color----##################################################################################################
                }}
              >
                <FaMapMarkerAlt
                  className="contact-icon me-2"
                  style={{
                    minWidth: "20px",
                    fontSize: "1.5rem",
                    color: backgroundBarIconColor,
                  }}
                />
                <span
                  className="text-center flex-grow-1 text-truncate custom-phone"
                  style={{
                    color: backgroundBarTextIconColor, // Bar Text color----##################################################################################################
                  }}
                >
                  {address}
                </span>
              </button>
            )}

            {address2 && (
              <button
                type="button"
                className="list-group-item d-flex align-items-center justify-content-between"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      address2
                    )}`,
                    "_blank"
                  )
                }
                style={{
                  backgroundColor: backgroundBarColor, // Bar Background color----##################################################################################################
                }}
              >
                <FaMapMarkerAlt
                  className="contact-icon me-2"
                  style={{
                    minWidth: "20px",
                    fontSize: "1.5rem",
                    color: backgroundBarIconColor,
                  }}
                />
                <span
                  className="text-center flex-grow-1 text-truncate custom-phone"
                  style={{
                    color: backgroundBarTextIconColor, // Bar Text color----##################################################################################################
                  }}
                >
                  {address2}
                </span>
              </button>
            )}
          </div>

          {/* YouTube Video Section */}
          {youtube && (
            <div className="youtube-section mt-3">
              <div className="youtube-video-container">
                <iframe
                  title="YouTube Video"
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    youtube
                  )}?autoplay=1&mute=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Gallery Section */}
          {isGalaryVisible && (
            <div className="gallery-section mt-3">
              <div className="gallery-preview d-flex flex-wrap justify-content-center">
                {gallery.map((image, index) => (
                  <div
                    key={index}
                    className="gallery-item"
                    onClick={() => handleImageClick(image, index)}
                  >
                    <img
                      src={image}
                      alt={`Gallery ${index}`}
                      className="gallery-image"
                    />
                    <div className="gallery-overlay"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video Section */}
          {isVideoVisible && (
            <div className="video-section mt-3">
              <div className="video-preview d-flex flex-wrap justify-content-center">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    className="video-item relative"
                    onClick={() => handleVideoClick(video)} // Open modal on click
                    style={{
                      position: "relative",
                      cursor: "pointer",
                      overflow: "hidden",
                      margin: "10px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    {/* Autoplay Video Thumbnail */}
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{
                        width: "300px",
                        height: "190px",
                        objectFit: "cover",
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Play Icon Overlay */}
                    <div
                      className="video-overlay"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <FaPlay style={{ color: "white", fontSize: "3rem" }} />
                    </div>

                    {/* Hover Effects */}
                    <style jsx>{`
                      .video-item:hover .video-overlay {
                        opacity: 1;
                      }
                      .video-item:hover {
                        transform: scale(1.05);
                      }
                    `}</style>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="container mt-5">
            {/* Combined File Upload & Send Section */}
            <div className="py-3 d-flex justify-content-center align-items-center">
              {/* Hidden email input */}
              <div style={{ display: "none" }}>
                <input type="email" value={senderEmail} readOnly />
              </div>

              <input
                type="file"
                id="fileInput"
                className="d-none"
                multiple
                onChange={handleFileChange}
              />

              {/* Status Messages */}
              <div className="ms-3">
                {uploadStatus === "uploading" && (
                  <div className="text-info">
                    Please wait Sending your documents...
                  </div>
                )}
                {uploadStatus === "success" && (
                  <div className="text-success">Thank youSent!</div>
                )}
                {uploadStatus === "error" && (
                  <div className="text-danger">Error</div>
                )}
              </div>
            </div>
          </div>

          {isQuickSendVisible && (
            <div className="upload-container">
              <label htmlFor="fileInput" className="modern-upload-btn">
                <div className="btn-content">
                  <FaUpload className="upload-icon" />
                  <div className="text-container">
                    <span className="main-text">Quick Send Documents</span>
                    <span className="sub-text">Click or drag files here</span>
                  </div>
                </div>
                <div className="hover-effect"></div>
              </label>
              <input id="fileInput" type="file" className="hidden-input" />
            </div>
          )}
          <style jsx>{`
            .upload-container {
              position: relative;
              max-width: 300px;
              margin: 1rem auto; /* Center horizontally */
              display: flex; /* Enable Flexbox for centering */
              justify-content: center; /* Center horizontally */
              align-items: center; /* Center vertically (if needed) */
            }
            .modern-upload-btn {
              display: block;
              padding: 1.5rem 2rem;
              background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
              border-radius: 12px;
              color: white;
              cursor: pointer;
              position: relative;
              overflow: hidden;
              transition: all 0.3s ease;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              border: 2px solid transparent;
              text-align: center; /* Center text inside the button */
            }
            .modern-upload-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
              background: linear-gradient(135deg, #8183f2 0%, #b966f8 100%);
            }
            .modern-upload-btn:active {
              transform: translateY(0);
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .btn-content {
              position: relative;
              z-index: 2;
              display: flex;
              flex-direction: column; /* Stack content vertically */
              align-items: center; /* Center content horizontally */
              gap: 0.5rem; /* Add spacing between icon and text */
            }
            .upload-icon {
              font-size: 2rem; /* Increase icon size for better visibility */
              transition: transform 0.3s ease;
            }
            .modern-upload-btn:hover .upload-icon {
              transform: translateY(-3px);
              animation: float 2s ease-in-out infinite;
            }
            .text-container {
              text-align: center; /* Center text inside the container */
            }
            .main-text {
              display: block;
              font-weight: 600;
              font-size: 1.1rem;
            }
            .sub-text {
              display: block;
              font-size: 0.9rem;
              opacity: 0.8;
              margin-top: 0.3rem;
            }
            .hover-effect {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(255, 255, 255, 0.1);
              opacity: 0;
              transition: opacity 0.3s ease;
            }
            .modern-upload-btn:hover .hover-effect {
              opacity: 1;
            }
            .hidden-input {
              display: none;
            }
            @keyframes float {
              0%,
              100% {
                transform: translateY(-3px);
              }
              50% {
                transform: translateY(3px);
              }
            }
          `}</style>

          <p className="fw">CONNECT WITH SOCIAL MEDIA</p>
          <div className="d-flex flex-wrap justify-content-center">
            {currentSocialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="m-1"
              >
                <SocialIcon
                  url={link.url}
                  network={link.platform.name.toLowerCase()}
                  style={{ height: 55, width: 55 }}
                />
              </a>
            ))}

          
          </div>
          <img
            src={logo}
            alt="Company Logo"
            className="custom-logo33"
            style={{
              width: `${logoSize}%`, // Adjust the width based on the logoSize
              opacity: logoOpacity / 100, // Set the opacity using the logoOpacity value
            }}
          />

          <br />
          <button
            className="btn w-100 custom-save-button"
            onClick={handleSaveToContacts}
          >
            <FaSave className="me-2" />
            SAVE TO CONTACTS
          </button>

          {/* Image Preview Modal */}
          <Modal
            show={!!selectedImage}
            onHide={handleCloseModal}
            centered
            className="image-preview-modal"
          >
            <Modal.Body>
              <div className="modal-close-btn" onClick={handleCloseModal}>
                &times;
              </div>
              {selectedImage && (
                <div className="modal-image-container">
                  <img
                    src={selectedImage}
                    alt="Full size preview"
                    className="img-fluid"
                  />
                  <button className="nav-btn prev-btn" onClick={handlePrevious}>
                    <FaChevronLeft />
                  </button>
                  <button className="nav-btn next-btn" onClick={handleNext}>
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </Modal.Body>
          </Modal>

          {/* Video Modal */}
          <Modal
            show={!!selectedVideo}
            onHide={handleCloseModal}
            centered
            className="video-modal"
          >
            <Modal.Body>
              <div className="modal-close-btn" onClick={handleCloseModal}>
                &times;
              </div>
              {selectedVideo && (
                <video
                  controls
                  autoPlay
                  style={{
                    width: "100%",
                    maxHeight: "600px",
                    margin: "auto",
                    display: "block",
                  }}
                >
                  <source src={selectedVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Template33;
