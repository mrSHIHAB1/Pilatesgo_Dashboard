import { 
  Users, CreditCard, DollarSign, BookOpen, Dumbbell, 
  TrendingUp, Plus, Video, Layout 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, ResponsiveContainer, Cell,
  PieChart, Pie, Label
} from 'recharts';

// --- Mock Data ---
const revenueData = [
  { name: 'Jan', value: 400 }, { name: 'Feb', value: 600 },
  { name: 'Mar', value: 500 }, { name: 'Apr', value: 800 },
  { name: 'May', value: 650 }, { name: 'Jun', value: 900 },
  { name: 'Jul', value: 750 }, { name: 'Aug', value: 950 },
  { name: 'Sep', value: 700 }, { name: 'Oct', value: 850 },
  { name: 'Nov', value: 780 }, { name: 'Dec', value: 920 },
];

const userData = [
  { name: 'Active', value: 75, fill: '#FF87B2' },
  { name: 'Inactive', value: 25, fill: '#A78BFA' },
];

const activities = [
  { id: 1, user: "Sarah Johnson", action: "New user registered", time: "2 min ago" },
  { id: 2, user: "Emily Clark", action: "Subscription upgraded", time: "15 min ago" },
  { id: 3, user: "Maria Lopez", action: "Workout completed", time: "32 min ago" },
  { id: 4, user: "Anna Williams", action: "New review posted", time: "1 hr ago" },
  { id: 5, user: "Jessica Brown", action: "Program enrolled", time: "2 hrs ago" },
];

// --- Sub-Components ---

const StatCard = ({ title, value, trend, icon: Icon, iconBg, iconColor }: any) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
    <div className="flex justify-between items-start mb-4">
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <div className={`${iconBg} p-2 rounded-lg`}>
        <Icon size={18} className={iconColor} />
      </div>
    </div>
    <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    <div className="flex items-center gap-1 mt-1 text-emerald-500 text-xs font-bold">
      <TrendingUp size={14} />
      <span>{trend}</span>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="p-8 bg-[#FAF9FF] min-h-screen">
      {/* 1. Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        <StatCard title="Total Users" value="12,847" trend="+12.5%" icon={Users} iconBg="bg-pink-50" iconColor="text-pink-400" />
        <StatCard title="Active Subscribers" value="8,234" trend="+8.2%" icon={CreditCard} iconBg="bg-indigo-50" iconColor="text-indigo-400" />
        <StatCard title="Revenue (MTD)" value="$48,290" trend="+15.3%" icon={DollarSign} iconBg="bg-emerald-50" iconColor="text-emerald-400" />
        <StatCard title="Programs" value="24" trend="+2" icon={BookOpen} iconBg="bg-orange-50" iconColor="text-orange-400" />
        <StatCard title="Workouts" value="186" trend="+14" icon={Dumbbell} iconBg="bg-teal-50" iconColor="text-teal-400" />
      </div>

      {/* 2. Middle Row: Revenue & User Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Revenue Overview */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-gray-800 text-lg">Revenue Overview</h3>
            <div className="flex gap-2 bg-gray-100 p-1 rounded-full text-xs font-semibold text-gray-500">
              {['7D', '1M', '3M', '1Y'].map((t) => (
                <button key={t} className={`px-4 py-1.5 rounded-full ${t === '1M' ? 'bg-[#FF87B2] text-white shadow-sm' : ''}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A78BFA" />
                    <stop offset="100%" stopColor="#FF87B2" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <Bar dataKey="value" fill="url(#barGradient)" radius={[6, 6, 6, 6]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 flex flex-col items-center">
          <h3 className="font-bold text-gray-800 text-lg self-start mb-4">User Growth</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={userData} innerRadius={75} outerRadius={90} paddingAngle={0} dataKey="value" stroke="none">
                   {userData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                   <Label 
                    value="75%" position="center" className="text-3xl font-bold fill-gray-800"
                    content={(props: any) => {
                      const vb = props?.viewBox as
                        | { cx?: number; cy?: number; x?: number; y?: number; width?: number; height?: number }
                        | undefined;

                      const cx = vb?.cx ?? (vb?.x != null && vb?.width != null ? vb.x + vb.width / 2 : 0);
                      const cy = vb?.cy ?? (vb?.y != null && vb?.height != null ? vb.y + vb.height / 2 : 0);

                      return (
                        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={cx} dy="-0.3em" className="text-3xl font-bold" fill="#1F2937">
                            75%
                          </tspan>
                          <tspan x={cx} dy="1.4em" className="text-sm font-medium" fill="#9CA3AF">
                            Active
                          </tspan>
                        </text>
                      );
                    }}
                   />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
              <div className="w-3 h-3 rounded-full bg-[#FF87B2]"></div> Active
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
              <div className="w-3 h-3 rounded-full bg-[#A78BFA]"></div> Inactive
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Row: Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
          <h3 className="font-bold text-gray-800 text-lg mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {activities.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
                    <TrendingUp size={18} className="text-pink-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">{item.action}</h4>
                    <p className="text-xs text-gray-400 font-medium">{item.user}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-medium">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
          <h3 className="font-bold text-gray-800 text-lg mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full py-3.5 bg-[#FF87B2] text-white rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <Plus size={18} /> Create Program
            </button>
            <button className="w-full py-3.5 border-2 border-pink-100 text-[#FF87B2] rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-pink-50 transition-colors">
              <Plus size={18} /> Add Workout
            </button>
            <button className="w-full py-3.5 border-2 border-indigo-50 text-indigo-400 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors">
              <Video size={18} /> Upload Video
            </button>
            <button className="w-full py-3.5 border-2 border-gray-700 text-gray-800 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <Layout size={18} /> Add Exercise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;