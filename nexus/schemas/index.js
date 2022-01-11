import { DateTimeResolver } from "graphql-scalars";
import { asNexusMethod, enumType } from "nexus";
import {
  EnumCommentStatus,
  EnumPostStatus,
  EnumPostType,
  EnumProductStatus,
  EnumRole,
  EnumUserStatus,
  EnumWalletMutationType
} from "nexus-prisma";

const registerDateTimeScalar = asNexusMethod(DateTimeResolver, "date");
const registerEnum = [
  EnumUserStatus,
  EnumRole,
  EnumPostStatus,
  EnumPostType,
  EnumProductStatus,
  EnumCommentStatus,
  EnumWalletMutationType
].map(({ name, members }) => enumType({ name, members }));

export default [registerDateTimeScalar, ...registerEnum];