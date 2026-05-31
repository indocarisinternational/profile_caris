import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

const HomeEditor = () => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .eq("section", "home");

    if (error) {
      toast.error("Failed to load content: " + error.message);
    } else {
      const map = {};
      data.forEach((row) => (map[row.key] = { id: row.id, value: row.value }));
      setContent(map);
    }
    setLoading(false);
  };

  const handleChange = (key, value) => {
    setContent((prev) => ({
      ...prev,
      [key]: { ...prev[key], value },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = Object.entries(content).map(([key, { id, value }]) =>
        supabase
          .from("site_content")
          .update({ value, updated_at: new Date().toISOString() })
          .eq("id", id)
      );
      const results = await Promise.all(updates);
      const failed = results.find((r) => r.error);
      if (failed) throw new Error(failed.error.message);
      toast.success("Home section updated successfully!");
    } catch (err) {
      toast.error("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const fields = [
    { key: "badge_text", label: "Badge Text", type: "text" },
    { key: "hero_title", label: "Hero Title", type: "text" },
    { key: "hero_subtitle", label: "Hero Subtitle", type: "textarea" },
    { key: "cta_primary", label: "Primary CTA Button", type: "text" },
    { key: "cta_secondary", label: "Secondary CTA Button", type: "text" },
    { key: "feature_1", label: "Feature Badge 1", type: "text" },
    { key: "feature_2", label: "Feature Badge 2", type: "text" },
    { key: "feature_3", label: "Feature Badge 3", type: "text" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Home Section</h1>
          <p className="text-white/30 text-sm mt-1">Edit the homepage hero area and feature badges</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-white/90 active:scale-95 transition-all disabled:opacity-50"
        >
          <Icon icon={saving ? "solar:refresh-bold" : "solar:diskette-bold"} className={saving ? "animate-spin" : ""} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 space-y-6">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/30">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                value={content[field.key]?.value || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all text-sm resize-none"
              />
            ) : (
              <input
                type="text"
                value={content[field.key]?.value || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all text-sm"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeEditor;
