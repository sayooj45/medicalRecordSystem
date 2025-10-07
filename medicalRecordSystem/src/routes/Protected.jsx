import { Navigate,Outlet } from "react-router-dom";
import { LoginContext } from "../context/LoginProvider";
import { useContext } from "react";

export default function Protected({role}){
    const {loading,loginDetails} = useContext(LoginContext)

    //   if (loading) return <div className="p-8 text-gray-600">Loading…</div>;
  if (!loginDetails) return <Navigate to="/login" replace />;
  if (role && loginDetails.role !== role) return <Navigate to="/" replace />;

  return <Outlet />;
}
