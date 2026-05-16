import React, { useMemo, useState } from 'react';
import { 
  Search, 
  Plus, 
  Calendar, 
  Dumbbell, 
  Users, 
  Edit3, 
  Trash2 
} from 'lucide-react';

import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import ProgramCreateModal from '../../components/Modals/ProgramCreateModal';
import ProgramEditModal from '../../components/Modals/ProgramEditModal';
import ProgramDetailsModal from '../../components/Modals/ProgramDetailsModal';
import ProgramPublishModal from '../../components/Modals/ProgramPublishModal';
import type { ProgramLevel, ProgramCreateValues } from '../../components/Modals/ProgramCreateModal';

interface Program {
  id: string;
  title: string;
  description: string;
  level: ProgramLevel;
  duration: string;
  workoutCount: number;
  enrolledCount: number;
  status: 'Published' | 'Draft';
  category: string;
  coverImageUrl: string;
  exercises: string[];
}

const initialProgramsData: Program[] = [
  {
    id: '1',
    title: 'Beginner Pilates Journey',
    description: 'A 4-week core workout designed to strengthen and tone your midsection.',
    level: 'Intermediate',
    duration: '4 weeks',
    workoutCount: 20,
    enrolledCount: 1240,
    status: 'Published',
    category: 'General',
    coverImageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    exercises: [
      'The Hundred',
      'Roll Up',
      'Single Leg Circle',
      'Rolling Like a Ball',
      'Single Leg Stretch',
      'Double Leg Stretch',
      'Criss Cross',
      'Spine Stretch Forward',
      'Saw',
      'Swan Dive',
      'Teaser',
      'Side Kick Series',
      'Mermaid Stretch',
    ],
  },
  {
    id: '2',
    title: 'Core Strength Builder',
    description: 'Build core strength with progressive workouts and mindful movement.',
    level: 'Intermediate',
    duration: '6 weeks',
    workoutCount: 30,
    enrolledCount: 892,
    status: 'Published',
    category: 'General',
    coverImageUrl: 'https://images.unsplash.com/photo-1518611012118-296072bb5604?auto=format&fit=crop&q=80&w=800',
    exercises: ['The Hundred', 'Roll Up', 'Teaser', 'Swan Dive', 'Side Kick Series'],
  },
  {
    id: '3',
    title: 'Advanced Mat Mastery',
    description: 'An advanced 8-week mat series to challenge control and endurance.',
    level: 'Advanced',
    duration: '8 weeks',
    workoutCount: 40,
    enrolledCount: 456,
    status: 'Draft',
    category: 'General',
    coverImageUrl: 'https://images.unsplash.com/photo-1510894347713-fc3ad6cb03a2?auto=format&fit=crop&q=80&w=800',
    exercises: ['Teaser', 'Control Balance', 'Swan Dive', 'Roll Over'],
  },
  {
    id: '4',
    title: 'Postpartum Recovery',
    description: 'Gentle recovery-focused program to rebuild strength and stability.',
    level: 'Beginner',
    duration: '12 weeks',
    workoutCount: 36,
    enrolledCount: 678,
    status: 'Published',
    category: 'General',
    coverImageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800',
    exercises: ['Mermaid Stretch', 'Spine Stretch Forward', 'Single Leg Stretch'],
  },
];

const LevelBadge: React.FC<{ level: Program['level'] }> = ({ level }) => {
  const styles = {
    Beginner: 'bg-emerald-100 text-emerald-500',
    Intermediate: 'bg-purple-100 text-purple-500',
    Advanced: 'bg-rose-50 text-rose-400',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${styles[level]}`}>
      {level}
    </span>
  );
};

const ProgramCard: React.FC<{
  program: Program;
  onEdit: () => void;
  onView: () => void;
  onDelete: () => void;
}> = ({ program, onEdit, onView, onDelete }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-sm transition-all group">
    {/* Top Row: Level & Status */}
    <div className="flex justify-between items-center mb-4">
      <LevelBadge level={program.level} />
      <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${
        program.status === 'Published' ? 'bg-emerald-50 text-emerald-400' : 'bg-gray-50 text-gray-400'
      }`}>
        {program.status}
      </span>
    </div>

    {/* Title */}
    <h3 className="font-bold text-gray-800 text-base mb-3 leading-tight">{program.title}</h3>

    {/* Stats Row */}
    <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
      <div className="flex items-center gap-1.5">
        <Calendar size={14} className="stroke-[2.5px]" />
        <span className="text-xs font-medium">{program.duration}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Dumbbell size={14} className="stroke-[2.5px]" />
        <span className="text-xs font-medium">{program.workoutCount} workouts</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Users size={14} className="stroke-[2.5px]" />
        <span className="text-xs font-medium">{program.enrolledCount} enrolled</span>
      </div>
    </div>

    {/* Actions Row */}
    <div className="flex items-center gap-2">
      <button
        onClick={onEdit}
        className="flex items-center gap-1.5 px-4 py-1.5 border border-gray-100 rounded-lg text-gray-500 text-xs font-bold hover:bg-gray-50 transition-colors"
      >
        <Edit3 size={14} />
        Edit
      </button>
      <button
        onClick={onView}
        className="px-5 py-1.5 border border-gray-100 rounded-lg text-gray-500 text-xs font-bold hover:bg-gray-50 transition-colors"
      >
        View
      </button>
      <button
        onClick={onDelete}
        className="p-2 border border-rose-100 rounded-lg text-rose-300 hover:bg-rose-50 hover:text-rose-500 transition-colors ml-auto"
        aria-label="Delete program"
      >
        <Trash2 size={16} />
      </button>
    </div>
  </div>
);

const Programs: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>(initialProgramsData);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const selectedProgram = useMemo(
    () => programs.find((p) => p.id === selectedProgramId) ?? null,
    [programs, selectedProgramId]
  );

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const [publishProgramId, setPublishProgramId] = useState<string | null>(null);
  const publishProgram = useMemo(
    () => programs.find((p) => p.id === publishProgramId) ?? null,
    [programs, publishProgramId]
  );

  const createDraftProgram = (values: ProgramCreateValues) => {
    const id = String(Date.now());
    const exercises = ['The Hundred', 'Roll Up', 'Single Leg Circle', 'Rolling Like a Ball', 'Single Leg Stretch', 'Double Leg Stretch', 'Criss Cross'];
    const draft: Program = {
      id,
      title: values.title,
      description: values.description,
      level: values.level,
      duration: values.duration,
      workoutCount: exercises.length,
      enrolledCount: 0,
      status: 'Draft',
      category: values.category,
      coverImageUrl: values.coverImageUrl,
      exercises,
    };

    setPrograms((prev) => [draft, ...prev]);
    setPublishProgramId(id);
    setIsPublishOpen(true);
  };

  return (
    <div className="p-8 bg-[#FAF9FF] min-h-screen">
      {/* Main Container Card */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
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
            <Plus size={18} className="stroke-[3px]" />
            Create Program
          </button>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {programs.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onEdit={() => {
                setSelectedProgramId(program.id);
                setIsEditOpen(true);
              }}
              onView={() => {
                setSelectedProgramId(program.id);
                setIsDetailsOpen(true);
              }}
              onDelete={() => {
                setSelectedProgramId(program.id);
                setIsDeleteConfirmOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      <ProgramCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onContinue={createDraftProgram}
      />

      <ProgramEditModal
        isOpen={isEditOpen}
        program={
          selectedProgram
            ? {
                id: selectedProgram.id,
                title: selectedProgram.title,
                description: selectedProgram.description,
                duration: selectedProgram.duration,
                level: selectedProgram.level,
                category: selectedProgram.category,
                coverImageUrl: selectedProgram.coverImageUrl,
              }
            : null
        }
        onClose={() => setIsEditOpen(false)}
        onSaveAndPublish={(values) => {
          if (!selectedProgramId) return;
          setPrograms((prev) =>
            prev.map((p) =>
              p.id === selectedProgramId
                ? {
                    ...p,
                    title: values.title,
                    description: values.description,
                    duration: values.duration,
                    level: values.level,
                    category: values.category,
                    coverImageUrl: values.coverImageUrl,
                  }
                : p
            )
          );
          setIsEditOpen(false);
          setPublishProgramId(selectedProgramId);
          setIsPublishOpen(true);
        }}
      />

      <ProgramDetailsModal
        isOpen={isDetailsOpen}
        program={
          selectedProgram
            ? {
                id: selectedProgram.id,
                title: selectedProgram.title,
                description: selectedProgram.description,
                duration: selectedProgram.duration,
                level: selectedProgram.level,
                workoutCount: selectedProgram.workoutCount,
                exercises: selectedProgram.exercises,
              }
            : null
        }
        onClose={() => setIsDetailsOpen(false)}
        onEdit={() => {
          setIsDetailsOpen(false);
          setIsEditOpen(true);
        }}
      />

      <ProgramPublishModal
        isOpen={isPublishOpen}
        programTitle={publishProgram?.title ?? ''}
        duration={publishProgram?.duration ?? ''}
        workouts={publishProgram?.workoutCount ?? 0}
        difficulty={publishProgram?.level ?? ''}
        onCancel={() => {
          setIsPublishOpen(false);
          setPublishProgramId(null);
        }}
        onPublish={() => {
          if (!publishProgramId) return;
          setPrograms((prev) => prev.map((p) => (p.id === publishProgramId ? { ...p, status: 'Published' } : p)));
          setIsPublishOpen(false);
          setPublishProgramId(null);
        }}
      />

      <ConfirmationModal
        isOpen={isDeleteConfirmOpen}
        title="Delete program"
        message="This action cannot be undone. Do you want to delete this program?"
        onCancel={() => setIsDeleteConfirmOpen(false)}
        onConfirm={() => {
          if (!selectedProgramId) return;
          setPrograms((prev) => prev.filter((p) => p.id !== selectedProgramId));
          setIsDeleteConfirmOpen(false);
          setSelectedProgramId(null);
        }}
      />
    </div>
  );
};

export default Programs;