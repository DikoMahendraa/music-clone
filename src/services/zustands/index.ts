import {create} from 'zustand';

interface Bookmark {
  id: number | string;
  title?: string;
  url?: string;
  img?: string;
}

interface BookmarkStore {
  bookmarks: Bookmark[];
  bookmarkMode: boolean;
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: number) => void;
  setBookmarkMode: (mode: boolean) => void;
}

const useBookmarkStore = create<BookmarkStore>(set => ({
  bookmarks: [],
  bookmarkMode: false,
  addBookmark: bookmark => {
    set(state => {
      if (!state.bookmarks.some(b => b.id === bookmark.id)) {
        return {
          bookmarks: [...state.bookmarks, bookmark],
        };
      }
      return state;
    });
  },
  removeBookmark: id => {
    set(state => ({
      bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== id),
    }));
  },
  setBookmarkMode: mode => set(() => ({bookmarkMode: mode})),
}));

export default useBookmarkStore;
