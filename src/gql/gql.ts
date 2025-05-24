/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  fragment PageInfo on PageInfo {\n    total\n    currentPage\n    lastPage\n    hasNextPage\n    perPage\n  }\n': typeof types.PageInfoFragmentDoc;
  '\n  fragment CardMedia on Media {\n    id\n    title {\n      userPreferred\n      english\n      romaji\n    }\n    coverImage {\n      large\n      medium\n      color\n    }\n    averageScore\n    genres\n    format\n    episodes\n    season\n    seasonYear\n  }\n': typeof types.CardMediaFragmentDoc;
  '\n  fragment Tag on MediaTag {\n    id\n    name\n    rank\n  }\n': typeof types.TagFragmentDoc;
  '\n  fragment AnimeDetail on Media {\n    id\n    ...CardMedia\n    bannerImage\n    description\n    duration\n    tags {\n      ...Tag\n    }\n    meanScore\n    popularity\n    favourites\n    status\n    source\n    studios {\n      nodes {\n        id\n        name\n      }\n    }\n    startDate {\n      year\n      month\n      day\n    }\n    endDate {\n      year\n      month\n      day\n    }\n    nextAiringEpisode {\n      airingAt\n      timeUntilAiring\n      episode\n    }\n    synonyms\n    trailer {\n      id\n      site\n      thumbnail\n    }\n    characters(sort: ROLE) {\n      edges {\n        node {\n          id\n          name {\n            full\n            native\n          }\n          image {\n            large\n            medium\n          }\n          description\n        }\n        role\n      }\n    }\n    staff {\n      edges {\n        node {\n          id\n          name {\n            full\n            native\n          }\n          image {\n            large\n            medium\n          }\n          description\n          primaryOccupations\n        }\n        role\n      }\n    }\n    recommendations(sort: RATING_DESC) {\n      nodes {\n        mediaRecommendation {\n          ...CardMedia\n        }\n        rating\n      }\n    }\n  }\n': typeof types.AnimeDetailFragmentDoc;
  '\n  query AnimeList(\n    $page: Int = 1\n    $perPage: Int = 20\n    $genre: String\n    $genres: [String]\n    $sort: [MediaSort] = [TRENDING_DESC]\n    $ids: [Int]\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        ...PageInfo\n      }\n      media(\n        sort: $sort\n        type: ANIME\n        isAdult: false\n        genre: $genre\n        genre_in: $genres\n        id_in: $ids\n      ) {\n        id\n        ...CardMedia\n      }\n    }\n  }\n': typeof types.AnimeListDocument;
  '\n  query AnimeDetail($id: Int) {\n    Media(id: $id, type: ANIME) {\n      ...AnimeDetail\n    }\n  }\n': typeof types.AnimeDetailDocument;
  '\n  query GenreList {\n    GenreCollection\n  }\n': typeof types.GenreListDocument;
};
const documents: Documents = {
  '\n  fragment PageInfo on PageInfo {\n    total\n    currentPage\n    lastPage\n    hasNextPage\n    perPage\n  }\n':
    types.PageInfoFragmentDoc,
  '\n  fragment CardMedia on Media {\n    id\n    title {\n      userPreferred\n      english\n      romaji\n    }\n    coverImage {\n      large\n      medium\n      color\n    }\n    averageScore\n    genres\n    format\n    episodes\n    season\n    seasonYear\n  }\n':
    types.CardMediaFragmentDoc,
  '\n  fragment Tag on MediaTag {\n    id\n    name\n    rank\n  }\n': types.TagFragmentDoc,
  '\n  fragment AnimeDetail on Media {\n    id\n    ...CardMedia\n    bannerImage\n    description\n    duration\n    tags {\n      ...Tag\n    }\n    meanScore\n    popularity\n    favourites\n    status\n    source\n    studios {\n      nodes {\n        id\n        name\n      }\n    }\n    startDate {\n      year\n      month\n      day\n    }\n    endDate {\n      year\n      month\n      day\n    }\n    nextAiringEpisode {\n      airingAt\n      timeUntilAiring\n      episode\n    }\n    synonyms\n    trailer {\n      id\n      site\n      thumbnail\n    }\n    characters(sort: ROLE) {\n      edges {\n        node {\n          id\n          name {\n            full\n            native\n          }\n          image {\n            large\n            medium\n          }\n          description\n        }\n        role\n      }\n    }\n    staff {\n      edges {\n        node {\n          id\n          name {\n            full\n            native\n          }\n          image {\n            large\n            medium\n          }\n          description\n          primaryOccupations\n        }\n        role\n      }\n    }\n    recommendations(sort: RATING_DESC) {\n      nodes {\n        mediaRecommendation {\n          ...CardMedia\n        }\n        rating\n      }\n    }\n  }\n':
    types.AnimeDetailFragmentDoc,
  '\n  query AnimeList(\n    $page: Int = 1\n    $perPage: Int = 20\n    $genre: String\n    $genres: [String]\n    $sort: [MediaSort] = [TRENDING_DESC]\n    $ids: [Int]\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        ...PageInfo\n      }\n      media(\n        sort: $sort\n        type: ANIME\n        isAdult: false\n        genre: $genre\n        genre_in: $genres\n        id_in: $ids\n      ) {\n        id\n        ...CardMedia\n      }\n    }\n  }\n':
    types.AnimeListDocument,
  '\n  query AnimeDetail($id: Int) {\n    Media(id: $id, type: ANIME) {\n      ...AnimeDetail\n    }\n  }\n':
    types.AnimeDetailDocument,
  '\n  query GenreList {\n    GenreCollection\n  }\n': types.GenreListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment PageInfo on PageInfo {\n    total\n    currentPage\n    lastPage\n    hasNextPage\n    perPage\n  }\n',
): (typeof documents)['\n  fragment PageInfo on PageInfo {\n    total\n    currentPage\n    lastPage\n    hasNextPage\n    perPage\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CardMedia on Media {\n    id\n    title {\n      userPreferred\n      english\n      romaji\n    }\n    coverImage {\n      large\n      medium\n      color\n    }\n    averageScore\n    genres\n    format\n    episodes\n    season\n    seasonYear\n  }\n',
): (typeof documents)['\n  fragment CardMedia on Media {\n    id\n    title {\n      userPreferred\n      english\n      romaji\n    }\n    coverImage {\n      large\n      medium\n      color\n    }\n    averageScore\n    genres\n    format\n    episodes\n    season\n    seasonYear\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Tag on MediaTag {\n    id\n    name\n    rank\n  }\n',
): (typeof documents)['\n  fragment Tag on MediaTag {\n    id\n    name\n    rank\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AnimeDetail on Media {\n    id\n    ...CardMedia\n    bannerImage\n    description\n    duration\n    tags {\n      ...Tag\n    }\n    meanScore\n    popularity\n    favourites\n    status\n    source\n    studios {\n      nodes {\n        id\n        name\n      }\n    }\n    startDate {\n      year\n      month\n      day\n    }\n    endDate {\n      year\n      month\n      day\n    }\n    nextAiringEpisode {\n      airingAt\n      timeUntilAiring\n      episode\n    }\n    synonyms\n    trailer {\n      id\n      site\n      thumbnail\n    }\n    characters(sort: ROLE) {\n      edges {\n        node {\n          id\n          name {\n            full\n            native\n          }\n          image {\n            large\n            medium\n          }\n          description\n        }\n        role\n      }\n    }\n    staff {\n      edges {\n        node {\n          id\n          name {\n            full\n            native\n          }\n          image {\n            large\n            medium\n          }\n          description\n          primaryOccupations\n        }\n        role\n      }\n    }\n    recommendations(sort: RATING_DESC) {\n      nodes {\n        mediaRecommendation {\n          ...CardMedia\n        }\n        rating\n      }\n    }\n  }\n',
): (typeof documents)['\n  fragment AnimeDetail on Media {\n    id\n    ...CardMedia\n    bannerImage\n    description\n    duration\n    tags {\n      ...Tag\n    }\n    meanScore\n    popularity\n    favourites\n    status\n    source\n    studios {\n      nodes {\n        id\n        name\n      }\n    }\n    startDate {\n      year\n      month\n      day\n    }\n    endDate {\n      year\n      month\n      day\n    }\n    nextAiringEpisode {\n      airingAt\n      timeUntilAiring\n      episode\n    }\n    synonyms\n    trailer {\n      id\n      site\n      thumbnail\n    }\n    characters(sort: ROLE) {\n      edges {\n        node {\n          id\n          name {\n            full\n            native\n          }\n          image {\n            large\n            medium\n          }\n          description\n        }\n        role\n      }\n    }\n    staff {\n      edges {\n        node {\n          id\n          name {\n            full\n            native\n          }\n          image {\n            large\n            medium\n          }\n          description\n          primaryOccupations\n        }\n        role\n      }\n    }\n    recommendations(sort: RATING_DESC) {\n      nodes {\n        mediaRecommendation {\n          ...CardMedia\n        }\n        rating\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query AnimeList(\n    $page: Int = 1\n    $perPage: Int = 20\n    $genre: String\n    $genres: [String]\n    $sort: [MediaSort] = [TRENDING_DESC]\n    $ids: [Int]\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        ...PageInfo\n      }\n      media(\n        sort: $sort\n        type: ANIME\n        isAdult: false\n        genre: $genre\n        genre_in: $genres\n        id_in: $ids\n      ) {\n        id\n        ...CardMedia\n      }\n    }\n  }\n',
): (typeof documents)['\n  query AnimeList(\n    $page: Int = 1\n    $perPage: Int = 20\n    $genre: String\n    $genres: [String]\n    $sort: [MediaSort] = [TRENDING_DESC]\n    $ids: [Int]\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        ...PageInfo\n      }\n      media(\n        sort: $sort\n        type: ANIME\n        isAdult: false\n        genre: $genre\n        genre_in: $genres\n        id_in: $ids\n      ) {\n        id\n        ...CardMedia\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query AnimeDetail($id: Int) {\n    Media(id: $id, type: ANIME) {\n      ...AnimeDetail\n    }\n  }\n',
): (typeof documents)['\n  query AnimeDetail($id: Int) {\n    Media(id: $id, type: ANIME) {\n      ...AnimeDetail\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GenreList {\n    GenreCollection\n  }\n',
): (typeof documents)['\n  query GenreList {\n    GenreCollection\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
