const schema = `#graphql
type Tags {
  id: Int!         
  type: EnumPostType 
  name: String
  description: String     
  posts: [Posts]
}
`;
const resolvers = {
  /** @type {Resolvers<import("@prisma/client").Tags>} */
  Tags: {
    posts(parent, _args, ctx) {
      return ctx.prisma.posts.findMany({
        where: {
          posts: {
            some: {
              id: parent.id
            }
          }
        },
        take: 10
      });
    }
  }
};

export default { schema, resolvers };
