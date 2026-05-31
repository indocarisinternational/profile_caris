import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Icon } from "@iconify/react";

const AdminAuth = () => {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteKey, setInviteKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (mode === "login") {
        await signIn(email, password);
        navigate("/admin-panel/dashboard", { replace: true });
      } else {
        if (inviteKey !== import.meta.env.VITE_ADMIN_INVITE_KEY) {
          throw new Error("Invalid invite key. Registration denied.");
        }
        await signUp(email, password);
        setSuccess("Registration successful! You can now sign in.");
        setMode("login");
        setPassword("");
        setInviteKey("");
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-background opacity-5 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md mx-4 relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Icon icon="solar:shield-keyhole-bold" className="text-black text-xl" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Admin Panel
            </span>
          </div>
          <p className="text-white/30 text-sm">
            Indo Caris International — Content Management System
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
          {/* Tabs */}
          <div className="flex mb-8 bg-white/5 rounded-xl p-1">
            <button
              type="button"
              onClick={() => { setMode("login"); setError(""); setSuccess(""); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                mode === "login"
                  ? "bg-white text-black"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode("register"); setError(""); setSuccess(""); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                mode === "register"
                  ? "bg-white text-black"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              Register
            </button>
          </div>

          {/* Error / Success Messages */}
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2">
              <Icon icon="solar:danger-triangle-bold" className="text-lg flex-shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm flex items-center gap-2">
              <Icon icon="solar:check-circle-bold" className="text-lg flex-shrink-0" />
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/30">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@carisinternational.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/30">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all text-sm"
              />
            </div>

            {mode === "register" && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/30">
                  Invite Private Key
                </label>
                <input
                  type="password"
                  value={inviteKey}
                  onChange={(e) => setInviteKey(e.target.value)}
                  required
                  placeholder="Enter your secure invite key"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all text-sm"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-3.5 rounded-xl font-bold text-sm hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Processing...
                </>
              ) : mode === "login" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-white/15 text-xs mt-6">
          Protected area · Unauthorized access is prohibited
        </p>
      </div>
    </div>
  );
};

export default AdminAuth;
