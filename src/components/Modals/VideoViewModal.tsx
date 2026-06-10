import { createPortal } from 'react-dom';
import { X, Play, Video } from 'lucide-react';

// ─── Shared API type (used by Videos page + modals) ──────────────────────────

export type VideoModalItem = {
  id: string;
  title: string;
  description?: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  visibility: 'PUBLIC' | 'PRIVATE';
  status?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  categoryId?: string;
  categoryName?: string;
  createdAt?: string;
  views?: number;
};

type Props = {
  isOpen: boolean;
  video: VideoModalItem | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const difficultyColors: Record<string, string> = {
  BEGINNER:     'bg-emerald-50 text-emerald-500',
  INTERMEDIATE: 'bg-amber-50   text-amber-500',
  ADVANCED:     'bg-rose-50    text-rose-500',
};

export default function VideoViewModal({ isOpen, video, onClose, onEdit, onDelete }: Props) {
  if (!isOpen || !video) return null;

  const uploadedLabel = video.createdAt
    ? new Date(video.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : '—';

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-400">Video</div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 bg-[#FAF9FF]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            {/* Left: Preview */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100">
                {video.thumbnailUrl ? (
                  <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Video size={48} className="text-gray-300" />
                  </div>
                )}
                {video.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/50">
                      <Play size={26} className="text-white fill-white ml-0.5" />
                    </div>
                  </div>
                )}
              </div>

              <h3 className="mt-5 text-base font-bold text-gray-800">{video.title}</h3>
              {video.description && (
                <p className="mt-2 text-xs text-gray-400 font-medium max-w-2xl">{video.description}</p>
              )}
            </div>

            {/* Right: Info + Actions */}
            <div className="space-y-4">
              <div className="bg-white rounded-3xl border border-gray-100 p-6">
                <h4 className="text-xs font-bold text-gray-700 mb-4">Video Info</h4>
                <div className="space-y-3">
                  {video.categoryName && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 font-semibold">Category</span>
                      <span className="text-gray-700 font-semibold">{video.categoryName}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-semibold">Difficulty</span>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${difficultyColors[video.difficulty] ?? 'bg-gray-50 text-gray-400'}`}>
                      {video.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-semibold">Visibility</span>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                      video.visibility === 'PUBLIC' ? 'bg-emerald-50 text-emerald-400' : 'bg-gray-50 text-gray-400'
                    }`}>
                      {video.visibility}
                    </span>
                  </div>
                  {video.views !== undefined && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 font-semibold">Views</span>
                      <span className="text-gray-700 font-semibold">{video.views.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-semibold">Uploaded</span>
                    <span className="text-gray-700 font-semibold">{uploadedLabel}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 p-6">
                <h4 className="text-xs font-bold text-gray-700 mb-4">Actions</h4>
                <div className="space-y-3">
                  <button
                    onClick={onEdit}
                    className="w-full py-2.5 rounded-2xl border border-gray-100 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Edit Video
                  </button>
                  <button
                    onClick={onDelete}
                    className="w-full py-2.5 rounded-2xl border border-red-200 text-xs font-semibold text-red-400 hover:bg-red-50 transition-colors"
                  >
                    Delete Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
