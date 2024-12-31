import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeroSection.css'

function HeroSection() {
    const [text, setText] = useState('Business');
    const words = ['Business', 'Personal', 'Casual'];

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % words.length;
            setText(words[index]);
        }, 2000); // Change text every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="position-relative bg-black text-white overflow-hidden d-flex align-items-center rounded" style={{ height: '100vh', marginTop: '60px' }}>
            {/* Video Background */}
            <video autoPlay loop muted className="position-absolute w-100 h-100" style={{ top: 0, right: 0, zIndex: 1, objectFit: 'cover' }}>
                <source src="/videos/NFC.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Hero Content */}
            <div className="container position-relative z-2 text-left px-3" style={{ maxWidth: '50%', marginLeft: '25px' }}>
                <h1 className="display-4 fw-bold mb-4">
                    The Last Card You'll Ever Need for{' '}
                    <span className="text-animation">{text}</span>
                </h1>
                <p className="lead mb-4">
                    Tap to share your details, capture contacts immediately, and let automated follow-ups keep you connected.
                </p>
                <div className="d-flex gap-5">
                    <button className="btn btn-primary btn-lg">Shop Cards</button>
                    <button className="btn btn-outline-primary btn-lg">How It Works</button>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
