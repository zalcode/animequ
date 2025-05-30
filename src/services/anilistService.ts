import { graphql } from '@/gql';
import client from '@/gql/client';
import { AnimeDetailQueryVariables, AnimeListQueryVariables } from '@/gql/graphql';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

export const PageInfoFragment = graphql(`
  fragment PageInfo on PageInfo {
    total
    currentPage
    lastPage
    hasNextPage
    perPage
  }
`);

export const CardMediaFragment = graphql(`
  fragment CardMedia on Media {
    id
    title {
      userPreferred
      english
      romaji
    }
    coverImage {
      large
      medium
      color
    }
    bannerImage
    averageScore
    genres
    format
    episodes
    season
    seasonYear
    description
  }
`);

export const TagFragment = graphql(`
  fragment Tag on MediaTag {
    id
    name
    rank
  }
`);

export const AnimeDetail = graphql(`
  fragment AnimeDetail on Media {
    id
    ...CardMedia
    bannerImage
    description
    duration
    tags {
      ...Tag
    }
    meanScore
    popularity
    favourites
    status
    source
    studios {
      nodes {
        id
        name
      }
    }
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    nextAiringEpisode {
      airingAt
      timeUntilAiring
      episode
    }
    synonyms
    trailer {
      id
      site
      thumbnail
    }
    characters(sort: ROLE) {
      edges {
        node {
          id
          name {
            full
            native
          }
          image {
            large
            medium
          }
          description
        }
        role
      }
    }
    staff {
      edges {
        node {
          id
          name {
            full
            native
          }
          image {
            large
            medium
          }
          description
          primaryOccupations
        }
        role
      }
    }
    recommendations(sort: RATING_DESC) {
      nodes {
        mediaRecommendation {
          ...CardMedia
        }
        rating
      }
    }
  }
`);

export const AnimeListQuery = graphql(`
  query AnimeList(
    $page: Int = 1
    $perPage: Int = 20
    $genre: String
    $genres: [String]
    $sort: [MediaSort] = [TRENDING_DESC]
    $ids: [Int]
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        ...PageInfo
      }
      media(
        sort: $sort
        type: ANIME
        isAdult: false
        genre: $genre
        genre_in: $genres
        id_in: $ids
      ) {
        id
        ...CardMedia
      }
    }
  }
`);

export const AnimeDetailQuery = graphql(`
  query AnimeDetail($id: Int) {
    Media(id: $id, type: ANIME) {
      ...AnimeDetail
    }
  }
`);

export const GenreQuery = graphql(`
  query GenreList {
    GenreCollection
  }
`);

export function getAnimeList(payload: AnimeListQueryVariables) {
  return client.request(AnimeListQuery, payload);
}

export function getGenreList() {
  return client.request(GenreQuery).then((data) => {
    return data.GenreCollection?.reduce((acc: string[], genre) => {
      if (genre) {
        acc.push(genre);
      }
      return acc;
    }, [] as string[]);
  });
}

export function useAnimeList(payload: AnimeListQueryVariables) {
  return useSuspenseInfiniteQuery({
    queryKey: ['animeList', payload],
    initialPageParam: 1,
    queryFn: (p) => {
      return getAnimeList({ ...payload, page: p.pageParam || 1 });
    },
    getNextPageParam: (lastPage) => {
      const pageInfo = lastPage.Page?.pageInfo;
      return pageInfo?.hasNextPage ? (pageInfo?.currentPage || 1) + 1 : undefined;
    },
  });
}

export function getAnimeDetail(payload: AnimeDetailQueryVariables) {
  return client.request(AnimeDetailQuery, payload);
}
