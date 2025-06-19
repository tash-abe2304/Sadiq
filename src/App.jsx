import React from 'react';
import navbar from './components/navbar.jsx'; // adjust path if needed
import herosection from './components/herosection.jsx';
import featuresection from './components/featuresection.jsx';


const App = () => {
  return (
    <div>
      <navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <herosection />
        <featuresection />
      </div>
    </div>
  );
};

export default App;
