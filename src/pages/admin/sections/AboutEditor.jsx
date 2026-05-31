import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

const Field = ({ label, value, onChange, multiline }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold uppercase tracking-widest text-white/30">{label}</label>
    {multiline ? (
      <textarea value={value} onChange={onChange} rows={3}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 text-sm resize-none" />
    ) : (
      <input type="text" value={value} onChange={onChange}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 text-sm" />
    )}
  </div>
);

const AboutEditor = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: rows, error } = await supabase.from("site_content").select("*").eq("section", "about");
      if (!error) {
        const m = {};
        rows.forEach((r) => (m[r.key] = { id: r.id, value: r.value }));
        setData(m);
      }
      setLoading(false);
    })();
  }, []);

  const v = (k) => data[k]?.value || "";
  const ch = (k, val) => setData((p) => ({ ...p, [k]: { ...p[k], value: val } }));

  const save = async () => {
    setSaving(true);
    try {
      const ups = Object.values(data).map(({ id, value }) =>
        supabase.from("site_content").update({ value, updated_at: new Date().toISOString() }).eq("id", id)
      );
      const res = await Promise.all(ups);
      if (res.some(r => r.error)) throw new Error("Some updates failed");
      toast.success("Saved About Section!");
    } catch (e) { toast.error(e.message); }
    setSaving(false);
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">About Page</h1>
          <p className="text-white/30 text-sm mt-1">Manage company profile, mission, vision and values</p>
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-white/90 disabled:opacity-50">
          <Icon icon={saving ? "solar:refresh-bold" : "solar:diskette-bold"} className={saving ? "animate-spin" : ""} />
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest opacity-50">Header</h3>
          <Field label="Page Title" value={v("page_title")} onChange={(e) => ch("page_title", e.target.value)} />
          <Field label="Page Description" value={v("page_description")} onChange={(e) => ch("page_description", e.target.value)} multiline />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest opacity-50">Mission</h3>
            <Field label="Title" value={v("mission_title")} onChange={(e) => ch("mission_title", e.target.value)} />
            <Field label="Text" value={v("mission_text")} onChange={(e) => ch("mission_text", e.target.value)} multiline />
          </div>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest opacity-50">Vision</h3>
            <Field label="Title" value={v("vision_title")} onChange={(e) => ch("vision_title", e.target.value)} />
            <Field label="Text" value={v("vision_text")} onChange={(e) => ch("vision_text", e.target.value)} multiline />
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest opacity-50 mb-4">Core Values</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="space-y-3 p-4 bg-white/5 rounded-xl border border-white/5">
                <Field label={`Value ${i} Title`} value={v(`value_${i}_title`)} onChange={(e) => ch(`value_${i}_title`, e.target.value)} />
                <Field label={`Value ${i} Text`} value={v(`value_${i}_text`)} onChange={(e) => ch(`value_${i}_text`, e.target.value)} multiline />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutEditor;
