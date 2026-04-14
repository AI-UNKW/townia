// src/pages/NotificationsPage.tsx
import { useState } from 'react';
import { Bell, ArrowLeft } from 'lucide-react';
import NotificationItem from '../items/NotificationItem';

export default function NotificationsPage() {
  const [notifications] = useState([
    { id: 1, type: 'like' as const,    user: 'Luna_Night',     content: 'ha messo like al tuo post', time: '12m', read: false },
    { id: 2, type: 'follow' as const,  user: 'cyberdreamer',   content: 'ha iniziato a seguirti',   time: '47m', read: false },
    { id: 3, type: 'mention' as const, user: 'voidpixel',      content: 'ti ha menzionato in un post', time: '2h', read: true },
    { id: 4, type: 'like' as const,    user: 'neonvoid',      content: 'ha messo like al tuo post', time: '5h', read: true },
  ]);

  return (
    <div className="min-h-screen bg-[#202a44] text-white hide-scrollbar overflow-y-auto">
      <div className="max-w-2xl mx-auto px-6 pt-8 pb-20">   {/* pb-20 per lasciare spazio al bottom nav */}
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button className="text-zinc-400 hover:text-white lg:hidden">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <Bell size={28} />
            <h1 className="text-3xl font-bold">Notifiche</h1>
          </div>
        </div>

        {/* Lista notifiche */}
        <div className="bg-[#17354D] rounded-3xl overflow-hidden divide-y divide-white/10">
          {notifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              type={notif.type}
              user={notif.user}
              content={notif.content}
              time={notif.time}
              read={notif.read}
            />
          ))}
        </div>

        {/* Pulsante segna tutte come lette */}
        {notifications.some(n => !n.read) && (
          <button className="mt-6 w-full py-4 bg-white/10 hover:bg-white/20 rounded-3xl font-medium transition-colors">
            Segna tutte come lette
          </button>
        )}
      </div>
    </div>
  );
}