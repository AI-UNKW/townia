// src/components/AuthModal.tsx
import { useState } from 'react';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  // Stati form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Inserisci un'email valida";
    }
    if (!password || password.length < 6) {
      newErrors.password = "La password deve avere almeno 6 caratteri";
    }

    if (!isLogin) {
      if (!confirmPassword || confirmPassword !== password) {
        newErrors.confirmPassword = "Le password non coincidono";
      }
      if (!displayName.trim()) newErrors.displayName = "Obbligatorio";
      if (!username.trim()) newErrors.username = "Obbligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(isLogin ? "Login" : "Register", { email, password, displayName, username });
    }
  };

  const handleGoogle = () => {
    console.log("Accedi con Google");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-[70] flex items-center justify-center p-4">
      <div 
        className="bg-[#202a44] w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: '620px' }}
      >

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <h3 className="text-xl font-semibold text-white">
            {isLogin ? "Bentornato" : "Crea account"}
          </h3>

          <div className="w-6" />
        </div>

        {/* Contenuto con scrollbar personalizzata Townia */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scroll">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="text-xs text-zinc-400 block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
                placeholder="tu@email.com"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1.5">Conferma Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1.5">Nome visualizzato</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500"
                    placeholder="Come vuoi apparire"
                  />
                  {errors.displayName && <p className="text-red-400 text-xs mt-1">{errors.displayName}</p>}
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1.5">Username</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-zinc-500 text-sm">@</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:border-violet-500"
                      placeholder="tuonome"
                    />
                  </div>
                  {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-500 py-3.5 rounded-2xl font-semibold text-sm mt-2 transition-colors"
            >
              {isLogin ? "Accedi" : "Crea account"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="px-3 text-zinc-500 text-xs">oppure</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogle}
            className="w-full bg-white hover:bg-gray-100 text-black py-3 rounded-2xl font-medium flex items-center justify-center gap-2 text-sm transition-colors"
          >
            <img
              src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
              alt="Google"
              className="w-4 h-4"
            />
            Continua con Google
          </button>

          {/* Switch */}
          <p className="text-center text-xs text-zinc-500 pt-3">
            {isLogin ? "Non hai un account? " : "Hai già un account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
              className="text-violet-400 hover:text-violet-300 font-medium"
            >
              {isLogin ? "Registrati" : "Accedi"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}