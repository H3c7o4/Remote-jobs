import React from 'react';

interface ResumeSectionProps {
  resumeLink: string;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ resumeLink }) => {
  return (
    <div className="my-4">
      <h2 className="text-2xl font-semibold">Resume</h2>
      <a href={resumeLink} download className="text-blue-500">
        Download CV
      </a>
    </div>
  );
};

export default ResumeSection;
