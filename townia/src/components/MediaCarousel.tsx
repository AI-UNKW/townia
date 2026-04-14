// src/components/MediaCarousel.tsx
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface MediaCarouselProps {
  media: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function MediaCarousel({
  media,
  initialIndex,
  isOpen,
  onClose,
}: MediaCarouselProps) {

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen && media.length > 0) {
      setCurrentIndex(Math.min(initialIndex, media.length - 1));
    }
  }, [isOpen, initialIndex, media]);

  if (!isOpen || media.length === 0) return null;

  const currentMedia = media[currentIndex];
  const isVideo = currentMedia?.endsWith('.mp4') || currentMedia?.includes('video');

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      className="fixed inset-0 bg-black/95 z-[80] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-[1100px]">

        {/* Close Button - più elegante */}
        <button
          onClick={onClose}
          className="absolute -top-16 right-4 text-white/80 hover:text-white text-4xl p-3 rounded-full hover:bg-white/10 transition-all z-10"
        >
          ✕
        </button>

        {/* Main Content */}
        <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Media */}
          <div className="flex items-center justify-center min-h-[300px] max-h-[82vh]">
            {isVideo ? (
              <video
                src={currentMedia}
                controls
                autoPlay
                loop
                className="max-h-[82vh] w-auto max-w-full object-contain"
              />
            ) : (
              <img
                src={currentMedia}
                alt={`Media ${currentIndex + 1}`}
                className="max-h-[82vh] w-auto max-w-full object-contain"
              />
            )}
          </div>

          {/* Navigation Arrows - più sottili e posizionate meglio */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all backdrop-blur-md"
          >
            <ChevronLeft size={28} strokeWidth={3} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all backdrop-blur-md"
          >
            <ChevronRight size={28} strokeWidth={3} />
          </button>
        </div>

        {/* Bottom Bar - molto più clean */}
        <div className="flex items-center justify-between mt-4 px-2">
          
          {/* Counter elegante */}
          <div className="text-white/80 text-lg font-medium tracking-wide">
            {currentIndex + 1} <span className="text-white/40">/ {media.length}</span>
          </div>

          {/* Indicators - piccoli e belli */}
          <div className="flex gap-2">
            {media.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-200 
                  ${idx === currentIndex 
                    ? 'bg-white w-8' 
                    : 'bg-white/40 hover:bg-white/60 w-4'}`}
              />
            ))}
          </div>

          {/* Spazio vuoto per bilanciamento */}
          <div className="w-10" />
        </div>
      </div>
    </div>
  );
}