import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const SignUpSuccess: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28 flex-grow">
        {/* Image section */}
        <div className="w-full lg:w-1/2">
          <img
            className="hidden lg:block"
            src="https://theraise.eu/wp-content/uploads/2023/12/success.jpg" 
            alt="Sign Up Success"
          />
          <img
            className="hidden md:block lg:hidden"
            src="https://theraise.eu/wp-content/uploads/2023/12/success.jpg"
            alt="Sign Up Success"
          />
          <img
            className="md:hidden"
            src="https://theraise.eu/wp-content/uploads/2023/12/success.jpg"
            alt="Sign Up Success"
          />
        </div>

        {/* Text section */}
        <div className="w-full lg:w-1/2">
          <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-white">
            Your account has been successfully created!
          </h1>
          <p className="py-4 text-base text-gray-800 dark:text-white">
            Thank you for signing up! Now, go to your mail box and verify your account.
          </p>
          <p className="py-2 text-base text-gray-800 dark:text-white">
            If you have any issues, feel free to contact our support team.
          </p>
          {/* Button to go to Sign In page */}
          <Link to="/signin">
            <button className="w-full lg:w-auto my-4 rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
              Go to Sign In
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpSuccess;