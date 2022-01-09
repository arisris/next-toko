import { DateTimeResolver } from "graphql-scalars";

/**
 * Type
 * @typedef {{ req: import("next").NextApiRequest, res: import("next").NextApiResponse, session: import("next-auth").Session, prisma: import("@prisma/client").PrismaClient } & {[key: string]: any}} ctx
 * @type {{ [key: string]: {[key: string]: (_parent: any, args: {[key: any]: any}, ctx: ctx )}}}
 */

const resolvers = {
  Users: {

  },
  SocialAccounts: {

  },
  PostLikes: {

  },
  Categories: {

  },
  Tags: {

  },
  ProductVariants: {

  },
  Comments: {

  },
  CommentsLike: {

  },
  Wallet: {

  },
  WalletMutations: {

  },
  Posts: {
    author(parent, _args, ctx) {
      return ctx.prisma.users.findUnique({
        where: {
          id: parent?.authorId
        }
      });
    }
  },
  DateTime: DateTimeResolver,
  Query: {
    post(_parent, args, ctx) {
      //console.log(ctx.session);
      return ctx.prisma.posts.findUnique({ where: { id: args.id } });
    }
  },
  // Mutation: {

  // },
};

export default resolvers;
