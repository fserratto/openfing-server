import { deletedByResolver } from "../_utils/deletedByResolver";
import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["Course"]["deletedBy"] = deletedByResolver;

export default resolver;
