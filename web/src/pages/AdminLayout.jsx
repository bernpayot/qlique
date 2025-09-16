import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex">
      <AdminSideBar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-4 flex-1 bg-gray-50">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}
