import AnimeSlider from '@/components/organism/AnimeSlider';
import animes from './animes.json';
import { Suspense } from 'react';
import AnimeList from '@/components/organism/AnimeList';
import { MediaSort } from '@/gql/graphql';
import { getQueryClient } from '@/components/providers/getQueryClient';
import { getAnimeListOptions } from '@/services/anilistService';

export default async function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    getAnimeListOptions({ page: 1, perPage: 20, sort: [MediaSort.TrendingDesc] }),
  );

  return (
    <div className="min-h-screen">
      <div className="container space-y-8 py-6">
        <AnimeSlider animes={animes} />
        {/* Trending Today */}
        <Suspense fallback={<div>Loading...</div>}>
          <AnimeList title="Trending Today" />
        </Suspense>
      </div>
    </div>
  );
}
