import React from 'react';

const Protected = () => {
  return (
    <div className="flex items-center justify-center min-h-[700px] bg-gray-100">
      <div className="p-8 bg-white rounded shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">Protected</h1>
        <p className="mt-4 text-gray-600">This is a protected area.</p>
      </div>
    </div>
  );
};

export default Protected;
