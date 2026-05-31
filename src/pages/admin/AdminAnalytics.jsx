import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { Icon } from "@iconify/react";

const AdminAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30");
  const [threshold, setThreshold] = useState(() => localStorage.getItem("analytics_threshold") || "1000");

  useEffect(() => { 
    fetchAnalytics(true); 
    
    // Set up polling for real-time updates every 5 seconds
    const interval = setInterval(() => {
      fetchAnalytics(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [timeRange]);

  const fetchAnalytics = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - parseInt(timeRange));
    const { data: result, error } = await supabase.rpc("get_analytics_summary", {
      start_date: start.toISOString(),
      end_date: end.toISOString(),
    });
    if (!error && result) setData(result);
    else console.error("Analytics Error:", error);
    if (showLoading) setLoading(false);
  };

  const handleSetThreshold = (val) => {
    setThreshold(val);
    localStorage.setItem("analytics_threshold", val);
  };

  const getLeadSummary = () => {
    if (!data) return null;
    const topCountry = data.countries?.[0]?.country || "Unknown";
    const topDevice = data.devices?.[0]?.device || "Unknown";
    const topBrowser = data.browsers?.[0]?.browser || "Unknown";
    const visitors = data.unique_visitors || 0;
    return `Based on ${visitors} unique visitors in the last ${timeRange} days, your primary audience is from ${topCountry} using ${topDevice} devices with ${topBrowser} browser. Recommended Action: Optimize landing pages for ${topDevice} users in ${topCountry} to maximize conversions.`;
  };

  if (loading && !data) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" /></div>;
  }

  const isThresholdMet = data && data.unique_visitors >= parseInt(threshold);
  const maxDailyViews = Math.max(...(data?.daily_views?.map(d => d.views) || [1]));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-white/30 text-sm mt-1">Visitor insights and lead generation metrics</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl">
          {[7, 14, 30].map(days => (
            <button key={days} onClick={() => setTimeRange(days.toString())}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${timeRange === days.toString() ? "bg-white text-black" : "text-white/40 hover:text-white"}`}>
              {days}d
            </button>
          ))}
        </div>
      </div>

      {/* Lead Intelligence */}
      <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="solar:lightbulb-bolt-bold" className="text-blue-400 text-xl" />
              <h2 className="text-white font-bold text-lg">Lead Intelligence</h2>
            </div>
            {isThresholdMet ? (
              <p className="text-blue-200/80 text-sm leading-relaxed">{getLeadSummary()}</p>
            ) : (
              <p className="text-white/50 text-sm">Target threshold ({threshold} visitors) not yet met.</p>
            )}
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-white/5 min-w-[200px]">
            <label className="text-xs font-bold uppercase tracking-widest text-white/30 block mb-2">Alert Threshold</label>
            <div className="flex gap-2">
              <input type="number" value={threshold} onChange={(e) => handleSetThreshold(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 text-white focus:outline-none focus:border-white text-lg font-bold pb-1" />
              <span className="text-white/40 text-sm self-end pb-1">vis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid sm:grid-cols-3 gap-6">
        {[
          { label: "Unique Visitors", value: data?.unique_visitors || 0, icon: "solar:users-group-two-rounded-bold" },
          { label: "Total Page Views", value: data?.total_pageviews || 0, icon: "solar:eye-bold" },
          { label: "Bounce Rate", value: `${data?.bounce_rate || 0}%`, icon: "solar:routing-2-bold" },
        ].map((metric, i) => (
          <div key={i} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col justify-between h-32">
            <div className="flex items-center justify-between">
              <span className="text-white/40 font-bold text-xs uppercase tracking-widest">{metric.label}</span>
              <Icon icon={metric.icon} className="text-white/20 text-xl" />
            </div>
            <div className="text-3xl font-black text-white">{metric.value}</div>
          </div>
        ))}
      </div>

      {/* Daily Views Chart */}
      {data?.daily_views?.length > 0 && (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest opacity-50 mb-6">Daily Views</h3>
          <div className="flex items-end gap-1 h-32">
            {data.daily_views.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div className="absolute -top-8 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {day.views} views · {day.visitors} visitors
                </div>
                <div className="w-full bg-white/20 rounded-t" style={{ height: `${(day.views / maxDailyViews) * 100}%`, minHeight: "2px" }} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest opacity-50 mb-4">Top Pages</h3>
          <div className="space-y-3">
            {data?.top_pages?.slice(0, 5).map((page, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <span className="text-white/80 text-sm truncate pr-4">{page.path}</span>
                <span className="text-white font-bold text-sm bg-white/10 px-3 py-1 rounded-lg">{page.visitors}</span>
              </div>
            )) || <div className="text-white/30 text-sm">No data</div>}
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest opacity-50 mb-4">Top Countries</h3>
          <div className="space-y-3">
            {data?.countries?.slice(0, 5).map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <span className="text-white/80 text-sm">{item.country}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/40" style={{ width: `${(item.visitors / (data.unique_visitors || 1)) * 100}%` }} />
                  </div>
                  <span className="text-white font-bold text-sm w-8 text-right">{item.visitors}</span>
                </div>
              </div>
            )) || <div className="text-white/30 text-sm">No data</div>}
          </div>
        </div>

        {/* Devices */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest opacity-50 mb-4">Devices</h3>
          <div className="flex flex-col gap-4">
            {data?.devices?.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Icon icon={item.device === 'mobile' ? 'solar:smartphone-bold' : item.device === 'tablet' ? 'solar:tablet-bold' : 'solar:monitor-bold'} />
                  <span className="capitalize">{item.device}</span>
                </div>
                <span className="text-white font-bold text-sm">{item.visitors}</span>
              </div>
            )) || <div className="text-white/30 text-sm">No data</div>}
          </div>
        </div>

        {/* Top Sources */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest opacity-50 mb-4">Top Sources</h3>
          <div className="space-y-3">
            {data?.referrers?.slice(0, 5).map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <span className="text-white/80 text-sm truncate pr-4">{item.referrer}</span>
                <span className="text-white font-bold text-sm">{item.visitors}</span>
              </div>
            )) || <div className="text-white/30 text-sm">No data</div>}
          </div>
        </div>

        {/* Browsers */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest opacity-50 mb-4">Browsers</h3>
          <div className="flex flex-col gap-4">
            {data?.browsers?.slice(0, 5).map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-white/80 text-sm">{item.browser}</span>
                <span className="text-white font-bold text-sm">{item.visitors}</span>
              </div>
            )) || <div className="text-white/30 text-sm">No data</div>}
          </div>
        </div>

        {/* Operating Systems */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold text-sm uppercase tracking-widest opacity-50 mb-4">Operating Systems</h3>
          <div className="flex flex-col gap-4">
            {data?.operating_systems?.slice(0, 5).map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-white/80 text-sm">{item.os}</span>
                <span className="text-white font-bold text-sm">{item.visitors}</span>
              </div>
            )) || <div className="text-white/30 text-sm">No data</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
