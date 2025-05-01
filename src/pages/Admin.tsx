declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

import { useEffect } from 'react';

// Redirect to standalone admin page
const Admin = () => {
  useEffect(() => {
    // Redirect to the admin page immediately
    window.location.href = '/admin/index.html';
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Redirecting to Admin...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
};

export default Admin; 