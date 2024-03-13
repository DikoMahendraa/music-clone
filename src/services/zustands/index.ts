import {create} from 'zustand';

interface Bookmark {
  id?: number;
  title?: string;
  url?: string;
  img?: string;
}

interface BookmarkStore {
  bookmarks: Bookmark[];
  isOnBookmark: boolean;
  addBookmark: (bookmark: Bookmark) => void;
}

const useBookmarkStore = create<BookmarkStore>(set => ({
  bookmarks: [],
  isOnBookmark: false,
  addBookmark: bookmark => {
    set(state => {
      if (!state.bookmarks.some(b => b.id === bookmark.id)) {
        return {
          bookmarks: [...state.bookmarks, bookmark],
          isOnBookmark: true,
        };
      }
      return state;
    });
  },
}));

export default useBookmarkStore;
