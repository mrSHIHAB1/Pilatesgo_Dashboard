import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar";
import Topbar from "../components/Dashboard/Topbar";


export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F4F7FE] relative">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-24 p-4 md:p-8 bg-[#EAEAEA] min-h-screen transition-all duration-300">
        <div className="w-full">
          {/* Reusable TopBar */}
          <Topbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          {/* Page Content (Dashboard, Tickets, etc.) */}
          <section className="mt-2 md:pl-5">
            <Outlet />
          </section>
        </div>
      </main>
    </div>
  );
}