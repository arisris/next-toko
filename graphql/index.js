import { makeExecutableSchema } from "@graphql-tools/schema";
import { DateTimeResolver } from "graphql-scalars";

import Categories from "./schemas/Categories";
import Comments from "./schemas/Comments";
import CommentsLike from "./schemas/CommentsLike";
import PostLikes from "./schemas/PostLikes";
import Posts from "./schemas/Posts";
import ProductVariants from "./schemas/ProductVariants";
import SocialAccounts from "./schemas/SocialAccounts";
import Tags from "./schemas/Tags";
import Users from "./schemas/Users";
import Wallet from "./schemas/Wallet";
import WalletMutations from "./schemas/WalletMutations";

import enums from "./enums";
import globalsSchema from "./globalsSchema";
const globalResolvers = {
  DateTime: DateTimeResolver,
};
const typeDefs = [
  enums,
  globalsSchema,
  Categories.schema,
  Comments.schema,
  CommentsLike.schema,
  PostLikes.schema,
  Posts.schema,
  ProductVariants.schema,
  SocialAccounts.schema,
  Tags.schema,
  Users.schema,
  Wallet.schema,
  WalletMutations.schema
];

const resolvers = [
  globalResolvers,
  Categories.resolvers,
  Comments.resolvers,
  CommentsLike.resolvers,
  PostLikes.resolvers,
  Posts.resolvers,
  ProductVariants.resolvers,
  SocialAccounts.resolvers,
  Tags.resolvers,
  Users.resolvers,
  Wallet.resolvers,
  WalletMutations.resolvers
];

// help me predict error
export const schema = () => {
  try {
    let i = makeExecutableSchema({
      typeDefs,
      resolvers
    });
    return i;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default schema();
