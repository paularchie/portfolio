import { makeSchema } from "nexus";
import * as Models from "./models";

export const schema = makeSchema({
  types: [Models],
  outputs: {
    schema: __dirname + "/schema.graphql",
    typegen: __dirname + "/nexus.ts",
  },
  // sourceTypes: {
  //   modules: [
  //     {
  //       module: "@prisma/client",
  //       alias: "prisma",
  //     },
  //   ],
  // },
});
