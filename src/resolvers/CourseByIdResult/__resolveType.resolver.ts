import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CourseByIdResult"]["__resolveType"] = (parent) => parent.__typename;

export default resolver;
