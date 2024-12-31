import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import './NetworkingSection.css';

const NetworkingSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration in milliseconds
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="networking-section container-fluid">
      <div className="row align-items-center">
        {/* Text Section */}
        <div
          className="col-lg-6 col-md-12 text-section"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <h1>NETWORKING SHOULDN’T FEEL THIS HARD</h1>
          <p>
            Handing out 30 business cards a week but losing half in the clutter? Spending
            hours entering details, yet missing key follow-ups? Outdated tools waste your
            time, costing you deals. Each lost lead isn’t just a missed connection—it’s lost
            revenue and trust.
          </p>
        </div>

        {/* Video Section */}
        <div
          className="col-lg-6 col-md-12 video-section"
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <iframe
            width="100%"
            height="455"
            src="https://www.youtube.com/embed/CiQYp1yuVts?autoplay=1&mute=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: '10px' }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default NetworkingSection;
