import React from 'react';
import AvatarCarousel from './AvatarCarousel';

const Hero = () => {
  return (
    <section id="portfolio" className="min-h-screen section-white relative px-6 pt-24">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto relative">
          <div className="text-left max-w-2xl mt-16">
            <div className="space-y-2 mb-12">
              <h1 className="font-baloo text-5xl md:text-7xl font-light text-gray-400 leading-tight fade-in-up fade-in-up-delay-1">
                hello,
              </h1>
              <h2 className="font-baloo text-5xl md:text-7xl font-light text-gray-400 leading-tight fade-in-up fade-in-up-delay-2">
                my name is
              </h2>
            </div>
            
            <h3 className="font-baloo text-6xl md:text-8xl font-bold text-green-600 mb-8 leading-tight fade-in-up fade-in-up-delay-3">
              Eric Vang
            </h3>
            
            <p className="text-xl text-gray-600 max-w-xl pr-4 fade-in-up fade-in-up-delay-3">
              I am a junior at UW-Madison studying Computer Science and Data Science. I aspire to be a full-stack developer building AI-powered applications that solve real problems. </p>
              <br></br>
              <p className="text-xl text-gray-600 max-w-xl pr-4 fade-in-up fade-in-up-delay-3">
              Currently, I am looking for a summer internship in software development, data analytics, or IT!
            </p>
          </div>
          
          <div className="absolute top-[60%] -translate-y-1/2 -right-16">
            <AvatarCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
