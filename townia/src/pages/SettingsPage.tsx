// src/pages/SettingsPage.tsx
import { useState } from 'react';
import { User, Shield, Bell, Palette, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const [currentTab, setCurrentTab] = useState<'account' | 'privacy' | 'notifications' | 'appearance'>('account');
  const [username, setUsername] = useState('@fpsyukio');
  const [email, setEmail] = useState('yukio@townia.it');

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifiche', icon: Bell },
    { id: 'appearance', label: 'Aspetto', icon: Palette },
  ] as const;

  return (
    <div className="min-h-screen bg-[#202a44] text-white hide-scrollbar overflow-y-auto pb-24">
      <div className="max-w-2xl mx-auto px-5 pt-6">

        {/* Header */}
        <h1 className="text-3xl font-bold px-1 mb-8">Impostazioni</h1>

        {/* Tab orizzontali */}
        <div className="flex border-b border-white/10 mb-8 overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                  currentTab === tab.id
                    ? 'border-violet-500 text-white'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Contenuto piatto (senza card di background) */}
        <div className="px-1 space-y-10">

          {/* ACCOUNT */}
          {currentTab === 'account' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">Account</h2>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">@Username</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-1 bg-[#202a44] border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-500"
                  />
                  <button className="bg-violet-600 hover:bg-violet-500 px-8 rounded-2xl font-semibold">
                    Salva
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#202a44] border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Password</label>
                <button className="bg-white/10 hover:bg-white/20 w-full py-4 rounded-2xl font-medium">
                  Cambia password
                </button>
              </div>

              <div className="pt-6 border-t border-white/10">
                <button className="flex items-center gap-3 text-red-400 hover:text-red-500">
                  <LogOut size={20} />
                  <span>Disattiva account</span>
                </button>
              </div>
            </div>
          )}

          {/* PRIVACY */}
          {currentTab === 'privacy' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">Privacy e sicurezza</h2>
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Chi può vedere i tuoi post</p>
                    <p className="text-sm text-zinc-400">Tutti</p>
                  </div>
                  <select className="bg-[#202a44] border border-white/10 rounded-2xl px-5 py-3">
                    <option>Tutti</option>
                    <option>Solo follower</option>
                  </select>
                </div>

                <div className="flex justify-between items-center">
                  <p className="font-medium">Permetti menzioni</p>
                  <input type="checkbox" defaultChecked className="w-6 h-6 accent-violet-500" />
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICHE */}
          {currentTab === 'notifications' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">Notifiche</h2>
              <div className="space-y-6">
                {['Nuovi like', 'Nuove risposte', 'Nuovi follower', 'Menzioni', 'Post dei seguiti'].map((item) => (
                  <div key={item} className="flex justify-between items-center">
                    <span className="font-medium">{item}</span>
                    <input type="checkbox" defaultChecked className="w-6 h-6 accent-violet-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ASPETTO */}
          {currentTab === 'appearance' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">Aspetto</h2>
              <div>
                <p className="font-medium mb-4">Tema</p>
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-[#202a44] border-2 border-violet-500 rounded-2xl py-6 text-center font-medium">
                    Scuro (attivo)
                  </button>
                  <button className="bg-[#202a44] border border-white/10 rounded-2xl py-6 text-center font-medium">
                    Chiaro
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}