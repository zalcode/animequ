'use client';

import { Button } from '@/components/atom/button';
import AnimeCard from '@/components/molecul/AnimeCard';
import AnimeCardSkeleton from '@/components/molecul/AnimeCardSkeleton';
import { getAnimeListOptions } from '@/services/anilistService';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

export default function BookmarkList({ bookmarkIds }: { bookmarkIds: number[] }) {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery({
      ...getAnimeListOptions({ page: 1, perPage: 20, ids: bookmarkIds }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const pageInfo = lastPage.Page?.pageInfo;
        return pageInfo?.hasNextPage ? (pageInfo?.currentPage || 1) + 1 : undefined;
      },
    });

  const animeList = data.pages.flatMap((page) => page.Page?.media) || [];

  return (
    <div className="min-h-screen">
      <div className="container space-y-8 py-6">
        <h1 className="text-3xl font-bold">Your Bookmarks</h1>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <AnimeCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {animeList.map((anime) => {
              if (!anime) return null;
              return (
                <AnimeCard
                  key={anime.id}
                  averageScore={anime.averageScore}
                  coverImage={anime.coverImage?.large}
                  episodes={anime.episodes}
                  format={anime.format}
                  genres={anime.genres}
                  id={anime.id}
                  season={anime.season}
                  seasonYear={anime.seasonYear}
                  title={anime.title?.userPreferred || anime.title?.english || anime.title?.romaji}
                />
              );
            })}
            {hasNextPage && (
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={() => {
                    fetchNextPage();
                  }}
                  disabled={isFetchingNextPage}
                  className="cursor-pointer px-8"
                  variant="outline"
                >
                  {isFetchingNextPage ? 'Loading...' : 'Load More'}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
