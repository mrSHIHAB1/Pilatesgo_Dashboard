import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { UploadCloud, X } from 'lucide-react';
import type { VideoModalItem } from './VideoViewModal';

export type VideoUploadValues = Pick<
  VideoModalItem,
  'title' | 'category' | 'description' | 'duration' | 'difficulty' | 'visibility' | 'thumbnail'
>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: VideoUploadValues) => void;
};

export default function VideoUploadModal({ isOpen, onClose, onSubmit }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState<VideoModalItem['difficulty']>('Beginner');
  const [visibility, setVisibility] = useState<VideoModalItem['visibility']>('Public');

  const progress = fileName ? 67 : 0;

  const canSubmit = useMemo(() => {
    return (
      fileName.trim().length > 0 &&
      title.trim().length > 0 &&
      category.trim().length > 0 &&
      duration.trim().length > 0
    );
  }, [fileName, title, category, duration]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const reset = () => {
    setFileName('');
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl('');
    setTitle('');
    setCategory('');
    setDescription('');
    setDuration('');
    setDifficulty('Beginner');
    setVisibility('Public');
  };

  const handlePickFile = () => inputRef.current?.click();

  const handleFile = (file: File | null) => {
    if (!file) return;
    setFileName(file.name);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  if (!isOpen) return null;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-400">Upload Video</div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Area */}
            <div>
              <div
                className="w-full rounded-3xl border border-dashed border-pink-200 bg-white p-10 flex flex-col items-center justify-center text-center cursor-pointer"
                onClick={handlePickFile}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0] ?? null;
                  handleFile(file);
                }}
              >
                <UploadCloud size={24} className="text-pink-300" />
                <p className="mt-3 text-sm font-semibold text-gray-600">Drag & drop your video here</p>
                <p className="mt-1 text-xs text-gray-400">or click to browse - MP4, MOV up to 2GB</p>

                {fileName && (
                  <div className="mt-5 w-full max-w-sm">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500">
                      <span className="truncate">{fileName}</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #FF87B2 0%, #A78BFA 100%)' }}
                      />
                    </div>
                  </div>
                )}

                <input
                  ref={inputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                />
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-2">Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Video title"
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200"
                  >
                    <option value="">Select category</option>
                    <option value="Pilates">Pilates</option>
                    <option value="Reformer">Reformer</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-[11px] font-bold text-gray-500 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Video description..."
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
                    placeholder="mm:ss"
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-2">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as VideoModalItem['difficulty'])}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-2">Visibility</label>
                  <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value as VideoModalItem['visibility'])}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200"
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
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
                  disabled={!canSubmit}
                  onClick={() => {
                    if (!canSubmit) return;
                    onSubmit({
                      title,
                      category,
                      description,
                      duration,
                      difficulty,
                      visibility,
                      thumbnail: previewUrl || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400',
                    });
                    onClose();
                    reset();
                  }}
                  className="px-6 py-2.5 rounded-2xl bg-[#FF87B2] text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95 transition-opacity"
                >
                  Upload &amp; Save
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
