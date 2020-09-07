import { deletedByResolver } from "../_utils/deletedByResolver";
import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CourseClassList"]["deletedBy"] = deletedByResolver;

export default resolver;
