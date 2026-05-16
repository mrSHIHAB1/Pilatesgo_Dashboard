import { createPortal } from 'react-dom';
import { X, Play } from 'lucide-react';

export type VideoModalItem = {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  status: 'Published' | 'Draft';
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  visibility: 'Public' | 'Private';
  description: string;
  uploadedAtLabel: string;
};

type Props = {
  isOpen: boolean;
  video: VideoModalItem | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function VideoViewModal({ isOpen, video, onClose, onEdit, onDelete }: Props) {
  if (!isOpen || !video) return null;

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
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            {/* Left: Preview */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/50">
                    <Play size={26} className="text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              <h3 className="mt-5 text-base font-bold text-gray-800">{video.title}</h3>
              <p className="mt-2 text-xs text-gray-400 font-medium max-w-2xl">
                {video.description}
              </p>
            </div>

            {/* Right: Info & Actions */}
            <div className="space-y-4">
              <div className="bg-white rounded-3xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold text-gray-700">Video Info</h4>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-semibold">Duration</span>
                    <span className="text-gray-700 font-semibold">{video.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-semibold">Views</span>
                    <span className="text-gray-700 font-semibold">{video.views}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-semibold">Category</span>
                    <span className="text-gray-700 font-semibold">{video.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-semibold">Difficulty</span>
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-50 text-emerald-400">
                      {video.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-semibold">Status</span>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${video.status === 'Published' ? 'bg-emerald-50 text-emerald-400' : 'bg-gray-50 text-gray-400'}`}>
                      {video.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-semibold">Uploaded</span>
                    <span className="text-gray-700 font-semibold">{video.uploadedAtLabel}</span>
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
