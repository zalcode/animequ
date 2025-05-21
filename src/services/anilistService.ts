import { graphql } from '@/gql';
import client from '@/gql/client';
import { AnimeListQueryVariables } from '@/gql/graphql';

export const PageInfoFragment = graphql(`
  fragment Pagination on PageInfo {
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

export const AnimeListQuery = graphql(`
  query AnimeList(
    $page: Int = 1
    $perPage: Int = 20
    $genre: String
    $genres: [String]
    $sort: [MediaSort] = [TRENDING_DESC]
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        ...Pagination
      }
      media(sort: $sort, type: ANIME, isAdult: false, genre: $genre, genre_in: $genres) {
        id
        ...CardMedia
      }
    }
  }
`);

export function getAnimeList(payload: AnimeListQueryVariables) {
  return client.request(AnimeListQuery, payload);
}
