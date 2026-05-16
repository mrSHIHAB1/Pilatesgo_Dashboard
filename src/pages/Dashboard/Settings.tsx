import React, { useState } from 'react';
import { Camera, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notification'>('profile');
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  return (
    <div className="p-10 bg-[#FAF9FF] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-400 mt-2">
          Manage your profile, notifications, and app configuration
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex gap-2 bg-white p-1.5 rounded-full w-fit mb-8 shadow-sm">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-8 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'profile'
              ? 'bg-[#FFB1D1] text-white shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('notification')}
          className={`px-8 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'notification'
              ? 'bg-[#FFB1D1] text-white shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Notification
        </button>
      </div>

      <div className="max-w-4xl space-y-8">
        {/* Card 1: User Profile */}
        <section className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-50">
          <div className="flex items-center gap-6 mb-10">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#FFB1D1] flex items-center justify-center text-white text-3xl font-black">
                AD
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-100 hover:bg-gray-50 transition-colors">
                <Camera size={16} className="text-gray-400" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Admin User</h2>
              <p className="text-sm text-gray-400 font-medium">admin@pilatesglo.com</p>
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 ml-1">First Name</label>
                <input type="text" defaultValue="Admin" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pink-100 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 ml-1">Last Name</label>
                <input type="text" defaultValue="User" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pink-100 outline-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 ml-1">Email</label>
              <input type="email" defaultValue="admin@pilatesglo.com" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pink-100 outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 ml-1">Phone</label>
              <input type="text" defaultValue="+1 (555) 000-0000" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pink-100 outline-none" />
            </div>

            <div className="flex justify-end pt-4">
              <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-[#FFB1D1] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#FF9CBF] transition-colors">
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </form>
        </section>

        {/* Card 2: App Configuration */}
        <section className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-50">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 ml-1">App Name</label>
                <input type="text" defaultValue="PilatesGlo" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pink-100 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 ml-1">Default Language</label>
                <select className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pink-100 outline-none appearance-none">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 ml-1">Timezone</label>
                <select className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pink-100 outline-none appearance-none">
                  <option>UTC-5 (EST)</option>
                  <option>UTC+0 (GMT)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 ml-1">Date Format</label>
                <select className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-pink-100 outline-none appearance-none">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                </select>
              </div>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div>
                <h3 className="text-sm font-bold text-gray-800">Maintenance Mode</h3>
                <p className="text-[11px] text-gray-400 font-medium">Temporarily disable app access for users</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsMaintenanceMode(!isMaintenanceMode)}
                className={`w-12 h-6 rounded-full transition-all duration-300 relative ${isMaintenanceMode ? 'bg-[#FFB1D1]' : 'bg-gray-100'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${isMaintenanceMode ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <div className="flex justify-end pt-4">
              <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-[#FFB1D1] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#FF9CBF] transition-colors">
                <Save size={18} />
                Save Settings
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Settings;