import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CreateCoursePayload"]["__resolveType"] = (parent) => parent.__typename;

export default resolver;
