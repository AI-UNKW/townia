// src/pages/BookmarksPage.tsx
export default function BookmarksPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Bookmarks</h2>
      <div className="bg-white/5 rounded-3xl p-12 text-center">
        <p className="text-zinc-400 text-lg">Non hai ancora salvato nessun post</p>
        <p className="text-zinc-500 text-sm mt-2">I post che salvi appariranno qui</p>
      </div>
    </div>
  );
}