"use client";

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-4 rounded uppercase tracking-wider"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
