import { createPortal } from 'react-dom';
import { Calendar, Dumbbell, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { ProgramLevel } from './ProgramCreateModal';

type Program = {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: ProgramLevel;
  workoutCount: number;
  exercises: string[];
};

type Props = {
  isOpen: boolean;
  program: Program | null;
  onClose: () => void;
  onEdit: () => void;
};

export default function ProgramDetailsModal({ isOpen, program, onClose, onEdit }: Props) {
  const [page, setPage] = useState(1);
  const pageSize = 7;

  const totalPages = useMemo(() => {
    const count = program?.exercises.length ?? 0;
    return Math.max(1, Math.ceil(count / pageSize));
  }, [program?.exercises.length]);

  const pageExercises = useMemo(() => {
    if (!program) return [];
    const start = (page - 1) * pageSize;
    return program.exercises.slice(start, start + pageSize);
  }, [program, page]);

  if (!isOpen || !program) return null;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-400">View Details</div>
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
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-gray-800">{program.title}</h3>
                <p className="mt-1 text-xs text-gray-400 font-medium">{program.description}</p>

                <div className="mt-3 flex items-center gap-3 text-[11px] font-semibold text-gray-400">
                  <span className="px-2 py-0.5 rounded-lg bg-purple-100 text-purple-500">{program.level}</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {program.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Dumbbell size={14} /> {program.workoutCount} Exercise
                  </span>
                </div>
              </div>

              <button
                onClick={onEdit}
                className="px-4 py-2 rounded-xl bg-pink-50 text-[#FF87B2] text-xs font-bold hover:bg-pink-100 transition-colors"
              >
                Edit
              </button>
            </div>

            <div className="mt-5">
              <p className="text-[11px] font-bold text-gray-500 mb-3">Exercises</p>
              <div className="divide-y divide-gray-50 border border-gray-100 rounded-2xl overflow-hidden">
                {pageExercises.map((name, idx) => (
                  <div key={name} className="flex items-center justify-between px-4 py-3 bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-pink-50 text-[#FF87B2] flex items-center justify-center text-[10px] font-bold">
                        {(page - 1) * pageSize + idx + 1}
                      </div>
                      <p className="text-xs font-semibold text-gray-700">{name}</p>
                    </div>
                    <span className="text-gray-300 text-lg leading-none">›</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-end gap-2 text-xs font-semibold text-gray-400">
                <button
                  type="button"
                  className="w-7 h-7 rounded-full border border-gray-100 hover:bg-gray-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 4).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    className={`w-7 h-7 rounded-full ${p === page ? 'bg-[#FF87B2] text-white' : 'border border-gray-100 hover:bg-gray-50'}`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  className="w-7 h-7 rounded-full border border-gray-100 hover:bg-gray-50"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  ›
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
