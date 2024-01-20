import * as React from "react";
import SideBar from "./components/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    navigate("/signin");
  }
  return (
    <div className="w-screen max-h-screen overflow-y-auto bg-slate-100">
      <div className="flex w-full h-full py-8 gap-2 flex-row">
        <div className="flex flex-col relative bg-gray-200 w-64 ">
          <header className="bg-gray-800 px-6 rounded-tr-md pt-2 align-middle text-slate-100 font-semibold capitalize h-12">
            <h1>nice tile</h1>
          </header>
          <SideBar />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
