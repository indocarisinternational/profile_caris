/**
 * Tracking Utilities — Indo Caris International
 * Meta Pixel + GTM dataLayer integration for SPA route tracking
 *
 * Usage:
 *   import { trackLead, trackCTAClick } from '../utils/tracking';
 *   trackLead({ content_name: 'contact_form' });
 *   trackCTAClick('hero_cta', '/contact');
 */

/** Check if Meta Pixel SDK is loaded */
export const isPixelLoaded = () =>
  typeof window !== 'undefined' && typeof window.fbq === 'function';

/** Check if GTM dataLayer is available */
export const isGTMLoaded = () =>
  typeof window !== 'undefined' && Array.isArray(window.dataLayer);

/**
 * Fire a virtual PageView for SPA route changes.
 * Called automatically by the <PageTracker /> component.
 */
export const trackPageView = (path) => {
  if (isPixelLoaded()) {
    window.fbq('track', 'PageView');
  }
  if (isGTMLoaded()) {
    window.dataLayer.push({
      event: 'virtualPageview',
      page: { path, title: document.title },
    });
  }
};

/**
 * Track a lead / contact form submission.
 * Maps to Meta Pixel "Lead" standard event + GTM "generate_lead".
 */
export const trackLead = (data = {}) => {
  if (isPixelLoaded()) {
    window.fbq('track', 'Lead', data);
  }
  if (isGTMLoaded()) {
    window.dataLayer.push({ event: 'generate_lead', ...data });
  }
};

/**
 * Track a CTA button click.
 * Custom event for measuring engagement with key conversion elements.
 */
export const trackCTAClick = (ctaName, destination) => {
  if (isPixelLoaded()) {
    window.fbq('trackCustom', 'CTAClick', { cta: ctaName, destination });
  }
  if (isGTMLoaded()) {
    window.dataLayer.push({
      event: 'cta_click',
      cta_name: ctaName,
      cta_destination: destination,
    });
  }
};

/**
 * Track viewing a specific service or content piece.
 * Maps to Meta Pixel "ViewContent" standard event.
 */
export const trackViewContent = (contentName, contentCategory) => {
  if (isPixelLoaded()) {
    window.fbq('track', 'ViewContent', {
      content_name: contentName,
      content_category: contentCategory,
    });
  }
  if (isGTMLoaded()) {
    window.dataLayer.push({
      event: 'view_content',
      content_name: contentName,
      content_category: contentCategory,
    });
  }
};
