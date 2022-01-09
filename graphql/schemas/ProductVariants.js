const schema = `#graphql
type ProductVariants {
  id: Int!             
  type: String         
  status: EnumProductStatus
  isMain: Boolean       
  name: String
  description: String           
  price: Int              
  stock: Int          
  image: String        
  products: Posts
}
`;
const resolvers = {
  /** @type {Resolvers<import("@prisma/client").ProductVariants>} */
  ProductVariants: {
    products(parent, _args, ctx) {
      return ctx.prisma.posts.findUnique({
        where: {
          id: parent.productId
        }
      });
    }
  }
};

export default { schema, resolvers };
