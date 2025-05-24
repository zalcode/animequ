'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ArrowLeft, Plus } from 'lucide-react';
import { AnimeDetailFragment } from '@/gql/graphql';
import { isBookmarked, addBookmark, removeBookmark } from '@/services/bookmark';
import { useEffect, useState } from 'react';

interface AnimeDetailsHeaderProps {
  anime: AnimeDetailFragment;
}

export default function AnimeDetailsHeader({ anime }: AnimeDetailsHeaderProps) {
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  useEffect(() => {
    setBookmarked(isBookmarked(anime.id));
  }, [anime.id]);

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark(anime.id);
      setBookmarked(false);
    } else {
      addBookmark({ id: anime.id });
      setBookmarked(true);
    }
  };

  const formatNextEpisode = (timeUntilAiring: number) => {
    const days = Math.floor(timeUntilAiring / 86400);
    const hours = Math.floor((timeUntilAiring % 86400) / 3600);
    const minutes = Math.floor((timeUntilAiring % 3600) / 60);
    const seconds = timeUntilAiring % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="relative">
      {/* Banner Image */}
      <div className="relative h-[50vh] min-h-[300px] w-full">
        <Image
          src={
            anime.bannerImage ||
            anime?.coverImage?.large ||
            '/placeholder.svg?height=600&width=1200'
          }
          alt={anime.title?.english || anime.title?.romaji || 'Anime Banner'}
          fill
          className="object-cover"
          priority
        />
        <div className="from-background via-background/80 absolute inset-0 bg-gradient-to-t to-transparent" />
      </div>

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10 md:top-8 md:left-8">
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Link>
      </div>

      {/* Anime Info */}
      <div className="absolute right-0 bottom-0 left-0 p-4 md:p-8">
        <div className="flex items-end gap-4">
          {/* Cover Image */}
          <div className="border-border/50 relative h-40 w-28 shrink-0 overflow-hidden rounded-md border shadow-lg sm:h-48 sm:w-36 md:h-56 md:w-40">
            <Image
              src={anime.coverImage?.large || '/placeholder.svg?height=300&width=200'}
              alt={anime.title?.english || anime.title?.romaji || 'Anime Cover'}
              fill
              className="object-cover"
            />
          </div>

          {/* Title and Info */}
          <div className="flex-1 text-white">
            <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
              {anime.title?.english || anime.title?.romaji}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {anime.genres?.map((genre) => (
                <span
                  key={genre}
                  className="inline-block rounded-full bg-black/30 px-2 py-1 text-xs backdrop-blur-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Heart className={`h-5 w-5 ${bookmarked ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{anime.favourites?.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                  {anime.averageScore ? Math.round(anime.averageScore / 10) : '?'}
                </span>
                <span>{anime.averageScore ? anime.averageScore / 10 : 'N/A'}</span>
              </div>
              <span>{anime.seasonYear}</span>
            </div>
            {anime.nextAiringEpisode && (
              <div className="mt-2 text-sm">
                EP {anime.nextAiringEpisode.episode}:{' '}
                {formatNextEpisode(anime.nextAiringEpisode.timeUntilAiring)}
              </div>
            )}
          </div>
        </div>
        {/* Add to List Button */}
        <button
          onClick={handleBookmark}
          className="bg-secondary/80 hover:bg-secondary mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md py-3 text-white transition-colors"
        >
          <Plus className="h-5 w-5" />
          {bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
        </button>
      </div>
    </div>
  );
}
