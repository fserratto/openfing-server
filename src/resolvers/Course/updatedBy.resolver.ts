import { updatedByResolver } from "../_utils/updatedByResolver";
import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["Course"]["updatedBy"] = updatedByResolver;

export default resolver;
