import { createPortal } from 'react-dom';
import { X, Mail, Phone, CalendarDays, Clock3 } from 'lucide-react';

export type UserDetailsModalUser = {
  id: string;
  name: string;
  email: string;
  plan: 'Premium' | 'Basic' | 'Free';
  status: 'Active' | 'Inactive';
  initials: string;
  avatarBg: string;
  phone?: string;
  joinedAtLabel?: string;
  lastActiveLabel?: string;
};

type Props = {
  isOpen: boolean;
  user: UserDetailsModalUser | null;
  onClose: () => void;
  onSendNotification: () => void;
  onDeactivate: () => void;
};

export default function UserDetailsModal({
  isOpen,
  user,
  onClose,
  onSendNotification,
  onDeactivate,
}: Props) {
  if (!isOpen || !user) return null;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-400">User Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 bg-[#FAF9FF]">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            {/* Left Card */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6">
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-pink-500 font-bold text-sm ${user.avatarBg}`}>
                  {user.initials}
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-800">{user.name}</h3>
                <p className="text-xs text-gray-400 font-medium">
                  {user.plan === 'Premium' ? 'Premium Member' : user.plan === 'Basic' ? 'Basic Member' : 'Free Member'}
                </p>

                <div className="mt-5 w-full space-y-3 text-left">
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <Mail size={14} className="text-gray-400" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <Phone size={14} className="text-gray-400" />
                    <span>{user.phone || '+1 (555) 123-4567'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <CalendarDays size={14} className="text-gray-400" />
                    <span>Joined {user.joinedAtLabel || 'Jan 12, 2025'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <Clock3 size={14} className="text-gray-400" />
                    <span>Last Active: {user.lastActiveLabel || '2 hours ago'}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="px-3 py-1 rounded-lg text-[10px] font-bold bg-[#A78BFA]/20 text-[#A78BFA]">
                    {user.plan}
                  </span>
                </div>

                <div className="mt-6 w-full space-y-3">
                  <button
                    onClick={onSendNotification}
                    className="w-full py-2.5 rounded-2xl border border-gray-100 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Send Notification
                  </button>
                  <button
                    onClick={onDeactivate}
                    className="w-full py-2.5 rounded-2xl border border-red-200 text-xs font-semibold text-red-400 hover:bg-red-50 transition-colors"
                  >
                    Deactivate User
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Subscription */}
              <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Subscription</p>
                    <p className="mt-1 text-sm font-semibold text-gray-700">Plan</p>
                    <p className="text-xs text-gray-400 font-medium">{user.plan} Yearly</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Next Billing</p>
                    <p className="mt-1 text-sm font-semibold text-gray-700">Jan 12, 2026</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Amount</p>
                    <p className="mt-1 text-sm font-semibold text-gray-700">$99.99/yr</p>
                  </div>
                </div>
              </div>

              {/* Review */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6">
                <p className="text-xs font-bold text-gray-800 mb-4">Customer Review.</p>
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className={`text-lg ${i <= 4 ? 'text-yellow-400' : 'text-gray-200'}`}>
                      ★
                    </span>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="border border-gray-100 rounded-xl px-4 py-2 text-xs font-semibold text-gray-700">SO GOOD</div>
                  <div className="border border-gray-100 rounded-xl px-4 py-2 text-xs text-gray-500">It’s a very helpful app.</div>
                </div>
                <div className="mt-4 flex gap-3">
                  <div className="w-16 h-16 rounded-xl bg-gray-100" />
                  <div className="w-16 h-16 rounded-xl bg-gray-100" />
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6">
                <p className="text-xs font-bold text-gray-800 mb-4">Activity Timeline</p>
                <div className="space-y-4">
                  {[
                    { title: 'Completed “Core Blast” workout', time: '2 hours ago' },
                    { title: 'Started “Beginner Pilates” program', time: '1 day ago' },
                    { title: 'Upgraded to Premium', time: '3 days ago' },
                    { title: 'Completed profile setup', time: 'Jan 12, 2025' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-pink-300" />
                      <div>
                        <p className="text-xs font-semibold text-gray-700">{item.title}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
