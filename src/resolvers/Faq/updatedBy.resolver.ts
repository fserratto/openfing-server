import { updatedByResolver } from "../_utils/updatedByResolver";
import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["Faq"]["updatedBy"] = updatedByResolver;

export default resolver;
