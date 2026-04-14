// src/components/PostItem.tsx
import { useState } from 'react';
import { Heart, Bookmark, Share2, Flag } from 'lucide-react';
import MediaCarousel from '../components/MediaCarousel';
import ReportModal from '../components/ReportModal';   // ← IMPORT AGGIUNTO

interface PostItemProps {
  id?: string;
  avatar: string;
  displayName: string;
  username: string;
  timestamp: string;
  content: string;
  media?: string[];
  likesCount?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  isVip?: boolean;
  isOwnPost?: boolean;
  isFollowing?: boolean;
  onLike?: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
  onFollow?: () => void;
  // onReport?: () => void;   ← possiamo rimuoverlo se non lo usi più
  onDelete?: () => void;
}

export default function PostItem({
  id,
  avatar,
  displayName,
  username,
  timestamp,
  content,
  media = [],
  likesCount = 0,
  isLiked = false,
  isBookmarked = false,
  isVip = false,
  isOwnPost = false,
  isFollowing = false,
  onLike,
  onBookmark,
  onShare,
  onFollow,
  onDelete,
}: PostItemProps) {

  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [following, setFollowing] = useState(isFollowing);
  const [likeCount, setLikeCount] = useState(likesCount);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    onLike?.();
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark?.();
  };

  const handleFollow = () => {
    setFollowing(!following);
    onFollow?.();
  };

  const openPreview = (index: number) => setPreviewIndex(index);
  const closePreview = () => setPreviewIndex(null);

  // Renderizzazione griglia media
  const renderMediaGrid = () => {
    if (media.length === 0) return null;

    return (
      <div 
        className={`mt-3 grid gap-0.5 bg-black overflow-hidden border border-white/10 rounded-3xl
          ${media.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}
      >
        {media.map((url, index) => {
          const isVideo = url.endsWith('.mp4') || url.includes('video');
          const isGif = url.endsWith('.gif') || url.toLowerCase().includes('.gif');

          let containerClass = '';
          if (media.length === 1) containerClass = 'aspect-[16/9]';
          else if (media.length === 2) containerClass = 'aspect-[16/10]';
          else if (media.length === 3) containerClass = index === 0 ? 'aspect-[4/3]' : 'aspect-[16/10]';
          else if (media.length === 4) containerClass = 'aspect-[16/10]';

          let borderRadius = '';
          if (media.length === 1) borderRadius = 'rounded-3xl';
          else if (media.length === 2) borderRadius = index === 0 ? 'rounded-l-3xl' : 'rounded-r-3xl';
          else if (media.length === 3) {
            if (index === 0) borderRadius = 'rounded-l-3xl';
            else if (index === 1) borderRadius = 'rounded-tr-3xl';
            else borderRadius = 'rounded-br-3xl';
          } else if (media.length === 4) {
            if (index === 0) borderRadius = 'rounded-tl-3xl';
            else if (index === 1) borderRadius = 'rounded-tr-3xl';
            else if (index === 2) borderRadius = 'rounded-bl-3xl';
            else borderRadius = 'rounded-br-3xl';
          }

          return (
            <div
              key={index}
              onClick={() => openPreview(index)}
              className={`relative overflow-hidden cursor-pointer hover:brightness-90 transition-all ${containerClass} ${borderRadius}`}
            >
              {isVideo ? (
                <video src={url} className="w-full h-full object-cover" muted loop />
              ) : (
                <img src={url} alt="Post media" className="w-full h-full object-cover" />
              )}

              {isVideo && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-medium">VIDEO</div>
              )}
              {isGif && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-medium">GIF</div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-colors">
        <div className="flex gap-3">
          <img 
            src={avatar} 
            alt={displayName}
            className="w-10 h-10 rounded-2xl object-cover flex-shrink-0"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-white">{displayName}</span>
                {isVip && <span className="text-violet-400 text-xs font-bold">● VIP</span>}
                <span className="text-zinc-400">@{username}</span>
                <span className="text-zinc-500 text-sm">·</span>
                <span className="text-zinc-500 text-sm">{timestamp}</span>
              </div>

              {!isOwnPost && (
                <button
                  onClick={handleFollow}
                  className={`px-5 py-1.5 text-sm font-semibold rounded-full border transition-all
                    ${following 
                      ? 'bg-transparent border-zinc-600 text-zinc-300 hover:bg-zinc-800' 
                      : 'bg-white text-black hover:bg-zinc-200'}`}
                >
                  {following ? 'Following' : 'Follow'}
                </button>
              )}
            </div>

            <p className="mt-1 text-[17px] leading-relaxed text-zinc-100 whitespace-pre-wrap">
              {content}
            </p>

            {renderMediaGrid()}

            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-8 text-zinc-400">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 hover:text-red-400 transition-colors ${liked ? 'text-red-400' : ''}`}
                >
                  <Heart size={20} fill={liked ? "#f43f5e" : "none"} />
                  <span className="text-sm font-medium">{likeCount}</span>
                </button>

                <button
                  onClick={onShare}
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <Share2 size={20} />
                </button>

                <button
                  onClick={handleBookmark}
                  className={`flex items-center gap-2 hover:text-violet-400 transition-colors ${bookmarked ? 'text-violet-400' : ''}`}
                >
                  <Bookmark size={20} fill={bookmarked ? "#8b5cf6" : "none"} />
                </button>
              </div>

              {/* Bottone Segnala */}
              <button
                onClick={() => setShowReportModal(true)}
                className="text-zinc-400 hover:text-red-400 transition-colors p-2 -mr-2"
              >
                <Flag size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carosello */}
      <MediaCarousel
        media={media}
        initialIndex={previewIndex ?? 0}
        isOpen={previewIndex !== null}
        onClose={closePreview}
      />

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        targetType="post"
        targetId={id}
        targetName={displayName}
      />
    </>
  );
}