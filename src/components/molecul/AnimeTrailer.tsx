interface AnimeTrailerProps {
  id: string;
  site: string;
  title: string;
}

export default function AnimeTrailer({ title, ...trailer }: AnimeTrailerProps) {
  if (!trailer || !trailer.id) return null;

  // Currently only supporting YouTube trailers
  if (trailer.site !== 'youtube') return null;

  const youtubeUrl = `https://www.youtube.com/embed/${trailer.id}`;

  return (
    <div className="bg-card rounded-lg p-6">
      <h2 className="mb-4 text-xl font-bold">Trailer</h2>
      <div className="relative aspect-video w-full overflow-hidden rounded-md">
        <iframe
          src={youtubeUrl}
          title={`${title} Trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}
