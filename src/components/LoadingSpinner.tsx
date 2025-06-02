import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-primary-light border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin animation-delay-150"></div>
      </div>
      <p className="text-dark font-medium">Processing academic records...</p>
    </div>
  );
};

export default LoadingSpinner;