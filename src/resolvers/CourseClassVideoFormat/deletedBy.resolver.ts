import { deletedByResolver } from "../_utils/deletedByResolver";
import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CourseClassVideoFormat"]["deletedBy"] = deletedByResolver;

export default resolver;
