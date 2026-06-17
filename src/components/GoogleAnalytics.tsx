"use client";

import { GoogleAnalytics } from "@next/third-parties/google";

export default function GoogleAnalyticsComponent() {
  // Replace "G-XXXXXXXXXX" with your actual GA4 Measurement ID
  // Get it from: https://analytics.google.com → Admin → Data Streams → Web Stream Details
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
