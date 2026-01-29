'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';

interface BottleOption {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  price: string;
}

const bottles: BottleOption[] = [
  {
    id: 'islay',
    name: 'Islay',
    description: 'Classic Islay style bottle with elegant proportions',
    image: '/bottle-builder/bottles/bottle_islay.png',
    tags: ['Hallmark', 'Portfolio'],
    price: 'From £25 per bottle'
  },
  {
    id: 'littleSumo',
    name: 'Little Sumo',
    description: 'Compact and distinctive design',
    image: '/bottle-builder/bottles/bottle_littleSumo.png',
    tags: ['Portfolio'],
    price: 'From £25 per bottle'
  },
  {
    id: 'tallRoundFlint',
    name: 'Tall Round Flint',
    description: 'Tall and refined silhouette',
    image: '/bottle-builder/bottles/bottle_tallRoundFlint.png',
    tags: ['Select', 'Hallmark', 'Portfolio'],
    price: 'From £10 per bottle'
  }
];

const BottleConfigurator = () => {
  const [selectedBottle, setSelectedBottle] = useState(bottles[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const bottleContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);

  const handleBottleSelect = (bottle: BottleOption, index: number) => {
    // Only handle scrolling for mobile (scrollContainerRef is only attached to mobile version)
    const scrollContainer = scrollContainerRef.current;

    // Update selected bottle
    if (bottle.id !== selectedBottle.id) {
      setSelectedBottle(bottle);
    }

    // If not mobile, no scrolling needed
    if (!scrollContainer) return;

    // Prevent scroll listener from interfering
    isClickScrolling.current = true;

    // Small delay to ensure any DOM updates are complete
    setTimeout(() => {
      const buttons = scrollContainer.querySelectorAll('button');
      const targetButton = buttons[index] as HTMLElement;

      if (targetButton) {
        // Get the container's viewport and dimensions
        const containerRect = scrollContainer.getBoundingClientRect();
        const buttonRect = targetButton.getBoundingClientRect();

        // Calculate centers
        const containerCenterX = containerRect.width / 2;
        const buttonCenterX = buttonRect.left - containerRect.left + (buttonRect.width / 2);

        // Calculate how much to scroll
        const scrollAmount = buttonCenterX - containerCenterX;

        // Scroll to center the button
        scrollContainer.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });

        // Re-enable scroll listener after animation completes
        setTimeout(() => {
          isClickScrolling.current = false;
        }, 800);
      } else {
        isClickScrolling.current = false;
      }
    }, 10);
  };

  // Auto-select bottle on mobile when scrolled into view
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      // Skip if click scrolling
      if (isClickScrolling.current) return;

      const containerRect = scrollContainer.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;

      const bottleElements = scrollContainer.querySelectorAll('button');
      let closestIndex = -1;
      let closestDistance = Infinity;

      bottleElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(centerX - elementCenterX);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex >= 0 && closestIndex < bottles.length) {
        const newBottle = bottles[closestIndex];
        if (newBottle && newBottle.id !== selectedBottle.id) {
          setSelectedBottle(newBottle);
        }
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [selectedBottle.id]);

  return (
    <div className="h-screen bg-black overflow-hidden flex flex-col">
      {/* Top info bar */}
      <div className="fixed top-0 left-0 right-0 z-40 pt-20 flex-shrink-0">
        <div className="bg-black/80 backdrop-blur-sm border-b border-[#F6F1E9]/10">
          <div className="max-w-7xl mx-auto px-8 py-3 text-center">
            <p className="text-[#F6F1E9] text-sm tracking-widest">
              {selectedBottle.name} | {selectedBottle.description} | {selectedBottle.price}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 pt-[136px] min-h-0">
        {/* Left side - Scene with bottle */}
        <div className="h-[50vh] lg:h-auto lg:w-2/3 relative bg-black flex items-center justify-center lg:flex-1 flex-shrink-0">
          {/* Background scene */}
          <div className="absolute inset-0">
            <Image
              src="/bottle-builder/scenes/ts-office.jpeg"
              alt="Tailored Spirits Office"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Bottle display */}
          <div
            ref={bottleContainerRef}
            className="absolute inset-0 z-10"
          >
            {bottles.map((bottle) => (
              <div
                key={bottle.id}
                className="absolute inset-0 transition-opacity duration-700 ease-out"
                style={{
                  opacity: bottle.id === selectedBottle.id ? 1 : 0,
                  zIndex: bottle.id === selectedBottle.id ? 20 : 10,
                  pointerEvents: bottle.id === selectedBottle.id ? 'auto' : 'none',
                }}
              >
                <Image
                  src={bottle.image}
                  alt={bottle.name}
                  fill
                  className="object-cover"
                  priority={bottle.id === selectedBottle.id}
                />
              </div>
            ))}
          </div>

        </div>

        {/* Right side - Configuration panel */}
        <div className="lg:w-1/3 bg-[#0A0A0A] border-l border-[#F6F1E9]/10 overflow-hidden flex-shrink-0 lg:h-auto flex flex-col min-h-0">
          <div className="p-6 flex-1 flex flex-col overflow-hidden min-h-0">
            {/* Header */}
            <div className="mb-6 flex-shrink-0">
              <p className="text-[#F6F1E9]/60 text-xs tracking-widest mb-2">
                TAILORED SPIRITS
              </p>
              <h2 className="text-xl font-bold text-[#F6F1E9] tracking-tight">
                Choose your bottle option
              </h2>
            </div>

            {/* Bottle options - Desktop */}
            <div className="hidden lg:flex lg:flex-col lg:space-y-3 lg:flex-1 lg:overflow-y-auto lg:pr-2 scrollbar-hide">
              {bottles.map((bottle, index) => (
                <button
                  key={bottle.id}
                  onClick={() => handleBottleSelect(bottle, index)}
                  className={`text-left p-6 rounded-lg border-2 transition-all duration-300 ${
                    bottle.id === selectedBottle.id
                      ? 'border-[#F6F1E9] bg-[#F6F1E9]/5'
                      : 'border-[#F6F1E9]/20 hover:border-[#F6F1E9]/40 hover:bg-[#F6F1E9]/5'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    {/* Thumbnail */}
                    <div className="relative w-32 h-48 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <div className="relative w-full h-full scale-[2.5]">
                        <Image
                          src={bottle.image}
                          alt={bottle.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-[#F6F1E9] tracking-tight mb-2">
                        {bottle.name}
                      </h3>
                      <p className="text-sm text-[#F6F1E9]/70 leading-relaxed mb-3">
                        {bottle.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {bottle.tags.map((tag) => (
                          <Badge key={tag} variant="default">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-[#F6F1E9]/80 font-medium">
                        {bottle.price}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Bottle options - Mobile */}
            <div
              ref={scrollContainerRef}
              className="lg:hidden flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {bottles.map((bottle, index) => (
                <button
                  key={bottle.id}
                  onClick={() => handleBottleSelect(bottle, index)}
                  className={`w-[75vw] flex-shrink-0 text-left p-4 rounded-lg border-2 transition-all duration-300 snap-center ${
                    bottle.id === selectedBottle.id
                      ? 'border-[#F6F1E9] bg-[#F6F1E9]/5'
                      : 'border-[#F6F1E9]/20 hover:border-[#F6F1E9]/40 hover:bg-[#F6F1E9]/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-28 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <div className="relative w-full h-full scale-[2.5]">
                        <Image
                          src={bottle.image}
                          alt={bottle.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-[#F6F1E9] tracking-tight mb-1">
                        {bottle.name}
                      </h3>
                      <p className="text-xs text-[#F6F1E9]/70 leading-relaxed mb-2">
                        {bottle.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-1.5">
                        {bottle.tags.map((tag) => (
                          <Badge key={tag} variant="default">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-[#F6F1E9]/80 font-medium">
                        {bottle.price}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-4 pt-4 border-t border-[#F6F1E9]/10 flex-shrink-0">
              <button
                onClick={() => setShowModal(true)}
                className="w-full px-6 py-3 bg-[#F6F1E9] text-black tracking-widest text-xs font-medium hover:bg-[#F6F1E9]/90 transition-colors duration-300 rounded-full"
              >
                CONTINUE TO CUSTOMISATION
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#0A0A0A] border-2 border-[#F6F1E9]/20 rounded-lg p-12 max-w-md mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex justify-center">
              <Image
                src="/immin8-logo.svg"
                alt="Immin8"
                width={80}
                height={80}
                className="opacity-90"
              />
            </div>
            <h3 className="text-3xl font-bold text-[#F6F1E9] tracking-tight mb-4">
              Coming soon...
            </h3>
            <p className="text-[#F6F1E9]/70 text-base mb-8">
              Looking forward to building with you.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-8 py-3 bg-[#F6F1E9] text-black tracking-widest text-xs font-medium hover:bg-[#F6F1E9]/90 transition-colors duration-300 rounded-full"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottleConfigurator;
