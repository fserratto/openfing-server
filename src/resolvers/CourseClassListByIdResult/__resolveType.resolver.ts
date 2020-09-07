import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CourseClassListByIdResult"]["__resolveType"] = (parent) => parent.__typename;

export default resolver;
