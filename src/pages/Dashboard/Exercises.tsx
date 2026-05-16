import React, { useMemo, useState } from 'react';
import { 
  Search, 
  Plus, 
  Play, 
  Edit2, 
  Trash2 
} from 'lucide-react';

import ExerciseCreateModal, { type ExerciseCreateValues, type ExerciseDifficulty } from '../../components/Modals/ExerciseCreateModal';
import ExerciseEditModal from '../../components/Modals/ExerciseEditModal';

interface Exercise {
  id: string;
  name: string;
  targetArea: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  hasVideo: boolean;
  category?: string;
  instructions?: string;
  videoFileName?: string | null;
}

const initialExerciseData: Exercise[] = [
  { id: '1', name: 'The Hundred', targetArea: 'Core', difficulty: 'Beginner', hasVideo: true },
  { id: '2', name: 'Roll Up', targetArea: 'Core / Spine', difficulty: 'Intermediate', hasVideo: true },
  { id: '3', name: 'Single Leg Circle', targetArea: 'Hips / Core', difficulty: 'Beginner', hasVideo: true },
  { id: '4', name: 'Teaser', targetArea: 'Full Body', difficulty: 'Advanced', hasVideo: false },
  { id: '5', name: 'Swan Dive', targetArea: 'Back / Core', difficulty: 'Intermediate', hasVideo: true },
  { id: '6', name: 'Side Kick Series', targetArea: 'Hips / Glutes', difficulty: 'Beginner', hasVideo: true },
  { id: '7', name: 'Mermaid Stretch', targetArea: 'Spine / Obliques', difficulty: 'Beginner', hasVideo: true },
  { id: '8', name: 'Control Balance', targetArea: 'Full Body', difficulty: 'Advanced', hasVideo: false },
];

const DifficultyBadge: React.FC<{ level: Exercise['difficulty'] }> = ({ level }) => {
  const styles = {
    Beginner: 'bg-emerald-100 text-emerald-500',
    Intermediate: 'bg-purple-100 text-purple-500',
    Advanced: 'bg-rose-50 text-rose-400',
  };
  return (
    <span className={`px-4 py-1 rounded-full text-[10px] font-bold inline-block min-w-[85px] text-center ${styles[level]}`}>
      {level}
    </span>
  );
};

const Exercises: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>(initialExerciseData);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  const selectedExercise = useMemo(
    () => exercises.find((e) => e.id === selectedExerciseId) ?? null,
    [exercises, selectedExerciseId]
  );

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const applyCreate = (values: ExerciseCreateValues) => {
    const newExercise: Exercise = {
      id: String(Date.now()),
      name: values.name,
      targetArea: values.targetArea,
      difficulty: values.difficulty as ExerciseDifficulty,
      category: values.category,
      instructions: values.instructions,
      hasVideo: Boolean(values.videoFileName),
      videoFileName: values.videoFileName,
    };
    setExercises((prev) => [newExercise, ...prev]);
  };

  return (
    <div className="p-8 bg-[#FAF9FF] min-h-screen">
      {/* Main Container Card */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search workouts.." 
              className="pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm w-72 focus:ring-2 focus:ring-pink-200 outline-none"
            />
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#FFB1D1] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#FF9CBF] transition-colors"
          >
            <Plus size={18} />
            Add Exercise
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-transparent">
                <th className="pb-6 pl-4">Exercise</th>
                <th className="pb-6">Target Area</th>
                <th className="pb-6">Difficulty</th>
                <th className="pb-6">Video</th>
                <th className="pb-6 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {exercises.map((exercise) => (
                <tr key={exercise.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 pl-4 text-sm font-bold text-gray-700">
                    {exercise.name}
                  </td>
                  <td className="py-5">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                      <div className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center p-0.5">
                         <div className="w-full h-full rounded-full border border-purple-300 border-dashed"></div>
                      </div>
                      {exercise.targetArea}
                    </div>
                  </td>
                  <td className="py-5">
                    <DifficultyBadge level={exercise.difficulty} />
                  </td>
                  <td className="py-5">
                    <div className="flex items-center gap-2 text-xs font-medium">
                      {exercise.hasVideo ? (
                        <>
                          <Play size={14} className="text-gray-400" />
                          <span className="text-gray-500">Attached</span>
                        </>
                      ) : (
                        <span className="text-gray-300 ml-5">No video</span>
                      )}
                    </div>
                  </td>
                  <td className="py-5 pr-4">
                    <div className="flex items-center gap-3">
                      <button
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() => {
                          setSelectedExerciseId(exercise.id);
                          setIsEditOpen(true);
                        }}
                        aria-label="Edit exercise"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="text-rose-300 hover:text-rose-500 transition-colors"
                        onClick={() => setExercises((prev) => prev.filter((e) => e.id !== exercise.id))}
                        aria-label="Delete exercise"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ExerciseCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={applyCreate}
      />

      <ExerciseEditModal
        isOpen={isEditOpen}
        exercise={selectedExercise}
        onClose={() => setIsEditOpen(false)}
        onSave={(values) => {
          if (!selectedExerciseId) return;
          setExercises((prev) =>
            prev.map((e) =>
              e.id === selectedExerciseId
                ? { ...e, name: values.name, targetArea: values.targetArea, instructions: values.instructions }
                : e
            )
          );
        }}
        onDelete={() => {
          if (!selectedExerciseId) return;
          setExercises((prev) => prev.filter((e) => e.id !== selectedExerciseId));
          setIsEditOpen(false);
          setSelectedExerciseId(null);
        }}
      />
    </div>
  );
};

export default Exercises;