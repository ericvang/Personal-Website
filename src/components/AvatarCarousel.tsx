import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AvatarImage {
  id: number;
  src: string;
  alt: string;
}

const images: AvatarImage[] = [
  { id: 1, src: 'AvatarIcon.jpeg', alt: 'Professional Avatar' },
  { id: 2, src: 'Eric.JPG', alt: 'Eric' },
  { id: 3, src: 'professional.JPG', alt: 'Headshot' },
];

const AvatarCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate images when not hovered
  useEffect(() => {
    if (!isHovered) {
      const rotateInterval = setInterval(() => {
        nextImage();
      }, 5000); // Change image every 5 seconds
      return () => clearInterval(rotateInterval);
    }
  }, [isHovered]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-[20rem] h-[20rem] sm:w-[24rem] sm:h-[24rem] md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] floating-avatar">
      <div 
        className="relative w-full h-full bg-transparent group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Border Circle */}
        <div className="absolute inset-0 rounded-full border-[4px] sm:border-[5px] md:border-[6px] border-green-600/30"></div>
        
        {/* Images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={images[currentImage].src}
              alt={images[currentImage].alt}
              className="absolute inset-0 w-full h-full rounded-full object-cover mix-blend-multiply p-1 sm:p-1.5 md:p-2"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - Only visible on hover */}
        {isHovered && (
          <>
            <button 
              onClick={previousImage}
              className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-white transition-colors"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-white transition-colors"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Navigation Dots */}
        <div className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-colors ${
                index === currentImage ? 'bg-green-600' : 'bg-green-600/30'
              }`}
            />
          ))}
        </div>

        {/* Auto-rotate reminder */}
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute -top-8 sm:-top-10 md:-top-12 left-1/2 -translate-x-1/2 bg-white/90 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg"
          >
            <p className="text-xs sm:text-sm text-gray-600">Hover to pause rotation</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AvatarCarousel; 