import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://graphql.anilist.co',
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    'src/gql/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      plugins: [],
      config: {
        defaultScalarType: 'string',
        maybeValue: 'T | undefined',
        useTypeImports: true,
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
    './schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
  watch: true,
};

export default config;
