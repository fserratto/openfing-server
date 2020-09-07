import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CourseByCodeResult"]["__resolveType"] = (parent) => parent.__typename;

export default resolver;
