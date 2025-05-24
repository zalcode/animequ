'use client';

import Link from 'next/link';
import { ScrollArea, ScrollBar } from '@/components/atom/scroll-area';
import { Button } from '@/components/atom/button';
import { useSearchParams } from 'next/navigation';

interface GenreListProps {
  genres: string[];
  selectedGenre?: string;
}

export default function GenreList({ genres }: GenreListProps) {
  const searchParams = useSearchParams();
  const selectedGenre = searchParams.get('genre') as string | undefined;

  return (
    <div className="relative">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-2 p-1">
          <Button
            asChild
            variant={!selectedGenre ? 'default' : 'outline'}
            size="sm"
            className="rounded-full"
          >
            <Link
              href={{
                query: { genre: undefined },
              }}
              replace
              shallow
            >
              All
            </Link>
          </Button>
          {genres.map((genre) => (
            <Button
              key={genre}
              asChild
              variant={selectedGenre === genre ? 'default' : 'outline'}
              size="sm"
              className="rounded-full"
            >
              <Link
                href={{
                  query: { genre },
                }}
                replace
                shallow
              >
                {genre}
              </Link>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
