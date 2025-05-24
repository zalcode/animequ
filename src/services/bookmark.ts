'use client';

export const BOOKMARK_KEY = 'animeku_bookmarks';

export interface BookmarkItem {
  id: string | number;
  [key: string]: unknown;
}

export function getBookmarks(key = BOOKMARK_KEY): BookmarkItem[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function setBookmarks(bookmarks: BookmarkItem[], key = BOOKMARK_KEY): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(bookmarks));
  } catch {}
}

export function addBookmark(item: BookmarkItem, key = BOOKMARK_KEY): void {
  const bookmarks = getBookmarks(key) || [];
  if (!bookmarks?.find((b) => b.id === item.id)) {
    setBookmarks([...bookmarks, item], key);
  }
}

export function removeBookmark(id: string | number, key = BOOKMARK_KEY): void {
  const bookmarks = getBookmarks(key) || [];
  setBookmarks(
    bookmarks.filter((b) => b.id !== id),
    key,
  );
}

export function isBookmarked(id: string | number, key = BOOKMARK_KEY): boolean {
  const bookmarks = getBookmarks(key) || [];
  return bookmarks.some((b) => b.id === id);
}
