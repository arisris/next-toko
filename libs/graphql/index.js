import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers";
import typeDefs from "./types";

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
