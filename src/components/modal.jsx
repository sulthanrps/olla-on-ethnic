// src/components/Modal.jsx
import React from 'react';

// Tidak perlu import file CSS lagi

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // Overlay
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Konten Modal */}
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4 transform transition-all duration-300 ease-out"
        onClick={handleContentClick}
      >
        {/* Header Modal */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button 
            className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        
        {/* Body Modal */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;