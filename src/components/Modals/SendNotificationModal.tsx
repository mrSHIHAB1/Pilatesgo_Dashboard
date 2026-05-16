import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { UserDetailsModalUser } from './UserDetailsModal';

export type NotificationChannel = 'push' | 'both';

type Props = {
  isOpen: boolean;
  user: UserDetailsModalUser | null;
  onClose: () => void;
  onSent: () => void;
  defaultChannel?: NotificationChannel;
};

export default function SendNotificationModal({
  isOpen,
  user,
  onClose,
  onSent,
  defaultChannel = 'push',
}: Props) {
  const [channel, setChannel] = useState<NotificationChannel>(defaultChannel);
  const [schedule, setSchedule] = useState<'now' | 'later'>('now');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const canSend = useMemo(() => {
    return title.trim().length > 0 && message.trim().length > 0;
  }, [title, message]);

  if (!isOpen || !user) return null;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-400">Send Notification</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 bg-[#FAF9FF]">
          <div className="bg-white rounded-3xl border border-gray-100 p-6">
            <div className="flex flex-col items-center text-center">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-pink-600 font-bold text-xs ${user.avatarBg}`}>
                {user.initials}
              </div>
              <h3 className="mt-3 text-base font-bold text-gray-800">{user.name}</h3>
              <span className="mt-1 px-3 py-1 rounded-lg text-[10px] font-bold bg-[#A78BFA]/20 text-[#A78BFA]">
                {user.plan}
              </span>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between rounded-2xl bg-pink-50/40 p-1 text-[11px] font-bold text-gray-400">
                <button
                  type="button"
                  onClick={() => setChannel('push')}
                  className={`flex-1 py-2 rounded-xl transition-colors ${
                    channel === 'push' ? 'bg-[#FF87B2] text-white' : 'hover:bg-white/70'
                  }`}
                >
                  Push
                </button>
                <button
                  type="button"
                  onClick={() => setChannel('both')}
                  className={`flex-1 py-2 rounded-xl transition-colors ${
                    channel === 'both' ? 'bg-[#FF87B2] text-white' : 'hover:bg-white/70'
                  }`}
                >
                  Both
                </button>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-2">Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Notification title"
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-2">Message</label>
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message..."
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-[11px] font-bold text-gray-500 mb-2">Schedule</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setSchedule('now')}
                    className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold flex items-center justify-between ${
                      schedule === 'now'
                        ? 'border-[#A78BFA]/30 bg-[#A78BFA]/10 text-[#2D335E]'
                        : 'border-gray-100 bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span>Send now</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${schedule === 'now' ? 'border-[#A78BFA]' : 'border-gray-200'}`}>
                      {schedule === 'now' ? <span className="w-2 h-2 rounded-full bg-[#A78BFA]" /> : null}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSchedule('later')}
                    className={`w-full px-4 py-3 rounded-2xl border text-sm font-semibold flex items-center justify-between ${
                      schedule === 'later'
                        ? 'border-[#A78BFA]/30 bg-[#A78BFA]/10 text-[#2D335E]'
                        : 'border-gray-100 bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span>Schedule later</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${schedule === 'later' ? 'border-[#A78BFA]' : 'border-gray-200'}`}>
                      {schedule === 'later' ? <span className="w-2 h-2 rounded-full bg-[#A78BFA]" /> : null}
                    </span>
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 rounded-2xl border border-red-200 text-red-400 font-semibold text-sm hover:bg-red-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!canSend) return;
                    onSent();
                    onClose();
                    setTitle('');
                    setMessage('');
                    setSchedule('now');
                    setChannel(defaultChannel);
                  }}
                  disabled={!canSend}
                  className="w-full py-3 rounded-2xl bg-[#FF87B2] text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95 transition-opacity"
                >
                  Send Notification
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
