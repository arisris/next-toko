const schema = `#graphql
type Users {
  id: Int!
  name: String!
  email: String!
  emailVerified: Boolean
  phoneNumber: String
  image: String
  role: EnumRole
  status: EnumUserStatus
  createdAt: DateTime
  updatedAt: DateTime
  posts: [Posts]
  postLikes: [PostLikes]
  socialAccounts: [SocialAccounts]
  comments: [Comments]
  commentLike: [CommentsLike]
  wallet: Wallet
}

input UserInputPayload {
  name: String
  email: String
  emailVerified: Boolean
  password: String
  phoneNumber: String
  image: String
  role: EnumRole
  status: EnumUserStatus
}

extend type Query {
  getUser(id: Int!): Users!
  listUser(take: Int, skip: Int): [Users]
}

extend type Mutation {
  createUser(payload: UserInputPayload): Users
  updateUser(id: Int! payload: UserInputPayload): Users
  deleteUser(id: Int!): Boolean
}
`;

const resolvers = {
  /** @type {Resolvers} */
  Query: {
    getUser(_, args, ctx) {
      return ctx.prisma.users.findUnique({ where: { id: args.id } });
    },
    listUser(_, { take, skip }, ctx) {
      return ctx.prisma.users.findMany({
        take,
        skip
      });
    }
  },
  /** @type {Resolvers} */
  Mutation: {
    createUser(_, args, ctx) {
      // todo
      return null;
    },
    updateUser(_, { id, payload }, ctx) {
      if (!ctx.session?.user?.id) throw new Error("You are not loggedIn");
      console.log(id);
      return null;
    },
    deleteUser(_, args, ctx) {
      // todo
      return null;
    }
  },
  /** @type {Resolvers<import("@prisma/client").Users>} */
  Users: {
    posts(parent, _args, ctx) {
      return ctx.prisma.posts.findMany({
        where: {
          authorId: parent.id
        },
        take: 10
      });
    },
    postLikes(parent, _args, ctx) {
      return ctx.prisma.postLikes.findMany({
        where: {
          authorId: parent.id
        },
        take: 10
      });
    },
    socialAccounts(parent, _args, ctx) {
      return ctx.prisma.socialAccounts.findMany({
        where: {
          userId: parent.id
        },
        take: 10
      });
    },
    posts(parent, _args, ctx) {
      return ctx.prisma.posts.findMany({
        where: {
          authorId: parent.id
        },
        take: 10
      });
    },
    comments(parent, _args, ctx) {
      return ctx.prisma.comments.findMany({
        where: {
          authorId: parent.id
        },
        take: 10
      });
    },
    commentLike(parent, _args, ctx) {
      return ctx.prisma.commentLikes.findMany({
        where: {
          authorId: parent.id
        },
        take: 10
      });
    },
    wallet(parent, _args, ctx) {
      return ctx.prisma.wallet.findUnique({
        where: {
          // todo fix
          id: undefined // parent.id
        }
      });
    }
  }
};

export default { schema, resolvers };
