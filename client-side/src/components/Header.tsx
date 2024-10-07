import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="text-gray-700 body-font border-b border-gray-200">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Job Finder</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link className="mr-5 hover:text-gray-900" to="/">Home</Link>
          <Link className="mr-5 hover:text-gray-900" to="/about">About</Link>
          <Link className="mr-5 hover:text-gray-900" to="/contact">Contact</Link>
        </nav>
        <Link to="/signup">
          <button className="inline-flex items-center bg-indigo-500 text-white border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded">
            Sign Up
          </button>
        </Link>
        <Link to="/signin">
          <button className="ml-4 inline-flex items-center bg-gray-200 border-0 py-2 px-4 focus:outline-none hover:bg-gray-300 rounded">
            Login
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
