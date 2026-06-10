import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, ListFilter, Upload, Eye, Play, Video, Loader2, X } from 'lucide-react';

import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import VideoUploadModal from '../../components/Modals/VideoUploadModal';
import VideoViewModal, { type VideoModalItem } from '../../components/Modals/VideoViewModal';
import VideoEditModal from '../../components/Modals/VideoEditModal';
import useAxiosSecure from '../../hooks/useAxioSecure';

// ─── Video Card ───────────────────────────────────────────────────────────────

const difficultyColors: Record<string, string> = {
  BEGINNER:     'bg-emerald-50 text-emerald-500',
  INTERMEDIATE: 'bg-amber-50   text-amber-500',
  ADVANCED:     'bg-rose-50    text-rose-400',
};

const VideoCard: React.FC<{ video: VideoModalItem; onClick: () => void }> = ({ video, onClick }) => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
    {/* Thumbnail */}
    <button type="button" onClick={onClick} className="relative aspect-video overflow-hidden w-full text-left bg-gray-100">
      {video.thumbnailUrl ? (
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Video size={36} className="text-gray-300" />
        </div>
      )}

      {/* Play overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/40">
          <Play size={24} className="text-white fill-white ml-1" />
        </div>
      </div>
    </button>

    {/* Content */}
    <div className="p-4">
      <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-1">{video.title}</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-gray-400">
          <Eye size={14} />
          <span className="text-xs font-medium">{(video.views ?? 0).toLocaleString()}</span>
        </div>
        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${difficultyColors[video.difficulty] ?? 'bg-gray-50 text-gray-400'}`}>
          {video.difficulty}
        </span>
      </div>
    </div>
  </div>
);

// ─── Main Videos Page ─────────────────────────────────────────────────────────

const Videos: React.FC = () => {
  const axiosSecure = useAxiosSecure();
  const axiosRef    = useRef(axiosSecure);
  axiosRef.current  = axiosSecure;

  const [videos,          setVideos]          = useState<VideoModalItem[]>([]);
  const [fetchLoading,    setFetchLoading]    = useState(true);
  const [fetchError,      setFetchError]      = useState<string | null>(null);
  const [search,          setSearch]          = useState('');

  const [selectedVideo,   setSelectedVideo]   = useState<VideoModalItem | null>(null);
  const [isUploadOpen,    setIsUploadOpen]    = useState(false);
  const [isViewOpen,      setIsViewOpen]      = useState(false);
  const [isEditOpen,      setIsEditOpen]      = useState(false);
  const [isDeleteOpen,    setIsDeleteOpen]    = useState(false);
  const [deleteLoading,   setDeleteLoading]   = useState(false);

  // ── Fetch all videos ──
  const fetchVideos = useCallback(async () => {
    setFetchLoading(true);
    setFetchError(null);
    try {
      const res = await axiosRef.current.get('/videos/all');
      // Support { data: { data: [] } } and { data: [] }
      const raw: VideoModalItem[] =
        res.data?.data?.data ??
        res.data?.data ??
        res.data ??
        [];
      setVideos(Array.isArray(raw) ? raw : []);
    } catch {
      setFetchError('Failed to load videos. Please try again.');
    } finally {
      setFetchLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // ── Delete ──
  const handleDelete = async () => {
    if (!selectedVideo) return;
    setDeleteLoading(true);
    try {
      await axiosRef.current.delete(`/videos/delete/${selectedVideo.id}`);
      setIsDeleteOpen(false);
      setIsViewOpen(false);
      setIsEditOpen(false);
      setSelectedVideo(null);
      await fetchVideos();
    } catch {
      // error kept inside confirmation modal scope
    } finally {
      setDeleteLoading(false);
    }
  };

  // ── Filtered list ──
  const filtered = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-[#FAF9FF] min-h-screen">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search videos..."
                className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-pink-200 outline-none"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <ListFilter size={18} />
              Filters
            </button>
          </div>

          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#FFB1D1] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#FF9CBF] transition-colors"
          >
            <Upload size={18} />
            Upload Video
          </button>
        </div>

        {/* Error */}
        {fetchError && (
          <div className="mb-6 px-5 py-3 bg-rose-50 border border-rose-100 rounded-2xl text-rose-500 text-sm font-medium flex items-center justify-between">
            {fetchError}
            <button onClick={() => setFetchError(null)}><X size={14} /></button>
          </div>
        )}

        {/* Loading */}
        {fetchLoading ? (
          <div className="flex items-center justify-center py-20 text-gray-300">
            <Loader2 size={32} className="animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
            <Video size={40} className="text-gray-200" />
            <p className="text-sm font-medium">
              {search ? 'No videos match your search.' : 'No videos yet. Upload one to get started.'}
            </p>
          </div>
        ) : (
          /* Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => {
                  setSelectedVideo(video);
                  setIsViewOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <VideoUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploaded={() => {
          setIsUploadOpen(false);
          fetchVideos();
        }}
      />

      {/* View Modal */}
      <VideoViewModal
        isOpen={isViewOpen}
        video={selectedVideo}
        onClose={() => setIsViewOpen(false)}
        onEdit={() => {
          setIsViewOpen(false);
          setIsEditOpen(true);
        }}
        onDelete={() => {
          setIsDeleteOpen(true);
        }}
      />

      {/* Edit Modal */}
      <VideoEditModal
        isOpen={isEditOpen}
        video={selectedVideo}
        onClose={() => setIsEditOpen(false)}
        onSaved={() => {
          fetchVideos();
        }}
      />

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={isDeleteOpen}
        title="Delete Video"
        message={`Are you sure you want to delete "${selectedVideo?.title ?? 'this video'}"? This cannot be undone.`}
        isLoading={deleteLoading}
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Videos;