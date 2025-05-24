import { notFound } from 'next/navigation';
import AnimeDetailHeader from '@/components/organism/AnimeDetailHeader';
import { getAnimeDetail } from '@/services/anilistService';
import AnimeDetailInfo from '@/components/organism/AnimeDetailInfo';
import AnimeDetailDescription from '@/components/molecul/AnimeDetailDescription';
import AnimeTags from '@/components/organism/AnimeTags';
import { TagFragment } from '@/gql/graphql';
import AnimeTrailer from '@/components/molecul/AnimeTrailer';
import AnimeCharacters, { Character } from '@/components/organism/AnimeCharacters';
import { Maybe } from 'graphql/jsutils/Maybe';
import AnimeStaff from '@/components/organism/AnimeStaff';

interface AnimePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AnimePage({ params }: AnimePageProps) {
  const { id } = await params;
  const animeId = Number.parseInt(id);

  if (isNaN(animeId)) {
    return notFound();
  }

  try {
    const animeDetails = await getAnimeDetail({ id: animeId });
    const anime = animeDetails?.Media;

    if (!anime) {
      return notFound();
    }

    return (
      <div className="bg-background min-h-screen pb-10">
        <AnimeDetailHeader anime={anime} />
        <div className="container mx-auto mt-6 space-y-8 px-4">
          <AnimeDetailInfo anime={anime} />
          <AnimeDetailDescription description={anime.description} />
          {anime.tags && anime.tags.length > 0 && (
            <AnimeTags tags={anime.tags.filter((tag): tag is TagFragment => tag !== null)} />
          )}
          {anime.trailer?.id && (
            <AnimeTrailer
              title={anime.title?.english || anime.title?.romaji || 'Anime'}
              id={anime.trailer.id}
              site={anime.trailer.site || ''}
            />
          )}
          {anime.characters?.edges && anime.characters?.edges.length > 0 && (
            <AnimeCharacters characters={mapEdgesToCharacters(anime.characters.edges)} />
          )}

          {anime?.staff?.edges && anime.staff.edges.length > 0 && (
            <AnimeStaff staff={mapEdgesToCharacters(anime.staff.edges)} />
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching anime details:', error);
    return notFound();
  }
}

function mapEdgesToCharacters(
  edges?: Maybe<{
    node?: Maybe<{
      id?: Maybe<number>;
      name?: Maybe<{
        full?: Maybe<string>;
      }>;
      image?: Maybe<{
        medium?: Maybe<string>;
      }>;
    }>;
    role?: Maybe<string>;
  }>[],
): Character[] {
  return (
    edges?.reduce((acc, edge) => {
      if (edge && edge.node?.name?.full && edge.node.id) {
        acc.push({
          id: edge.node.id,
          name: edge.node.name?.full,
          image: edge.node.image?.medium || '/placeholder.svg?height=140&width=140',
          role: edge.role || 'SUPPORTING',
        });
      }

      return acc;
    }, [] as Character[]) || []
  );
}
