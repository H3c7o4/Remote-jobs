import React from 'react';

const SocialLinks: React.FC = () => {
  return (
    <div className="fixed right-4 bottom-4 flex flex-col space-y-4">
      <a href="https://linkedin.com">
        <i className="fab fa-linkedin text-blue-700 text-2xl"></i>
      </a>
      <a href="https://twitter.com">
        <i className="fab fa-twitter text-blue-400 text-2xl"></i>
      </a>
    </div>
  );
};

export default SocialLinks;