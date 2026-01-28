'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const TOTAL_FRAMES = 192;
const FRAME_PREFIX = '/tailored-hero/ezgif-frame-';

const ScrollVideoHero = () => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      const frameNumber = i.toString().padStart(3, '0');
      img.src = `${FRAME_PREFIX}${frameNumber}.jpg`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrollableHeight = scrollHeight - viewportHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      setScrollProgress(progress);

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(progress * TOTAL_FRAMES)
      );

      setCurrentFrame(frameIndex + 1);

      if (canvasRef.current && imagesRef.current[frameIndex]) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = imagesRef.current[frameIndex];

        if (ctx && img.complete) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [imagesLoaded]);

  const getTextOpacity = (start: number, end: number) => {
    if (scrollProgress < start) return 0;
    if (scrollProgress > end) return 0;

    const fadeInPoint = start + (end - start) * 0.2;
    const fadeOutPoint = start + (end - start) * 0.8;

    if (scrollProgress < fadeInPoint) {
      return (scrollProgress - start) / (fadeInPoint - start);
    }
    if (scrollProgress > fadeOutPoint) {
      return 1 - (scrollProgress - fadeOutPoint) / (end - fadeOutPoint);
    }
    return 1;
  };

  const getTextTransform = (start: number, end: number) => {
    if (scrollProgress < start || scrollProgress > end) return 50;

    const progress = (scrollProgress - start) / (end - start);
    return 50 - progress * 50;
  };

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-[#F6F1E9] text-xl tracking-widest">
              LOADING...
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: imagesLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        />

        {imagesLoaded && (
          <>
            <div
              className="absolute inset-0 flex items-center justify-center text-center pointer-events-none"
              style={{
                opacity: getTextOpacity(0, 0.25),
                transform: `translateY(${getTextTransform(0, 0.25)}px)`,
              }}
            >
              <div className="px-8">
                <h1 className="text-6xl md:text-8xl font-normal text-[#F6F1E9] tracking-wider mb-4">
                  TAILORED SPIRITS
                </h1>
                <p className="text-xl md:text-2xl text-[#F6F1E9]/90 tracking-wide font-normal">
                  Tailored Spirits Co.
                </p>
                <p className="text-lg md:text-xl text-[#F6F1E9]/80 tracking-wide font-light mt-2">
                  We create extraordinary
                </p>
              </div>
            </div>

            <div
              className="absolute inset-0 flex items-center justify-center text-center pointer-events-none"
              style={{
                opacity: getTextOpacity(0.3, 0.55),
                transform: `translateY(${getTextTransform(0.3, 0.55)}px)`,
              }}
            >
              <div className="px-8">
                <h2 className="text-5xl md:text-7xl font-normal text-[#F6F1E9] tracking-wider mb-4">
                  EXCELLENCE
                </h2>
                <p className="text-lg md:text-xl text-[#F6F1E9]/80 tracking-wide font-light">
                  Your cask.
                </p>
              </div>
            </div>

            <div
              className="absolute inset-0 flex items-center justify-center text-center pointer-events-none"
              style={{
                opacity: getTextOpacity(0.6, 0.85),
                transform: `translateY(${getTextTransform(0.6, 0.85)}px)`,
              }}
            >
              <div className="px-8">
                <h2 className="text-5xl md:text-7xl font-normal text-[#F6F1E9] tracking-wider mb-4">
                  HERITAGE
                </h2>
                <p className="text-lg md:text-xl text-[#F6F1E9]/80 tracking-wide font-light">
                  Your spirit.
                </p>
              </div>
            </div>

            <div
              className="absolute inset-0 flex items-center justify-center text-center pointer-events-none"
              style={{
                opacity: getTextOpacity(0.85, 1),
                transform: `translateY(${getTextTransform(0.85, 1)}px)`,
              }}
            >
              <div className="px-8">
                <h2 className="text-4xl md:text-6xl font-normal text-[#F6F1E9] tracking-wider mb-6">
                  DISCOVER YOUR SIGNATURE
                </h2>
                <p className="text-lg md:text-xl text-[#F6F1E9]/80 tracking-wide font-light mb-8">
                  Your Creation. Design your bottling
                </p>
                <button className="px-12 py-4 border border-[#F6F1E9] text-[#F6F1E9] tracking-widest text-sm hover:bg-[#F6F1E9] hover:text-black transition-colors duration-300 pointer-events-auto">
                  EXPLORE COLLECTION
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScrollVideoHero;
