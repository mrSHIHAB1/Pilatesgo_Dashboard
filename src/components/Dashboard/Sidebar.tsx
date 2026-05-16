import { NavLink } from "react-router";
import {
  LayoutGrid,
  Users,
  Video,
  Dumbbell,
  BookOpen,
  Layers,
  CreditCard,
  Folder,
  LineChart,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router";
import type { Dispatch, SetStateAction } from "react";
import useAuth from "../../hooks/useAuth";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  const navItems = [
    { icon: LayoutGrid, path: "/dashboard", label: "Dashboard" },
    { icon: Users, path: "/dashboard/users", label: "Users" },
    { icon: Video, path: "/dashboard/videos", label: "Videos" },
    { icon: Dumbbell, path: "/dashboard/workouts", label: "Workouts" },
    { icon: BookOpen, path: "/dashboard/exercises", label: "Exercises" },
    { icon: Layers, path: "/dashboard/programs", label: "Programs" },
    { icon: CreditCard, path: "/dashboard/subscriptions", label: "Subscriptions" },
    { icon: Folder, path: "/dashboard/categories", label: "Categories" },
    { icon: LineChart, path: "/dashboard/analytics", label: "Analytic" },
    { icon: Settings, path: "/dashboard/settings", label: "Settings" },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-50 transition-transform duration-300 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      {/* Logo Section */}
      <div className="p-8 mb-2">
        <div className="flex items-center text-2xl font-bold tracking-tight">
          <span className="text-[#4A4A4A]">pilates</span>
          <span className="text-[#FF87B2]">glo</span>
        </div>
        <p className="text-xs text-gray-400 mt-1 font-medium">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 px-4 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            onClick={() => setIsOpen && setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-[#FFF5F8] text-[#D8315B]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 2} 
                />
                <span className={`text-sm font-medium ${isActive ? "font-semibold" : ""}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button at Bottom */}
      <div className="p-4 border-t border-gray-50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#F44336] hover:bg-red-50 transition-all duration-200 font-medium text-sm"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;