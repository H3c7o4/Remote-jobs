import React from 'react';

const FeaturesSection: React.FC = () => {
  return (
    <section className="text-gray-700 body-font border-t border-gray-200">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">FEATURES</h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Why Choose Us?</h1>
        </div>
        <div className="flex flex-wrap -m-4">
          <div className="p-4 md:w-1/3">
            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
              <h2 className="text-gray-900 text-lg title-font font-medium">Explore Jobs</h2>
              <p className="leading-relaxed text-base">Browse through numerous job opportunities tailored to your skills and preferences.</p>
            </div>
          </div>
          <div className="p-4 md:w-1/3">
            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
              <h2 className="text-gray-900 text-lg title-font font-medium">Map Integration</h2>
              <p className="leading-relaxed text-base">Visualize job listings on a map to easily find opportunities near you.</p>
            </div>
          </div>
          <div className="p-4 md:w-1/3">
            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
              <h2 className="text-gray-900 text-lg title-font font-medium">User-Friendly</h2>
              <p className="leading-relaxed text-base">Our platform is designed for ease of use, helping you find jobs quickly and efficiently.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
