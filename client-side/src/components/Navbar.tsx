import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo or Site Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              MonSite
            </Link>
          </div>

          {/* Saved Jobs Link */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/saved-jobs"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Saved Jobs
              </Link>
            </div>
          </div>

          {/* Profile Dropdown */}
          <div className="ml-3 relative">
            <div>
              <button
                onClick={toggleDropdown}
                className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://via.placeholder.com/150"
                  alt="User Profile"
                />
              </button>
            </div>
            {dropdownOpen && <DropdownMenu />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
