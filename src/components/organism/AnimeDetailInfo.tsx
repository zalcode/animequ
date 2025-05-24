import { AnimeDetailFragment, Maybe } from '@/gql/graphql';

interface AnimeDetailsInfoProps {
  anime: AnimeDetailFragment;
}

export default function AnimeDetailInfo({ anime }: AnimeDetailsInfoProps) {
  const formatDate = (year?: Maybe<number>, month?: Maybe<number>, day?: Maybe<number>) => {
    if (!year) return 'TBA';
    const date = new Date(year, (month || 1) - 1, day || 1);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const startDate = formatDate(anime.startDate?.year, anime.startDate?.month, anime.startDate?.day);
  const endDate =
    anime.status === 'FINISHED'
      ? formatDate(anime.endDate?.year, anime.endDate?.month, anime.endDate?.day)
      : anime.status === 'RELEASING'
        ? 'Airing'
        : 'TBA';

  return (
    <div className="bg-card grid grid-cols-1 gap-x-8 gap-y-2 rounded-lg p-6 md:grid-cols-2">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Mean score</span>
        <span className="font-medium">{anime.meanScore ? anime.meanScore / 10 : 'N/A'} / 10</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Status</span>
        <span className="font-medium">{anime.status?.replace(/_/g, ' ')}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Total episodes</span>
        <span className="font-medium">{anime.episodes || '?'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Average duration</span>
        <span className="font-medium">{anime.duration || '?'} min</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Format</span>
        <span className="font-medium">{anime.format || 'Unknown'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Source</span>
        <span className="font-medium">{anime.source?.replace(/_/g, ' ') || 'OTHER'}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Studio</span>
        <span className="font-medium">
          {anime.studios?.nodes?.length ? anime.studios.nodes[0]?.name : 'Unknown'}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Season</span>
        <span className="font-medium">
          {anime.season
            ? `${anime.season.charAt(0) + anime.season.slice(1).toLowerCase()} ${anime.seasonYear}`
            : 'Unknown'}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Start date</span>
        <span className="font-medium">{startDate}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">End date</span>
        <span className="font-medium">{endDate}</span>
      </div>
    </div>
  );
}
