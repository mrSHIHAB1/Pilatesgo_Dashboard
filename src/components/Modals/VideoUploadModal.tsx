import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { UploadCloud, X, CheckCircle2, Loader2 } from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxioSecure';

// ─── Types ───────────────────────────────────────────────────────────────────

type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
type Visibility  = 'PUBLIC' | 'PRIVATE';

interface ApiCategory {
  id: string;
  name: string;
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onUploaded?: () => void; // called after a successful upload so parent can refresh
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function VideoUploadModal({ isOpen, onClose, onUploaded }: Props) {
  const axiosSecure = useAxiosSecure();
  const axiosRef    = useRef(axiosSecure);
  axiosRef.current  = axiosSecure;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Form state
  const [videoFile,    setVideoFile]    = useState<File | null>(null);
  const [title,        setTitle]        = useState('');
  const [description,  setDescription]  = useState('');
  const [difficulty,   setDifficulty]   = useState<Difficulty>('BEGINNER');
  const [visibility,   setVisibility]   = useState<Visibility>('PUBLIC');
  const [categoryId,   setCategoryId]   = useState('');

  // Categories dropdown
  const [categories,    setCategories]    = useState<ApiCategory[]>([]);
  const [catsLoading,   setCatsLoading]   = useState(false);

  // Upload progress
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading,      setUploading]      = useState(false);
  const [uploadDone,     setUploadDone]     = useState(false);
  const [uploadError,    setUploadError]    = useState<string | null>(null);

  // ── Fetch categories when modal opens ──
  useEffect(() => {
    if (!isOpen) return;
    setCatsLoading(true);
    axiosRef.current
      .get('/categories/all')
      .then((res) => {
        const raw: ApiCategory[] =
          res.data?.data?.data ?? res.data?.data ?? res.data ?? [];
        setCategories(Array.isArray(raw) ? raw : []);
        if (raw.length > 0 && !categoryId) setCategoryId(raw[0].id);
      })
      .catch(() => setCategories([]))
      .finally(() => setCatsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // ── Reset everything ──
  const reset = () => {
    setVideoFile(null);
    setTitle('');
    setDescription('');
    setDifficulty('BEGINNER');
    setVisibility('PUBLIC');
    setCategoryId(categories[0]?.id ?? '');
    setUploadProgress(0);
    setUploading(false);
    setUploadDone(false);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClose = () => {
    if (uploading) return; // prevent close during upload
    reset();
    onClose();
  };

  // ── File selection ──
  const handleFile = (file: File | null) => {
    if (!file) return;
    setVideoFile(file);
    setUploadProgress(0);
    setUploadDone(false);
    setUploadError(null);
  };

  // ── Submit / Upload ──
  const handleUpload = async () => {
    if (!videoFile || !title.trim() || !categoryId) return;

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append(
      'data',
      JSON.stringify({
        title:       title.trim(),
        description: description.trim(),
        difficulty,
        visibility,
        categoriesId: categoryId,
      })
    );

    setUploading(true);
    setUploadError(null);
    setUploadProgress(0);

    try {
      await axiosRef.current.post('/videos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (evt) => {
          if (evt.total) {
            const pct = Math.round((evt.loaded * 100) / evt.total);
            setUploadProgress(pct);
          }
        },
      });
      setUploadProgress(100);
      setUploadDone(true);
      onUploaded?.();
      // Auto-close after 1.5 s
      setTimeout(() => {
        reset();
        onClose();
      }, 1500);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Upload failed. Please try again.';
      setUploadError(msg);
    } finally {
      setUploading(false);
    }
  };

  const canUpload = !!videoFile && title.trim().length > 0 && !!categoryId && !uploading;

  if (!isOpen) return null;

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-500">Upload Video</div>
          <button
            onClick={handleClose}
            disabled={uploading}
            className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-40"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 bg-[#FAF9FF]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ── Left: Drop Zone + Progress ── */}
            <div className="flex flex-col gap-4">
              {/* Drop zone */}
              <div
                className={`w-full rounded-3xl border-2 border-dashed bg-white p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                  videoFile ? 'border-pink-300' : 'border-pink-200 hover:border-pink-300'
                }`}
                onClick={() => !uploading && fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (!uploading) handleFile(e.dataTransfer.files?.[0] ?? null);
                }}
              >
                {uploadDone ? (
                  <>
                    <CheckCircle2 size={36} className="text-emerald-400" />
                    <p className="mt-3 text-sm font-semibold text-emerald-500">Upload Complete!</p>
                  </>
                ) : (
                  <>
                    <UploadCloud size={32} className="text-pink-300" />
                    <p className="mt-3 text-sm font-semibold text-gray-600">
                      {videoFile ? videoFile.name : 'Drag & drop your video here'}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {videoFile
                        ? `${(videoFile.size / 1024 / 1024).toFixed(1)} MB`
                        : 'or click to browse · MP4, MOV up to 2 GB'}
                    </p>
                  </>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                />
              </div>

              {/* Progress bar — shown whenever a file is selected */}
              {videoFile && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-600 truncate max-w-[70%]">
                      {videoFile.name}
                    </span>
                    <span className="text-xs font-bold text-gray-500">{uploadProgress}%</span>
                  </div>

                  {/* Track */}
                  <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${uploadProgress}%`,
                        background: uploadDone
                          ? 'linear-gradient(90deg,#6EE7B7 0%,#34D399 100%)'
                          : 'linear-gradient(90deg,#FF87B2 0%,#A78BFA 100%)',
                      }}
                    />
                  </div>

                  {/* Status text */}
                  <p className="mt-2 text-[11px] text-gray-400">
                    {uploadDone
                      ? '✓ Uploaded successfully'
                      : uploading
                      ? 'Uploading…'
                      : 'Ready to upload'}
                  </p>
                </div>
              )}

              {/* Error */}
              {uploadError && (
                <div className="px-4 py-3 rounded-2xl bg-rose-50 border border-rose-100 text-rose-500 text-xs font-medium">
                  {uploadError}
                </div>
              )}
            </div>

            {/* ── Right: Form ── */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-4">

              {/* Title */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5">
                  Title <span className="text-rose-400">*</span>
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Morning Flow Routine"
                  disabled={uploading}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200 disabled:opacity-60"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5">
                  Category <span className="text-rose-400">*</span>
                </label>
                {catsLoading ? (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm text-gray-400">
                    <Loader2 size={14} className="animate-spin" />
                    Loading categories…
                  </div>
                ) : (
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    disabled={uploading || categories.length === 0}
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
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Video description…"
                  rows={3}
                  disabled={uploading}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200 resize-none disabled:opacity-60"
                />
              </div>

              {/* Difficulty + Visibility */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-1.5">
                    Difficulty
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                    disabled={uploading}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200 disabled:opacity-60"
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-1.5">
                    Visibility
                  </label>
                  <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value as Visibility)}
                    disabled={uploading}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-200 disabled:opacity-60"
                  >
                    <option value="PUBLIC">Public</option>
                    <option value="PRIVATE">Private</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 mt-auto pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={uploading}
                  className="px-5 py-2.5 rounded-2xl border border-gray-100 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!canUpload}
                  onClick={handleUpload}
                  className="px-6 py-2.5 rounded-2xl bg-[#FF87B2] text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  {uploading && <Loader2 size={14} className="animate-spin" />}
                  {uploading ? 'Uploading…' : 'Upload & Save'}
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
