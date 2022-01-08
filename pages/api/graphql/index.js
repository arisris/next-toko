import prisma from "@/libs/prisma";
import { EnumPostType } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server-micro";

const server = new ApolloServer({
  typeDefs: gql`
    type Posts {
      id: Int!
      type: String!
      name: String!
      body: String!
      createdAt: String!
      updatedAt: String!
    }
    enum PostType {
      BLOGPOST
      PRODUCT
    }
    type Query {
      hello: String
      allPosts: [Posts!]
      allPostByType(type: PostType): [Posts!]
    }
  `,
  resolvers: {
    Query: {
      hello() {
        return "Hello World";
      },
      allPosts() {
        return prisma.posts.findMany();
      },
      allPostByType(_parent, args = {
        type: EnumPostType.BLOGPOST
      }) {
        return prisma.posts.findMany({ where: { type: args.type }});
      }
    }
  },
  context(context) {
    return context;
  }
});
export const config = {
  api: {
    bodyParser: false
  }
};
const startServer = server.start();
export default async function handler(req, res) {
  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
}
