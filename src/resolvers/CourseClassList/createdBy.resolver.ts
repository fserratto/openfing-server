import { createdByResolver } from "../_utils/createdByResolver";
import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CourseClassList"]["createdBy"] = createdByResolver;

export default resolver;
