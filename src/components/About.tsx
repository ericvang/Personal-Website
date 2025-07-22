import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-24 section-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-gray-400 mb-12 fade-in-up">
            Info about me:
          </h2>
          <div className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed space-y-6">
            <p>
              Originally from Brooklyn Park, MN. I am currently a rising junior at UW-Madison studying Computer Science and Data Science.
            </p>
            <p>
            My work spans across full-stack development, machine learning, and inclusive design. I’ve used tools like Python, JavaScript, Flask, React, Unity, and scikit-learn in projects ranging from hackathons to academic projects. 
            My current occupation is a Start-Up SWE Intern at DarkHorse Solutions LLC where I am working on a RFID Project, an AI-Developer at the UW-Madison SAIL program sponsored by OpenAI, and an Adaptive Technology Assistant at the McBurney Center.
            </p>
            <p>
              When I'm not coding, you'll find me working out, enjoying the outdoors, taking naps, and trying new foods!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
