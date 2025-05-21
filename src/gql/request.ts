import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://graphql.anilist.co';

export const request = new GraphQLClient(endpoint, {
  mode: 'cors',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default request;
