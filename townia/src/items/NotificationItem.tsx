// src/items/NotificationItem.jsx
import { Heart, UserPlus, AtSign } from 'lucide-react';

export default function NotificationItem({ 
  type, 
  user, 
  content, 
  time, 
  read 
}) {

  const getIconStyle = () => {
    if (type === 'like')    return { Icon: Heart,    color: 'bg-red-500/10 text-red-400' };
    if (type === 'follow')  return { Icon: UserPlus, color: 'bg-emerald-500/10 text-emerald-400' };
    if (type === 'mention') return { Icon: AtSign,   color: 'bg-violet-500/10 text-violet-400' };
    return { Icon: Heart, color: 'bg-white/10 text-zinc-300' };
  };

  const { Icon, color } = getIconStyle();

  return (
    <div className={`flex gap-4 px-6 py-5 hover:bg-white/5 transition-colors ${!read ? 'bg-violet-500/5' : ''}`}>
      
      {/* Icona colorata */}
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon size={22} />
      </div>

      {/* Testo della notifica */}
      <div className="flex-1 min-w-0">
        <p className="text-zinc-200 leading-snug">
          <span className="font-semibold text-white">{user}</span> {content}
        </p>
        <p className="text-xs text-zinc-500 mt-1">{time}</p>
      </div>

      {/* Pallino non letto */}
      {!read && (
        <div className="w-3 h-3 bg-violet-500 rounded-full mt-2 flex-shrink-0" />
      )}
    </div>
  );
}