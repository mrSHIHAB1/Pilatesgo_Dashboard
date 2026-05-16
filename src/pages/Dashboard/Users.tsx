import React, { useEffect, useMemo, useRef, useState } from 'react';
import { 
  Search, 
  ListFilter, 
  MoreHorizontal, 
  Mail,
  User as UserIcon,
  Ban,
  Trash2,
  CheckCircle2,
  X,
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import UserDetailsModal from '../../components/Modals/UserDetailsModal';
import SendNotificationModal from '../../components/Modals/SendNotificationModal';
import SendEmailModal from '../../components/Modals/SendEmailModal';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'Premium' | 'Basic' | 'Free';
  status: 'Active' | 'Inactive';
  workouts: number;
  streak: string;
  initials: string;
  avatarBg: string;
}

const initialUsers: User[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@email.com', plan: 'Premium', status: 'Active', workouts: 87, streak: '14D', initials: 'SJ', avatarBg: 'bg-pink-200' },
  { id: '2', name: 'Emily Clark', email: 'emily@email.com', plan: 'Basic', status: 'Active', workouts: 85, streak: '7D', initials: 'EC', avatarBg: 'bg-pink-200' },
  { id: '3', name: 'Maria Lopez', email: 'maria@email.com', plan: 'Premium', status: 'Inactive', workouts: 12, streak: '3D', initials: 'ML', avatarBg: 'bg-pink-200' },
  { id: '4', name: 'Anna Williams', email: 'anna@email.com', plan: 'Free', status: 'Active', workouts: 134, streak: '28D', initials: 'AW', avatarBg: 'bg-pink-200' },
  { id: '5', name: 'Jessica Brown', email: 'jessica@email.com', plan: 'Premium', status: 'Active', workouts: 23, streak: '---', initials: 'JB', avatarBg: 'bg-pink-200' },
  { id: '6', name: 'Lisa Davis', email: 'lisa@email.com', plan: 'Basic', status: 'Inactive', workouts: 67, streak: '11D', initials: 'LD', avatarBg: 'bg-pink-200' },
];

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [openMenuUserId, setOpenMenuUserId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [isSendNotificationOpen, setIsSendNotificationOpen] = useState(false);
  const [isSendEmailOpen, setIsSendEmailOpen] = useState(false);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [pendingDeleteUserId, setPendingDeleteUserId] = useState<string | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedUserForModal = useMemo(() => {
    if (!selectedUser) return null;
    return {
      ...selectedUser,
      phone: '+1 (555) 123-4567',
      joinedAtLabel: 'Jan 12, 2025',
      lastActiveLabel: '2 hours ago',
    };
  }, [selectedUser]);

  useEffect(() => {
    if (!toastMessage) return;

    const timer = window.setTimeout(() => setToastMessage(null), 2500);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    const onDocMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpenMenuUserId(null);
      }
    };

    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, []);

  return (
    <div className="p-8 bg-[#FAF9FF] min-h-screen">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Top Header Section */}
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search users..." 
                className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-pink-200 outline-none"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <ListFilter size={18} />
              Filters
            </button>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
            {['All', 'Active', 'Inactive', 'Premium'].map((tab) => (
              <button 
                key={tab}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  tab === 'All' ? 'bg-[#FF87B2] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-y border-gray-50 text-[13px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="px-8 py-4 font-semibold">User</th>
                <th className="px-4 py-4 font-semibold">Email</th>
                <th className="px-4 py-4 font-semibold">Plan</th>
                <th className="px-4 py-4 font-semibold">Status</th>
                <th className="px-4 py-4 font-semibold">Workouts</th>
                <th className="px-4 py-4 font-semibold">Streak</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-pink-500 font-bold text-xs ${user.avatarBg}`}>
                        {user.initials}
                      </div>
                      <span className="text-sm font-bold text-gray-700">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">{user.email}</td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      user.plan === 'Premium' ? 'bg-[#A78BFA]/20 text-[#A78BFA]' : 
                      user.plan === 'Basic' ? 'bg-emerald-100 text-emerald-500' : 
                      'bg-gray-100 text-gray-400'
                    }`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      user.status === 'Active' ? 'bg-emerald-50 text-emerald-400' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 font-medium">{user.workouts}</td>
                  <td className="px-4 py-4 text-sm text-gray-500 font-medium">{user.streak}</td>
                  <td className="px-8 py-4 text-right">
                    <div className="relative inline-block" ref={openMenuUserId === user.id ? menuRef : null}>
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => setOpenMenuUserId((prev) => (prev === user.id ? null : user.id))}
                        aria-label="Open actions"
                      >
                        <MoreHorizontal size={20} />
                      </button>

                      {openMenuUserId === user.id && (
                        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-20">
                          <button
                            className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsUserDetailsOpen(true);
                              setOpenMenuUserId(null);
                            }}
                          >
                            <UserIcon size={16} className="text-gray-400" />
                            View Profile
                          </button>
                          <button
                            className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsSendNotificationOpen(true);
                              setOpenMenuUserId(null);
                            }}
                          >
                            <CheckCircle2 size={16} className="text-gray-400" />
                            Send Notification
                          </button>
                          <button
                            className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsSendEmailOpen(true);
                              setOpenMenuUserId(null);
                            }}
                          >
                            <Mail size={16} className="text-gray-400" />
                            Send Email
                          </button>
                          <button
                            className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                            onClick={() => {
                              setUsers((prev) =>
                                prev.map((u) =>
                                  u.id === user.id
                                    ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' }
                                    : u
                                )
                              );
                              setOpenMenuUserId(null);
                            }}
                          >
                            <Ban size={16} className="text-gray-400" />
                            Suspend
                          </button>
                          <button
                            className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
                            onClick={() => {
                              setPendingDeleteUserId(user.id);
                              setIsDeleteConfirmOpen(true);
                              setOpenMenuUserId(null);
                            }}
                          >
                            <Trash2 size={16} />
                            Delete User
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between">
          <p className="text-sm text-gray-400 font-medium">
            Showing 1-6 of 12,847 users
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
              <ChevronLeft size={20} />
            </button>
            {[1, 2, 3, '...', 214].map((page, index) => (
              <button 
                key={index}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
                  page === 1 ? 'bg-[#FF87B2] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-white border border-gray-100 shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 size={18} className="text-emerald-400" />
          </div>
          <p className="text-sm font-semibold text-gray-700">{toastMessage}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-gray-400 hover:text-gray-600"
            aria-label="Close toast"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Modals */}
      <UserDetailsModal
        isOpen={isUserDetailsOpen}
        user={selectedUserForModal}
        onClose={() => setIsUserDetailsOpen(false)}
        onSendNotification={() => {
          setIsUserDetailsOpen(false);
          setIsSendNotificationOpen(true);
        }}
        onDeactivate={() => {
          if (!selectedUser) return;
          setUsers((prev) => prev.map((u) => (u.id === selectedUser.id ? { ...u, status: 'Inactive' } : u)));
          setIsUserDetailsOpen(false);
        }}
      />

      <SendNotificationModal
        isOpen={isSendNotificationOpen}
        user={selectedUserForModal}
        onClose={() => setIsSendNotificationOpen(false)}
        onSent={() => setToastMessage('Notification Sent Successfully')}
      />

      <SendEmailModal
        isOpen={isSendEmailOpen}
        user={selectedUserForModal}
        onClose={() => setIsSendEmailOpen(false)}
        onSent={() => setToastMessage('Notification Sent Successfully')}
      />

      <ConfirmationModal
        isOpen={isDeleteConfirmOpen}
        title="Delete user"
        message="This action cannot be undone. Do you want to delete this user?"
        onCancel={() => {
          setIsDeleteConfirmOpen(false);
          setPendingDeleteUserId(null);
        }}
        onConfirm={() => {
          if (!pendingDeleteUserId) return;
          setUsers((prev) => prev.filter((u) => u.id !== pendingDeleteUserId));
          setIsDeleteConfirmOpen(false);
          setPendingDeleteUserId(null);
        }}
      />
    </div>
  );
};

export default UsersList;