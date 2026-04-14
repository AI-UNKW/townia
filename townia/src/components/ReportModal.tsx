// src/components/ReportModal.tsx
import { useState } from 'react';
import { X, Flag, AlertTriangle } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: 'post' | 'user';
  targetId?: string | number;
  targetName?: string;
}

export default function ReportModal({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetName = "questo contenuto"
}: ReportModalProps) {

  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [customReason, setCustomReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleReason = (reason: string) => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter(r => r !== reason));
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };

  const reasons = [
    "Spam o contenuti ripetitivi",
    "Contenuto offensivo o odio",
    "Molestie o bullismo",
    "Informazioni false o fuorvianti",
    "Violenza o contenuti grafici",
    "Violazione di copyright",
    "Contenuto politico estremo",
    "Pedopornografia o sfruttamento di minori",
    "Altro"
  ];

  const handleSubmit = async () => {
    if (selectedReasons.length === 0) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 700));

    alert(`Segnalazione inviata per "${targetName}"\nMotivi: ${selectedReasons.join(", ")}`);

    setIsSubmitting(false);
    setSelectedReasons([]);
    setCustomReason('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[90] p-4">
      <div className="bg-[#202a44] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col">

        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <Flag size={20} className="text-red-400" />
            <h2 className="text-lg font-semibold">Segnala {targetType === 'post' ? 'post' : 'utente'}</h2>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1">
            <X size={24} />
          </button>
        </div>

        {/* Contenuto scrollabile */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
          
          <p className="text-zinc-300 text-sm">
            Seleziona tutti i motivi per cui vuoi segnalare <span className="font-medium text-white">"{targetName}"</span>:
          </p>

          {/* Lista motivi - 2 colonne su desktop, 1 su mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {reasons.map((reason) => (
              <button
                key={reason}
                onClick={() => toggleReason(reason)}
                className={`text-left px-4 py-3.5 rounded-2xl text-sm transition-all border
                  ${selectedReasons.includes(reason) 
                    ? 'bg-red-600 border-red-500 text-white' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-zinc-300'}`}
              >
                {reason}
              </button>
            ))}
          </div>

          {/* Campo "Altro" */}
          {selectedReasons.includes("Altro") && (
            <textarea
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Descrivi il motivo della segnalazione..."
              className="w-full h-28 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm resize-y focus:outline-none focus:border-red-500"
            />
          )}

          {/* Avviso forte per contenuti illegali */}
          <div className="bg-red-950/40 border border-red-500/50 rounded-2xl p-5">
            <div className="flex gap-3">
              <AlertTriangle size={22} className="text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-red-400">Attenzione</p>
                <p className="text-zinc-400 mt-1 leading-relaxed">
                  La condivisione di materiale che coinvolge minori (pedopornografia) è <strong>severamente vietata</strong> e verrà segnalata alle autorità competenti.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer con bottone */}
        <div className="p-6 border-t border-white/10 flex-shrink-0">
          <button
            onClick={handleSubmit}
            disabled={selectedReasons.length === 0 || isSubmitting}
            className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-600/50 disabled:cursor-not-allowed py-4 rounded-2xl font-semibold transition-colors"
          >
            {isSubmitting ? "Invio in corso..." : "Invia segnalazione"}
          </button>
        </div>
      </div>
    </div>
  );
}