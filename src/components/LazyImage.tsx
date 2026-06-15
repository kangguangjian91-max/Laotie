"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image, { ImageProps } from "next/image";

interface LazyImageProps extends Omit<ImageProps, "onLoad"> {
  fallbackSrc?: string;
  blurDataURL?: string;
}

/**
 * Enhanced lazy loading image component
 * - Uses Intersection Observer for true lazy loading
 * - Shows skeleton placeholder while loading
 * - Smooth fade-in transition
 * - Supports blur-up effect
 */
export default function LazyImage({
  src,
  alt,
  fallbackSrc,
  blurDataURL,
  className = "",
  onLoadingComplete,
  fill,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for true lazy loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  // Set image src only when in view
  useEffect(() => {
    if (isInView && src) {
      setImgSrc(typeof src === "string" ? src : src.src);
    }
  }, [isInView, src]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    if (onLoadingComplete) {
      // Note: Next.js Image onLoadingComplete has different signature
      // This is a simplified version
    }
  }, [onLoadingComplete]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${fill ? "w-full h-full" : ""}`}>
      {/* Skeleton placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
      )}

      {/* Blur placeholder (if provided) */}
      {!isLoaded && blurDataURL && (
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-lg scale-110"
          style={{ backgroundImage: `url(${blurDataURL})` }}
        />
      )}

      {/* Actual image - only rendered when in view */}
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={alt}
          fill={fill}
          className={`${className} transition-opacity duration-500 ease-in-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleLoad}
          {...props}
        />
      )}
    </div>
  );
}
