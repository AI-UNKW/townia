// src/pages/ProfilePage.tsx
import { useState } from 'react';
import { Edit } from 'lucide-react';
import EditProfileModal from '../components/EditProfileModal';
import ReportModal from '../components/ReportModal';   // ← nuovo import

export default function ProfilePage() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);   // ← nuovo stato

  const user = {
    name: "Yukio",
    username: "@fpsyukio",
    bio: "Nocturnal creature diving into the deep night.\nDigital artist and dreamer.\n\nCurrently obsessed with: cyberpunk aesthetics and lo-fi beats.\nOpen for commissions and collabs.",
    joinDate: "Joined April 2026",
    website: "https://example.com",
    banner: "https://picsum.photos/id/1015/1200/600",
    avatar: "https://i.pravatar.cc/150?img=68"
  };

  return (
    <div className="min-h-screen bg-[#202a44] hide-scrollbar overflow-y-auto pb-24 lg:pb-0">
      
      {/* Banner */}
      <div className="h-52 sm:h-64 lg:h-80 relative">
        <img 
          src={user.banner} 
          alt="banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#202a44] to-transparent" />
      </div>

      {/* Contenuto profilo */}
      <div className="relative px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-14 lg:-mt-16 pb-10 z-20">
        
        {/* Avatar + Bottoni */}
        <div className="flex justify-between items-end mb-6">
          
          <img 
            src={user.avatar} 
            alt="avatar" 
            className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-3xl border-4 border-[#202a44] object-cover"
          />
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setIsEditOpen(true)}
              className="px-5 py-2 border border-white/30 rounded-3xl text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <Edit size={18} />
              <span className="hidden sm:inline">Edit Profile</span>
              <span className="sm:hidden">Edit</span>
            </button>

            <button className="px-6 py-2 bg-violet-600 hover:bg-violet-500 rounded-3xl text-sm font-medium transition-colors">
              Follow
            </button>

            {/* Pulsante Report che apre il modal */}
            <button 
              onClick={() => setIsReportOpen(true)}
              className="px-5 py-2 text-red-400 hover:bg-red-500/10 rounded-3xl transition-colors"
            >
              Report
            </button>
          </div>
        </div>

        {/* Resto del profilo (info, bio, posts...) rimane uguale */}
        <div className="mb-6">
          <h2 className="text-3xl font-semibold">{user.name}</h2>
          <p className="text-violet-400">{user.username}</p>

          <div className="flex gap-6 mt-3 text-sm">
            <div><span className="font-semibold">0</span> <span className="text-zinc-500 ml-2">Likes</span></div>
            <div><span className="font-semibold">0</span> <span className="text-zinc-500 ml-2">Posts</span></div>
            <div><span className="font-semibold">0</span> <span className="text-zinc-500 ml-2">Followers</span></div>
          </div>
        </div>

        <div className="mb-8 max-w-lg text-zinc-200 leading-relaxed whitespace-pre-line">
          {user.bio}
        </div>

        <div className="flex items-center gap-6 text-sm text-zinc-500 mb-12">
          <span>{user.joinDate}</span>
          {user.website && (
            <a href={user.website} target="_blank" className="text-violet-400 hover:text-violet-300 flex items-center gap-2">
              🔗 {user.website}
            </a>
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-5 text-lg">Posts by {user.name}</h3>
          <div className="bg-white/5 rounded-3xl p-16 text-center">
            <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-5 text-3xl">
              💬
            </div>
            <p className="text-lg font-medium mb-1">No posts yet</p>
            <p className="text-zinc-400">You haven't shared any thoughts yet.</p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        username={user.username}
      />
    </div>
  );
}