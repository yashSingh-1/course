declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

import { useEffect } from 'react';

// Redirect to standalone admin page
const Admin = () => {
  useEffect(() => {
    // Remove any existing script tags to avoid duplicates
    const existingScript = document.getElementById('netlify-identity-widget');
    if (existingScript) {
      existingScript.remove();
    }

    // Add the script tag
    const script = document.createElement('script');
    script.id = 'netlify-identity-widget';
    script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize identity
      if (window.netlifyIdentity) {
        window.netlifyIdentity.init();
      }
      // Redirect to the admin page
      window.location.href = '/admin/index.html';
    };

    return () => {
      // Cleanup
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Redirecting to Admin...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">
          If you are not redirected automatically,{' '}
          <a href="/admin/index.html" className="text-blue-500 hover:underline">
            click here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Admin; 