import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="text-gray-700 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Find Your Dream Job
            <br className="hidden lg:inline-block" /> Near You on the Map
          </h1>
          <p className="mb-8 leading-relaxed">
            Explore thousands of job listings and connect with employers nearby. 
            Discover your potential and take the next step in your career with us!
          </p>
          <div className="flex justify-center">
            <Link to="/signup">
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="https://bookdown.org/sammigachuhi/book-leaflet/clutter-points.jpg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
