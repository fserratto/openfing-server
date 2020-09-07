import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CourseEditionByIdResult"]["__resolveType"] = (parent) => parent.__typename;

export default resolver;
