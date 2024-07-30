import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[700px] bg-gray-100 p-6 space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-700">Unauthorized</h2>
        <p className="mt-4 text-gray-600">You do not have permission to view this page.</p>

      </div>
      <div className="flex flex-col space-y-4">
        <Link
          to="/login"
          className="block w-full max-w-xs px-4 py-2 text-center text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="block w-full max-w-xs px-4 py-2 text-center text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Signup
        </Link>
        <Link
          to="/admin"
          className="block w-full max-w-xs px-4 py-2 text-center text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Admin
        </Link>
        <Link
          to="/subAdmin"
          className="block w-full max-w-xs px-4 py-2 text-center text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          SubAdmin
        </Link>
        <Link
          to="/user"
          className="block w-full max-w-xs px-4 py-2 text-center text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          User Protected
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
