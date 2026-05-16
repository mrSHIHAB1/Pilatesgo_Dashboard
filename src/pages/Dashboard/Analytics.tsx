import React from 'react';
import { 
  Calendar, 
  Clock, 
  Eye, 
  UserCheck, 
  TrendingUp 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line
} from 'recharts';

// --- Mock Data ---
const engagementData = [
  { day: 'Mon', sessions: 400 },
  { day: 'Tue', sessions: 680 },
  { day: 'Wed', sessions: 580 },
  { day: 'Thu', sessions: 820 },
  { day: 'Fri', sessions: 650 },
  { day: 'Sat', sessions: 900 },
  { day: 'Sun', sessions: 760 },
];

const deviceData = [
  { name: 'ios', value: 50, color: '#A78BFA' },
  { name: 'Android', value: 30, color: '#FF87B2' },
  { name: 'Web', value: 15, color: '#86EFAC' },
  { name: 'TV/Cast', value: 5, color: '#FEF08A' },
];

const retentionData = [
  { week: 'W1', value: 100 },
  { week: 'W2', value: 78 },
  { week: 'W3', value: 60 },
  { week: 'W4', value: 48 },
  { week: 'W5', value: 45 },
  { week: 'W6', value: 42 },
  { week: 'W7', value: 40 },
  { week: 'W8', value: 50 },
];

const categories = [
  { name: 'Core & Abs', sessions: '2,340', progress: 90, color: '#A78BFA' },
  { name: 'Full Body', sessions: '1,890', progress: 75, color: '#FF87B2' },
  { name: 'Flexibility', sessions: '1,560', progress: 65, color: '#86EFAC' },
  { name: 'Cardio', sessions: '980', progress: 45, color: '#FEF08A' },
  { name: 'Recovery', sessions: '750', progress: 30, color: '#818CF8' },
];

// --- Sub-Components ---

const StatCard = ({ title, value, trend, icon: Icon, iconBg, iconColor }: any) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
    <div className="flex justify-between items-start mb-4">
      <p className="text-gray-400 text-sm font-medium">{title}</p>
      <div className={`${iconBg} p-2 rounded-xl`}>
        <Icon size={18} className={iconColor} />
      </div>
    </div>
    <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
    <div className="flex items-center gap-1 text-emerald-500 text-[11px] font-bold">
      <TrendingUp size={12} />
      <span>{trend}</span>
    </div>
  </div>
);

const Analytics: React.FC = () => {
  return (
    <div className="p-8 bg-[#FAF9FF] min-h-screen">
      {/* 1. Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Daily Active Users" value="342" trend="+8.2% vs last week" icon={Calendar} iconBg="bg-pink-50" iconColor="text-pink-300" />
        <StatCard title="Avg Session Duration" value="26 min" trend="+3% improvement" icon={Clock} iconBg="bg-indigo-50" iconColor="text-indigo-300" />
        <StatCard title="Total View (7D)" value="3,360" trend="+15.4% growth" icon={Eye} iconBg="bg-emerald-50" iconColor="text-emerald-300" />
        <StatCard title="Retention (30D)" value="68%" trend="+14% vs prior cohort" icon={UserCheck} iconBg="bg-amber-50" iconColor="text-amber-300" />
      </div>

      {/* 2. Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Daily Engagement */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 text-lg">Daily Engagement</h3>
            <p className="text-xs text-gray-400 font-medium">Sessions & avg duration this week</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData} margin={{ left: -20 }}>
                <defs>
                  <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A78BFA" />
                    <stop offset="100%" stopColor="#FF87B2" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Bar dataKey="sessions" fill="url(#engagementGradient)" radius={[6, 6, 6, 6]} barSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
          <div className="mb-4">
            <h3 className="font-bold text-gray-800 text-lg">Device Breakdown</h3>
            <p className="text-xs text-gray-400 font-medium">Platform Distribution</p>
          </div>
          <div className="h-56 w-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deviceData} innerRadius={60} outerRadius={80} paddingAngle={0} dataKey="value" stroke="none">
                  {deviceData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {deviceData.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-xs font-bold text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: item.color}}></div>
                  <span className="text-gray-400 capitalize">{item.name}</span>
                </div>
                <span>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Retention Curve */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 text-lg">Retention Curve</h3>
            <p className="text-xs text-gray-400 font-medium">User retention over 8 weeks</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={retentionData} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickFormatter={(val) => `${val}%`} />
                <Line type="monotone" dataKey="value" stroke="#A78BFA" strokeWidth={2} dot={{ r: 5, fill: '#A78BFA', strokeWidth: 0 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 text-lg">Top Categories</h3>
            <p className="text-xs text-gray-400 font-medium">Most popular workout types</p>
          </div>
          <div className="space-y-6">
            {categories.map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between items-center text-xs font-bold mb-2">
                  <span className="text-gray-800">{cat.name}</span>
                  <span className="text-gray-400">{cat.sessions} sessions</span>
                </div>
                <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${cat.progress}%`, backgroundColor: cat.color, opacity: 0.8 }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;