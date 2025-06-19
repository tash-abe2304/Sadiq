import React from 'react';
import Navbar from './components/navbar.jsx'; // adjust path if needed
import HeroSection from './components/herosection.jsx';
import FeatureSection from './components/featuresection.jsx';


const App = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <featuresection />
      </div>
    </div>
  );
};

export default App;
