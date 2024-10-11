import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; 
import { useAuth } from '../context/AuthContext'; // Importer le contexte d'authentification

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth(); // Utiliser le contexte d'authentification
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo (fixé près du bord gauche) */}
          <div className="flex-shrink-0 pl-4">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              Remotivity
            </Link>
          </div>

          {/* Liens de navigation */}
          <div className="hidden md:flex flex-grow justify-end space-x-6 mr-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              About Us
            </Link>
            <Link
              to="/saved-jobs"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Saved Jobs
            </Link>
          </div>

          {/* Profil utilisateur (fixé près du bord droit) */}
          <div className="relative mr-4">
            {isAuthenticated && user ? ( // Vérification de l'authentification
              <>
                <button
                  onClick={toggleDropdown}
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={user.profile_pic} // Utiliser l'image de profil de l'utilisateur
                    alt="User Profile"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <Link
                      to={`/profile/${user.id}`} // Utiliser l'ID de l'utilisateur dans le chemin
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Account
                    </Link>
                    <Link
                      to="/" // Rediriger vers '/' lors de la déconnexion
                      onClick={() => {
                        logout(); // Déconnexion de l'utilisateur
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      Logout <FaSignOutAlt className="ml-2" />
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <Link to="/signin" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;