import React from 'react';

interface PremiumCertificateProps {
  user: {
    name: string;
    email: string;
  };
}

const PremiumCertificate: React.FC<PremiumCertificateProps> = ({ user }) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-2xl">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="text-9xl font-black text-gray-400 transform rotate-12">
          CERTIFICATE
        </div>
      </div>

      {/* Certificate Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            CERTIFICATE OF PARTICIPATION
          </h1>
          <p className="text-lg text-gray-600">This is to certify that</p>
        </div>

        {/* Name */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            {user.name}
          </h2>
          <p className="text-gray-600">has successfully participated in</p>
        </div>

        {/* Event Details */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Explore Space: Participate in Asteroid Detection
          </h3>
          <p className="text-lg text-gray-600 mb-2">A comprehensive workshop on citizen science and space exploration</p>
          <p className="text-gray-500">Organized by Propagation</p>
        </div>

        {/* Date and Location */}
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-1">Date: <span className="font-semibold">May 15, 2024</span></p>
          <p className="text-gray-600">Location: <span className="font-semibold">Online Workshop</span></p>
        </div>

        {/* Signature Section */}
        <div className="flex justify-between items-end mt-12">
          <div className="text-center">
            <div className="w-32 h-0.5 bg-gray-800 mb-2"></div>
            <p className="text-sm text-gray-600">Workshop Coordinator</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-0.5 bg-gray-800 mb-2"></div>
            <p className="text-sm text-gray-600">Program Director</p>
          </div>
        </div>

        {/* Certificate ID */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">Certificate ID: <span className="font-mono">PROP-2024-{user.email.split('@')[0].toUpperCase()}</span></p>
        </div>
      </div>
    </div>
  );
};

export default PremiumCertificate; 