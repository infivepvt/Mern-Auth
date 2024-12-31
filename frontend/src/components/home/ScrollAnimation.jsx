import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollAnimation.css";

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimation = () => {
  useEffect(() => {
    // Set the perspective on the container to enable 3D transforms
    gsap.set(".scroll-container", { perspective: 1000 });

    // Create a GSAP timeline that is controlled by the scroll position
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    // Animate the middle image: scale up, rotate fully, bring it forward
    timeline
      .to(".middle-image", {
        scale: 1.3,
        rotateY: 360,
        zIndex: 3,
        opacity: 1,
        duration: 1.5,
      })

      // Animate the left images: slide to the left, rotate slightly in 3D, appear
      .to(
        ".left-image",
        {
          x: "-60%",
          rotateY: -45,
          opacity: 1,
          zIndex: 2,
          duration: 1.5,
        },
        0 // Align start time with the middle-image animation
      )

      // Animate the right images: slide to the right, rotate slightly in 3D, appear
      .to(
        ".right-image",
        {
          x: "60%",
          rotateY: 45,
          opacity: 1,
          zIndex: 2,
          duration: 1.5,
        },
        0 // Align start time with the middle-image animation
      );
  }, []);

  return (
    <div className="scroll-container">
      <div className="image-row">
        {/* Left Images */}
        <img
          src="./left1.png"
          alt="Left Image"
          className="scroll-image left-image"
        />
        <img
          src="./left2.png"
          alt="Left Image"
          className="scroll-image left-image"
        />

        {/* Middle Image */}
        <img
          src="./middle.png"
          alt="Middle Image"
          className="scroll-image middle-image"
        />

        {/* Right Images */}
        <img
          src="./right1.png"
          alt="Right Image"
          className="scroll-image right-image"
        />
        <img
          src="./right2.png"
          alt="Right Image"
          className="scroll-image right-image"
        />
      </div>
    </div>
  );
};

export default ScrollAnimation;
