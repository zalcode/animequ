'use client';

import { Button } from '@/components/atom/button';
import AnimeCard from '@/components/molecul/AnimeCard';
import AnimeCardSkeleton from '@/components/molecul/AnimeCardSkeleton';
import { getFragmentData } from '@/gql/fragment-masking';
import {
  CardMediaFragment,
  getAnimeListOptions,
  PageInfoFragment,
} from '@/services/anilistService';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

interface AnimeGridProps {
  title: string;
}

export default function AnimeList({ title }: AnimeGridProps) {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery({
      ...getAnimeListOptions({ page: 1, perPage: 20 }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const pageInfo = getFragmentData(PageInfoFragment, lastPage.Page?.pageInfo);
        return pageInfo?.hasNextPage ? (pageInfo?.currentPage || 1) + 1 : undefined;
      },
    });
  const animeList = data.pages.flatMap((page) => page.Page?.media) || [];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {animeList?.map((data) => {
          if (!data) return null;
          const anime = getFragmentData(CardMediaFragment, data);
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
              // isBookmarked={anime.isBookmarked}
              onClickBookmark={() => console.log('Bookmark clicked!')}
            />
          );
        })}
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <AnimeCardSkeleton key={`skeleton-${index}`} />
          ))}
      </div>
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
  );
}
