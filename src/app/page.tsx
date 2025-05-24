import AnimeSlider from '@/components/organism/AnimeSlider';
import { Suspense } from 'react';
import AnimeList from '@/components/organism/AnimeList';
import { MediaSort } from '@/gql/graphql';
import { getQueryClient } from '@/components/providers/getQueryClient';
import { getAnimeList, getAnimeListOptions, getGenreList } from '@/services/anilistService';
import GenreList from '@/components/organism/GenreList';

export default async function Home() {
  const queryClient = getQueryClient();
  const genresData = await getGenreList();
  const popularAnime = await getAnimeList({
    page: 1,
    perPage: 5,
    sort: [MediaSort.PopularityDesc],
  });

  void queryClient.prefetchQuery(
    getAnimeListOptions({ page: 1, perPage: 20, sort: [MediaSort.TrendingDesc] }),
  );

  return (
    <div className="min-h-screen">
      <div className="container space-y-8 py-6">
        {popularAnime.Page?.media && <AnimeSlider animes={popularAnime.Page?.media} />}

        {/* Genres */}
        {genresData?.length ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Genres</h2>
            <Suspense>
              <GenreList genres={genresData} />
            </Suspense>
          </div>
        ) : null}
        {/* Trending Today */}
        <Suspense fallback={<div>Loading...</div>}>
          <AnimeList title="Trending Today" />
        </Suspense>
      </div>
    </div>
  );
}
