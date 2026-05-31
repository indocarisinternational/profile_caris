import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Icon } from "@iconify/react";

const sidebarLinks = [
  { to: "/admin-panel/dashboard/home", icon: "solar:home-2-bold", label: "Home" },
  { to: "/admin-panel/dashboard/services", icon: "solar:settings-bold", label: "Services" },
  { to: "/admin-panel/dashboard/projects", icon: "solar:folder-bold", label: "Projects" },
  { to: "/admin-panel/dashboard/about", icon: "solar:info-circle-bold", label: "About" },
  { to: "/admin-panel/dashboard/contact", icon: "solar:phone-bold", label: "Contact" },
  { to: "/admin-panel/analytics", icon: "solar:chart-2-bold", label: "Analytics" },
];

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin-panel/auth", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col z-50 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
              <Icon icon="solar:shield-keyhole-bold" className="text-black text-lg" />
            </div>
            <div>
              <div className="text-white font-bold text-sm tracking-tight">Caris Admin</div>
              <div className="text-white/25 text-[10px] font-medium">Content Management</div>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 px-3 mb-3">
            Content
          </div>
          {sidebarLinks.slice(0, 5).map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-black"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <Icon icon={link.icon} className="text-lg" />
              {link.label}
            </NavLink>
          ))}

          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 px-3 mt-6 mb-3">
            Insights
          </div>
          {sidebarLinks.slice(5).map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-black"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <Icon icon={link.icon} className="text-lg" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* User / Logout */}
        <div className="p-4 border-t border-white/5">
          <div className="text-white/30 text-[10px] font-medium mb-2 px-1 truncate">
            {user?.email || "Admin"}
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <Icon icon="solar:logout-2-bold" className="text-lg" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-white/50 hover:text-white transition-colors"
          >
            <Icon icon="solar:hamburger-menu-bold" className="text-2xl" />
          </button>
          <div className="flex-1" />
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Icon icon="solar:link-bold" className="text-sm" />
            View Live Site
          </a>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
