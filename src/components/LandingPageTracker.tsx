"use client";

import { useEffect } from "react";
import { trackLandingPageView } from "@/lib/gtag";

interface LandingPageTrackerProps {
  country: string;
  pageType: "philippines" | "vietnam" | "indonesia" | "nigeria" | "thailand" | "saudi-arabia" | "main";
}

export default function LandingPageTracker({ country, pageType }: LandingPageTrackerProps) {
  useEffect(() => {
    // Track landing page view
    trackLandingPageView(country, pageType);
  }, [country, pageType]);

  return null; // This component doesn't render anything
}
