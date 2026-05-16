import { createPortal } from 'react-dom';
import { Check } from 'lucide-react';

type Props = {
  isOpen: boolean;
  programTitle: string;
  duration: string;
  workouts: number;
  difficulty: string;
  onCancel: () => void;
  onPublish: () => void;
};

export default function ProgramPublishModal({
  isOpen,
  programTitle,
  duration,
  workouts,
  difficulty,
  onCancel,
  onPublish,
}: Props) {
  if (!isOpen) return null;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
            <Check size={22} className="text-emerald-500" />
          </div>

          <h3 className="mt-4 text-base font-bold text-gray-800">Publish Program?</h3>
          <p className="mt-1 text-xs text-gray-400 font-medium">
            “{programTitle}” will be visible to all users.
          </p>
          <p className="mt-1 text-[10px] text-gray-300 font-medium">This action can be undone.</p>

          <div className="mt-4 border border-gray-100 rounded-2xl p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400 font-semibold">Duration</span>
              <span className="text-gray-700 font-semibold">{duration}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-gray-400 font-semibold">Workouts</span>
              <span className="text-gray-700 font-semibold">{workouts}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-gray-400 font-semibold">Difficulty</span>
              <span className="text-gray-700 font-semibold">{difficulty}</span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-2xl border border-gray-100 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onPublish}
              className="px-6 py-2.5 rounded-2xl bg-[#FF87B2] text-white text-sm font-semibold hover:opacity-95 transition-opacity"
            >
              Publish Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
