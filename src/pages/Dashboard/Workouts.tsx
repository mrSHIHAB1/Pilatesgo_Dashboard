import React from 'react';
import { 
  Search, 
  Plus, 
  Clock, 
  Dumbbell, 
  Edit2, 
  Trash2 
} from 'lucide-react';

interface Workout {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  exercises: number;
  status: 'Published' | 'Draft';
}

const workoutData: Workout[] = [
  { id: '1', title: 'Morning Core Blast', level: 'Intermediate', duration: '25 min', exercises: 8, status: 'Published' },
  { id: '2', title: 'Full Body Stretch', level: 'Beginner', duration: '20 min', exercises: 6, status: 'Published' },
  { id: '3', title: 'Advanced Reformer', level: 'Advanced', duration: '45 min', exercises: 12, status: 'Draft' },
  { id: '4', title: 'Posture Fix', level: 'Beginner', duration: '15 min', exercises: 5, status: 'Published' },
  { id: '5', title: 'Glute Activation', level: 'Intermediate', duration: '30 min', exercises: 10, status: 'Published' },
  { id: '6', title: 'Spine Mobility', level: 'Beginner', duration: '18 min', exercises: 7, status: 'Draft' },
];

const LevelBadge: React.FC<{ level: Workout['level'] }> = ({ level }) => {
  const styles = {
    Intermediate: 'bg-purple-100 text-purple-500',
    Beginner: 'bg-emerald-100 text-emerald-500',
    Advanced: 'bg-rose-50 text-rose-400',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${styles[level]}`}>
      {level}
    </span>
  );
};

const StatusBadge: React.FC<{ status: Workout['status'] }> = ({ status }) => (
  <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${
    status === 'Published' ? 'bg-emerald-50 text-emerald-400' : 'bg-gray-50 text-gray-400'
  }`}>
    {status}
  </span>
);

const WorkoutCard: React.FC<{ workout: Workout }> = ({ workout }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 hover:shadow-sm transition-shadow group relative">
    {/* Top Row: Level and Status */}
    <div className="flex justify-between items-center">
      <LevelBadge level={workout.level} />
      <StatusBadge status={workout.status} />
    </div>

    {/* Title */}
    <h3 className="font-bold text-gray-800 text-sm">{workout.title}</h3>

    {/* Stats */}
    <div className="flex items-center gap-4 text-gray-400">
      <div className="flex items-center gap-1.5">
        <Clock size={14} />
        <span className="text-xs font-medium">{workout.duration}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Dumbbell size={14} />
        <span className="text-xs font-medium">{workout.exercises} exercises</span>
      </div>
    </div>

    {/* Actions (visible on card) */}
    <div className="flex gap-2 mt-2">
      <button className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
        <Edit2 size={14} />
      </button>
      <button className="p-2 border border-rose-100 rounded-lg text-rose-300 hover:bg-rose-50 hover:text-rose-500 transition-colors">
        <Trash2 size={14} />
      </button>
    </div>
  </div>
);

const Workouts: React.FC = () => {
  return (
    <div className="p-8 bg-[#FAF9FF] min-h-screen">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search workouts.." 
              className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-pink-200 outline-none"
            />
          </div>

          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#FFB1D1] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#FF9CBF] transition-colors">
            <Plus size={18} />
            Create Workout
          </button>
        </div>

        {/* Workout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workoutData.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workouts;