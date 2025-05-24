'use client';

import { Button } from '@/components/atom/button';
import AnimeCard from '@/components/molecul/AnimeCard';
import AnimeCardSkeleton from '@/components/molecul/AnimeCardSkeleton';
import { useAnimeList } from '@/services/anilistService';
import { useSearchParams } from 'next/navigation';

interface AnimeGridProps {
  title: string;
}

export default function AnimeList({ title }: AnimeGridProps) {
  const searchParams = useSearchParams();
  const genre = (searchParams.get('genre') as string | undefined) || undefined;

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useAnimeList({
    page: 1,
    perPage: 20,
    genre: genre,
  });

  const animeList = data.pages.flatMap((page) => page.Page?.media) || [];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {animeList?.map((anime) => {
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
