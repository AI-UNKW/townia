// src/App.tsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Bookmark, 
  Crown, 
  Settings, 
  Plus, 
  Bell,
  X,
  LogOut 
} from 'lucide-react';

import AuthModal from './components/AuthModal';
import PostModal from './components/PostModal';
import RegisterModal from './components/WelcomeModal';

import HomePage from './pages/HomePage';
import BookmarksPage from './pages/BookmarksPage';
import PremiumPage from './pages/PremiumPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dati utente di test
  const currentUser = {
    name: "Vikir",
    username: "@vikir",
    avatar: "https://i.pravatar.cc/128?img=68"
  };

  return (
    <Router>
      <div className="bg-[#202a44] text-white min-h-screen">

        {/* MOBILE HEADER */}
        <div className="lg:hidden sticky top-0 bg-[#202a44] border-b border-white/10 z-50 px-4 py-3 flex items-center">
          <button onClick={() => setMobileMenuOpen(true)}>
            <img 
              src={currentUser.avatar} 
              alt="Profilo" 
              className="w-9 h-9 rounded-2xl object-cover border border-white/20"
            />
          </button>

          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-violet-600 rounded-2xl flex items-center justify-center text-xl font-bold">T</div>
              <h1 className="text-2xl font-semibold tracking-tighter">Townia</h1>
            </div>
          </div>

          <div className="w-9" />
        </div>

        {/* LAYOUT PRINCIPALE */}
        <div className="flex max-w-[1280px] mx-auto">

          {/* Sidebar Sinistra Desktop */}
          <div className="hidden lg:flex w-72 border-r border-white/5 h-screen sticky top-0 p-6 flex-col flex-shrink-0">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-9 h-9 bg-violet-600 rounded-full flex items-center justify-center text-xl font-bold">T</div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Townia</h1>
                <p className="text-xs text-zinc-500 -mt-1">NOCTURNAL SPACE</p>
              </div>
            </div>

            <nav className="space-y-1 flex-1">
              <Link to="/" className="flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-white/5 transition-colors">
                <Home size={24} /> Home
              </Link>
              <Link to="/notifications" className="flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-white/5 transition-colors">
                <Bell size={24} /> Notifications
              </Link>
              <Link to="/bookmarks" className="flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-white/5 transition-colors">
                <Bookmark size={24} /> Bookmarks
              </Link>
              <Link to="/premium" className="flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-white/5 transition-colors">
                <Crown size={24} /> Premium
              </Link>
              <Link to="/settings" className="flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-white/5 transition-colors">
                <Settings size={24} /> Settings
              </Link>
            </nav>

            <button 
              onClick={() => setShowPostModal(true)}
              className="mt-8 w-full bg-violet-600 hover:bg-violet-500 transition-colors py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 text-lg"
            >
              <Plus size={26} />
              Post a thought
            </button>

            {/* Account Desktop */}
            <div className="mt-auto pt-8">
              <Link 
                to="/profile"
                className="flex items-center gap-4 p-4 hover:bg-white/10 rounded-2xl transition-colors group"
              >
                <img 
                  src={currentUser.avatar} 
                  alt="Profilo" 
                  className="w-11 h-11 rounded-2xl object-cover" 
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{currentUser.name}</p>
                  <p className="text-zinc-400 text-sm truncate">{currentUser.username}</p>
                </div>
                <LogOut 
                  size={22} 
                  className="text-zinc-400 group-hover:text-red-400 transition-colors" 
                />
              </Link>
            </div>

            {/* Login / Register Desktop */}
            <div className="mt-4 space-y-3">
              <button 
                onClick={() => setShowAuthModal(true)}
                className="w-full py-3.5 bg-white text-black font-semibold rounded-2xl hover:bg-zinc-200 transition-colors"
              >
                Log in
              </button>
              
            </div>
          </div>

          {/* Contenuto Centrale */}
          <div className="flex-1 min-w-0 border-r border-white/5">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/premium" element={<PremiumPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Routes>
          </div>

          {/* Sidebar Destra Desktop */}
          <div className="hidden xl:block w-80 flex-shrink-0 sticky top-0 h-screen overflow-y-auto border-l border-white/10 bg-[#202a44]">
            <div className="p-6">
              <div className="bg-white/5 rounded-3xl p-6 mb-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span>✦</span> WELCOME TO TOWNIA
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Townia is a quiet space where you can share your thoughts and feelings.<br />
                  Post freely, like what resonates with you — no comments, no replies, just pure connection.
                </p>
              </div>

              <div className="bg-white/5 rounded-3xl p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span>✦</span> TOP USERS
                </h3>
                <p className="text-sm text-zinc-400">No users found.<br />Be the first to get a like!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Nav Mobile */}
        <MobileBottomNav onPostClick={() => setShowPostModal(true)} />

        {/* MOBILE MENU LATERALE */}
        {mobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/70 z-[100]" 
            onClick={() => setMobileMenuOpen(false)}
          >
            <div 
              className="bg-[#202a44] w-80 h-full shadow-2xl overflow-y-auto" 
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 flex justify-end border-b border-white/10">
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X size={28} className="text-zinc-300" />
                </button>
              </div>

              {/* Menu principale */}
              <div className="px-6 py-8 space-y-2">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 px-5 py-4 hover:bg-white/10 rounded-2xl text-lg">
                  <Home size={26} /> Home
                </Link>
                <Link to="/notifications" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 px-5 py-4 hover:bg-white/10 rounded-2xl text-lg">
                  <Bell size={26} /> Notifications
                </Link>
                <Link to="/bookmarks" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 px-5 py-4 hover:bg-white/10 rounded-2xl text-lg">
                  <Bookmark size={26} /> Bookmarks
                </Link>
                <Link to="/premium" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 px-5 py-4 hover:bg-white/10 rounded-2xl text-lg">
                  <Crown size={26} /> Premium
                </Link>
                <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 px-5 py-4 hover:bg-white/10 rounded-2xl text-lg">
                  <Settings size={26} /> Settings
                </Link>
              </div>

              {/* Contenuto Sidebar Destra */}
              <div className="px-6 pb-6">
                <div className="bg-white/5 rounded-3xl p-6 mb-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <span>✦</span> WELCOME TO TOWNIA
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Townia is a quiet space where you can share your thoughts and feelings.<br />
                    Post freely, like what resonates with you — no comments, no replies, just pure connection.
                  </p>
                </div>

                <div className="bg-white/5 rounded-3xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <span>✦</span> TOP USERS
                  </h3>
                  <p className="text-sm text-zinc-400">No users found.<br />Be the first to get a like!</p>
                </div>
              </div>

              {/* ACCOUNT + LOGIN/REGISTER IN FONDO */}
              <div className="px-6 pb-8 border-t border-white/10 pt-6 space-y-4">
                <Link 
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-2xl cursor-pointer group"
                >
                  <img 
                    src={currentUser.avatar} 
                    alt="Profilo" 
                    className="w-12 h-12 rounded-2xl object-cover" 
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{currentUser.name}</p>
                    <p className="text-zinc-400 text-sm truncate">{currentUser.username}</p>
                  </div>
                  <LogOut 
                    size={22} 
                    className="text-zinc-400 group-hover:text-red-400 transition-colors" 
                  />
                </Link>

                <div className="grid  gap-3">
                  <button 
                    onClick={() => { setShowAuthModal(true); setMobileMenuOpen(false); }}
                    className="py-4 bg-white text-black font-semibold rounded-2xl hover:bg-zinc-200 transition-colors"
                  >
                    Log in
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        <PostModal isOpen={showPostModal} onClose={() => setShowPostModal(false)} />
        <RegisterModal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} />
      </div>
    </Router>
  );
}

// Mobile Bottom Nav
function MobileBottomNav({ onPostClick }: { onPostClick: () => void }) {
  const location = useLocation();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#202a44] border-t border-white/10 z-50">
      <div className="flex items-center justify-around py-2">
        <Link to="/" className={`flex flex-col items-center py-2 px-6 ${location.pathname === '/' ? 'text-violet-400' : 'text-zinc-400'}`}>
          <Home size={26} />
        </Link>

        <Link to="/bookmarks" className={`flex flex-col items-center py-2 px-6 ${location.pathname === '/bookmarks' ? 'text-violet-400' : 'text-zinc-400'}`}>
          <Bookmark size={26} />
        </Link>

        <button
          onClick={onPostClick}
          className="flex flex-col items-center py-2 px-6 text-violet-400 hover:text-violet-300 transition-colors"
        >
          <Plus size={28} />
        </button>

        <Link to="/notifications" className={`flex flex-col items-center py-2 px-6 ${location.pathname === '/notifications' ? 'text-violet-400' : 'text-zinc-400'}`}>
          <Bell size={26} />
        </Link>
      </div>
    </div>
  );
}

export default App;