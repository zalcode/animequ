'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, Star } from 'lucide-react';
import { Button } from '@/components/atom/button';
import { Card, CardContent, CardFooter } from '@/components/atom/card';
import { Badge } from '@/components/atom/badge';
import { addBookmark, isBookmarked } from '@/services/bookmark';

interface AnimeCardProps {
  id: number;
  title?: string | null;
  coverImage?: string | null;
  averageScore?: number | null;
  genres?: (string | null)[] | null;
  format?: string | null;
  episodes?: number | null;
  season?: string | null;
  seasonYear?: number | null;
  isBookmarked?: boolean;
}

export default function AnimeCard(props: AnimeCardProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(props.id) || false);
    // Add loaded class after a small delay to trigger animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [props.id, props.isBookmarked]);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addBookmark({ id: props.id });
    setBookmarked((prev) => !prev);
  };

  return (
    <Link href={`/anime/${props.id}`}>
      <Card
        className={`anime-card h-full gap-0 overflow-hidden py-0 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
          loaded ? 'loaded' : ''
        }`}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={props.coverImage || '/placeholder.svg?height=450&width=300'}
            alt={props.title || 'Anime Cover'}
            fill
            className="object-cover transition-all duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 cursor-pointer rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
              onClick={handleBookmark}
            >
              <Bookmark
                className={`h-4 w-4 ${bookmarked ? 'fill-primary text-primary' : 'text-white'}`}
              />
              <span className="sr-only">Bookmark</span>
            </Button>
          </div>
          {props.averageScore && (
            <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs backdrop-blur-sm">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{(props.averageScore / 10).toFixed(1)}</span>
            </div>
          )}
        </div>
        <CardContent className="p-3">
          <h3 className="line-clamp-1 font-semibold">{props.title}</h3>
          <div className="text-muted-foreground mt-1 flex items-center text-xs">
            <span>{props.format || 'TV'}</span>
            {props.episodes && (
              <>
                <span className="mx-1">•</span>
                <span>{props.episodes} eps</span>
              </>
            )}
            {props.season && (
              <>
                <span className="mx-1">•</span>
                <span>
                  {props.season} {props.seasonYear}
                </span>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-1 p-3 pt-0">
          {props.genres?.slice(0, 3).map((genre) => (
            <Badge key={genre} variant="secondary" className="text-xs">
              {genre}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
