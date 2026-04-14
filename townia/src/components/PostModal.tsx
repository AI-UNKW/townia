// src/components/PostModal.tsx
import { useState, useRef, useEffect } from 'react';
import { X, Send, Image as ImageIcon, Camera, Smile, Flag, BarChart2, Trash2 } from 'lucide-react';
import MediaCarousel from '../components/MediaCarousel';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostModal({ isOpen, onClose }: PostModalProps) {
  const [content, setContent] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  
  const [showFlags, setShowFlags] = useState(false);
  const [isNSFW, setIsNSFW] = useState(false);
  const [isAIMade, setIsAIMade] = useState(false);
  const [isPaidPartnership, setIsPaidPartnership] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const maxChars = 500;
  const maxMedia = 4;

  const handleMainClose = () => {
    setContent("");
    setMediaFiles([]);
    setPreviewIndex(null);
    setShowFlags(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setContent("");
      setMediaFiles([]);
      setPreviewIndex(null);
      setShowFlags(false);
    }
  }, [isOpen]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (mediaFiles.length + files.length > maxMedia) {
      alert(`Puoi caricare massimo ${maxMedia} media.`);
      return;
    }

    const validFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );

    setMediaFiles(prev => [...prev, ...validFiles]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (mediaFiles.length + files.length > maxMedia) {
      alert(`Puoi caricare massimo ${maxMedia} media.`);
      return;
    }

    setMediaFiles(prev => [...prev, ...files]);
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const removeMedia = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
    if (previewIndex === index) setPreviewIndex(null);
  };

  const openPreview = (index: number) => setPreviewIndex(index);
  const closePreview = () => setPreviewIndex(null);

  const isPublishDisabled = !content.trim() && mediaFiles.length === 0;

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black z-[60] flex flex-col lg:bg-black/80 lg:flex lg:items-center lg:justify-center lg:p-4">
        
        <div className="bg-[#202a44] w-full h-full lg:max-w-xl lg:mx-auto lg:rounded-3xl lg:max-h-[92vh] lg:shadow-2xl flex flex-col overflow-hidden">

          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between flex-shrink-0 lg:px-6 lg:py-4">
            <button 
              onClick={handleMainClose}
              className="text-lg font-medium text-violet-400 lg:hidden"
            >
              Annulla
            </button>

            <button 
              onClick={handleMainClose}
              className="hidden lg:block p-2 -m-2 rounded-full hover:bg-white/10"
            >
              <X size={26} className="text-zinc-300" />
            </button>

            <h2 className="text-xl font-bold text-white lg:text-lg">Crea post</h2>

            <button
              onClick={() => {
                alert("Post pubblicato su Townia! ✨");
                handleMainClose();
              }}
              disabled={isPublishDisabled}
              className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 px-6 py-1.5 rounded-full font-semibold text-sm lg:px-8 lg:py-2.5"
            >
              Pubblica
            </button>
          </div>

          {/* Area di input + preview - scorrevole */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 pb-24">   {/* pb-24 per lasciare spazio al footer */}
            <div className="flex gap-4">
              <div className="w-11 h-11 flex-shrink-0 rounded-full overflow-hidden border border-white/10">
                <img src="https://i.pravatar.cc/128?img=68" alt="Tu" className="w-full h-full object-cover" />
              </div>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Cosa sta succedendo a Townia?"
                maxLength={maxChars}
                className="flex-1 bg-transparent text-[21px] placeholder-zinc-400 focus:outline-none resize-none leading-relaxed min-h-[120px]"
              />
            </div>

            {/* Preview Media */}
            {mediaFiles.length > 0 && (
              <div className={`grid gap-2 rounded-2xl overflow-hidden border border-white/10 bg-black/30 p-1
                ${mediaFiles.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}
              >
                {mediaFiles.map((file, index) => {
                  const url = URL.createObjectURL(file);
                  const isVideo = file.type.startsWith('video/');

                  return (
                    <div
                      key={index}
                      onClick={() => openPreview(index)}
                      className="relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:brightness-90 transition"
                    >
                      {isVideo ? (
                        <video src={url} className="w-full h-full object-cover" muted />
                      ) : (
                        <img src={url} alt="" className="w-full h-full object-cover" />
                      )}

                      <button
                        onClick={(e) => { e.stopPropagation(); removeMedia(index); }}
                        className="absolute top-3 right-3 p-2 bg-black/80 hover:bg-red-600 rounded-full transition-colors"
                      >
                        <Trash2 size={18} className="text-white" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Toolbar - sempre visibile anche con tastiera aperta */}
          <div className="border-t border-white/10 p-4 flex items-center gap-4 flex-shrink-0 bg-[#202a44] sticky bottom-0 z-10 lg:static">
            <button 
              onClick={() => fileInputRef.current?.click()} 
              disabled={mediaFiles.length >= maxMedia} 
              className="p-3 hover:bg-white/10 rounded-full disabled:opacity-40 transition-colors"
              title="Aggiungi foto o video"
            >
              <ImageIcon size={24} className="text-violet-400" />
            </button>

            <button 
              onClick={() => cameraInputRef.current?.click()} 
              disabled={mediaFiles.length >= maxMedia} 
              className="p-3 hover:bg-white/10 rounded-full disabled:opacity-40 transition-colors"
              title="Scatta foto"
            >
              <Camera size={24} className="text-violet-400" />
            </button>

            <button className="p-3 hover:bg-white/10 rounded-full transition-colors" title="Crea sondaggio">
              <BarChart2 size={24} className="text-violet-400" />
            </button>

            <button className="p-3 hover:bg-white/10 rounded-full transition-colors" title="Aggiungi emoji">
              <Smile size={24} className="text-violet-400" />
            </button>

            <div className="relative">
              <button 
                onClick={() => setShowFlags(!showFlags)}
                className="p-3 hover:bg-white/10 rounded-full transition-colors"
                title="Opzioni post"
              >
                <Flag size={24} className="text-violet-400" />
              </button>

              {showFlags && (
                <div className="absolute bottom-16 left-0 bg-[#202a44] border border-white/10 rounded-2xl shadow-xl p-4 w-64 z-50">
                  <p className="text-sm text-zinc-400 mb-3">Opzioni post</p>
                  <label className="flex items-center gap-3 py-2 hover:bg-white/5 rounded-xl px-2 cursor-pointer">
                    <input type="checkbox" checked={isNSFW} onChange={(e) => setIsNSFW(e.target.checked)} className="w-4 h-4 accent-violet-500" />
                    <span className="text-sm">NSFW</span>
                  </label>
                  <label className="flex items-center gap-3 py-2 hover:bg-white/5 rounded-xl px-2 cursor-pointer">
                    <input type="checkbox" checked={isAIMade} onChange={(e) => setIsAIMade(e.target.checked)} className="w-4 h-4 accent-violet-500" />
                    <span className="text-sm">AI Generated</span>
                  </label>
                  <label className="flex items-center gap-3 py-2 hover:bg-white/5 rounded-xl px-2 cursor-pointer">
                    <input type="checkbox" checked={isPaidPartnership} onChange={(e) => setIsPaidPartnership(e.target.checked)} className="w-4 h-4 accent-violet-500" />
                    <span className="text-sm">Paid Partnership</span>
                  </label>
                </div>
              )}
            </div>

            <input 
              ref={fileInputRef} 
              type="file" 
              accept="image/*,video/*" 
              multiple 
              onChange={handleFileSelect} 
              className="hidden" 
            />

            <input 
              ref={cameraInputRef} 
              type="file" 
              accept="image/*" 
              capture="environment"
              onChange={handleCameraCapture} 
              className="hidden" 
            />

            <div className="flex-1" />

            <div className={`text-sm font-medium ${content.length > 480 ? 'text-red-400' : 'text-zinc-400'}`}>
              {content.length}/{maxChars}
            </div>
          </div>
        </div>
      </div>

      {/* Carosello */}
      <MediaCarousel
        media={mediaFiles.map(file => URL.createObjectURL(file))}
        initialIndex={previewIndex ?? 0}
        isOpen={previewIndex !== null}
        onClose={closePreview}
      />
    </>
  );
}