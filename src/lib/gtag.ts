/**
 * GA4 Event Tracking Utility Functions
 * Measurement ID: G-74QWNLKHEH
 *
 * Usage:
 * import { trackWhatsAppClick } from "@/lib/gtag";
 * trackWhatsAppClick("floating_button");
 */

// Check if gtag is available
const isGtagAvailable = () => {
  return typeof window !== "undefined" && typeof (window as any).gtag === "function";
};

// Generic event tracking function
export const trackEvent = (
  eventName: string,
  parameters: Record<string, any> = {}
) => {
  if (!isGtagAvailable()) {
    console.warn("GA4 gtag not available");
    return;
  }

  (window as any).gtag("event", eventName, {
    ...parameters,
    // Add timestamp for debugging
    event_time: new Date().toISOString(),
  });
};

// Track WhatsApp clicks
export const trackWhatsAppClick = (
  location: "floating_button" | "contact_page" | "header" | "footer" | "landing_page"
) => {
  trackEvent("whatsapp_click", {
    event_category: "contact",
    event_label: location,
    value: 1,
  });
};

// Track Email clicks
export const trackEmailClick = (
  location: "contact_page" | "header" | "footer" | "landing_page"
) => {
  trackEvent("email_click", {
    event_category: "contact",
    event_label: location,
    value: 1,
  });
};

// Track Phone clicks
export const trackPhoneClick = (
  location: "contact_page" | "header" | "footer" | "landing_page"
) => {
  trackEvent("phone_click", {
    event_category: "contact",
    event_label: location,
    value: 1,
  });
};

// Track Contact Form submissions
export const trackFormSubmit = (
  formType: "contact" | "quote" | "landing_page",
  success: boolean = true
) => {
  trackEvent("form_submit", {
    event_category: "contact",
    event_label: formType,
    value: success ? 1 : 0,
    form_type: formType,
    form_success: success,
  });
};

// Track Project Case clicks
export const trackProjectClick = (
  projectName: string,
  projectLocation: string,
  clickSource: "carousel" | "grid" | "list"
) => {
  trackEvent("project_click", {
    event_category: "engagement",
    event_label: projectName,
    project_name: projectName,
    project_location: projectLocation,
    click_source: clickSource,
    value: 1,
  });
};

// Track Landing Page views (with custom parameters)
export const trackLandingPageView = (
  country: string,
  pageType: "philippines" | "vietnam" | "indonesia" | "nigeria" | "thailand" | "saudi-arabia" | "australia" | "main"
) => {
  trackEvent("landing_page_view", {
    event_category: "page_view",
    event_label: country,
    country: country,
    page_type: pageType,
    value: 1,
  });
};

// Track File downloads
export const trackFileDownload = (
  fileName: string,
  fileType: "brochure" | "specification" | "drawing" | "catalog" | "other"
) => {
  trackEvent("file_download", {
    event_category: "engagement",
    event_label: fileName,
    file_name: fileName,
    file_type: fileType,
    value: 1,
  });
};

// Track Outbound links (to Alibaba, etc.)
export const trackOutboundLink = (
  destination: string,
  linkType: "alibaba" | "supplier" | "partner" | "other"
) => {
  trackEvent("outbound_link", {
    event_category: "engagement",
    event_label: destination,
    destination: destination,
    link_type: linkType,
    value: 1,
  });
};

// Track Video plays (if any)
export const trackVideoPlay = (
  videoName: string,
  videoLocation: string
) => {
  trackEvent("video_play", {
    event_category: "engagement",
    event_label: videoName,
    video_name: videoName,
    video_location: videoLocation,
    value: 1,
  });
};

// Track Scroll depth (25%, 50%, 75%, 100%)
export const trackScrollDepth = (depthPercentage: number) => {
  trackEvent("scroll_depth", {
    event_category: "engagement",
    event_label: `${depthPercentage}%`,
    depth_percentage: depthPercentage,
    value: depthPercentage,
  });
};

// Track Time on page (10s, 30s, 60s, 180s)
export const trackTimeOnPage = (timeInSeconds: number) => {
  trackEvent("time_on_page", {
    event_category: "engagement",
    event_label: `${timeInSeconds}s`,
    time_seconds: timeInSeconds,
    value: timeInSeconds,
  });
};

// Track Search (if site search is implemented)
export const trackSiteSearch = (
  searchTerm: string,
  resultsCount: number
) => {
  trackEvent("site_search", {
    event_category: "engagement",
    event_label: searchTerm,
    search_term: searchTerm,
    results_count: resultsCount,
    value: 1,
  });
};

export default {
  trackEvent,
  trackWhatsAppClick,
  trackEmailClick,
  trackPhoneClick,
  trackFormSubmit,
  trackProjectClick,
  trackLandingPageView,
  trackFileDownload,
  trackOutboundLink,
  trackVideoPlay,
  trackScrollDepth,
  trackTimeOnPage,
  trackSiteSearch,
};
