import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Trash2, X } from 'lucide-react';

export type ExerciseEditValues = {
  name: string;
  targetArea: string;
  instructions: string;
};

type Exercise = {
  id: string;
  name: string;
  targetArea: string;
  instructions?: string;
};

type Props = {
  isOpen: boolean;
  exercise: Exercise | null;
  onClose: () => void;
  onSave: (values: ExerciseEditValues) => void;
  onDelete: () => void;
};

export default function ExerciseEditModal({ isOpen, exercise, onClose, onSave, onDelete }: Props) {
  const [name, setName] = useState(exercise?.name ?? '');
  const [targetArea, setTargetArea] = useState(exercise?.targetArea ?? '');
  const [instructions, setInstructions] = useState(exercise?.instructions ?? '');

  const canSave = useMemo(() => {
    return name.trim().length > 0 && targetArea.trim().length > 0;
  }, [name, targetArea]);

  if (!isOpen || !exercise) return null;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-400">Edit Exercise</div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-2">Exercise Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-2">Target Area</label>
                <input
                  value={targetArea}
                  onChange={(e) => setTargetArea(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-[11px] font-bold text-gray-500 mb-2">Instructions</label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200 resize-none"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onDelete}
                className="px-5 py-2.5 rounded-2xl border border-red-200 text-red-400 text-sm font-semibold hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-2xl border border-gray-100 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!canSave}
                onClick={() => {
                  if (!canSave) return;
                  onSave({ name, targetArea, instructions });
                  onClose();
                }}
                className="px-6 py-2.5 rounded-2xl bg-[#FF87B2] text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95 transition-opacity"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
