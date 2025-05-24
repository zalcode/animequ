'use client';

import BookmarkList from '@/components/organism/BookmarkList';
import { getBookmarks } from '@/services/bookmark';
import { useEffect, useState } from 'react';

export default function BookmarksPage() {
  const [bookmarkIds, setBookmarksIds] = useState<number[] | null>(null);

  useEffect(() => {
    setBookmarksIds(() => {
      return getBookmarks()?.map((bookmark) => Number(bookmark.id)) || [];
    });
  }, []);

  if (bookmarkIds === null) {
    return null;
  }

  if (bookmarkIds.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <h2 className="text-xl font-semibold">No bookmarks yet</h2>
        <p className="text-muted-foreground mt-2">
          Start exploring and bookmark your favorite anime to see them here.
        </p>
      </div>
    );
  }

  return <BookmarkList bookmarkIds={bookmarkIds} />;
}
