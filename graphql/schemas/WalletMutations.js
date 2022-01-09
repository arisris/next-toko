const schema = `#graphql
type WalletMutations {
  id: Int!
  type: EnumWalletMutationType
  wallet: Wallet
  amount: Int
  isVerified: Boolean
  verifiedAt: DateTime
  createdAt: DateTime
  updatedAt: DateTime
}
`;
const resolvers = {
  /** @type {Resolvers<import("@prisma/client").WalletMutations>} */
  WalletMutations: {
    
  }
};

export default { schema, resolvers };
