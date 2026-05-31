import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

const Field = ({ label, value, onChange, multiline }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold uppercase tracking-widest text-white/30">{label}</label>
    {multiline ? (
      <textarea value={value} onChange={onChange} rows={2}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 text-sm resize-none" />
    ) : (
      <input type="text" value={value} onChange={onChange}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 text-sm" />
    )}
  </div>
);

const ServicesEditor = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("services");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: rows, error } = await supabase
        .from("site_content").select("*").in("section", ["services", "pricing"]);
      if (!error) {
        const m = {};
        rows.forEach((r) => (m[`${r.section}.${r.key}`] = { id: r.id, value: r.value }));
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
      const entries = Object.entries(data).filter(([k]) => k.startsWith(tab));
      const ups = entries.map(([, { id, value }]) =>
        supabase.from("site_content").update({ value, updated_at: new Date().toISOString() }).eq("id", id)
      );
      const res = await Promise.all(ups);
      const fail = res.find((r) => r.error);
      if (fail) throw new Error(fail.error.message);
      toast.success("Saved!");
    } catch (e) { toast.error(e.message); }
    setSaving(false);
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Services & Pricing</h1>
          <p className="text-white/30 text-sm mt-1">Manage services and pricing tiers</p>
        </div>
        <button onClick={save} disabled={saving}
          className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-white/90 active:scale-95 disabled:opacity-50">
          <Icon icon={saving ? "solar:refresh-bold" : "solar:diskette-bold"} className={saving ? "animate-spin" : ""} />
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="flex gap-1 bg-white/5 rounded-xl p-1 mb-6 w-fit">
        {["services", "pricing"].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-bold capitalize ${tab === t ? "bg-white text-black" : "text-white/40 hover:text-white/70"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "services" ? (
        <div className="space-y-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 space-y-4">
            <Field label="Page Label" value={v("services.page_label")} onChange={(e) => ch("services.page_label", e.target.value)} />
            <Field label="Page Title" value={v("services.page_title")} onChange={(e) => ch("services.page_title", e.target.value)} />
            <Field label="Page Subtitle" value={v("services.page_subtitle")} onChange={(e) => ch("services.page_subtitle", e.target.value)} multiline />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 space-y-3">
                <h3 className="text-white font-bold text-sm">Service {i}</h3>
                <Field label="Title" value={v(`services.service_${i}_title`)} onChange={(e) => ch(`services.service_${i}_title`, e.target.value)} />
                <Field label="Description" value={v(`services.service_${i}_desc`)} onChange={(e) => ch(`services.service_${i}_desc`, e.target.value)} multiline />
                <Field label="Icon" value={v(`services.service_${i}_icon`)} onChange={(e) => ch(`services.service_${i}_icon`, e.target.value)} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 space-y-4">
            <Field label="Section Title" value={v("pricing.title")} onChange={(e) => ch("pricing.title", e.target.value)} />
            <Field label="Section Subtitle" value={v("pricing.subtitle")} onChange={(e) => ch("pricing.subtitle", e.target.value)} />
          </div>
          {["starter","professional","enterprise"].map((tier) => (
            <div key={tier} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 space-y-3">
              <h3 className="text-white font-bold capitalize">{tier} Tier</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Name" value={v(`pricing.${tier}_name`)} onChange={(e) => ch(`pricing.${tier}_name`, e.target.value)} />
                <Field label="Price" value={v(`pricing.${tier}_price`)} onChange={(e) => ch(`pricing.${tier}_price`, e.target.value)} />
              </div>
              <Field label="Description" value={v(`pricing.${tier}_desc`)} onChange={(e) => ch(`pricing.${tier}_desc`, e.target.value)} />
              <Field label="Features (pipe-separated)" value={v(`pricing.${tier}_features`)} onChange={(e) => ch(`pricing.${tier}_features`, e.target.value)} multiline />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesEditor;
