import React from 'react';
import { 
  Plus, 
  Folder, 
  Layers, 
  Edit2, 
  Trash2 
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  itemCount: number;
  colorTheme: 'pink' | 'purple' | 'green' | 'yellow';
  hasActions?: boolean;
}

const categoriesData: Category[] = [
  { id: '1', name: 'Core', itemCount: 24, colorTheme: 'pink', hasActions: true },
  { id: '2', name: 'Full Body', itemCount: 18, colorTheme: 'purple' },
  { id: '3', name: 'Stretching', itemCount: 15, colorTheme: 'green' },
  { id: '4', name: 'Reformer', itemCount: 12, colorTheme: 'yellow' },
  { id: '5', name: 'Recovery', itemCount: 8, colorTheme: 'pink' },
  { id: '6', name: 'Strength', itemCount: 21, colorTheme: 'purple' },
  { id: '7', name: 'Posture', itemCount: 9, colorTheme: 'green' },
  { id: '8', name: 'Prenatal', itemCount: 6, colorTheme: 'yellow', hasActions: true },
];

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
  const themes = {
    pink: 'bg-rose-50 text-rose-400',
    purple: 'bg-purple-50 text-purple-400',
    green: 'bg-emerald-50 text-emerald-400',
    yellow: 'bg-amber-50 text-amber-500',
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-3 hover:shadow-sm transition-all group">
      {/* Icon Circle */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${themes[category.colorTheme]}`}>
        <Folder size={20} />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-gray-800 text-sm">{category.name}</h3>
        <div className="flex items-center gap-1.5 text-gray-400">
          <Layers size={14} className="stroke-[2.5px]" />
          <span className="text-xs font-medium">{category.itemCount} items</span>
        </div>
      </div>

      {/* Actions (visible when explicitly enabled or on hover) */}
      <div className={`flex items-center gap-3 pt-1 ${category.hasActions ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
        <button className="text-gray-300 hover:text-gray-500 transition-colors">
          <Edit2 size={14} />
        </button>
        <button className="text-rose-200 hover:text-rose-400 transition-colors">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

const Categories: React.FC = () => {
  return (
    <div className="p-8 bg-[#FAF9FF] min-h-screen">
      {/* Main Container Card */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-lg font-bold text-gray-800">All Categories</h2>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#FFB1D1] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#FF9CBF] transition-colors">
            <Plus size={18} className="stroke-[3px]" />
            Add Category
          </button>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesData.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;