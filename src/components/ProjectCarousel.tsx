"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Project {
  image: string;
  alt: string;
  title: string;
  description: string;
  tags: { label: string; color: string }[];
}

interface ProjectCarouselProps {
  projects: Project[];
  title: string;
  subtitle: string;
}

export default function ProjectCarousel({ projects, title, subtitle }: ProjectCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  const updateScrollButtons = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    setCanScrollLeft(container.scrollLeft > 10);
    setCanScrollRight(container.scrollLeft < maxScrollLeft - 10);

    // Calculate which card is most visible
    const cardWidth = container.querySelector("div")?.clientWidth ?? 300;
    const gap = 24; // gap-6 = 1.5rem = 24px
    const index = Math.round(container.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, projects.length - 1));
  }, [projects.length]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateScrollButtons, { passive: true });
    // Check on mount and on resize
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [updateScrollButtons]);

  // Auto scroll left animation
  const startAutoScroll = useCallback(() => {
    stopAutoScroll();
    autoScrollInterval.current = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;
      
      const cardWidth = container.querySelector("div")?.clientWidth ?? 300;
      const gap = 24;
      const scrollAmount = cardWidth + gap;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      
      // If reached the end, scroll back to start
      if (container.scrollLeft >= maxScrollLeft - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3000); // Scroll every 3 seconds
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  }, []);

  // Start auto scroll on mount
  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [startAutoScroll, stopAutoScroll]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.querySelector("div")?.clientWidth ?? 300;
    const gap = 24;
    const scrollAmount = cardWidth + gap;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section 
      className="py-16 bg-gray-50"
      onMouseEnter={stopAutoScroll}
      onMouseLeave={startAutoScroll}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {title}
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
          {subtitle}
        </p>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors -ml-5 md:-ml-5"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors -mr-5 md:-mr-5"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Scrollable Project Cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="min-w-[260px] sm:min-w-[300px] md:min-w-[350px] flex-shrink-0 snap-start bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`text-xs px-2 py-1 rounded-full ${tag.color}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const container = scrollRef.current;
                if (!container) return;
                const cardWidth = container.querySelector("div")?.clientWidth ?? 300;
                const gap = 24;
                container.scrollTo({
                  left: index * (cardWidth + gap),
                  behavior: "smooth",
                });
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-steel w-6" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
