const schema = `#graphql
type Posts {
  id: Int!
  type: EnumPostType!
  name: String!
  body: String!
  image: String
  status: EnumPostStatus
  createdAt: DateTime
  updatedAt: DateTime
  author: Users
  tags: [Tags]
  categories: [Categories]
  productVariants: [ProductVariants]
  comments: [Comments]
  postLikes: [PostLikes]
}
extend type Query {
  post(id: Int!): Posts
}
`;

const resolvers = {
  /** @type {Resolvers<import("@prisma/client").Posts>} */
  Query: {
    post(_parent, args, ctx) {
      //console.log(ctx.session);
      return ctx.prisma.posts.findUnique({ where: { id: args.id } });
    }
  },
  /** @type {Resolvers<import("@prisma/client").Posts>} */
  Posts: {
    author(parent, _args, ctx) {
      return ctx.prisma.users.findUnique({
        where: {
          id: parent?.authorId
        }
      });
    },
    tags(parent, _args, ctx) {
      return ctx.prisma.tags.findMany({
        where: {
          posts: {
            some: {
              id: parent.id
            }
          }
        },
        take: 10
      });
    },
    categories(parent, _args, ctx) {
      return ctx.prisma.categories.findMany({
        where: {
          posts: {
            some: {
              id: parent.id
            }
          }
        },
        take: 10
      });
    },
    productVariants(parent, _args, ctx) {
      return ctx.prisma.productVariants.findMany({
        where: {
          productId: parent.id
        }
      });
    },
    comments(parent, _args, ctx) {
      return ctx.prisma.comments.findMany({
        where: {
          postId: parent.id
        },
        take: 10
      });
    },
    postLikes(parent, _args, ctx) {
      return ctx.prisma.postLikes.findMany({
        where: {
          postId: parent.id
        },
        take: 10
      });
    }
  }
};

export default { schema, resolvers };
