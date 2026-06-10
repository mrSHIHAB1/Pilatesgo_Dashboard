import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Plus, Folder, Layers, Edit2, Trash2, X, AlertTriangle, Loader2 } from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxioSecure';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Category {
  id: string;
  name: string;
  description?: string;
  colorTheme?: ColorKey;
}

type ColorKey = 'pink' | 'purple' | 'mint' | 'yellow' | 'peach';

// ─── Constants ───────────────────────────────────────────────────────────────

const COLOR_OPTIONS: { key: ColorKey; bg: string; dot: string }[] = [
  { key: 'pink',   bg: 'bg-rose-50   text-rose-400',   dot: 'bg-[#FFB1D1]' },
  { key: 'purple', bg: 'bg-purple-50  text-purple-400', dot: 'bg-[#C4B5FD]' },
  { key: 'mint',   bg: 'bg-emerald-50 text-emerald-400',dot: 'bg-[#6EE7B7]' },
  { key: 'yellow', bg: 'bg-amber-50   text-amber-500',  dot: 'bg-[#FDE68A]' },
  { key: 'peach',  bg: 'bg-orange-50  text-orange-400', dot: 'bg-[#FDBA74]' },
];

const colorBg = (key?: ColorKey) =>
  COLOR_OPTIONS.find((c) => c.key === key)?.bg ?? COLOR_OPTIONS[0].bg;

// ─── Category Card ────────────────────────────────────────────────────────────

interface CardProps {
  category: Category;
  onEdit: (c: Category) => void;
  onDelete: (c: Category) => void;
}

const CategoryCard: React.FC<CardProps> = ({ category, onEdit, onDelete }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-3 hover:shadow-md transition-all group">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorBg(category.colorTheme)}`}>
      <Folder size={20} />
    </div>

    <div className="flex flex-col gap-1 flex-1">
      <h3 className="font-bold text-gray-800 text-sm">{category.name}</h3>
      {category.description && (
        <p className="text-xs text-gray-400 line-clamp-2">{category.description}</p>
      )}
      <div className="flex items-center gap-1.5 text-gray-300 mt-1">
        <Layers size={13} className="stroke-[2.5px]" />
        <span className="text-xs font-medium">Category</span>
      </div>
    </div>

    <div className="flex items-center gap-3 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={() => onEdit(category)}
        className="text-gray-300 hover:text-gray-600 transition-colors"
        title="Edit"
      >
        <Edit2 size={14} />
      </button>
      <button
        onClick={() => onDelete(category)}
        className="text-rose-200 hover:text-rose-500 transition-colors"
        title="Delete"
      >
        <Trash2 size={14} />
      </button>
    </div>
  </div>
);

// ─── Category Modal ───────────────────────────────────────────────────────────

interface ModalProps {
  mode: 'add' | 'edit';
  initial?: Partial<Category>;
  loading: boolean;
  onSave: (data: { name: string; description: string; colorTheme: ColorKey }) => void;
  onClose: () => void;
}

const CategoryModal: React.FC<ModalProps> = ({ mode, initial, loading, onSave, onClose }) => {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [color, setColor] = useState<ColorKey>(initial?.colorTheme ?? 'pink');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), description: description.trim(), colorTheme: color });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 relative animate-fade-in">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-300 hover:text-gray-500 transition-colors"
        >
          <X size={18} />
        </button>

        <h2 className="text-lg font-bold text-gray-800 mb-6">
          {mode === 'add' ? 'Add Category' : 'Edit Category'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Core"
              required
              className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#EEEEEE] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB1D1] transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description..."
              rows={3}
              className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#EEEEEE] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB1D1] transition-all resize-none"
            />
          </div>

          {/* Icon Color */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Icon Color
            </label>
            <div className="flex items-center gap-3">
              {COLOR_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setColor(opt.key)}
                  className={`w-9 h-9 rounded-full ${opt.dot} transition-all ${
                    color === opt.key
                      ? 'ring-2 ring-offset-2 ring-gray-400 scale-110'
                      : 'hover:scale-105'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-3xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="flex-1 py-3 rounded-3xl bg-[#FFB1D1] hover:bg-[#FF9CBF] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              {mode === 'add' ? 'Save Category' : 'Update Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

interface DeleteModalProps {
  category: Category;
  loading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ category, loading, onConfirm, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 relative animate-fade-in text-center">
      <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4">
        <AlertTriangle size={26} className="text-rose-400" />
      </div>
      <h2 className="text-lg font-bold text-gray-800 mb-2">Delete Category?</h2>
      <p className="text-sm text-gray-500 mb-6">
        Are you sure you want to delete <span className="font-semibold text-gray-700">"{category.name}"</span>? This action cannot be undone.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-3 rounded-3xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 py-3 rounded-3xl bg-rose-400 hover:bg-rose-500 disabled:opacity-60 text-white text-sm font-bold transition-colors flex items-center justify-center gap-2"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          Delete
        </button>
      </div>
    </div>
  </div>
);

// ─── Main Categories Page ─────────────────────────────────────────────────────

type ModalState =
  | { type: 'none' }
  | { type: 'add' }
  | { type: 'edit'; category: Category }
  | { type: 'delete'; category: Category };

const Categories: React.FC = () => {
  const axiosSecure = useAxiosSecure();
  // Keep a stable ref so useCallback doesn't re-run on every render
  const axiosRef = useRef(axiosSecure);
  axiosRef.current = axiosSecure;

  const [categories, setCategories] = useState<Category[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [mutateLoading, setMutateLoading] = useState(false);
  const [modal, setModal] = useState<ModalState>({ type: 'none' });
  const [error, setError] = useState<string | null>(null);

  // ── Fetch all categories ──
  const fetchCategories = useCallback(async () => {
    setFetchLoading(true);
    setError(null);
    try {
      const res = await axiosRef.current.get('/categories/all');
      // Log raw response so we can see the actual shape
      console.log('[Categories] API response:', res.data);
      // API shape: { success, data: { data: [...], total, page, limit, totalPages } }
      const raw = res.data?.data?.data ?? res.data?.data ?? res.data ?? [];
      setCategories(Array.isArray(raw) ? raw : []);
    } catch (err) {
      console.error('[Categories] Fetch error:', err);
      setError('Failed to load categories. Please try again.');
    } finally {
      setFetchLoading(false);
    }
  }, []); // stable — uses ref internally

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // ── Create ──
  const handleCreate = async (data: { name: string; description: string; colorTheme: ColorKey }) => {
    setMutateLoading(true);
    try {
      await axiosRef.current.post('/categories/create', {
        name: data.name,
        description: data.description,
      });
      setModal({ type: 'none' });
      await fetchCategories();
    } catch {
      setError('Failed to create category.');
    } finally {
      setMutateLoading(false);
    }
  };

  // ── Update ──
  const handleUpdate = async (data: { name: string; description: string; colorTheme: ColorKey }) => {
    if (modal.type !== 'edit') return;
    setMutateLoading(true);
    try {
      await axiosRef.current.put(`/categories/update/${modal.category.id}`, {
        name: data.name,
        description: data.description,
      });
      setModal({ type: 'none' });
      await fetchCategories();
    } catch {
      setError('Failed to update category.');
    } finally {
      setMutateLoading(false);
    }
  };

  // ── Delete ──
  const handleDelete = async () => {
    if (modal.type !== 'delete') return;
    setMutateLoading(true);
    try {
      await axiosRef.current.delete(`/categories/delete/${modal.category.id}`);
      setModal({ type: 'none' });
      await fetchCategories();
    } catch {
      setError('Failed to delete category.');
    } finally {
      setMutateLoading(false);
    }
  };

  return (
    <div className="p-8 bg-[#FAF9FF] min-h-screen">
      {/* Main Container Card */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-lg font-bold text-gray-800">All Categories</h2>
          <button
            onClick={() => setModal({ type: 'add' })}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#FFB1D1] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#FF9CBF] transition-colors"
          >
            <Plus size={18} className="stroke-[3px]" />
            Add Category
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 px-5 py-3 bg-rose-50 border border-rose-100 rounded-2xl text-rose-500 text-sm font-medium flex items-center justify-between">
            {error}
            <button onClick={() => setError(null)}><X size={14} /></button>
          </div>
        )}

        {/* Loading State */}
        {fetchLoading ? (
          <div className="flex items-center justify-center py-20 text-gray-300">
            <Loader2 size={32} className="animate-spin" />
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
            <Folder size={40} className="text-gray-200" />
            <p className="text-sm font-medium">No categories yet. Add one to get started.</p>
          </div>
        ) : (
          /* Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onEdit={(c) => setModal({ type: 'edit', category: c })}
                onDelete={(c) => setModal({ type: 'delete', category: c })}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {modal.type === 'add' && (
        <CategoryModal
          mode="add"
          loading={mutateLoading}
          onSave={handleCreate}
          onClose={() => setModal({ type: 'none' })}
        />
      )}

      {modal.type === 'edit' && (
        <CategoryModal
          mode="edit"
          initial={modal.category}
          loading={mutateLoading}
          onSave={handleUpdate}
          onClose={() => setModal({ type: 'none' })}
        />
      )}

      {modal.type === 'delete' && (
        <DeleteModal
          category={modal.category}
          loading={mutateLoading}
          onConfirm={handleDelete}
          onClose={() => setModal({ type: 'none' })}
        />
      )}
    </div>
  );
};

export default Categories;