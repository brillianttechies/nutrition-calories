// src/utils/gaEvents.ts
export const GA_TRACKING_ID = "G-HS73LNP2T9"; // your GA ID

// Generic event tracker
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if ((window as any).gtag) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
