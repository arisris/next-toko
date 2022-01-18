import {
  DateTimeResolver,
  JSONObjectResolver,
  JSONResolver
} from "graphql-scalars";
import { asNexusMethod, enumType, objectType } from "nexus";
import {
  EnumCommentStatus,
  EnumPostStatus,
  EnumPostType,
  EnumProductStatus,
  EnumUserStatus,
  EnumWalletMutationType,
  EnumRole
} from "nexus-prisma";

const registerJsonObjectScalar = asNexusMethod(
  JSONObjectResolver,
  "jsonObject"
);
const registerJsonScalar = asNexusMethod(JSONResolver, "json");
const registerDateTimeScalar = asNexusMethod(DateTimeResolver, "date");
const registerEnum = [
  EnumUserStatus,
  EnumPostStatus,
  EnumPostType,
  EnumProductStatus,
  EnumCommentStatus,
  EnumWalletMutationType,
  EnumRole
].map(({ name, members }) => enumType({ name, members }));

const EnumRestResponse = enumType({
  name: "EnumRestResponse",
  members: ["SUCCESS", "ERROR", "WARNING"]
});
const RestResponse = objectType({
  name: "RestResponse",
  definition(t) {
    t.field("type", { type: EnumRestResponse.name });
    t.string("message");
    t.json("data");
  }
});

export default [
  registerDateTimeScalar,
  registerJsonScalar,
  registerJsonObjectScalar,
  EnumRestResponse,
  RestResponse,
  ...registerEnum
];
