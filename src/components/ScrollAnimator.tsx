"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

interface ScrollAnimatorProps {
  children: ReactNode;
  animation?: "fade-in" | "slide-in-left" | "slide-in-right" | "scale-up";
  delay?: number; // 延迟（毫秒）
  threshold?: number; // 触发阈值（0-1）
  className?: string;
}

/**
 * 滚动动画组件
 * 当元素进入视口时触发动画
 */
export default function ScrollAnimator({
  children,
  animation = "fade-in",
  delay = 0,
  threshold = 0.1,
  className = "",
}: ScrollAnimatorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 延迟触发动画
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(currentRef);
        }
      },
      { threshold }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, delay]);

  const animationClasses = {
    "fade-in": "opacity-0",
    "slide-in-left": "opacity-0 -translate-x-8",
    "slide-in-right": "opacity-0 translate-x-8",
    "scale-up": "opacity-0 scale-95",
  };

  const visibleClasses = {
    "fade-in": "opacity-100",
    "slide-in-left": "opacity-100 translate-x-0",
    "slide-in-right": "opacity-100 translate-x-0",
    "scale-up": "opacity-100 scale-100",
  };

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        isVisible
          ? ` ${visibleClasses[animation]}`
          : animationClasses[animation]
      }`}
    >
      {children}
    </div>
  );
}
