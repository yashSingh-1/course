import React from 'react';

interface PremiumCertificateProps {
  user: {
    name: string;
    email: string;
  };
}

const PremiumCertificate: React.FC<PremiumCertificateProps> = ({ user }) => {
  return (
    <div
      id="certificate-content"
      className="relative bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 mx-auto print-certificate"
      style={{ fontFamily: 'Montserrat, Arial, sans-serif', width: '100%', maxWidth: '1200px' }}
    >
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ opacity: 0.07, zIndex: 0 }}>
        <img src="/certificate/topright.png" alt="Watermark" className="w-2/3 max-w-lg" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-8 pt-8 pb-0">
        <div className="flex justify-between items-start mb-2">
          {/* Left Logo */}
          <img src="/certificate/logo.png" alt="Left Logo" className="w-28 h-28 rounded-full object-contain border-4 border-white shadow-md bg-white" />
          {/* Top Right Logo */}
          <img src="/certificate/topright.png" alt="Top Right Logo" className="w-20 h-20 object-contain mt-2" />
        </div>

        {/* Title */}
        <div className="text-center mt-2 mb-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-wide">CERTIFICATE</h1>
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 tracking-widest mb-2">OF PARTICIPATION</h2>
        </div>

        {/* Presented To */}
        <div className="text-center mb-2">
          <span className="uppercase text-xs text-gray-500 tracking-widest">This certificate is presented to :</span>
          <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mt-1 mb-2">{user.name}</h3>
        </div>

        {/* Description */}
        <div className="text-center mb-4">
          <p className="text-base text-gray-700 max-w-2xl mx-auto">
            This certificate is awarded for successful participation in the <span className="font-semibold">Explore Space: Participate in Asteroid Detection</span> workshop.<br/>
            Thank you for your contribution to citizen science and space exploration.
          </p>
        </div>

        {/* Date and Signature */}
        <div className="flex justify-between items-end mt-8 mb-2">
          <div className="text-left">
            <span className="text-gray-600 text-sm">Date Awarded</span>
            <div className="font-semibold text-gray-800 text-base">6 July 2025</div>
          </div>
          <div className="text-right">
            <span className="block text-gray-600 text-sm mb-1">Signature</span>
            <span className="block text-2xl text-blue-800" style={{ fontFamily: 'Dancing Script, cursive' }}>Propagation</span>
          </div>
        </div>

        {/* Certificate ID */}
        <div className="text-right text-xs text-gray-400 mb-2">
          Certificate ID: <span className="font-mono">PROP-2024-{user.email.split('@')[0].toUpperCase()}</span>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="w-full mt-4">
        <img src="/certificate/bad.png" alt="Footer Bar" className="w-full object-cover" style={{ minHeight: '40px', maxHeight: '60px' }} />
      </div>
    </div>
  );
};

export default PremiumCertificate; 