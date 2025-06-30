import React from 'react';

interface PremiumCertificateProps {
  user: {
    firstName?: string;
    lastName?: string;
  };
}

const PremiumCertificate: React.FC<PremiumCertificateProps> = ({ user }) => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet" />
    <div className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-2xl border-4 border-blue-500 mb-8 flex flex-col md:flex-row overflow-hidden" style={{ minHeight: '480px' }}>
      {/* Logo Top Left */}
      <img src="/images/team/logo.png" alt="Logo Left" className="absolute left-7 top-0 w-32 h-32 rounded-full object-contain z-30 shadow" />
      {/* Blue sidebar with triangles */}
      <div className="bg-blue-600 flex flex-col justify-center items-center py-8 px-2 md:px-4 w-full md:w-1/5 relative overflow-hidden" style={{ minWidth: '120px', backgroundImage: 'url(/certificate/image.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
        <div className="absolute top-0 left-0 w-full h-1 bg-purple-600" />
        <div className="flex-1 flex flex-col justify-center items-center w-full">
          <div
            style={{
              transform: 'rotate(-90deg)',
              whiteSpace: 'nowrap',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 'bold',
              fontSize: '2rem',
              color: 'white',
              letterSpacing: '0.1em',
              zIndex: 40,
              marginLeft: '-2rem',
            }}
          >
            Certificate of Participation
          </div>
        </div>
        {/* Right Logo at the bottom of the blue sidebar */}
        <img src="/certificate/1.png" alt="Logo Right" className="mx-auto mb-4 w-12 h-12 rounded-full object-contain z-30 shadow" style={{ position: 'absolute', left: '50%', bottom: '18px', transform: 'translateX(-50%)' }} />
      </div>
      {/* Certificate content with lines */}
      <div className="flex-1 flex flex-col justify-between px-10 py-20 bg-white/80 relative">
        {/* Watermark/Stamp BG */}
        <img src="/images/team/logo.png" alt="Stamp" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] max-w-none h-auto opacity-20 pointer-events-none select-none z-0" style={{ filter: 'grayscale(1) drop-shadow(0 0 16px #888) brightness(0.5) contrast(2)' }} />
        <div className="relative z-10">
          <div className="text-blue-700 text-2xl md:text-3xl font-bold tracking-wider mb-2 text-center drop-shadow" style={{ fontFamily: 'Playfair Display, serif' }}>CERTIFICATE OF PARTICIPATION</div>
          <div className="border-t border-blue-200 my-4" />
          <div className="text-gray-700 text-lg md:text-xl font-light mb-2 text-center" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>This award is proudly presented to</div>
          <div className="border-t border-blue-200 my-4" />
          <div className="text-purple-700 text-4xl md:text-5xl font-extrabold mb-8 leading-tight text-center tracking-wide drop-shadow-lg" style={{ fontFamily: 'Playfair Display, serif' }}>{user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'PARTICIPANT NAME'}</div>
          <div className="border-t border-blue-200 my-4" />
          <div className="text-blue-700 text-base md:text-lg mb-2 text-center font-medium" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>has actively participated in the webinar <span className='font-bold'>"Explore Space: Participate in Asteroid Detection"</span> held on 21st June 2025, organized by <span className='font-bold'>Propagation</span>, in collaboration with <span className='font-bold'>SA Citizen Science Group</span>, in celebration of International Asteroid Day.</div>
          <div className="border-t border-blue-200 my-4" />
          <div className="text-gray-700 text-base md:text-lg mb-8 mt-4 text-center" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>The session introduced participants to asteroid detection techniques, highlighted the power of citizen science, and encouraged real-world space science contributions.</div>
        </div>
        <div className="flex flex-row justify-between items-end mt-8 relative z-10">
          <div>
            <div className="text-blue-700 text-sm mb-1 font-semibold" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Date</div>
            <div className="text-purple-700 text-base font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>21 June 2025</div>
          </div>
          <div className="text-right">
            <div className="text-blue-700 text-sm mb-1 font-semibold" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Organizers</div>
            <div className="text-purple-700 text-base font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Propagation & SA Citizen Science Group</div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default PremiumCertificate; 