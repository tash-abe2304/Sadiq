import { useEffect, useState } from 'react';
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

const HeroSection = () => {
  // Stock symbols and company names to float
  const stockSymbols = [
    'AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META', 'NVDA', 'NFLX',
    'Apple', 'Microsoft', 'Tesla', 'Amazon', 'Google', 'Netflix',
    'AMD', 'INTC', 'ORCL', 'CRM', 'UBER', 'SPOT', 'PYPL', 'SQ'
  ];

  const [floatingStocks, setFloatingStocks] = useState([]);

  useEffect(() => {
    // Generate random floating stock elements
    const generateFloatingStocks = () => {
      const stocks = [];
      for (let i = 0; i < 15; i++) {
        stocks.push({
          id: i,
          symbol: stockSymbols[Math.floor(Math.random() * stockSymbols.length)],
          x: Math.random() * 100, // Random horizontal position (%)
          y: Math.random() * 100, // Random vertical position (%)
          size: Math.random() * 0.5 + 0.5, // Random size multiplier
          opacity: Math.random() * 0.3 + 0.1, // Random opacity
          duration: Math.random() * 20 + 15, // Animation duration (15-35s)
          delay: Math.random() * 10, // Random delay
        });
      }
      setFloatingStocks(stocks);
    };

    generateFloatingStocks();
  }, []);

  return (
    <div className="relative flex flex-col items-center mt-6 lg:mt-20">
      {/* Floating Stock Background - Full Screen */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {floatingStocks.map((stock) => (
          <div
            key={stock.id}
            className="absolute text-neutral-200 font-semibold select-none floating-stock hover:text-[#A8D608] transition-colors duration-300"
            style={{
              left: `${stock.x}%`,
              top: `${stock.y}%`,
              fontSize: `${stock.size * 1.2 + 0.8}rem`,
              opacity: stock.opacity,
              color: stock.id % 2 === 0 ? 'rgba(168, 214, 8, 0.3)' : 'rgba(0, 104, 55, 0.3)',
              animationDelay: `${stock.delay}s`,
            }}
          >
            {stock.symbol}
          </div>
        ))}
      </div>

      {/* CSS for floating animations */}
      <style jsx>{`
        .floating-stock {
          animation: floatGentle 20s ease-in-out infinite;
        }
        .floating-stock:nth-child(2n) {
          animation: floatGentle2 25s ease-in-out infinite reverse;
        }
        .floating-stock:nth-child(3n) {
          animation: floatGentle3 30s ease-in-out infinite;
        }
        
        @keyframes floatGentle {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -20px) rotate(1deg); }
          50% { transform: translate(-20px, 30px) rotate(-1deg); }
          75% { transform: translate(40px, 10px) rotate(0.5deg); }
        }
        
        @keyframes floatGentle2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-25px, 20px) rotate(-0.5deg); }
          66% { transform: translate(35px, -15px) rotate(1deg); }
        }
        
        @keyframes floatGentle3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(15px, -30px) rotate(0.5deg); }
          40% { transform: translate(-30px, -10px) rotate(-1deg); }
          60% { transform: translate(25px, 25px) rotate(0.5deg); }
          80% { transform: translate(-15px, 20px) rotate(-0.5deg); }
        }
      `}</style>

      {/* Main Content - Higher z-index to appear above floating elements */}
      <div className="relative z-20">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl text-center font-extrabold tracking-wide">
          <span className="bg-gradient-to-r from-[#A8D608] to-[#006837] text-transparent bg-clip-text">
            SADIQ
          </span>
        </h1>
        <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
          Halalify your stocks today!
        </p>
        <div className="flex justify-center my-10">
        <div className="flex w-full max-w-2xl rounded-full shadow-lg border border-gray-200 bg-white relative hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center pl-6">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search stocks, companies... (Press Enter)"
            className="w-full px-4 py-5 focus:outline-none bg-transparent text-gray-700 placeholder-gray-400 text-lg"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // Handle search logic here
                console.log('Searching for:', e.target.value);
              }
            }}
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;