import React from 'react';
import { Edit3 } from 'lucide-react';

interface Plan {
  id: string;
  title: string;
  price: string;
  period: string;
  trial: string;
  users: string;
  status: 'Active' | 'Inactive';
  isPopular?: boolean;
}

const plansData: Plan[] = [
  {
    id: '1',
    title: 'Free',
    price: '$0',
    period: 'Forever free',
    trial: '—',
    users: '4,520',
    status: 'Active',
  },
  {
    id: '2',
    title: 'Monthly Premium',
    price: '$14.99',
    period: 'per monthly',
    trial: '7 days',
    users: '3,890',
    status: 'Active',
  },
  {
    id: '3',
    title: 'Yearly Premium',
    price: '$99.99',
    period: 'per yearly',
    trial: '14 days',
    users: '4,357',
    status: 'Active',
    isPopular: true,
  },
];

const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => {
  return (
    <div 
      className={`relative bg-white p-10 rounded-[2.5rem] border transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-md ${
        plan.isPopular ? 'border-[#FFB1D1] ring-1 ring-[#FFB1D1]' : 'border-gray-100'
      }`}
    >
      {/* Popular Badge */}
      {plan.isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FFB1D1] text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider">
          Popular
        </div>
      )}

      {/* Header Info */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-black text-gray-900 leading-none">{plan.price}</span>
        </div>
        <p className="text-sm text-gray-400 mt-3 font-medium">{plan.period}</p>
      </div>

      {/* Details List */}
      <div className="flex flex-col gap-5 mb-10 flex-1">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 font-medium">Trial</span>
          <span className="text-sm text-gray-700 font-medium">{plan.trial}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 font-medium">Users</span>
          <span className="text-sm text-gray-800 font-bold">{plan.users}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 font-medium">Status</span>
          <span className="px-3 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 text-emerald-400">
            {plan.status}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full flex items-center justify-center gap-2 py-3.5 border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
        <Edit3 size={18} className="text-gray-400" />
        Edit Plan
      </button>
    </div>
  );
};

const Subscriptions: React.FC = () => {
  return (
    <div className="p-10 bg-[#FAF9FF] min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plansData.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;