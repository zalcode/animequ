import { graphql } from '@/gql';
import client from '@/gql/client';
import { AnimeDetailQueryVariables, AnimeListQueryVariables } from '@/gql/graphql';

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
    averageScore
    genres
    format
    episodes
    season
    seasonYear
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

export function getAnimeList(payload: AnimeListQueryVariables) {
  return client.request(AnimeListQuery, payload);
}

export function getAnimeListOptions(payload: AnimeListQueryVariables) {
  return {
    queryKey: [
      'animeList',
      payload.page,
      payload.perPage,
      payload.sort,
      payload.genre,
      payload.ids,
    ],
    queryFn: () => getAnimeList(payload),
  };
}

export function getAnimeDetail(payload: AnimeDetailQueryVariables) {
  return client.request(AnimeDetailQuery, payload);
}
