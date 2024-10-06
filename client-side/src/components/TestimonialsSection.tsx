import React from 'react';

const testimonials = [
  {
    name: 'Alice M.',
    message: 'This app helped me find a great job in just a few days!',
  },
  {
    name: 'John D.',
    message: 'The job alerts feature is fantastic! I never miss an opportunity.',
  },
  {
    name: 'Sara K.',
    message: 'Easy to use and very effective for job searching.',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <div className="py-20 bg-indigo-600 text-white">
      <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-indigo-500 p-6 rounded-lg shadow-lg">
            <p className="italic mb-2">"{testimonial.message}"</p>
            <p className="font-semibold">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;