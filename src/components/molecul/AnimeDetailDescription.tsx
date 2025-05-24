import LongText from './LongText';

interface AnimeDescriptionProps {
  description?: string | null;
}

export default function AnimeDetailDescription({ description }: AnimeDescriptionProps) {
  // Clean HTML tags from description
  const cleanDescription = description?.replace(/<[^>]*>/g, '') || 'No description available.';

  return (
    <div className="bg-card rounded-lg p-6">
      <h2 className="mb-4 text-xl font-bold">Description</h2>
      <LongText text={cleanDescription} />
    </div>
  );
}
