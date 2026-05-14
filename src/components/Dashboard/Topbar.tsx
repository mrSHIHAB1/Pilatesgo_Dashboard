import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown, LogOut, Menu } from 'lucide-react';

import useAuth from '../../hooks/useAuth';

type TopbarProps = {
  onToggleSidebar: () => void;
};

export default function Topbar({ onToggleSidebar }: TopbarProps) {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;

      if (
        target &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logOut();
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between w-full mb-8 lg:pl-5 px-4 lg:px-0">
      <button
        onClick={onToggleSidebar}
        className="lg:hidden p-2 hover:bg-slate-100 rounded-md transition-colors"
        aria-label="Toggle Sidebar"
      >
        <Menu size={24} className="text-[#2D335E]" />
      </button>

      <div className="ml-auto relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown((v) => !v)}
          className="flex items-center gap-2 cursor-pointer"
          aria-label="Open profile menu"
        >
          <div className="w-8 h-8 bg-[#2D335E] rounded-full flex items-center justify-center text-white text-[10px] font-bold">
            {user?.name ? user.name.substring(0, 2).toUpperCase() : 'AD'}
          </div>
          <span className="hidden sm:block text-sm font-bold text-slate-800">
            {user?.name || 'Admin'}
          </span>
          <ChevronDown
            size={16}
            className={`text-slate-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
          />
        </button>

        {showDropdown && (
          <div className="absolute right-0 top-12 z-50 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}