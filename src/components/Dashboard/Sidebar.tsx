import { NavLink } from "react-router";
import slogo from "../../assets/vite.svg";
import {
  LayoutDashboard,
  Ticket,
  Users,
  BarChart3,
  Settings,
  LogOut,
  FileText,
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
    navigate('/login');
  };
  const navItems = [
    { icon: LayoutDashboard, path: "/dashboard", label: "Dashboard" },
    { icon: Ticket, path: "/dashboard/users", label: "Users" },
    { icon: Users, path: "/dashboard/videos", label: "Videos" },
    { icon: BarChart3, path: "/dashboard/workouts", label: "Workouts" },
    { icon: Settings, path: "/dashboard/exercises", label: "Exercises" },
    { icon: FileText, path: "/dashboard/programs", label: "Programs" },
    { icon: FileText, path: "/dashboard/subscriptions", label: "Subscriptions" },
    { icon: FileText, path: "/dashboard/categories", label: "Categories" },
    { icon: FileText, path: "/dashboard/analytics", label: "Analytics" },
    { icon: FileText, path: "/dashboard/settings", label: "Settings" },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-24 bg-[#DFE0E8] border-r border-slate-200 flex flex-col justify-between py-8 gap-8 z-50 transition-transform duration-300 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      {/* Top Section */}
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="mb-2 lg:mb-0">
          <img src={slogo} alt="Logo" className="w-10 h-10 lg:w-12 lg:h-12" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setIsOpen && setIsOpen(false)} // Safe call
              className={({ isActive }) =>
                `p-3 rounded-xl transition-all duration-200 ${isActive
                  ? "bg-[#2D335E] text-white shadow-md"
                  : "text-slate-400 hover:bg-slate-100 hover:text-[#2D335E]"
                }`
              }
            >
              <item.icon size={22} />
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Button at Bottom */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handleLogout}
          className=" cursor-pointer p-3 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
          title="Logout"
        >
          <LogOut size={22} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;