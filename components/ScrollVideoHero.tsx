'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const TOTAL_FRAMES = 240;
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

        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />

        {imagesLoaded && (
          <>
            <div
              className="absolute inset-0 flex items-center justify-center text-center pointer-events-none"
              style={{
                opacity: scrollProgress > 0.2 ? Math.max(0, 1 - (scrollProgress - 0.2) / 0.05) : 1,
                transform: 'translateY(0px)',
              }}
            >
              <div className="px-8 max-w-6xl">
                <p className="text-lg md:text-xl text-[#F6F1E9]/80 tracking-widest font-normal mb-4">
                  WE CREATE EXTRAORDINARY
                </p>
                <h1 className="text-7xl md:text-9xl font-bold text-[#F6F1E9] tracking-tight leading-none">
                  TAILORED
                  <br />
                  SPIRITS CO
                </h1>
              </div>
            </div>

            <div
              className="absolute inset-0 flex items-center justify-center text-center pointer-events-none"
              style={{
                opacity: getTextOpacity(0.3, 0.55),
                transform: `translateY(${getTextTransform(0.3, 0.55)}px)`,
              }}
            >
              <div className="px-8 max-w-6xl">
                <h2 className="text-7xl md:text-9xl font-bold text-[#F6F1E9] tracking-tight leading-none">
                  YOUR
                  <br />
                  CASK
                </h2>
              </div>
            </div>

            <div
              className="absolute inset-0 flex items-center justify-center text-center pointer-events-none"
              style={{
                opacity: getTextOpacity(0.6, 0.85),
                transform: `translateY(${getTextTransform(0.6, 0.85)}px)`,
              }}
            >
              <div className="px-8 max-w-6xl">
                <h2 className="text-7xl md:text-9xl font-bold text-[#F6F1E9] tracking-tight leading-none">
                  YOUR
                  <br />
                  SPIRIT
                </h2>
              </div>
            </div>

            <div
              className="absolute inset-0 flex items-center justify-center text-center pointer-events-none"
              style={{
                opacity: scrollProgress < 0.85 ? 0 : Math.min(1, (scrollProgress - 0.85) / 0.1),
                transform: `translateY(${scrollProgress < 0.85 ? 50 : Math.max(0, 50 - ((scrollProgress - 0.85) / 0.1) * 50)}px)`,
              }}
            >
              <div className="px-8 max-w-6xl">
                <h2 className="text-7xl md:text-9xl font-bold text-[#F6F1E9] tracking-tight leading-tight mb-8">
                  YOUR
                  <br />
                  CREATION
                </h2>
                <button className="px-12 py-4 bg-[#F6F1E9] text-black tracking-widest text-sm hover:bg-[#F6F1E9]/90 transition-colors duration-300 pointer-events-auto rounded-full">
                  DESIGN YOUR BOTTLING
                </button>
              </div>
            </div>

            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
              style={{
                opacity: scrollProgress > 0.1 ? 0 : 1,
                transition: 'opacity 0.3s ease-out',
              }}
            >
              <div className="flex flex-col items-center gap-2 animate-bounce">
                <span className="text-[#F6F1E9]/60 text-xs tracking-widest">SCROLL</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#F6F1E9]/60"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScrollVideoHero;
