import { updatedByResolver } from "../_utils/updatedByResolver";
import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CourseClassVideoFormat"]["updatedBy"] = updatedByResolver;

export default resolver;
