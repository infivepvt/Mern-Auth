import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Template59.css";
import ChatBot from "../ChatBot/chatBot";
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
import { Modal } from "react-bootstrap";
import { SocialIcon } from "react-social-icons";
import Wave from 'react-wavify';

const Template59 = ({
  contactDetails,
  selectedSocialMedia,
  socialLinks,
  selectedTemplate,
  whatsAppDetails,
  socialMediaUrl,
  isCallToActionVisible,
  isQuickSendVisible,
  isQuickSendVisiblebot,
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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);

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
    title = "Software Engineer",
    companyName = "Infive",
    about = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
    profileImage = "/temp1Profile.png",
    bannerColour = "#ff1a1a",
    customFields = [],
    phoneWork = "",
    email = "",
    countryCode = whatsAppDetails?.countryCode || "",
    phoneNumber = whatsAppDetails?.phoneNumber || "",
    videos = [],
    gallery = [],
    youtube = "", // New state for YouTube URL
    phoneMobile = "",
    Mobile2 = "",
    Mobile3 = "",
    fax = "",
    email2 = "",
    email3 = "",
    website = "www.yourwebsiteaddress.com",
    website2 = "",
    website3 = "",
    address = "919 Oaktree Crescent, Newmarket",
    address2 = "",
    logo = "/logo.png",
    logoSize = 100,
    logoOpacity = 100,
    bannerSize = 100,
    dynamicFontSize = 30,
    subdynamicFontSize = 20,
    bannerOpacity = 100,
    bannerImage = "/banner.png",
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
    <div className={`card-container text-center template-${selectedTemplate}`}
      style={{
        backgroundColor: backgroundColour, // Background color----##################################################################################################
      }}
    >

      <div style={{ position: "relative" }}>
        {/* First wave */}
        <div
          className="wave-container"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "70px",
            zIndex: 1, // Wave container is on top
            opacity: 1, // Initial opacity
            animation: "waveOpacityChange1 5s infinite", // Apply animation to the opacity for first wave
          }}
        >
          <Wave
            fill={backgroundColour}
            paused={false}
            style={{ display: 'flex' }}
            options={{
              height: 30,
              amplitude: 18,
              speed: 0.2,
              points: 8,
            }}
          />
        </div>

        {/* Second wave */}
        <div
          className="wave-container"
          style={{
            position: "absolute",
            bottom: 10, // Slightly higher than the first one
            left: 0,
            width: "100%",
            height: "70px",
            zIndex: 0, // This wave is below the first one
            opacity: 0.6, // Initial opacity for second wave
            animation: "waveOpacityChange2 5s infinite", // Apply animation for the second wave
          }}
        >
          <Wave
            fill={backgroundColour}
            paused={false}
            style={{ display: 'flex' }}
            options={{
              height: 20,
              amplitude: 20,
              speed: 0.2,
              points: 8,
            }}
          />
        </div>

        {/* Third wave */}
        <div
          className="wave-container"
          style={{
            position: "absolute",
            bottom: 20, // Slightly higher than the second one
            left: 0,
            width: "100%",
            height: "70px",
            zIndex: 0, // This wave is below both the first and second ones
            opacity: 0.3, // Initial opacity for third wave
            animation: "waveOpacityChange3 5s infinite", // Apply animation for the third wave
          }}
        >
          <Wave
            fill={backgroundColour}
            paused={false}
            style={{ display: 'flex' }}
            options={{
              height: 20,
              amplitude: 25,
              speed: 0.2,
              points: 8,
            }}
          />
        </div>

        <div>
          <img
            src={profileImage}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0, // Image is below the wave box
            }}
          />
        </div>
      </div>


      <div className="rounded-circle logo-container" style={{ fontFamily: "Sans-serif", marginBottom: "-40px" }}>
        <img
          src={logo}
          alt="Company Logo"
          className="custom-logo"
          style={{
            width: `${logoSize}%`,
            opacity: logoOpacity / 100,
            marginLeft: "200px"
          }}
        />
      </div>


      <div style={{
        display: "flex",
        justifyContent: "space-between", // Pushes text to left, logo to right
        alignItems: "center", // Aligns text & logo vertically
        textAlign: "left",
        paddingLeft: "20px",
        width: "100%", // Ensures full-width alignment
        marginBottom: "-50px"
      }}>
        {/* Left Side: Name, Job Title, Company Name */}
        <div
          style={{
            flex: 1,
            whiteSpace: 'normal', // Allow text wrapping
            overflow: 'visible', // Ensure text is not cut off
            minWidth: '100px', // Set a minimum width
            maxWidth: '100%', // Ensure the container doesn't exceed its parent's width
            wordWrap: 'break-word', // Break long words if necessary
            paddingRight: '20px', // Add padding to the right to create space
          }}
        >
          <h2
            className="profile-name"
            style={{
              fontSize: `${dynamicFontSize}px`,
              color: backgroundTextColour,
              fontFamily: 'Sans-serif',
              margin: '0', // Remove default margin
              padding: '0', // Remove default padding
              marginRight: '8px', // Add margin to the right to push text left
            }}
          >
            {name}
          </h2>
          <p
            className="job-title"
            style={{
              color: subTitelTextColour,
              fontSize: `${subdynamicFontSize}px`,
              marginBottom: '0px',
              fontFamily: 'Sans-serif',
              margin: '0', // Remove default margin
              padding: '0', // Remove default padding
              marginRight: '8px', // Add margin to the right to push text left
            }}
          >
            {title}
          </p>
          <p
            className="company-title"
            style={{
              marginTop: '0px',
              whiteSpace: 'normal', // Allow text wrapping
              wordWrap: 'break-word', // Break long words if necessary
              marginRight: '8px', // Add margin to the right to push text left
            }}
          >
            <span style={{ whiteSpace: 'normal', wordWrap: 'break-word',color: subTitelTextColour, }}>
              {companyName}
            </span>
          </p>
        </div>
        

      </div>

      <div className="profile-contact-icons1" style={{ marginTop: "50px" }}>
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
              style={{ height: 50, width: 50 }}
            />
          </a>
        ))}
      </div>

      <div
        className="profile-contact-icons21"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(1, 1fr)", // Ensures three items per row
          justifyContent: "center",
          marginLeft: "30px"
          // Adds spacing between the items
        }}
      >
        {phoneWork && (
          <div className="contact-item d-flex align-items-center">
            <a href={`tel:${phoneWork}`} className="icon d-flex align-items-center">
              <FaPhone
                className="contact-icon"
                style={{
                  transform: "rotate(90deg)",
                  minWidth: "20px",
                  fontSize: "1.5rem",
                  color: backgroundBarIconColor,
                  flexShrink: 0

                }}
              />
            </a>
            <span style={{
              fontSize: "1.2rem", color: backgroundBarTextIconColor, marginLeft: "40px", whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "280px",
              textAlign: "left",
              flexGrow: 1
            }}>{phoneWork}</span>
          </div>
        )}



        {phoneMobile && (
          <div className="contact-item d-flex align-items-center">
            <a href={`tel:${phoneMobile}`} className="icon d-flex align-items-center">
              <FaFax
                className="contact-icon"
                style={{
                  transform: "rotate(90deg)",
                  minWidth: "20px",
                  fontSize: "1.5rem",
                  color: backgroundBarIconColor,
                  flexShrink: 0

                }}
              />
            </a>
            <span
              style={{
                fontSize: "1.2rem", color: backgroundBarTextIconColor, marginLeft: "40px", whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "280px",
                textAlign: "left",
                flexGrow: 1
              }}
            >
              {phoneMobile}
            </span>
          </div>
        )}

        {Mobile2 && (
          <div className="contact-item d-flex align-items-center">
            <a href={`tel:${Mobile2}`} className="icon d-flex align-items-center">
              <FaMobile
                className="contact-icon"
                style={{
                  transform: "rotate(0deg)",
                  minWidth: "20px",
                  fontSize: "1.5rem",
                  color: backgroundBarIconColor,
                  flexShrink: 0

                }}
              />
            </a>
            <span style={{
              fontSize: "1.2rem", color: backgroundBarTextIconColor, marginLeft: "40px", whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "280px",
              textAlign: "left",
              flexGrow: 1
            }}>{Mobile2}</span>
          </div>
        )}

        {Mobile3 && (
          <div className="contact-item d-flex align-items-center">
            <a href={`tel:${Mobile3}`} className="icon d-flex align-items-center">
              <FaMobile
                className="contact-icon"
                style={{
                  transform: "rotate(0deg)",
                  minWidth: "20px",
                  fontSize: "1.5rem",
                  color: backgroundBarIconColor,
                  flexShrink: 0

                }}
              />
            </a>
            <span style={{
              fontSize: "1.2rem", color: backgroundBarTextIconColor, marginLeft: "40px", whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "280px",
              textAlign: "left",
              flexGrow: 1
            }}>{Mobile3}</span>
          </div>
        )}

        {email && (
          <div className="contact-item d-flex align-items-center">
            <a href={`mailto:${email}`} className="icon d-flex align-items-center">
              <FaEnvelope
                className="contact-icon"
                style={{
                  minWidth: "20px",
                  fontSize: "1.5rem",
                  color: backgroundBarIconColor,
                  flexShrink: 0

                }}
              />
            </a>
            <span style={{
              fontSize: "1.2rem", color: backgroundBarTextIconColor, marginLeft: "40px", whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "280px",
              textAlign: "left",
              flexGrow: 1
            }}>{email}</span>
          </div>
        )}

        {email2 && (
          <div className="contact-item d-flex align-items-center">
            <a href={`mailto:${email2}`} className="icon d-flex align-items-center">
              <FaEnvelope
                className="contact-icon"
                style={{
                  minWidth: "20px",
                  fontSize: "1.5rem",
                  color: backgroundBarIconColor,
                  flexShrink: 0

                }}
              />
            </a>
            <span style={{
              fontSize: "1.2rem", color: backgroundBarTextIconColor, marginLeft: "40px", whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "280px",
              textAlign: "left",
              flexGrow: 1
            }}>{email2}</span>
          </div>
        )}

        {email3 && (
          <div className="contact-item d-flex align-items-center">
            <a href={`mailto:${email3}`} className="icon d-flex align-items-center">
              <FaEnvelope
                className="contact-icon"
                style={{
                  minWidth: "20px",
                  fontSize: "1.5rem",
                  color: backgroundBarIconColor,
                  flexShrink: 0

                }}
              />
            </a>
            <span style={{
              fontSize: "1.2rem", color: backgroundBarTextIconColor, marginLeft: "40px", whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "280px",
              textAlign: "left",
              flexGrow: 1
            }}>{email3}</span>
          </div>
        )}

        {website && (
          <div className="contact-item d-flex align-items-center">
            <a href={`http://${website}`} className="icon d-flex align-items-center">
              <FaGlobe
                className="contact-icon"
                style={{
                  minWidth: "20px",
                  fontSize: "1.5rem",
                  color: backgroundBarIconColor,
                  flexShrink: 0

                }}
              />
            </a>
            <span style={{
              fontSize: "1.2rem", color: backgroundBarTextIconColor, marginLeft: "40px", whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "280px",
              textAlign: "left",
              flexGrow: 1
            }}>{website}</span>
          </div>
        )}

        {website2 && (
          <div className="contact-item d-flex align-items-center">
            <a href={`http://${website2}`} className="icon d-flex align-items-center">
              <FaGlobe
                className="contact-icon"
                style={{
                  minWidth: "20px",
                  fontSize: "1.5rem",
                  color: backgroundBarIconColor,
                  flexShrink: 0

                }}
              />
            </a>
            <span style={{
              fontSize: "1.2rem", color: backgroundBarTextIconColor, marginLeft: "40px", whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "280px",
              textAlign: "left",
              flexGrow: 1
            }}>{website2}</span>
          </div>
        )}

        {website3 && (
          <div className="contact-item d-flex align-items-center">
            <a href={`http://${website3}`} className="icon d-flex align-items-center">
              <FaGlobe
                className="contact-icon"
                style={{
                  minWidth: "20px",
                  fontSize: "1.5rem",
                  color: backgroundBarIconColor,
                  flexShrink: 0

                }}
              />
            </a>
            <span style={{
              fontSize: "1.2rem", color: backgroundBarTextIconColor, marginLeft: "40px", whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "280px",
              textAlign: "left",
              flexGrow: 1
            }}>{website3}</span>
          </div>
        )}

        {address && (
          <div className="contact-item d-flex align-items-center">
            <a href={`#`} className="icon d-flex align-items-center">
              <FaMapMarkerAlt
                className="contact-icon"
                style={{
                  minWidth: "20px",
                  fontSize: "1.5rem",
                  color: backgroundBarIconColor,
                  flexShrink: 0

                }}
              />
            </a>
            <span style={{
              fontSize: "1.2rem", color: backgroundBarTextIconColor, marginLeft: "40px", whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "280px",
              textAlign: "left",
              flexGrow: 1
            }}> {address}</span>
          </div>
        )}

        {address2 && (
          <div className="contact-item d-flex align-items-center">
            <a href={`#`} className="icon d-flex align-items-center">
              <FaMapMarkerAlt
                className="contact-icon"
                style={{
                  minWidth: "20px",
                  fontSize: "1.5rem",
                  color: backgroundBarIconColor,
                  flexShrink: 0

                }}
              />
            </a>
            <span style={{
              fontSize: "1.2rem", color: backgroundBarTextIconColor, marginLeft: "40px", whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "280px",
              textAlign: "left",
              flexGrow: 1
            }}>{address2}</span>
          </div>
        )}
      </div>

      {/* Custom Fields */}
      {customFields.length > 0 && (
        <div className="custom-fields mt-3">
          <h5 className="text-center mb-4">Additional Information</h5>
          {customFields.map((field, index) => (
            <div key={index} className="custom-field mb-3">
              <div
                className="text-center py-2"
                style={{ backgroundColor: "#FF0000", color: "#FFFFFF" }}
              >
                <strong>{field.title}</strong>
              </div>
              <div className="bg-white text-dark p-3 border border-danger rounded-bottom">
                {field.content}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* About Section */}
      <div
        className="about-section"
        style={{
          width: '100%', // Ensure the container takes full width
          maxWidth: '600px', // Set a maximum width for better readability
          whiteSpace: 'normal', // Allow text wrapping
          overflow: 'visible', // Ensure text is not cut off
          wordWrap: 'break-word', // Break long words if necessary
          padding: '10px', // Add padding for spacing
          boxSizing: 'border-box', // Include padding in the width calculation
        }}
      >
        <h5 style={{ margin: '0 0 10px 0', padding: '0' }}>About Us</h5>
        <p
          style={{
            margin: '0', // Remove default margin
            padding: '0', // Remove default padding
            whiteSpace: 'normal', // Allow text wrapping
            wordWrap: 'break-word', // Break long words if necessary
            fontSize: '16px', // Set a readable font size
            lineHeight: '1.5', // Improve readability with line height
          }}
        >
          {about}
        </p>
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

      <br />
      <button
        className="btn w-100 custom-save-button"
        onClick={handleSaveToContacts}
      >
        <FaSave className="me-2" />
        SAVE TO CONTACTS
      </button>
      <br />

      {/* Footer */}
      <div className="footer">
        <p>All rights reserved</p>
      </div>

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

      {isQuickSendVisiblebot && (
        <div style={{ height: "0px" }}>
          <ChatBot />
        </div>

      )}
    </div>
  );
};

export default Template59;
