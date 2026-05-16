import { useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Play, X } from 'lucide-react';

export type ExerciseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type ExerciseCreateValues = {
  name: string;
  targetArea: string;
  difficulty: ExerciseDifficulty;
  category: string;
  instructions: string;
  videoFileName: string | null;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (values: ExerciseCreateValues) => void;
};

export default function ExerciseCreateModal({ isOpen, onClose, onCreate }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState('');
  const [targetArea, setTargetArea] = useState('');
  const [difficulty, setDifficulty] = useState<ExerciseDifficulty>('Beginner');
  const [category, setCategory] = useState('Mat Work');
  const [instructions, setInstructions] = useState('');
  const [videoFileName, setVideoFileName] = useState<string | null>(null);

  const canCreate = useMemo(() => {
    return name.trim().length > 0 && targetArea.trim().length > 0;
  }, [name, targetArea]);

  const reset = () => {
    setName('');
    setTargetArea('');
    setDifficulty('Beginner');
    setCategory('Mat Work');
    setInstructions('');
    setVideoFileName(null);
  };

  if (!isOpen) return null;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-400">Create Exercise</div>
          <button
            onClick={() => {
              onClose();
              reset();
            }}
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
                <label className="block text-[11px] font-bold text-gray-500 mb-2">
                  Exercise Name <span className="text-rose-400">*</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. The Hundred"
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-2">
                  Target Area <span className="text-rose-400">*</span>
                </label>
                <input
                  value={targetArea}
                  onChange={(e) => setTargetArea(e.target.value)}
                  placeholder="e.g. Core / Spine"
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-2">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as ExerciseDifficulty)}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200"
                >
                  <option value="Mat Work">Mat Work</option>
                  <option value="Reformer">Reformer</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-[11px] font-bold text-gray-500 mb-2">Instructions</label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Step-by-step instructions..."
                rows={4}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200 resize-none"
              />
            </div>

            <div className="mt-5">
              <label className="block text-[11px] font-bold text-gray-500 mb-2">Attach Video</label>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="w-full rounded-2xl border border-pink-100 bg-pink-50/20 py-8 flex flex-col items-center justify-center text-center hover:bg-pink-50/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-pink-100">
                  <Play size={18} className="text-pink-300" />
                </div>
                <p className="mt-2 text-xs font-semibold text-gray-500">Click to select or upload a video</p>
                {videoFileName && <p className="mt-1 text-[11px] text-gray-400 font-medium">{videoFileName}</p>}
              </button>
              <input
                ref={inputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setVideoFileName(file?.name ?? null);
                }}
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  reset();
                }}
                className="px-5 py-2.5 rounded-2xl border border-gray-100 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!canCreate}
                onClick={() => {
                  if (!canCreate) return;
                  onCreate({ name, targetArea, difficulty, category, instructions, videoFileName });
                  onClose();
                  reset();
                }}
                className="px-6 py-2.5 rounded-2xl bg-[#FF87B2] text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95 transition-opacity"
              >
                Create Exercise
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
