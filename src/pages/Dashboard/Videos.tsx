import React, { useMemo, useState } from 'react';
import { 
  Search, 
  ListFilter, 
  Upload, 
  Eye, 
  Play 
} from 'lucide-react';

import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import VideoUploadModal from '../../components/Modals/VideoUploadModal';
import VideoViewModal, { type VideoModalItem } from '../../components/Modals/VideoViewModal';
import VideoEditModal from '../../components/Modals/VideoEditModal';

type VideoItem = VideoModalItem;

const initialVideoData: VideoItem[] = [
  {
    id: '1',
    title: 'Morning Flow Routine',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400',
    duration: '12:34',
    views: '2.4k',
    status: 'Published',
    category: 'Pilates',
    difficulty: 'Beginner',
    visibility: 'Public',
    description: 'A gentle morning routine to wake up your body and mind with targeted Pilates movements.',
    uploadedAtLabel: 'Jan 15, 2025',
  },
  {
    id: '2',
    title: 'Core Strengthening',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-296072bb5604?auto=format&fit=crop&q=80&w=400',
    duration: '18:20',
    views: '1.8k',
    status: 'Published',
    category: 'Pilates',
    difficulty: 'Intermediate',
    visibility: 'Public',
    description: 'Build deep core strength with controlled movements and mindful breathing.',
    uploadedAtLabel: 'Jan 10, 2025',
  },
  {
    id: '3',
    title: 'Flexibility Basics',
    thumbnail: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&q=80&w=400',
    duration: '22:15',
    views: '3.1k',
    status: 'Published',
    category: 'Pilates',
    difficulty: 'Beginner',
    visibility: 'Public',
    description: 'Improve mobility and flexibility with beginner-friendly stretches.',
    uploadedAtLabel: 'Jan 08, 2025',
  },
  {
    id: '4',
    title: 'Advanced Mat Work',
    thumbnail: 'https://images.unsplash.com/photo-1510894347713-fc3ad6cb03a2?auto=format&fit=crop&q=80&w=400',
    duration: '35:40',
    views: '892',
    status: 'Draft',
    category: 'Pilates',
    difficulty: 'Advanced',
    visibility: 'Private',
    description: 'A challenging mat sequence focusing on strength, control, and precision.',
    uploadedAtLabel: 'Jan 02, 2025',
  },
  {
    id: '5',
    title: 'Posture Correction',
    thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=400',
    duration: '15:10',
    views: '1.2k',
    status: 'Published',
    category: 'Pilates',
    difficulty: 'Beginner',
    visibility: 'Public',
    description: 'Reset your posture with simple alignment-focused exercises.',
    uploadedAtLabel: 'Dec 28, 2024',
  },
  {
    id: '6',
    title: 'Reformer Basics',
    thumbnail: 'https://images.unsplash.com/photo-1591343395902-1adcb454c2e4?auto=format&fit=crop&q=80&w=400',
    duration: '28:55',
    views: '456',
    status: 'Draft',
    category: 'Reformer',
    difficulty: 'Beginner',
    visibility: 'Private',
    description: 'Learn the fundamentals of reformer work with guided movement patterns.',
    uploadedAtLabel: 'Dec 20, 2024',
  }
];

const VideoCard: React.FC<{ video: VideoItem; onClick: () => void }> = ({ video, onClick }) => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
    {/* Thumbnail Container */}
    <button type="button" onClick={onClick} className="relative aspect-video overflow-hidden w-full text-left">
      <img 
        src={video.thumbnail} 
        alt={video.title} 
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      {/* Play Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/40">
          <Play size={24} className="text-white fill-white ml-1" />
        </div>
      </div>
      
      {/* Duration Badge */}
      <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] font-bold text-white">
        {video.duration}
      </div>
    </button>

    {/* Content */}
    <div className="p-4">
      <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-1">{video.title}</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-gray-400">
          <Eye size={14} />
          <span className="text-xs font-medium">{video.views}</span>
        </div>
        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${
          video.status === 'Published' 
            ? 'bg-emerald-50 text-emerald-400' 
            : 'bg-gray-50 text-gray-400'
        }`}>
          {video.status}
        </span>
      </div>
    </div>
  </div>
);

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>(initialVideoData);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const selectedVideo = useMemo(() => videos.find((v) => v.id === selectedVideoId) ?? null, [videos, selectedVideoId]);

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  return (
    <div className="p-8 bg-[#FAF9FF] min-h-screen">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
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

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onClick={() => {
                setSelectedVideoId(video.id);
                setIsViewOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      <VideoUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSubmit={(values) => {
          const newId = String(Date.now());
          setVideos((prev) => [
            {
              id: newId,
              title: values.title,
              thumbnail: values.thumbnail,
              duration: values.duration,
              views: '0',
              status: 'Published',
              category: values.category,
              difficulty: values.difficulty,
              visibility: values.visibility,
              description: values.description,
              uploadedAtLabel: 'Today',
            },
            ...prev,
          ]);
        }}
      />

      <VideoViewModal
        isOpen={isViewOpen}
        video={selectedVideo}
        onClose={() => setIsViewOpen(false)}
        onEdit={() => {
          setIsViewOpen(false);
          setIsEditOpen(true);
        }}
        onDelete={() => {
          setIsDeleteConfirmOpen(true);
        }}
      />

      <VideoEditModal
        isOpen={isEditOpen}
        video={selectedVideo}
        onClose={() => setIsEditOpen(false)}
        onSave={(values) => {
          if (!selectedVideoId) return;
          setVideos((prev) =>
            prev.map((v) =>
              v.id === selectedVideoId
                ? { ...v, ...values }
                : v
            )
          );
        }}
      />

      <ConfirmationModal
        isOpen={isDeleteConfirmOpen}
        title="Delete video"
        message="This action cannot be undone. Do you want to delete this video?"
        onCancel={() => setIsDeleteConfirmOpen(false)}
        onConfirm={() => {
          if (!selectedVideoId) return;
          setVideos((prev) => prev.filter((v) => v.id !== selectedVideoId));
          setIsDeleteConfirmOpen(false);
          setIsViewOpen(false);
          setIsEditOpen(false);
          setSelectedVideoId(null);
        }}
      />
    </div>
  );
};

export default Videos;