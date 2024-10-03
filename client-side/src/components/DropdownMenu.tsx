import React from 'react';
import { Link } from 'react-router-dom';

const DropdownMenu: React.FC = () => {
  return (
    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
      <Link
        to="/profile"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Account
      </Link>
      <Link
        to="/home"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Logout
      </Link>
    </div>
  );
};

export default DropdownMenu;