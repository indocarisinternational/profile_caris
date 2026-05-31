import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <span className="text-white/50 text-sm font-medium tracking-wider uppercase">
            Verifying access...
          </span>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin-panel/auth" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
