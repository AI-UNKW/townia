// src/components/WelcomeModal.tsx
import { useState } from 'react';
import { X, Heart, Shield, Flag, Users } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    else onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[110] p-4">
      <div className="bg-[#202a44] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">

        {/* Progress */}
        <div className="h-1 bg-white/10">
          <div 
            className="h-1 bg-violet-500 transition-all" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <div className="p-8 text-center">

          {step === 1 && (
            <div className="space-y-6">
              <div className="mx-auto w-20 h-20 bg-violet-500/10 rounded-full flex items-center justify-center">
                <Heart size={48} className="text-violet-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Benvenuto su Townia</h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Uno spazio tranquillo dove puoi condividere pensieri, emozioni e momenti della tua vita.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="mx-auto w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                <Users size={48} className="text-white" />
              </div>
              <h2 className="text-2xl font-semibold">Qui non si parla di politica</h2>
              <p className="text-zinc-400">
                Townia è un luogo per pensieri personali, arte, vita quotidiana e connessioni genuine.<br />
                Lasciamo la politica fuori.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="mx-auto w-20 h-20 bg-pink-500/10 rounded-full flex items-center justify-center">
                <Flag size={48} className="text-pink-400" />
              </div>
              <h2 className="text-2xl font-semibold">NSFW è consentito</h2>
              <p className="text-zinc-400">
                Puoi pubblicare contenuti per adulti, ma devi attivare la flag "NSFW" sul post.<br />
                Senza flag, i contenuti espliciti non sono ammessi.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="mx-auto w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center">
                <Shield size={48} className="text-red-400" />
              </div>
              <h2 className="text-2xl font-semibold text-red-400">Regola importante</h2>
              <p className="text-zinc-300 leading-relaxed">
                Qualsiasi contenuto illegale, specialmente quello che coinvolge minori, 
                verrà immediatamente eliminato e segnalato alle forze dell'ordine.
              </p>
              <p className="text-sm text-zinc-500 mt-4">
                Rispettiamo la legge e la sicurezza di tutti.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <button
            onClick={nextStep}
            className="w-full bg-violet-600 hover:bg-violet-500 py-4 rounded-2xl font-semibold text-lg transition-colors"
          >
            {step === 4 ? "Ho capito, entriamo" : "Continua"}
          </button>
        </div>
      </div>
    </div>
  );
}