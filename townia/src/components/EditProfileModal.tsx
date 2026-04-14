// src/components/EditProfileModal.tsx
import { useState, useRef } from 'react';
import { X, Camera } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const [displayName, setDisplayName] = useState("Yukio");
  const [bio, setBio] = useState("Nocturnal creature diving into the deep night.\nDigital artist and dreamer.");
  const [website, setWebsite] = useState("https://example.com");

  const [avatarPreview, setAvatarPreview] = useState("https://i.pravatar.cc/256?img=68");
  const [bannerPreview, setBannerPreview] = useState("https://picsum.photos/id/1015/1200/600");

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const maxBioChars = 160;

  if (!isOpen) return null;

  const handleAvatarClick = () => avatarInputRef.current?.click();
  const handleBannerClick = () => bannerInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'banner') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    if (type === 'avatar') setAvatarPreview(previewUrl);
    else setBannerPreview(previewUrl);
  };

  const handleSave = () => {
    alert("✅ Profilo aggiornato con successo!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#202a44] w-full max-w-lg mx-auto rounded-3xl overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <button onClick={onClose} className="p-2 -m-2 rounded-full hover:bg-white/10 transition-colors">
            <X size={26} className="text-zinc-300 hover:text-white" />
          </button>
          <h2 className="text-xl font-bold text-white">Modifica profilo</h2>
          <button
            onClick={handleSave}
            className="bg-violet-600 hover:bg-violet-500 px-6 py-2 rounded-3xl font-semibold text-sm transition-colors"
          >
            Salva
          </button>
        </div>

        {/* Banner cliccabile */}
        <div
          className="h-44 relative cursor-pointer group"
          onClick={handleBannerClick}
        >
          <img src={bannerPreview} alt="banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
            <Camera size={32} className="text-white" />
          </div>
          <input
            ref={bannerInputRef}
            type="file"
            accept="image/*,.gif"
            onChange={(e) => handleFileChange(e, 'banner')}
            className="hidden"
          />
        </div>

        {/* Avatar cliccabile */}
        <div className="px-6 -mt-12 relative z-10 flex justify-start">
          <div
            className="relative w-28 h-28 rounded-3xl border-4 border-[#202a44] overflow-hidden cursor-pointer group"
            onClick={handleAvatarClick}
          >
            <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all rounded-3xl">
              <Camera size={28} className="text-white" />
            </div>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*,.gif"
              onChange={(e) => handleFileChange(e, 'avatar')}
              className="hidden"
            />
          </div>
        </div>

        {/* Form */}
        <div className="px-6 pt-6 pb-8 space-y-6">
          <div>
            <label className="text-sm text-zinc-400 block mb-1">Nome visualizzato</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-[#202a44] border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-500"
              maxLength={50}
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <label className="text-zinc-400">Bio</label>
              <span className="text-zinc-400">{bio.length}/{maxBioChars}</span>
            </div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-[#202a44] border border-white/10 rounded-2xl px-5 py-4 h-28 resize-none focus:outline-none focus:border-violet-500"
              maxLength={maxBioChars}
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400 block mb-1">Link social / sito web</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full bg-[#202a44] border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}