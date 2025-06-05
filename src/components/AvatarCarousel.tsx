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
    <div className="relative w-[80vw] h-[80vw] max-w-[32rem] max-h-[32rem] floating-avatar">
      <div 
        className="relative w-full h-full bg-transparent group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Border Circle */}
        <div className="absolute inset-0 rounded-full border-[2%] border-green-600/30"></div>
        
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
              className="absolute inset-0 w-full h-full rounded-full object-cover mix-blend-multiply p-[2%]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - Only visible on hover */}
        {isHovered && (
          <>
            <button 
              onClick={previousImage}
              className="absolute left-[5%] top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-[3%] shadow-lg hover:bg-white transition-colors"
            >
              <svg className="w-[8%] h-[8%] min-w-[1.5rem] min-h-[1.5rem] text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-[5%] top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-[3%] shadow-lg hover:bg-white transition-colors"
            >
              <svg className="w-[8%] h-[8%] min-w-[1.5rem] min-h-[1.5rem] text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Navigation Dots */}
        <div className="absolute -bottom-[15%] left-1/2 -translate-x-1/2 flex space-x-[2%]">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-[3%] h-[3%] min-w-[0.75rem] min-h-[0.75rem] rounded-full transition-colors ${
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
            className="absolute -top-[15%] left-1/2 -translate-x-1/2 bg-white/90 px-[4%] py-[2%] rounded-full shadow-lg"
          >
            <p className="text-[3%] min-text-[0.875rem] text-gray-600">Hover to pause rotation</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AvatarCarousel; 