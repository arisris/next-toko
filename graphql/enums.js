export default `#graphql
enum EnumOrderingName {
  asc
  desc
}
enum EnumRole {
  USER
  SELLER
  ADMIN
}
enum EnumUserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}
enum EnumPostStatus {
  PUBLISH
  DRAFT
  PRIVATE
  DELETED
}

enum EnumPostType {
  BLOGPOST
  PRODUCT
  PAGES
}

enum EnumProductStatus {
  OUTOFSTOCK
  DELETED
  AVAILABLE
  DRAFT
}

enum EnumCommentStatus {
  PUBLISH
  PENDING
  REJECTED
  DELETED
}

enum EnumWalletMutationType {
  TOPUP
  TRANSFER
  PURCHASE
  DEFAULT
}
`