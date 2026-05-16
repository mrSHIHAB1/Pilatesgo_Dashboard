import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { UploadCloud, X } from 'lucide-react';
import type { ProgramLevel } from './ProgramCreateModal';

export type ProgramEditValues = {
  title: string;
  description: string;
  duration: string;
  level: ProgramLevel;
  category: string;
  coverImageUrl: string;
};

type Program = {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: ProgramLevel;
  category: string;
  coverImageUrl: string;
};

type Props = {
  isOpen: boolean;
  program: Program | null;
  onClose: () => void;
  onSaveAndPublish: (values: ProgramEditValues) => void;
};

export default function ProgramEditModal({ isOpen, program, onClose, onSaveAndPublish }: Props) {
  const [title, setTitle] = useState(program?.title ?? '');
  const [description, setDescription] = useState(program?.description ?? '');
  const [duration, setDuration] = useState(program?.duration ?? '4 weeks');
  const [level, setLevel] = useState<ProgramLevel>(program?.level ?? 'Beginner');
  const [category, setCategory] = useState(program?.category ?? 'General');
  const [coverImageUrl, setCoverImageUrl] = useState(program?.coverImageUrl ?? '');

  const canSave = useMemo(() => title.trim().length > 0, [title]);

  if (!isOpen || !program) return null;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-400">Edit Program</div>
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
            <div>
              <label className="block text-[11px] font-bold text-gray-500 mb-2">
                Program Title <span className="text-rose-400">*</span>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Beginner Pilates Journey"
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>

            <div className="mt-4">
              <label className="block text-[11px] font-bold text-gray-500 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Program description..."
                rows={4}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200 resize-none"
              />
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-2">Duration</label>
                <input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="4 weeks"
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-2">Difficulty</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as ProgramLevel)}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-2">Category</label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="General"
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-[11px] font-bold text-gray-500 mb-2">Cover Image</label>
              <button
                type="button"
                onClick={() => {
                  // For now, just toggle a placeholder selection; keeping the UI matching the mock.
                  setCoverImageUrl((prev) => prev || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800');
                }}
                className="w-full rounded-2xl border border-pink-100 bg-pink-50/20 py-8 flex flex-col items-center justify-center text-center hover:bg-pink-50/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-pink-100">
                  <UploadCloud size={18} className="text-pink-300" />
                </div>
                <p className="mt-2 text-xs font-semibold text-gray-500">Click to upload a cover image</p>
                {coverImageUrl && <p className="mt-1 text-[11px] text-gray-400 font-medium">Image selected</p>}
              </button>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
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
                  onSaveAndPublish({
                    title,
                    description,
                    duration,
                    level,
                    category,
                    coverImageUrl: coverImageUrl || program.coverImageUrl,
                  });
                }}
                className="px-6 py-2.5 rounded-2xl bg-[#FF87B2] text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95 transition-opacity"
              >
                Save &amp; Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
