import {create} from 'zustand';

interface Bookmark {
  id?: number;
  title?: string;
  url?: string;
  img?: string;
}

interface BookmarkStore {
  bookmarks: Bookmark[];

  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: number) => void;
}

const useBookmarkStore = create<BookmarkStore>(set => ({
  bookmarks: [],
  isOnBookmark: false,
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
}));

export default useBookmarkStore;
