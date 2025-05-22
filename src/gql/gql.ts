/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
  '\n  fragment PageInfoFragment on PageInfo {\n    total\n    currentPage\n    lastPage\n    hasNextPage\n    perPage\n  }\n': typeof types.PageInfoFragmentFragmentDoc;
  '\n  fragment CardMedia on Media {\n    id\n    title {\n      userPreferred\n      english\n      romaji\n    }\n    coverImage {\n      large\n      medium\n      color\n    }\n    averageScore\n    genres\n    format\n    episodes\n    season\n    seasonYear\n  }\n': typeof types.CardMediaFragmentDoc;
  '\n  query AnimeList(\n    $page: Int = 1\n    $perPage: Int = 20\n    $genre: String\n    $genres: [String]\n    $sort: [MediaSort] = [TRENDING_DESC]\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        ...PageInfoFragment\n      }\n      media(sort: $sort, type: ANIME, isAdult: false, genre: $genre, genre_in: $genres) {\n        id\n        title {\n          userPreferred\n          english\n          romaji\n        }\n        coverImage {\n          large\n          medium\n          color\n        }\n        ...CardMedia\n      }\n    }\n  }\n': typeof types.AnimeListDocument;
};
const documents: Documents = {
  '\n  fragment PageInfoFragment on PageInfo {\n    total\n    currentPage\n    lastPage\n    hasNextPage\n    perPage\n  }\n':
    types.PageInfoFragmentFragmentDoc,
  '\n  fragment CardMedia on Media {\n    id\n    title {\n      userPreferred\n      english\n      romaji\n    }\n    coverImage {\n      large\n      medium\n      color\n    }\n    averageScore\n    genres\n    format\n    episodes\n    season\n    seasonYear\n  }\n':
    types.CardMediaFragmentDoc,
  '\n  query AnimeList(\n    $page: Int = 1\n    $perPage: Int = 20\n    $genre: String\n    $genres: [String]\n    $sort: [MediaSort] = [TRENDING_DESC]\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        ...PageInfoFragment\n      }\n      media(sort: $sort, type: ANIME, isAdult: false, genre: $genre, genre_in: $genres) {\n        id\n        title {\n          userPreferred\n          english\n          romaji\n        }\n        coverImage {\n          large\n          medium\n          color\n        }\n        ...CardMedia\n      }\n    }\n  }\n':
    types.AnimeListDocument,
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
  source: '\n  fragment PageInfoFragment on PageInfo {\n    total\n    currentPage\n    lastPage\n    hasNextPage\n    perPage\n  }\n',
): (typeof documents)['\n  fragment PageInfoFragment on PageInfo {\n    total\n    currentPage\n    lastPage\n    hasNextPage\n    perPage\n  }\n'];
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
  source: '\n  query AnimeList(\n    $page: Int = 1\n    $perPage: Int = 20\n    $genre: String\n    $genres: [String]\n    $sort: [MediaSort] = [TRENDING_DESC]\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        ...PageInfoFragment\n      }\n      media(sort: $sort, type: ANIME, isAdult: false, genre: $genre, genre_in: $genres) {\n        id\n        title {\n          userPreferred\n          english\n          romaji\n        }\n        coverImage {\n          large\n          medium\n          color\n        }\n        ...CardMedia\n      }\n    }\n  }\n',
): (typeof documents)['\n  query AnimeList(\n    $page: Int = 1\n    $perPage: Int = 20\n    $genre: String\n    $genres: [String]\n    $sort: [MediaSort] = [TRENDING_DESC]\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        ...PageInfoFragment\n      }\n      media(sort: $sort, type: ANIME, isAdult: false, genre: $genre, genre_in: $genres) {\n        id\n        title {\n          userPreferred\n          english\n          romaji\n        }\n        coverImage {\n          large\n          medium\n          color\n        }\n        ...CardMedia\n      }\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
