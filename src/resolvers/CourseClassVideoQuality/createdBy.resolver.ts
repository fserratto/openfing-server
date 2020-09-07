import { createdByResolver } from "../_utils/createdByResolver";
import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CourseClassVideoQuality"]["createdBy"] = createdByResolver;

export default resolver;
