import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

/**
 * Reusable hook to fetch site_content from Supabase by section.
 * Returns a key-value map: { [key]: value }.
 * Falls back to provided defaults if DB returns empty or errors.
 *
 * @param {string|string[]} sections — section name(s) to fetch
 * @param {Object} defaults — fallback values keyed by field name
 * @returns {{ content: Object, loading: boolean }}
 */
const useSiteContent = (sections, defaults = {}) => {
  const [content, setContent] = useState(defaults);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetch = async () => {
      try {
        const sectionList = Array.isArray(sections) ? sections : [sections];
        const { data, error } = await supabase
          .from("site_content")
          .select("section, key, value")
          .in("section", sectionList);

        if (error) {
          console.warn("[useSiteContent] Fetch error:", error.message);
          return;
        }

        if (!cancelled && data && data.length > 0) {
          const map = { ...defaults };
          data.forEach((row) => {
            // For multi-section fetches, prefix with section name
            const k = sectionList.length > 1
              ? `${row.section}.${row.key}`
              : row.key;
            if (row.value !== null && row.value !== undefined) {
              map[k] = row.value;
            }
          });
          setContent(map);
        }
      } catch (err) {
        console.warn("[useSiteContent] Unexpected error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetch();
    return () => { cancelled = true; };
  }, []);

  return { content, loading };
};

export default useSiteContent;
