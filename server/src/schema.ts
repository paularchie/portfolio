import { makeSchema } from 'nexus';
import types from './graphql/index';

export const schema = makeSchema({
  types: [types],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts'
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma'
      }
    ]
  }
});
