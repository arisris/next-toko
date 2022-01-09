const schema = `#graphql
type Wallet {
  id: Int!
  users: [Users]
  mutations: [WalletMutations]
  amount: Int!
  isVerified: Boolean
  verifiedAt: DateTime
  createdAt: DateTime
  updatedAt: DateTime
}
`;
export const resolvers = {
  /** @type {Resolvers<import("@prisma/client").Wallet>} */
  Wallet: {
    
  }
};

export default { schema, resolvers };
