import { updatedByResolver } from "../_utils/updatedByResolver";
import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CourseEdition"]["updatedBy"] = updatedByResolver;

export default resolver;
