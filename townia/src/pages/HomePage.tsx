// src/pages/HomePage.tsx
import { useState } from 'react';
import PostItem from '../items/PostItem';
import PostModal from '../components/PostModal';

export default function HomePage() {
  const [posts] = useState([
    {
      id: 1,
      username: "CreatorX",
      handle: "@creatorx",
      avatar: "https://i.pravatar.cc/150?img=68",
      time: "2h",
      text: "Oggi ho lanciato una nuova funzione VIP 🔥 Chi si abbona ha accesso a contenuti esclusivi e anteprime!",
      media: [
        "https://i.pinimg.com/originals/9d/32/4a/9d324a5c0e7b910bcb576e3a5d09113b.gif",
        "https://www.gifcen.com/wp-content/uploads/2022/09/anime-gif-15.gif",
        "https://aniyuki.com/wp-content/uploads/2021/12/aniyuki-anime-girl-77.gif",
        "https://i.makeagif.com/media/7-20-2024/ato9QP.gif"
      ],
      likes: 142,
      isVip: true
    },
    {
      id: 2,
      username: "TechGirl",
      handle: "@techgirl",
      avatar: "https://i.pravatar.cc/150?img=47",
      time: "5h",
      text: "Qual è la feature che vorreste di più su questo social? Ditemi la vostra idea 👇",
      media: [],
      likes: 89,
      isVip: false
    },
    {
      id: 3,
      username: "TechGirl",
      handle: "@techgirl",
      avatar: "https://i.pravatar.cc/150?img=47",
      time: "5h",
      text: "Qual è la feature che vorreste di più su questo social? Ditemi la vostra idea 👇",
      media: [],
      likes: 89,
      isVip: false
    },
    {
      id: 4,
      username: "TechGirl",
      handle: "@techgirl",
      avatar: "https://i.pravatar.cc/150?img=47",
      time: "5h",
      text: "Qual è la feature che vorreste di più su questo social? Ditemi la vostra idea 👇",
      media: [],
      likes: 89,
      isVip: false
    }
  ]);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  return (
    <>
      {/* Header "Home" → visibile SOLO su desktop */}
      <div className="hidden lg:block sticky top-0 bg-[#202a44]/90 backdrop-blur-md border-b border-white/5 px-8 py-5 z-10">
        <h2 className="text-xl font-semibold">Home</h2>
      </div>

      {/* Box Crea Post → visibile SOLO su desktop */}
      <div className="hidden lg:block p-8 border-b border-white/5">
        <div 
          onClick={() => setIsPostModalOpen(true)}
          className="flex gap-4 cursor-pointer hover:bg-white/5 p-4 rounded-3xl transition-colors group"
        >
          <img 
            src="https://i.pravatar.cc/150?img=68" 
            alt="tu" 
            className="w-11 h-11 rounded-full flex-shrink-0" 
          />
          <div className="flex-1 flex items-center">
            <span className="text-lg text-zinc-400 group-hover:text-zinc-300 transition-colors">
              Cosa sta succedendo a Townia?
            </span>
          </div>
          <div className="flex items-center">
            <button className="bg-violet-600 hover:bg-violet-500 px-8 py-2.5 rounded-2xl font-semibold transition-colors">
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Lista dei Post */}
      {posts.map((post) => (
        <PostItem
          key={post.id}
          id={post.id.toString()}                    // ← importante per il ReportModal
          avatar={post.avatar}
          displayName={post.username}
          username={post.handle.replace('@', '')}
          timestamp={post.time}
          content={post.text}
          media={post.media}
          likesCount={post.likes}
          isVip={post.isVip}
          isOwnPost={false}
          onLike={() => console.log('Like post', post.id)}
          onBookmark={() => console.log('Bookmark post', post.id)}
          onShare={() => console.log('Share post', post.id)}
          // onReport non serve più → lo abbiamo rimosso dal PostItem
          onDelete={() => console.log('Delete post', post.id)}
        />
      ))}

      {/* Modal di creazione post */}
      <PostModal 
        isOpen={isPostModalOpen} 
        onClose={() => setIsPostModalOpen(false)} 
      />
    </>
  );
}