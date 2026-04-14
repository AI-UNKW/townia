// src/pages/PremiumPage.tsx
import { Crown } from 'lucide-react';

export default function PremiumPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Crown size={36} className="text-violet-400" />
        <div>
          <h1 className="text-3xl font-semibold">Townia VIP</h1>
          <p className="text-zinc-400">Supporta il progetto e sblocca vantaggi esclusivi</p>
        </div>
      </div>

      <div className="bg-white/5 rounded-3xl p-6 mb-8">
        <p className="text-zinc-200">
          Diventa <span className="text-violet-400 font-medium">VIP</span> e aiuta Townia a crescere. 
          Ricevi vantaggi esclusivi e supporta la community.
        </p>
      </div>

      {/* Vantaggi */}
      <div className="grid gap-4 mb-10">
        <div className="flex gap-4 bg-white/5 rounded-2xl p-5">
          <span className="text-2xl mt-0.5">🌟</span>
          <div>
            <h4 className="font-medium">Badge VIP esclusivo</h4>
            <p className="text-sm text-zinc-400">Mostra il tuo status premium accanto al nome</p>
          </div>
        </div>

        <div className="flex gap-4 bg-white/5 rounded-2xl p-5">
          <span className="text-2xl mt-0.5">🎞️</span>
          <div>
            <h4 className="font-medium">Avatar GIF animato</h4>
            <p className="text-sm text-zinc-400">Carica una GIF come avatar (fino a 5MB)</p>
          </div>
        </div>

        <div className="flex gap-4 bg-white/5 rounded-2xl p-5">
          <span className="text-2xl mt-0.5">🖼️</span>
          <div>
            <h4 className="font-medium">Banner GIF sul profilo</h4>
            <p className="text-sm text-zinc-400">Personalizza il banner con immagini o GIF animate</p>
          </div>
        </div>

        <div className="flex gap-4 bg-white/5 rounded-2xl p-5">
          <span className="text-2xl mt-0.5">📝</span>
          <div>
            <h4 className="font-medium">Post più lunghi</h4>
            <p className="text-sm text-zinc-400">Fino a 1000 caratteri per post (500 in più rispetto al limite normale)</p>
          </div>
        </div>

        <div className="flex gap-4 bg-white/5 rounded-2xl p-5">
          <span className="text-2xl mt-0.5">⚡</span>
          <div>
            <h4 className="font-medium">Supporto prioritario</h4>
            <p className="text-sm text-zinc-400">Risposte più veloci dal team di Townia</p>
          </div>
        </div>
      </div>

      {/* Piani Abbonamento */}
      <div className="grid md:grid-cols-2 gap-5">
        
        {/* Mensile */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <div className="text-sm text-zinc-400">Mensile</div>
          <div className="text-4xl font-semibold mt-1 mb-6">
            1,99€ <span className="text-base font-normal text-zinc-500">/mese</span>
          </div>
          <button className="w-full bg-violet-600 hover:bg-violet-500 py-3.5 rounded-2xl font-medium transition-colors">
            Abbonati mensilmente
          </button>
        </div>

        {/* Annuale - CORRETTO */}
        <div className="bg-white/5 border border-violet-500 rounded-3xl p-6 relative">
          {/* Badge "RISPARMI" migliorato */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-xs font-bold px-5 py-1 rounded-full shadow-lg">
            RISPARMI 3,88€
          </div>
          
          <div className="text-sm text-zinc-400 mt-6">Annuale</div>
          <div className="text-4xl font-semibold mt-1 mb-1">20€</div>
          <div className="text-zinc-500 text-sm mb-6">all’anno • ~1,67€/mese</div>
          
          <button className="w-full bg-violet-600 hover:bg-violet-500 py-3.5 rounded-2xl font-medium transition-colors">
            Abbonati annualmente
          </button>
        </div>
      </div>

      {/* Info pagamento */}
      <div className="text-center text-xs text-zinc-500 mt-10">
        Pagamento sicuro tramite Stripe • Puoi cancellare l’abbonamento in qualsiasi momento
      </div>

    </div>
  );
}