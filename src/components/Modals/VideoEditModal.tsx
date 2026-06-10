import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2 } from 'lucide-react';
import type { VideoModalItem } from './VideoViewModal';
import useAxiosSecure from '../../hooks/useAxioSecure';

type Difficulty = VideoModalItem['difficulty'];
type Visibility  = VideoModalItem['visibility'];

interface ApiCategory {
  id: string;
  name: string;
}

type Props = {
  isOpen: boolean;
  video: VideoModalItem | null;
  onClose: () => void;
  onSaved: () => void; // called after successful update to refresh list
};

export default function VideoEditModal({ isOpen, video, onClose, onSaved }: Props) {
  const axiosSecure = useAxiosSecure();
  const axiosRef    = useRef(axiosSecure);
  axiosRef.current  = axiosSecure;

  const [title,       setTitle]       = useState('');
  const [description, setDescription] = useState('');
  const [difficulty,  setDifficulty]  = useState<Difficulty>('BEGINNER');
  const [visibility,  setVisibility]  = useState<Visibility>('PUBLIC');
  const [categoryId,  setCategoryId]  = useState('');

  const [categories,  setCategories]  = useState<ApiCategory[]>([]);
  const [catsLoading, setCatsLoading] = useState(false);
  const [saving,      setSaving]      = useState(false);
  const [error,       setError]       = useState<string | null>(null);

  // Populate form when video changes
  useEffect(() => {
    if (video) {
      setTitle(video.title ?? '');
      setDescription(video.description ?? '');
      setDifficulty(video.difficulty ?? 'BEGINNER');
      setVisibility(video.visibility ?? 'PUBLIC');
      setCategoryId(video.categoryId ?? '');
    }
  }, [video]);

  // Fetch categories when modal opens
  useEffect(() => {
    if (!isOpen) return;
    setCatsLoading(true);
    axiosRef.current
      .get('/categories/all')
      .then((res) => {
        const raw: ApiCategory[] =
          res.data?.data?.data ?? res.data?.data ?? res.data ?? [];
        setCategories(Array.isArray(raw) ? raw : []);
      })
      .catch(() => setCategories([]))
      .finally(() => setCatsLoading(false));
  }, [isOpen]);

  const handleSave = async () => {
    if (!video || !title.trim()) return;
    setSaving(true);
    setError(null);
    try {
      await axiosRef.current.put(`/videos/update/${video.id}`, {
        title:       title.trim(),
        description: description.trim(),
        difficulty,
        visibility,
        categoriesId: categoryId || undefined,
      });
      onSaved();
      onClose();
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Failed to save changes. Please try again.';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const canSave = title.trim().length > 0 && !saving;

  if (!isOpen || !video) return null;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-400">Edit Video</div>
          <button
            onClick={onClose}
            disabled={saving}
            className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-40"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 bg-[#FAF9FF]">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-4">
            {/* Title */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 mb-1.5">
                Title <span className="text-rose-400">*</span>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Video title"
                disabled={saving}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200 disabled:opacity-60"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Category</label>
              {catsLoading ? (
                <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm text-gray-400">
                  <Loader2 size={14} className="animate-spin" />
                  Loading categories…
                </div>
              ) : (
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  disabled={saving}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200 disabled:opacity-60"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Video description..."
                rows={3}
                disabled={saving}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200 resize-none disabled:opacity-60"
              />
            </div>

            {/* Difficulty + Visibility */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                  disabled={saving}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200 disabled:opacity-60"
                >
                  <option value="BEGINNER">Beginner</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="ADVANCED">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5">Visibility</label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value as Visibility)}
                  disabled={saving}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200 disabled:opacity-60"
                >
                  <option value="PUBLIC">Public</option>
                  <option value="PRIVATE">Private</option>
                </select>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="px-4 py-3 rounded-2xl bg-rose-50 border border-rose-100 text-rose-500 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="px-5 py-2.5 rounded-2xl border border-gray-100 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!canSave}
                className="px-6 py-2.5 rounded-2xl bg-[#FF87B2] text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
