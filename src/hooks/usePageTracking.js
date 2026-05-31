import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";

/**
 * Generate a UUID v4 for session tracking
 */
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Detect device type from screen width
 */
const getDeviceType = () => {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
};

/**
 * Parse browser name from userAgent
 */
const getBrowser = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("SamsungBrowser")) return "Samsung Browser";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  return "Other";
};

/**
 * Parse OS from userAgent
 */
const getOS = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac OS")) return "macOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  return "Other";
};

/**
 * Get or create session ID from sessionStorage
 */
const getSessionId = () => {
  const KEY = "caris_sid";
  let sid = sessionStorage.getItem(KEY);
  if (!sid) {
    sid = generateUUID();
    sessionStorage.setItem(KEY, sid);
  }
  return sid;
};

/**
 * Get country via ipapi.co free tier, cached in sessionStorage
 */
const getCountry = async () => {
  const KEY = "caris_country";
  const cached = sessionStorage.getItem(KEY);
  if (cached) return cached;

  try {
    const res = await fetch("https://ipapi.co/json/", {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error("ipapi failed");
    const data = await res.json();
    const country = data.country_name || "Unknown";
    sessionStorage.setItem(KEY, country);
    return country;
  } catch {
    sessionStorage.setItem(KEY, "Unknown");
    return "Unknown";
  }
};

/**
 * Lightweight visitor tracking hook.
 * Fires on every route change, inserts into Supabase `pageviews` table.
 * Skip admin routes to avoid polluting analytics.
 */
const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Don't track admin panel routes
    if (location.pathname.startsWith("/admin-panel")) return;

    const track = async () => {
      const sessionId = getSessionId();
      const country = await getCountry();

      const payload = {
        session_id: sessionId,
        path: location.pathname,
        referrer: document.referrer || "",
        country,
        device: getDeviceType(),
        browser: getBrowser(),
        os: getOS(),
      };

      // Fire-and-forget insert — don't block rendering
      supabase.from("pageviews").insert(payload).then(({ error }) => {
        if (error) {
          console.warn("[PageTracking] Insert failed:", error.message);
        }
      });
    };

    track();
  }, [location.pathname]);
};

export default usePageTracking;
