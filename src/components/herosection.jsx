import { useEffect, useState } from 'react';

const HeroSection = () => {
  // Stock symbols to float (only tickers for consistency)
  const stockSymbols = [
    'AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META', 'NVDA', 'NFLX',
    'AMD', 'INTC', 'ORCL', 'CRM', 'UBER', 'SPOT', 'PYPL', 'SQ',
    'BABA', 'DIS', 'V', 'MA', 'JNJ', 'WMT', 'PG', 'HD', 'BAC', 'XOM'
  ];

  const [floatingStocks, setFloatingStocks] = useState([]);

  useEffect(() => {
    // Generate random floating stock elements with collision detection and side balance
    const generateFloatingStocks = () => {
      const stocks = [];
      const minDistance = 8; // Minimum distance between tickers (in percentage units)
      const totalTickers = 14; // Even number for perfect left-right split
      
      // Create a shuffled copy of stock symbols to ensure uniqueness
      const shuffledSymbols = [...stockSymbols].sort(() => Math.random() - 0.5);
      
      for (let i = 0; i < Math.min(totalTickers, shuffledSymbols.length); i++) {
        let x, y, attempts = 0;
        let validPosition = false;
        
        // Alternate between left and right sides for balance
        const isLeftSide = i % 2 === 0;
        
        // Try to find a non-overlapping position (max 50 attempts)
        while (!validPosition && attempts < 50) {
          // Constrain x based on which side we're placing on
          if (isLeftSide) {
            x = Math.random() * 15; // Left side: 0-15%
          } else {
            x = Math.random() * 15 + 85; // Right side: 85-100%
          }
          
          y = Math.random() * 100;
          
          // Check exclusion zones (only check y for top navbar since x is already constrained)
          const inExclusionZone = (y < 15);
          
          if (!inExclusionZone) {
            // Check collision with existing tickers on the same side
            validPosition = true;
            for (const existingStock of stocks) {
              const distance = Math.sqrt(
                Math.pow(x - existingStock.x, 2) + Math.pow(y - existingStock.y, 2)
              );
              
              if (distance < minDistance) {
                validPosition = false;
                break;
              }
            }
          }
          
          attempts++;
        }
        
        stocks.push({
          id: i,
          symbol: shuffledSymbols[i], // Use unique symbol from shuffled array
          x: x,
          y: y,
          size: Math.random() * 0.4 + 0.5, // Reduced size range: 0.5-0.9 (was 0.6-1.4)
          opacity: Math.random() * 0.25 + 0.15,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 10,
        });
      }
      setFloatingStocks(stocks);
    };

    generateFloatingStocks();
  }, []);

  const handleStockCheckerClick = () => {
    // This would redirect to the stock checker page
    console.log('Redirecting to stock checker...');
    // In a real app: navigate('/stock-checker') or window.location.href = '/stock-checker'
  };

  return (
    <div className="relative flex flex-col items-center mt-2 lg:mt-8"> {/* Reduced top margin */}
      {/* Floating Stock Background - Full Screen */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {floatingStocks.map((stock) => (
          <div
            key={stock.id}
            className="absolute font-semibold select-none floating-stock transition-all duration-500"
            style={{
              left: `${stock.x}%`,
              top: `${stock.y}%`,
              fontSize: `${stock.size * 1.4 + 0.9}rem`, // Slightly larger font
              opacity: stock.opacity,
              color: stock.id % 3 === 0 
                ? `rgba(168, 214, 8, ${stock.opacity})` 
                : stock.id % 3 === 1 
                ? `rgba(0, 104, 55, ${stock.opacity})` 
                : `rgba(80, 80, 80, ${stock.opacity})`, // Removed 0.6 multiplier and darkened gray
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
          backdrop-filter: blur(0.5px);
        }
        .floating-stock:nth-child(2n) {
          animation: floatGentle2 25s ease-in-out infinite reverse;
        }
        .floating-stock:nth-child(3n) {
          animation: floatGentle3 30s ease-in-out infinite;
        }
        .floating-stock:nth-child(4n) {
          animation: floatGentle4 35s ease-in-out infinite reverse;
        }
        
        @keyframes floatGentle {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -15px) rotate(1deg); }
          50% { transform: translate(-15px, 20px) rotate(-1deg); }
          75% { transform: translate(25px, 8px) rotate(0.5deg); }
        }
        
        @keyframes floatGentle2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-20px, 15px) rotate(-0.5deg); }
          66% { transform: translate(25px, -12px) rotate(1deg); }
        }
        
        @keyframes floatGentle3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(12px, -25px) rotate(0.5deg); }
          40% { transform: translate(-25px, -8px) rotate(-1deg); }
          60% { transform: translate(20px, 20px) rotate(0.5deg); }
          80% { transform: translate(-12px, 15px) rotate(-0.5deg); }
        }

        @keyframes floatGentle4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          30% { transform: translate(18px, -18px) rotate(0.8deg); }
          70% { transform: translate(-22px, 10px) rotate(-0.8deg); }
        }

        .pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite alternate;
        }

        @keyframes pulseGlow {
          from {
            box-shadow: 0 0 20px rgba(168, 214, 8, 0.3);
          }
          to {
            box-shadow: 0 0 30px rgba(168, 214, 8, 0.5), 0 0 40px rgba(168, 214, 8, 0.2);
          }
        }

        /* Add subtle background overlay to improve text readability */
        .text-content-overlay {
          background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 50%, transparent 80%);
          backdrop-filter: blur(1px);
        }
      `}</style>

      {/* Main Content - Higher z-index with subtle background overlay */}
      <div className="relative z-20 text-center">
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 text-content-overlay rounded-3xl transform scale-110 -z-10"></div>
        
        {/* Main Title */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-wide mb-6">
          <span className="bg-gradient-to-r from-[#A8D608] to-[#006837] text-transparent bg-clip-text drop-shadow-sm">
            SADIQ
          </span>
        </h1>

        {/* Tagline */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            <span className="text-[#A8D608]">Track.</span>{' '}
            <span className="text-[#006837]">Check.</span>{' '}
            <span className="text-[#A8D608]">Halalify.</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed on the halal status of your investments.
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="flex flex-col items-center space-y-4 mt-8 sm:mt-12">
          <button
            onClick={handleStockCheckerClick}
            className="group bg-gradient-to-r from-[#A8D608] to-[#006837] text-white px-4 py-3 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full text-base sm:text-lg lg:text-xl font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 pulse-glow w-auto min-w-fit"
          >
            <div className="flex items-center space-x-2 sm:space-x-3">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="whitespace-nowrap">Check Your Stocks</span>
              <svg className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;