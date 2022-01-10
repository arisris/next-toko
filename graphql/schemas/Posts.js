import { EnumPostStatus, EnumPostType } from "@prisma/client";
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

input InputPostsQueryOrdering {
  id: EnumOrderingName
  name: EnumOrderingName
  createdAt: EnumOrderingName
  updatedAt: EnumOrderingName
}

input InputPostsFilter {
  type: EnumPostType
  status: EnumPostStatus
}

extend type Query {
  getPost(id: Int!): Posts
  listPosts(take: Int! skip: Int filter: InputPostsFilter, status: EnumPostStatus orderBy: InputPostsQueryOrdering): [Posts]
}

extend type Mutation {
  createPost(payload: UserInputPayload): Posts
  updatePost(id: Int! payload: UserInputPayload): Posts
  deletePost(id: Int!): Boolean
}
`;

const resolvers = {
  /** @type {Resolvers<import("@prisma/client").Posts>} */
  Query: {
    getPost(_parent, { id }, ctx) {
      return ctx.prisma.posts.findUnique({ where: { id } });
    },
    listPosts(_parent, { take, skip, filter, orderBy }, ctx) {
      const where = {
        status: EnumPostStatus.PUBLISH // todo
      };

      if (filter?.type) where.type = filter.type;
      if (filter?.status) where.status = filter.status;

      return ctx.prisma.posts.findMany({ where, take, skip, orderBy });
    }
  },
  Mutation: {
    createPost(_parent, args, ctx) {
      return null;
    },
    updatePost(_parent, args, ctx) {
      return null;
    },
    deletePost(_parent, args, ctx) {
      return null;
    }
  },
  /** @type { Resolvers<import("@prisma/client").Posts> } */
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
