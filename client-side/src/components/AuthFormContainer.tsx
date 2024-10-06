import React from 'react';
import { Link } from 'react-router-dom'; // Import de Link depuis react-router-dom

interface AuthFormContainerProps {
  title: string;
  children: React.ReactNode;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
}

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({ title, children, footerText, footerLink, footerLinkText }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
              className="w-32 mx-auto"
              alt="Logo"
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">{title}</h1>
            <div className="w-full flex-1 mt-8">{children}</div>
            <p className="mt-6 text-xs text-gray-600 text-center">
              {footerText}{' '}
              <Link to={footerLink} className="border-b border-gray-500 border-dotted">
                {footerLinkText}
              </Link>
            </p>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AuthFormContainer;
