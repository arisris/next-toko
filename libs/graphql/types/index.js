import enums from "./enum";

export default `#graphql
${enums}

type Users {
  id: Int!
  name: String!
  email: String!
  emailVerified: Boolean
  phoneNumber: String
  image: String
  role: EnumRole
  createdAt: DateTime
  updatedAt: DateTime
  posts: [Posts]
  postLikes: [PostLikes]
  socialAccounts: [SocialAccounts]
  comments: [Comments]
  commentLike: [CommentsLike]
  wallet: Wallet
}

type SocialAccounts {
  id: Int!
  provider: String!
  token: String!
  refreshToken: String!
  user: Users
}

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

type PostLikes {
  id: Int!
  author: Users
  like: Boolean
  post: Posts
}

type Categories {
  id: Int!         
  type: EnumPostType 
  name: String
  description: String    
  posts: [Posts]
}

type Tags {
  id: Int!         
  type: EnumPostType 
  name: String
  description: String     
  posts: [Posts]
}

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

type Comments {
  id: Int!
  status: EnumCommentStatus
  body: String
  author: Users
  post: Posts
  comments: [Comments]
  likes: [CommentsLike]
}
type CommentsLike {
  id: Int!
  author: Users
  like: Boolean
  comment: Comments
}

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

type Query {
  post(id: Int!): Posts
}

scalar DateTime
`;
