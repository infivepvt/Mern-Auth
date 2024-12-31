import React, { useState } from 'react';
import TemplateSelector from '../components/home/newTemplateSelector';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyDigitalCards.css';
import HeroSection from '../components/home/HeroSection';
import AnimatedNavbar from '../components/home/AnimatedNavbar';
import NetworkingSection from '../components/home/NetworkingSection';
import ScrollAnimation from '../components/home/ScrollAnimation';

const MyDigitalCards = () => {
  const [selectedTemplate, setSelectedTemplate] = useState({ src: 'defaultTemplate.jpg' });

  return (
    <div className="container-fluid p-0 ">
      <AnimatedNavbar />
      <div style={{ marginTop: '10px' }}></div>
      <HeroSection />
      <NetworkingSection/>
      <ScrollAnimation/>
      

      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, type: 'spring' }}
      >
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onSelectTemplate={setSelectedTemplate}
        />
      </motion.div>

      <div style={{ height: '500px', marginTop: '50px' }}>
        <Canvas>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 2]} intensity={1} />
        </Canvas>
      </div>
    </div>
  );
};

export default MyDigitalCards;
