import React, { useState, useRef, useEffect } from 'react';

const Carousel = ({ items, renderItem, title, className = "", itemsPerView = { mobile: 1, desktop: 3 } }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);

  // Detectar si es móvil
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const getItemsPerView = () => {
    return isMobile ? itemsPerView.mobile : itemsPerView.desktop;
  };

  const getMaxIndex = () => {
    const itemsPerViewCount = getItemsPerView();
    return Math.max(0, items.length - itemsPerViewCount);
  };


  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Touch events para móvil
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !isMobile) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (!isDragging || !isMobile) return;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    const threshold = 50; // Mínimo de píxeles para considerar un swipe
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swipe izquierda - siguiente slide
        goToNext();
      } else {
        // Swipe derecha - slide anterior
        goToPrevious();
      }
    }
    
    setIsDragging(false);
  };

  const goToNext = () => {
    const maxIndex = getMaxIndex();
    setCurrentIndex(prev => prev < maxIndex ? prev + 1 : 0);
  };

  const goToPrevious = () => {
    const maxIndex = getMaxIndex();
    setCurrentIndex(prev => prev > 0 ? prev - 1 : maxIndex);
  };


  if (!items || items.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="text-gray-500 text-lg">Cargando...</div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {title && (
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 text-center">
          {title}
        </h2>
      )}
      
      <div className="relative overflow-hidden rounded-2xl" style={{ width: '100%' }}>
        <div
          ref={carouselRef}
          className={`flex transition-transform duration-500 ease-in-out ${isMobile ? 'touch-pan-x' : ''}`}
          style={{ 
            transform: `translateX(-${currentIndex * (100 / getItemsPerView())}%)`,
            touchAction: isMobile ? 'pan-x' : 'auto'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item, index) => (
            <div 
              key={item.id || index} 
              className="flex-shrink-0 px-1 md:px-2"
              style={{ width: `${100 / getItemsPerView()}%` }}
            >
              <div className="h-full">
                {renderItem(item, index)}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Dots indicator */}
      {getMaxIndex() > 0 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: getMaxIndex() + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
