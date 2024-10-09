import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  isLoading?: boolean; // Ajout de la propriété isLoading
}

const Button: React.FC<ButtonProps> = ({ text, onClick, isLoading = false }) => {
  return (
    <button
      onClick={onClick}
      className={`mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={isLoading} // Désactive le bouton lorsqu'il charge
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      ) : (
        <span className="ml-3">{text}</span>
      )}
    </button>
  );
};

export default Button;
