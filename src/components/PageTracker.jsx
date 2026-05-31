import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/tracking';

/**
 * PageTracker — fires a virtual PageView on every SPA route change.
 * Place this inside <BrowserRouter> so useLocation() is available.
 *
 * The initial PageView is handled by the inline Pixel script in index.html.
 * This component handles subsequent client-side navigations.
 */
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Skip the initial mount — the inline script already fired PageView
    const isInitialLoad = !window.__PAGE_TRACKER_INIT__;
    if (isInitialLoad) {
      window.__PAGE_TRACKER_INIT__ = true;
      return;
    }
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
};

export default PageTracker;
