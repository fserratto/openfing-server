import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CourseClassListByCodeResult"]["__resolveType"] = (parent) => parent.__typename;

export default resolver;
