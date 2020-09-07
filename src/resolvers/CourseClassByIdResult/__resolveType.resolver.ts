import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CourseClassByIdResult"]["__resolveType"] = (parent) => parent.__typename;

export default resolver;
